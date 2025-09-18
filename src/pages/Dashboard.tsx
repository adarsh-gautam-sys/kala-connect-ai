import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation, useAction } from "convex/react";
import { motion } from "framer-motion";
import { Plus, Package, Clock, CheckCircle, XCircle, Globe } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const crafts = useQuery(api.crafts.getUserCrafts);
  const setRole = useMutation(api.users.setRole);
  const seedDemo = useAction(api.seed.demo);

  // Add language state with persistence
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
      hello: "Hello",
      genericUser: "Artisan",
      subtitle: "Your crafts dashboard",
      addNew: "Add New Craft",
      emptyTitle: "No crafts yet",
      emptyBody: "Upload your first craft and generate your product page",
      start: "Get Started",
      viewPage: "View Page",
      waiting: "Please wait",
      processing: "Processing...",
      uploading: "Uploading",
      statusProcessing: "Processing",
      statusCompleted: "Ready",
      statusFailed: "Failed",
      back: "Back",
      langToggle: "EN",
      langAlt: "HI",
    },
    hi: {
      hello: "नमस्ते",
      genericUser: "कलाकार",
      subtitle: "आपके शिल्प का डैशबोर्ड",
      addNew: "नया शिल्प जोड़ें",
      emptyTitle: "अभी तक कोई शिल्प नहीं",
      emptyBody: "अपना पहला शिल्प अपलोड करें और अपना उत्पाद पेज बनाएं",
      start: "शुरू करें",
      viewPage: "पेज देखें",
      waiting: "प्रतीक्षा करें",
      processing: "प्रोसेसिंग...",
      uploading: "अपलोड हो रहा है",
      statusProcessing: "प्रोसेसिंग हो रही है",
      statusCompleted: "तैयार है",
      statusFailed: "असफल",
      back: "वापस",
      langToggle: "HI",
      langAlt: "EN",
    },
  } as const;
  const t = copy[lang];

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "uploading":
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "uploading":
        return t.uploading;
      case "processing":
        return t.statusProcessing;
      case "completed":
        return t.statusCompleted;
      case "failed":
        return t.statusFailed;
      default:
        return status;
    }
  };

  const handleSetRole = async (role: "member" | "user") => {
    try {
      await setRole({ role });
      toast.success(lang === "en" ? "Role saved" : "भूमिका सेव हो गई");
    } catch {
      toast.error(lang === "en" ? "Failed to save role" : "भूमिका सेव करने में विफल");
    }
  };

  const handleSeedDemo = async () => {
    try {
      toast.loading(lang === "en" ? "Seeding demo crafts..." : "डेमो शिल्प जोड़े जा रहे हैं...");
      await seedDemo({});
      toast.success(lang === "en" ? "Demo crafts added" : "डेमो शिल्प जोड़ दिए गए");
    } catch {
      toast.error(lang === "en" ? "Failed to add demo crafts" : "डेमो शिल्प जोड़ने में विफल");
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t.hello}, {user.name || t.genericUser}
              </h1>
              <p className="text-gray-600">{t.subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setLang((prev) => (prev === "en" ? "hi" : "en"))}
                aria-label={`Switch to ${t.langAlt}`}
                title={`Switch to ${t.langAlt}`}
              >
                <Globe className="h-4 w-4 mr-2" />
                {t.langToggle}
              </Button>
              <Button
                onClick={() => navigate("/upload")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                {t.addNew}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Role selection banner (only if user has no role) */}
      {!user?.role && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-amber-900 font-medium">
                {lang === "en"
                  ? "Choose how you want to use KalaConnect"
                  : "कलाConnect का उपयोग कैसे करना चाहते हैं चुनें"}
              </p>
              <p className="text-amber-800 text-sm">
                {lang === "en"
                  ? "Select a role to personalize your experience."
                  : "अपने अनुभव को वैयक्तिक बनाने के लिए भूमिका चुनें।"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleSetRole("member")}>
                {lang === "en" ? "Buyer" : "खरीदार"}
              </Button>
              <Button onClick={() => handleSetRole("user")} className="bg-blue-600 hover:bg-blue-700">
                {lang === "en" ? "Artisan" : "कलाकार"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!crafts || crafts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t.emptyTitle}
            </h3>
            <p className="text-gray-600 mb-6">
              {t.emptyBody}
            </p>
            <Button
              onClick={() => navigate("/upload")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t.start}
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crafts.map((craft, index) => (
              <motion.div
                key={craft._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{craft.artisanName}</CardTitle>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(craft.status)}
                        <span className="text-sm text-gray-600">
                          {getStatusText(craft.status)}
                        </span>
                      </div>
                    </div>
                    <CardDescription>
                      {new Date(craft._creationTime).toLocaleDateString(
                        lang === "en" ? "en-IN" : "hi-IN",
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {craft.craftPhotoUrl && (
                      <div className="aspect-square rounded-lg overflow-hidden mb-4">
                        <img
                          src={craft.craftPhotoUrl}
                          alt="Craft"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex gap-2">
                      {craft.status === "completed" ? (
                        <Button
                          onClick={() => navigate(`/craft/${craft._id}`)}
                          className="flex-1"
                          variant="default"
                        >
                          {t.viewPage}
                        </Button>
                      ) : (
                        <Button disabled className="flex-1" variant="outline">
                          {craft.status === "processing" ? t.processing : t.waiting}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}