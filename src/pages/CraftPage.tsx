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
  Globe,
  BadgeCheck
} from "lucide-react";
import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

  // Add: local like state (persisted)
  const [liked, setLiked] = useState<boolean>(() => {
    const key = id ? `like:c:${id}` : "";
    return key ? localStorage.getItem(key) === "1" : false;
  });
  useEffect(() => {
    const key = id ? `like:c:${id}` : "";
    if (key) localStorage.setItem(key, liked ? "1" : "0");
  }, [liked, id]);

  // Add: simple confetti
  function launchConfetti() {
    const count = 80;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "pointer-events-none fixed top-1/2 left-1/2 w-2 h-2 rounded-sm";
      el.style.background = `hsl(${Math.random() * 360},80%,60%)`;
      el.style.transform = `translate(-50%,-50%)`;
      const dx = (Math.random() - 0.5) * 400;
      const dy = (Math.random() - 0.5) * 300;
      const duration = 600 + Math.random() * 700;
      el.animate(
        [
          { transform: `translate(-50%,-50%)`, opacity: 1 },
          { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 },
        ],
        { duration, easing: "cubic-bezier(.21,1,.22,1)", fill: "forwards" }
      );
      document.body.appendChild(el);
      setTimeout(() => el.remove(), duration + 50);
    }
  }

  // Add: tip modal state
  const [tipOpen, setTipOpen] = useState(false);
  const [tipAmount, setTipAmount] = useState<number>(100);

  const onTip = () => {
    // Simulate successful tip
    setTipOpen(false);
    launchConfetti();
    toast.success(lang === "en" ? "Thank you for supporting the artisan!" : "कलाकार का समर्थन करने के लिए धन्यवाद!");
  };

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

  // Add: simple gallery state with fallbacks
  const images: Array<{ src: string; label: string }> = [];
  if (craft.enhancedPhotoUrl) images.push({ src: craft.enhancedPhotoUrl, label: lang === "en" ? "Enhanced" : "एन्हांस्ड" });
  if (craft.craftPhotoUrl) images.push({ src: craft.craftPhotoUrl, label: lang === "en" ? "Original" : "मूल" });

  const [activeIdx, setActiveIdx] = useState<number>(0);

  // Demo price + buy handler (routes to WhatsApp)
  const demoPrice = Math.max(499, (String(craft._id).length * 137) % 4999);
  const handleBuyNow = () => handleWhatsAppContact();

  // Craft journey steps (status-aware)
  const steps = [
    { key: "uploaded", label: lang === "en" ? "Uploaded" : "अपलोड किया", done: true },
    { key: "processing", label: lang === "en" ? "AI Processing" : "AI प्रोसेसिंग", done: craft.status === "processing" || craft.status === "completed" || craft.status === "failed" },
    { key: "ready", label: lang === "en" ? "Ready" : "तैयार", done: craft.status === "completed" },
    { key: "share", label: lang === "en" ? "Shared" : "शेयर किया", done: craft.status === "completed" }, // heuristic
  ] as const;

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

  // Small helper for verified badge (heuristic)
  const isVerified = craft.status === "completed" && !!craft.whatsappNumber;

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
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  {t.craftOf(craft.artisanName)}
                  {isVerified && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="inline-flex items-center gap-1 text-green-600 text-xs font-medium cursor-help">
                            <BadgeCheck className="h-4 w-4" />
                            {lang === "en" ? "Verified Artisan" : "सत्यापित कलाकार"}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          {lang === "en" ? "Verified Artisan" : "सत्यापित कलाकार"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
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
              {/* Like button with pop animation */}
              <motion.button
                onClick={() => setLiked((v) => !v)}
                whileTap={{ scale: 0.9 }}
                animate={{ scale: liked ? [1, 1.25, 1] : 1 }}
                transition={{ duration: 0.25 }}
                className={`inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm ${
                  liked ? "text-pink-600 border-pink-200 bg-pink-50" : "text-gray-700 hover:bg-gray-50"
                }`}
                aria-pressed={liked}
                title={liked ? (lang === "en" ? "Liked" : "पसंद किया") : (lang === "en" ? "Like" : "पसंद")}
              >
                <Heart className={`h-4 w-4 ${liked ? "fill-pink-600" : ""}`} />
              </motion.button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
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
            {/* Main Image with zoom and slide transition */}
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-square rounded-lg overflow-hidden group bg-black/5">
                  {/* slide transition using framer-motion */}
                  <motion.img
                    key={images[activeIdx]?.src || craft.enhancedPhotoUrl || craft.craftPhotoUrl || "single"}
                    src={(images[activeIdx]?.src) ?? (craft.enhancedPhotoUrl ?? craft.craftPhotoUrl ?? undefined)}
                    alt="Craft"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full object-cover transform-gpu transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                {/* Enhanced note if applicable */}
                {craft.enhancedPhotoUrl && activeIdx === 0 && (
                  <div className="p-4 bg-blue-50 border-t">
                    <p className="text-sm text-blue-700 flex items-center">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {t.aiEnhanced}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, idx) => (
                  <button
                    key={img.src}
                    onClick={() => setActiveIdx(idx)}
                    className={`relative w-20 h-20 rounded-md overflow-hidden border transition-all ${
                      activeIdx === idx ? "border-blue-600 ring-2 ring-blue-200" : "border-gray-200 hover:border-gray-300"
                    }`}
                    title={img.label}
                  >
                    <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 text-[10px] text-white/90 bg-black/40 px-1 py-0.5 text-center">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Product Description + Price + Buy */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>{t.description}</CardTitle>
                    <CardDescription>
                      <Clock className="h-4 w-4 inline mr-1" />
                      {new Date(craft._creationTime).toLocaleDateString(t.dateLocale)}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{lang === "en" ? "Price" : "कीमत"}</div>
                    <div className="text-2xl font-bold">₹{demoPrice}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
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

                {/* Buy Now with subtle ripple-style hover */}
                <Button
                  onClick={handleBuyNow}
                  className="relative overflow-hidden w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  {lang === "en" ? "Buy Now" : "अभी खरीदें"}
                </Button>
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

            {/* Contact + Tip */}
            {craft.whatsappNumber && (
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <Button
                    onClick={handleWhatsAppContact}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    {t.contactWhatsApp}
                  </Button>
                  <p className="text-center text-sm text-gray-600">{t.contactHint}</p>
                  {/* Tip this Artisan */}
                  <Button
                    variant="outline"
                    className="w-full hover:scale-[1.01] transition-transform"
                    onClick={() => setTipOpen(true)}
                  >
                    💝 {lang === "en" ? "Tip this Artisan" : "इस कलाकार को टिप दें"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Craft Journey Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>{lang === "en" ? "Craft Journey" : "शिल्प यात्रा"}</CardTitle>
                <CardDescription>{lang === "en" ? "From upload to sharing" : "अपलोड से शेयर तक"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative pl-4">
                  <div className="absolute left-1 top-1 bottom-1 w-0.5 bg-gray-200" />
                  <div className="space-y-4">
                    {steps.map((s, i) => (
                      <motion.div
                        key={s.key}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: i * 0.06 }}
                        className="relative"
                      >
                        <div
                          className={`absolute -left-[14px] top-[2px] h-3.5 w-3.5 rounded-full border ${
                            s.done ? "bg-green-600 border-green-700" : "bg-white border-gray-300"
                          }`}
                        />
                        <div className="ml-2">
                          <div className={`font-medium ${s.done ? "text-gray-900" : "text-gray-600"}`}>{s.label}</div>
                          <div className="text-xs text-gray-500">
                            {s.done
                              ? lang === "en" ? "Completed" : "पूर्ण"
                              : lang === "en" ? "Pending" : "लंबित"}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Tip Modal */}
      <Dialog open={tipOpen} onOpenChange={setTipOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{lang === "en" ? "Support the Artisan" : "कलाकार का समर्थन करें"}</DialogTitle>
            <DialogDescription>
              {lang === "en" ? "Choose a tip amount. Thank you for your support!" : "एक टिप राशि चुनें। आपके समर्थन के लिए धन्यवाद!"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-2">
            {[50, 100, 200].map((amt) => (
              <Button
                key={amt}
                variant={tipAmount === amt ? "default" : "outline"}
                onClick={() => setTipAmount(amt)}
                className={tipAmount === amt ? "bg-pink-600 hover:bg-pink-700" : ""}
              >
                ₹{amt}
              </Button>
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setTipOpen(false)}>
              {lang === "en" ? "Cancel" : "रद्द करें"}
            </Button>
            <Button onClick={onTip} className="bg-pink-600 hover:bg-pink-700">
              {lang === "en" ? "Send Tip" : "टिप भेजें"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating Chat with Artisan AI FAB */}
      <motion.button
        onClick={() => navigate("/contact")}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
        className="fixed bottom-6 right-6 rounded-full h-12 px-5 shadow-lg bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
        aria-label={lang === "en" ? "Chat with Artisan AI" : "कलाकार AI से बात करें"}
        title={lang === "en" ? "Chat with Artisan AI" : "कलाकार AI से बात करें"}
      >
        🤖 {lang === "en" ? "Ask Artisan AI" : "कलाकार AI"}
      </motion.button>
    </motion.div>
  );
}