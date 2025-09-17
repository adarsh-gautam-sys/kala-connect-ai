import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  MessageCircle, 
  Share2, 
  Copy, 
  Heart,
  Clock,
  Loader2,
  ExternalLink,
  Globe
} from "lucide-react";
import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function CraftPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const craft = useQuery(api.crafts.getById, { 
    id: id as Id<"crafts"> 
  });

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
      loading: "Loading...",
      back: "Back",
      craftOf: (name: string) => `${name}'s Craft`,
      processing: "Processing",
      ready: "Ready",
      failed: "Failed",
      uploading: "Uploading",
      aiEnhanced: "Enhanced by AI",
      originalPhoto: "Original Photo",
      description: "Product Description",
      generating: "AI is generating details...",
      notAvailable: "Description not available",
      artistMessage: "Artist Message",
      originalAudio: "Original voice recording",
      transcription: "Transcription:",
      captionTitle: "Social Media Caption",
      captionHint: "For sharing on social media",
      copy: "Copy",
      copied: "Caption copied!",
      contactWhatsApp: "Contact on WhatsApp",
      contactHint: "Talk directly to the artisan to purchase",
      shareTitle: (name: string) => `${name}'s craft`,
      shareTextFallback: "Check out this beautiful handicraft",
      whatsappMissing: "WhatsApp number not available",
      whatsappMsg: (name: string) =>
        `Hello ${name}, I loved your craft. Is it available for purchase?`,
      langToggle: "EN",
      langAlt: "HI",
      dateLocale: "en-IN",
    },
    hi: {
      loading: "लोड हो रहा है...",
      back: "वापस",
      craftOf: (name: string) => `${name} का शिल्प`,
      processing: "प्रोसेसिंग हो रही है",
      ready: "तैयार",
      failed: "असफल",
      uploading: "अपलोड हो रहा है",
      aiEnhanced: "AI द्वारा बेहतर बनाया गया",
      originalPhoto: "मूल फोटो",
      description: "उत्पाद विवरण",
      generating: "AI विवरण तैयार कर रहा है...",
      notAvailable: "विवरण उपलब्ध नहीं है",
      artistMessage: "कलाकार का संदेश",
      originalAudio: "मूल आवाज़ रिकॉर्डिंग",
      transcription: "ट्रांसक्रिप्शन:",
      captionTitle: "सोशल मीडिया कैप्शन",
      captionHint: "सोशल मीडिया पर शेयर करने के लिए",
      copy: "कॉपी करें",
      copied: "कैप्शन कॉपी हो गया!",
      contactWhatsApp: "WhatsApp पर संपर्क करें",
      contactHint: "खरीदारी के लिए सीधे कलाकार से बात करें",
      shareTitle: (name: string) => `${name} का शिल्प`,
      shareTextFallback: "देखें यह सुंदर हस्तशिल्प",
      whatsappMissing: "WhatsApp नंबर उपलब्ध नहीं है",
      whatsappMsg: (name: string) =>
        `नमस्ते ${name}, मुझे आपका शिल्प पसंद आया है। क्या यह खरीदने के लिए उपलब्ध है?`,
      langToggle: "HI",
      langAlt: "EN",
      dateLocale: "hi-IN",
    },
  } as const;
  const t = copy[lang];

  if (!craft) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  const handleWhatsAppContact = () => {
    if (craft.whatsappNumber) {
      const message = encodeURIComponent(t.whatsappMsg(craft.artisanName));
      window.open(
        `https://wa.me/${craft.whatsappNumber.replace(/[^0-9]/g, "")}?text=${message}`,
        "_blank",
      );
    } else {
      toast.error(t.whatsappMissing);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: t.shareTitle(craft.artisanName),
          text: craft.productDescription || t.shareTextFallback,
          url,
        });
      } catch {
        // ignored
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success(lang === "en" ? "Link copied!" : "लिंक कॉपी हो गया!");
    }
  };

  const handleCopyCaption = async () => {
    if (craft.socialCaption) {
      await navigator.clipboard.writeText(craft.socialCaption);
      toast.success(t.copied);
    }
  };

  const getStatusBadge = () => {
    switch (craft.status) {
      case "processing":
        return <Badge variant="secondary">{t.processing}</Badge>;
      case "completed":
        return <Badge variant="default" className="bg-green-600">{t.ready}</Badge>;
      case "failed":
        return <Badge variant="destructive">{t.failed}</Badge>;
      default:
        return <Badge variant="outline">{t.uploading}</Badge>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
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
                <h1 className="text-xl font-bold text-gray-900">
                  {t.craftOf(craft.artisanName)}
                </h1>
                {getStatusBadge()}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setLang((prev) => (prev === "en" ? "hi" : "en"))}
                aria-label={`Switch to ${t.langAlt}`}
                title={`Switch to ${t.langAlt}`}
              >
                <Globe className="h-4 w-4 mr-2" />
                {t.langToggle}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={craft.enhancedPhotoUrl ?? craft.craftPhotoUrl ?? undefined}
                    alt="Craft"
                    className="w-full h-full object-cover"
                  />
                </div>
                {craft.enhancedPhotoUrl && (
                  <div className="p-4 bg-blue-50 border-t">
                    <p className="text-sm text-blue-700 flex items-center">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {t.aiEnhanced}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Original Photo (if enhanced exists) */}
            {craft.enhancedPhotoUrl && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">मूल फोटो</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={craft.craftPhotoUrl ?? undefined}
                      alt="Original Craft"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Product Description */}
            <Card>
              <CardHeader>
                <CardTitle>{t.description}</CardTitle>
                <CardDescription>
                  <Clock className="h-4 w-4 inline mr-1" />
                  {new Date(craft._creationTime).toLocaleDateString(t.dateLocale)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {craft.status === "completed" && craft.productDescription ? (
                  <p className="text-gray-700 leading-relaxed">{craft.productDescription}</p>
                ) : craft.status === "processing" ? (
                  <div className="flex items-center text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    {t.generating}
                  </div>
                ) : (
                  <p className="text-gray-500">{t.notAvailable}</p>
                )}
              </CardContent>
            </Card>

            {/* Voice Note */}
            {craft.voiceNoteUrl && (
              <Card>
                <CardHeader>
                  <CardTitle>{t.artistMessage}</CardTitle>
                  <CardDescription>{t.originalAudio}</CardDescription>
                </CardHeader>
                <CardContent>
                  <audio controls className="w-full">
                    <source src={craft.voiceNoteUrl} />
                    आपका ब्राउज़र ऑडियो प्लेयर को सपोर्ट नहीं करता।
                  </audio>
                  {craft.transcribedText && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">{t.transcription}</p>
                      <p className="text-gray-800">{craft.transcribedText}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Social Media Caption */}
            {craft.socialCaption && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {t.captionTitle}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyCaption}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {t.copy}
                    </Button>
                  </CardTitle>
                  <CardDescription>{t.captionHint}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                      {craft.socialCaption}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Button */}
            {craft.whatsappNumber && (
              <Card>
                <CardContent className="pt-6">
                  <Button
                    onClick={handleWhatsAppContact}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    {t.contactWhatsApp}
                  </Button>
                  <p className="text-center text-sm text-gray-600 mt-2">{t.contactHint}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}