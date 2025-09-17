import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/convex/_generated/api";
import { useMutation, useAction } from "convex/react";
import { motion } from "framer-motion";
import { Upload as UploadIcon, Camera, Mic, ArrowLeft, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Upload() {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const generateUploadUrl = useMutation(api.crafts.generateUploadUrl);
  const createCraft = useMutation(api.crafts.create);
  const processCraft = useAction(api.aiProcessing.processCraft);

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

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    navigate("/auth");
    return null;
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
      toast.error("कृपया सभी आवश्यक फ़ील्ड भरें");
      return;
    }

    setIsUploading(true);
    
    try {
      toast.loading("फ़ाइलें अपलोड हो रही हैं...");
      
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

      toast.success("अपलोड सफल! AI प्रोसेसिंग शुरू हो रही है...");

      // Start AI processing
      await processCraft({ craftId });

      toast.success("आपका शिल्प पेज तैयार हो गया है!");
      navigate(`/craft/${craftId}`);
      
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("अपलोड में समस्या हुई। कृपया दोबारा कोशिश करें।");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              वापस
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                नया शिल्प अपलोड करें
              </h1>
              <p className="text-gray-600">अपनी कलाकृति का फोटो और आवाज़ अपलोड करें</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>शिल्प की जानकारी</CardTitle>
            <CardDescription>
              अपने शिल्प के बारे में बताएं और फ़ाइलें अपलोड करें
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Artisan Name */}
              <div className="space-y-2">
                <Label htmlFor="artisanName">कलाकार का नाम *</Label>
                <Input
                  id="artisanName"
                  value={formData.artisanName}
                  onChange={(e) => setFormData(prev => ({ ...prev, artisanName: e.target.value }))}
                  placeholder="आपका नाम"
                  required
                />
              </div>

              {/* WhatsApp Number */}
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp नंबर (वैकल्पिक)</Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                  placeholder="+91 9876543210"
                  type="tel"
                />
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label>शिल्प का फोटो *</Label>
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
                      <p className="text-gray-600">फोटो अपलोड करने के लिए क्लिक करें</p>
                    </div>
                  )}
                </div>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange("photo", e.target.files?.[0] || null)}
                  className="hidden"
                />
              </div>

              {/* Audio Upload */}
              <div className="space-y-2">
                <Label>आवाज़ का नोट *</Label>
                <div
                  onClick={() => audioInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                >
                  {files.audio ? (
                    <div className="space-y-2">
                      <Mic className="h-12 w-12 text-green-500 mx-auto" />
                      <p className="text-sm text-gray-600">{files.audio.name}</p>
                      <audio controls className="mx-auto">
                        <source src={URL.createObjectURL(files.audio)} type={files.audio.type} />
                      </audio>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Mic className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="text-gray-600">आवाज़ रिकॉर्डिंग अपलोड करने के लिए क्लिक करें</p>
                    </div>
                  )}
                </div>
                <input
                  ref={audioInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleFileChange("audio", e.target.files?.[0] || null)}
                  className="hidden"
                />
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
                    प्रोसेसिंग हो रही है...
                  </>
                ) : (
                  <>
                    <UploadIcon className="h-4 w-4 mr-2" />
                    मेरा पेज बनाएं
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