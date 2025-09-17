import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/convex/_generated/api";
import { useMutation, useAction } from "convex/react";
import { motion } from "framer-motion";
import { Upload as UploadIcon, Camera, Mic, ArrowLeft, Loader2, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Upload() {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const generateUploadUrl = useMutation(api.crafts.generateUploadUrl);
  const createCraft = useMutation(api.crafts.create);
  const processCraft = useAction(api.aiProcessing.processCraft);

  // Add: Redirect via effect instead of during render to avoid hooks mismatch
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [authLoading, user, navigate]);

  // Language state
  const [lang, setLang] = useState<"en" | "hi">(() => {
    const saved = localStorage.getItem("lang");
    return saved === "hi" || saved === "en" ? (saved as "en" | "hi") : "en";
  });
  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang === "en" ? "en" : "hi";
  }, [lang]);

  const copy = {
    en: {
      back: "Back",
      title: "Upload New Craft",
      subtitle: "Tell us about your craft and upload files",
      artisanNameLabel: "Artisan Name *",
      artisanPlaceholder: "Your name",
      whatsappLabel: "WhatsApp Number (optional)",
      whatsappPlaceholder: "+91 9876543210",
      photoLabel: "Craft Photo *",
      photoClick: "Click to upload a photo",
      audioLabel: "Voice Note *",
      audioClick: "Click to upload a voice recording",
      submit: "Create My Page",
      processing: "Processing...",
      fillAll: "Please fill all required fields",
      uploadingFiles: "Uploading files...",
      uploadSuccess: "Upload successful! Starting AI processing...",
      finalSuccess: "Your craft page is ready!",
      uploadError: "There was a problem with the upload. Please try again.",
      langToggle: "EN",
      langAlt: "HI",
    },
    hi: {
      back: "वापस",
      title: "नया शिल्प अपलोड करें",
      subtitle: "अपने शिल्प के बारे में बताएं और फ़ाइलें अपलोड करें",
      artisanNameLabel: "कलाकार का नाम *",
      artisanPlaceholder: "आपका नाम",
      whatsappLabel: "WhatsApp नंबर (वैकल्पिक)",
      whatsappPlaceholder: "+91 9876543210",
      photoLabel: "शिल्प का फोटो *",
      photoClick: "फोटो अपलोड करने के लिए क्लिक करें",
      audioLabel: "आवाज़ का नोट *",
      audioClick: "आवाज़ रिकॉर्डिंग अपलोड करने के लिए क्लिक करें",
      submit: "मेरा पेज बनाएं",
      processing: "प्रोसेसिंग हो रही है...",
      fillAll: "कृपया सभी आवश्यक फ़ील्ड भरें",
      uploadingFiles: "फ़ाइलें अपलोड हो रही हैं...",
      uploadSuccess: "अपलोड सफल! AI प्रोसेसिंग शुरू हो रही है...",
      finalSuccess: "आपका शिल्प पेज तैयार हो गया है!",
      uploadError: "अपलोड में समस्या हुई। कृपया दोबारा कोशिश करें।",
      langToggle: "HI",
      langAlt: "EN",
    },
  } as const;
  const t = copy[lang];

  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    artisanName: "",
    whatsappNumber: "",
  });
  const [files, setFiles] = useState<{
    photo: File | null;
    audio: File | null;
  }>({
    photo: null,
    audio: null,
  });

  const photoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleFileChange = (type: "photo" | "audio", file: File | null) => {
    setFiles(prev => ({ ...prev, [type]: file }));
  };

  const uploadFile = async (file: File) => {
    const uploadUrl = await generateUploadUrl();
    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });
    const { storageId } = await result.json();
    return storageId;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!files.photo || !files.audio || !formData.artisanName) {
      toast.error(t.fillAll);
      return;
    }

    setIsUploading(true);
    
    try {
      toast.loading(t.uploadingFiles);
      
      // Upload files
      const [photoId, audioId] = await Promise.all([
        uploadFile(files.photo),
        uploadFile(files.audio),
      ]);

      // Create craft record
      const craftId = await createCraft({
        artisanName: formData.artisanName,
        craftPhoto: photoId,
        voiceNote: audioId,
        whatsappNumber: formData.whatsappNumber || undefined,
      });

      toast.success(t.uploadSuccess);

      await processCraft({ craftId });

      toast.success(t.finalSuccess);
      navigate(`/craft/${craftId}`);
      
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(t.uploadError);
    } finally {
      setIsUploading(false);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      mediaStreamRef.current = stream;
      setCameraOpen(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
    } catch {
      toast.error(lang === "en" ? "Camera permission denied" : "कैमरा अनुमति अस्वीकृत");
    }
  };

  const stopCamera = () => {
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    mediaStreamRef.current = null;
    setCameraOpen(false);
  };

  const capturePhoto = async () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1080;
    canvas.height = video.videoHeight || 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], "camera.jpg", { type: "image/jpeg" });
        handleFileChange("photo", file);
        stopCamera();
      },
      "image/jpeg",
      0.92,
    );
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const file = new File([blob], "voice-note.webm", { type: "audio/webm" });
        handleFileChange("audio", file);
        stream.getTracks().forEach((t) => t.stop());
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch {
      toast.error(lang === "en" ? "Microphone permission denied" : "माइक्रोफोन अनुमति अस्वीकृत");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current = null;
    setIsRecording(false);
  };

  const toggleRecording = () => {
    if (isRecording) stopRecording();
    else startRecording();
  };

  useEffect(() => {
    return () => {
      stopCamera();
      if (mediaRecorderRef.current && isRecording) {
        stopRecording();
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t.back}
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {t.title}
                </h1>
                <p className="text-gray-600">{t.subtitle}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setLang((prev) => (prev === "en" ? "hi" : "en"))}
              aria-label={`Switch to ${t.langAlt}`}
              title={`Switch to ${t.langAlt}`}
            >
              <Globe className="h-4 w-4 mr-2" />
              {t.langToggle}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>{t.title}</CardTitle>
            <CardDescription>{t.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Artisan Name */}
              <div className="space-y-2">
                <Label htmlFor="artisanName">{t.artisanNameLabel}</Label>
                <Input
                  id="artisanName"
                  value={formData.artisanName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, artisanName: e.target.value }))
                  }
                  placeholder={t.artisanPlaceholder}
                  required
                />
              </div>

              {/* WhatsApp Number */}
              <div className="space-y-2">
                <Label htmlFor="whatsapp">{t.whatsappLabel}</Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsappNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, whatsappNumber: e.target.value }))
                  }
                  placeholder={t.whatsappPlaceholder}
                  type="tel"
                />
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label>{t.photoLabel}</Label>
                <div
                  onClick={() => photoInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                >
                  {files.photo ? (
                    <div className="space-y-2">
                      <img
                        src={URL.createObjectURL(files.photo)}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-lg"
                      />
                      <p className="text-sm text-gray-600">{files.photo.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="text-gray-600">{t.photoClick}</p>
                    </div>
                  )}
                </div>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange("photo", e.target.files?.[0] || null)
                  }
                  className="hidden"
                />
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={startCamera}>
                    <Camera className="h-4 w-4 mr-2" />
                    {lang === "en" ? "Use Camera" : "कैमरा इस्तेमाल करें"}
                  </Button>
                  {cameraOpen && (
                    <span className="text-sm text-blue-600 self-center">
                      {lang === "en" ? "Camera is on" : "कैमरा चालू है"}
                    </span>
                  )}
                </div>
                {cameraOpen && (
                  <div className="mt-3 space-y-2">
                    <video
                      ref={videoRef}
                      className="w-full rounded-lg"
                      autoPlay
                      muted
                      playsInline
                    />
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        onClick={capturePhoto}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {lang === "en" ? "Capture" : "कैप्चर"}
                      </Button>
                      <Button type="button" variant="outline" onClick={stopCamera}>
                        {lang === "en" ? "Cancel" : "रद्द करें"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Audio Upload */}
              <div className="space-y-2">
                <Label>{t.audioLabel}</Label>
                <div
                  onClick={() => audioInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                >
                  {files.audio ? (
                    <div className="space-y-2">
                      <Mic className="h-12 w-12 text-green-500 mx-auto" />
                      <p className="text-sm text-gray-600">{files.audio.name}</p>
                      <audio controls className="mx-auto">
                        <source
                          src={URL.createObjectURL(files.audio)}
                          type={files.audio.type}
                        />
                      </audio>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Mic className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="text-gray-600">{t.audioClick}</p>
                    </div>
                  )}
                </div>
                <input
                  ref={audioInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={(e) =>
                    handleFileChange("audio", e.target.files?.[0] || null)
                  }
                  className="hidden"
                />
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant={isRecording ? "destructive" : "outline"}
                    onClick={toggleRecording}
                  >
                    <Mic className="h-4 w-4 mr-2" />
                    {isRecording
                      ? lang === "en"
                        ? "Stop Recording"
                        : "रिकॉर्डिंग रोकें"
                      : lang === "en"
                        ? "Record Voice"
                        : "आवाज़ रिकॉर्ड करें"}
                  </Button>
                  {isRecording && (
                    <span className="text-red-600 text-sm">
                      ● {lang === "en" ? "Recording..." : "रिकॉर्डिंग..."}
                    </span>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isUploading || !files.photo || !files.audio || !formData.artisanName}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {t.processing}
                  </>
                ) : (
                  <>
                    <UploadIcon className="h-4 w-4 mr-2" />
                    {t.submit}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}