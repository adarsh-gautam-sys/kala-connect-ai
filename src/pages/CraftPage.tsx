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
  ExternalLink
} from "lucide-react";
import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";

export default function CraftPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const craft = useQuery(api.crafts.getById, { 
    id: id as Id<"crafts"> 
  });

  if (!craft) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  const handleWhatsAppContact = () => {
    if (craft.whatsappNumber) {
      const message = encodeURIComponent(
        `नमस्ते ${craft.artisanName}, मुझे आपका शिल्प पसंद आया है। क्या यह खरीदने के लिए उपलब्ध है?`
      );
      window.open(`https://wa.me/${craft.whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
    } else {
      toast.error("WhatsApp नंबर उपलब्ध नहीं है");
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${craft.artisanName} का शिल्प`,
          text: craft.productDescription || "देखें यह सुंदर हस्तशिल्प",
          url: url,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("लिंक कॉपी हो गया!");
    }
  };

  const handleCopyCaption = async () => {
    if (craft.socialCaption) {
      await navigator.clipboard.writeText(craft.socialCaption);
      toast.success("कैप्शन कॉपी हो गया!");
    }
  };

  const getStatusBadge = () => {
    switch (craft.status) {
      case "processing":
        return <Badge variant="secondary">प्रोसेसिंग हो रही है</Badge>;
      case "completed":
        return <Badge variant="default" className="bg-green-600">तैयार</Badge>;
      case "failed":
        return <Badge variant="destructive">असफल</Badge>;
      default:
        return <Badge variant="outline">अपलोड हो रहा है</Badge>;
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
                वापस
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {craft.artisanName} का शिल्प
                </h1>
                {getStatusBadge()}
              </div>
            </div>
            <div className="flex gap-2">
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
                      AI द्वारा बेहतर बनाया गया
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
                <CardTitle>उत्पाद विवरण</CardTitle>
                <CardDescription>
                  <Clock className="h-4 w-4 inline mr-1" />
                  {new Date(craft._creationTime).toLocaleDateString("hi-IN")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {craft.status === "completed" && craft.productDescription ? (
                  <p className="text-gray-700 leading-relaxed">
                    {craft.productDescription}
                  </p>
                ) : craft.status === "processing" ? (
                  <div className="flex items-center text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    AI विवरण तैयार कर रहा है...
                  </div>
                ) : (
                  <p className="text-gray-500">विवरण उपलब्ध नहीं है</p>
                )}
              </CardContent>
            </Card>

            {/* Voice Note */}
            {craft.voiceNoteUrl && (
              <Card>
                <CardHeader>
                  <CardTitle>कलाकार का संदेश</CardTitle>
                  <CardDescription>मूल आवाज़ रिकॉर्डिंग</CardDescription>
                </CardHeader>
                <CardContent>
                  <audio controls className="w-full">
                    <source src={craft.voiceNoteUrl} />
                    आपका ब्राउज़र ऑडियो प्लेयर को सपोर्ट नहीं करता।
                  </audio>
                  {craft.transcribedText && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">ट्रांसक्रिप्शन:</p>
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
                    सोशल मीडिया कैप्शन
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyCaption}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      कॉपी करें
                    </Button>
                  </CardTitle>
                  <CardDescription>सोशल मीडिया पर शेयर करने के लिए</CardDescription>
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
                    WhatsApp पर संपर्क करें
                  </Button>
                  <p className="text-center text-sm text-gray-600 mt-2">
                    खरीदारी के लिए सीधे कलाकार से बात करें
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}