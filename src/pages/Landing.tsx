import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { 
  Camera, 
  Mic, 
  Sparkles, 
  Users, 
  Globe, 
  ArrowRight,
  Upload,
  MessageCircle,
  Share2
} from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function Landing() {
  const { isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Language state (en default) with localStorage persistence
  const [lang, setLang] = useState<"en" | "hi">(() => {
    const saved = localStorage.getItem("lang");
    return (saved === "hi" || saved === "en") ? (saved as "en" | "hi") : "en";
  });
  useEffect(() => {
    localStorage.setItem("lang", lang);
    // Optionally set document language
    document.documentElement.lang = lang === "en" ? "en" : "hi";
  }, [lang]);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  // Copy for EN + HI
  const copy = {
    en: {
      brand: "KalaConnect",
      about: "About",
      contact: "Contact",
      shopAll: "Shop All",
      login: "Log in",
      start: "Get Started",
      dashboard: "Dashboard",
      demo: "View Demo",
      heroTitleLine1: "THE BEAUTY OF",
      heroTitleLine2: "HANDCRAFTED CERAMICS",
      heroSubTitleStrong: "Embrace the Art of Clay — Where",
      heroSubTitle: " Tradition Meets Creativity",
      heroBody:
        "Step into a world of clay and creation with KalaConnect. Discover the perfect blend of tradition and modernity. Build a professional product page with just a photo and a voice note — powered by AI.",
      heroCTA: "Shop Now",
      heroCTASecondary: "Get Started",
      howItWorks: "How it works",
      howItWorksSub: "Create your product page in three simple steps",
      feature1Title: "Upload a Photo",
      feature1Desc: "Capture a beautiful image of your craft and upload it",
      feature2Title: "Record Your Voice",
      feature2Desc: "Tell the story of your craft in your own voice",
      feature3Title: "AI Magic",
      feature3Desc: "We generate a professional page for you",
      feature4Title: "Share",
      feature4Desc: "Share your craft with the world on social media",
      trustedBy: "Trusted by Indian artisans",
      trustedBody: "Thousands of artisans are bringing their craft to the world",
      stat1: "1000+",
      stat1Label: "Happy Artisans",
      stat2: "5000+",
      stat2Label: "Product Pages Created",
      stat3: "15+",
      stat3Label: "Languages Supported",
      ctaTitle: "Create your first product page today",
      ctaSub: "Start free. No credit card required.",
      ctaBtn: "Start Now",
      footerPrivacy: "Privacy Policy",
      footerTerms: "Terms & Conditions",
      footerContact: "Contact",
      poweredBy: "Powered by",
      langToggle: "EN",
      langAlt: "HI",
    },
    hi: {
      brand: "कलाConnect",
      about: "हमारे बारे में",
      contact: "संपर्क करें",
      shopAll: "सभी देखें",
      login: "लॉग इन",
      start: "शुरू करें",
      dashboard: "डैशबोर्ड",
      demo: "डेमो देखें",
      heroTitleLine1: "THE BEAUTY OF",
      heroTitleLine2: "HANDCRAFTED CERAMICS",
      heroSubTitleStrong: "मिट्टी की कला अपनाएं — जहाँ",
      heroSubTitle: " परंपरा और रचनात्मकता मिलते हैं",
      heroBody:
        "कलाConnect के साथ मिट्टी और रचनात्मकता की दुनिया में कदम रखें। परंपरा और आधुनिकता का सही मेल खोजें। सिर्फ एक तस्वीर और एक वॉइस नोट से AI की मदद से अपना प्रोफेशनल प्रोडक्ट पेज बनाएं।",
      heroCTA: "अभी देखें",
      heroCTASecondary: "अभी शुरू करें",
      howItWorks: "कैसे काम करता है?",
      howItWorksSub: "सिर्फ तीन आसान चरणों में अपना प्रोडक्ट पेज बनाएं",
      feature1Title: "फोटो अपलोड करें",
      feature1Desc: "अपने शिल्प की सुंदर तस्वीर लेकर अपलोड करें",
      feature2Title: "आवाज़ रिकॉर्ड करें",
      feature2Desc: "अपनी आवाज़ में अपने शिल्प की कहानी बताएं",
      feature3Title: "AI जादू",
      feature3Desc: "हम आपके लिए प्रोफेशनल पेज बनाते हैं",
      feature4Title: "शेयर करें",
      feature4Desc: "सोशल मीडिया पर दुनिया के साथ साझा करें",
      trustedBy: "भारत के कलाकारों का भरोसा",
      trustedBody: "हजारों कलाकार अपने शिल्प को दुनिया तक पहुंचा रहे हैं",
      stat1: "1000+",
      stat1Label: "खुश कलाकार",
      stat2: "5000+",
      stat2Label: "प्रोडक्ट पेज बनाए गए",
      stat3: "15+",
      stat3Label: "भाषाओं में सपोर्ट",
      ctaTitle: "आज ही अपना पहला प्रोडक्ट पेज बनाएं",
      ctaSub: "मुफ़्त में शुरू करें। कोई क्रेडिट कार्ड आवश्यक नहीं।",
      ctaBtn: "अभी शुरू करें",
      footerPrivacy: "प्राइवेसी पॉलिसी",
      footerTerms: "नियम और शर्तें",
      footerContact: "संपर्क",
      poweredBy: "Powered by",
      langToggle: "HI",
      langAlt: "EN",
    },
  } as const;

  const t = copy[lang];

  const features = [
    {
      icon: Camera,
      title: lang === "en" ? t.feature1Title : t.feature1Title,
      description: lang === "en" ? t.feature1Desc : t.feature1Desc,
    },
    {
      icon: Mic,
      title: lang === "en" ? t.feature2Title : t.feature2Title,
      description: lang === "en" ? t.feature2Desc : t.feature2Desc,
    },
    {
      icon: Sparkles,
      title: lang === "en" ? t.feature3Title : t.feature3Title,
      description: lang === "en" ? t.feature3Desc : t.feature3Desc,
    },
    {
      icon: Share2,
      title: lang === "en" ? t.feature4Title : t.feature4Title,
      description: lang === "en" ? t.feature4Desc : t.feature4Desc,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-white"
    >
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img
                src="./logo.svg"
                alt={`${t.brand} Logo`}
                width={40}
                height={40}
                className="rounded-lg cursor-pointer"
                onClick={() => navigate("/")}
              />
              <span className="text-2xl font-bold tracking-tight">{t.brand}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" className="text-gray-600">{t.shopAll}</Button>
              <Button variant="ghost" className="text-gray-600">{t.about}</Button>
              <Button variant="ghost" className="text-gray-600">{t.contact}</Button>

              <Button
                onClick={handleGetStarted}
                disabled={isLoading}
                className="bg-neutral-900 hover:bg-neutral-800 text-white"
              >
                {isAuthenticated ? t.dashboard : t.start}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              {/* Language Toggle */}
              <Button
                variant="outline"
                className="ml-1"
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
      </nav>

      {/* Split Hero (inspired by reference) */}
      <section className="border-b">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left panel */}
          <div className="bg-[#eef3ef] flex items-center">
            <div className="w-full max-w-2xl mx-auto px-6 py-16 md:py-24">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
                  {t.heroTitleLine1}
                  <br />
                  {t.heroTitleLine2}
                </h1>
                <p className="text-lg text-neutral-700">
                  <span className="font-semibold">{t.heroSubTitleStrong}</span>
                  {t.heroSubTitle}
                </p>
                <p className="text-neutral-600">
                  {t.heroBody}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    className="border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white"
                    onClick={handleGetStarted}
                  >
                    {t.heroCTASecondary}
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-neutral-700"
                  >
                    {t.heroCTA}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right image panel */}
          <div className="relative h-[420px] md:h-[560px] lg:h-full">
            <img
              src="https://harmless-tapir-303.convex.cloud/api/storage/fbc2ec23-b1d5-4bd9-8da8-faea686344e5"
              alt="Artisan pottery in progress"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t.howItWorks}
            </h2>
            <p className="text-lg text-gray-600">
              {t.howItWorksSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                viewport={{ once: true }}
              >
                <Card className="text-left p-6 h-full border-0 bg-gradient-to-br from-gray-50 to-white">
                  <CardContent className="pt-4">
                    <div className="w-12 h-12 bg-neutral-900/90 rounded-full flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              {t.trustedBy}
            </h2>
            <p className="text-lg opacity-90 mb-10">
              {t.trustedBody}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-1">{t.stat1}</div>
                <div className="opacity-90">{t.stat1Label}</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-1">{t.stat2}</div>
                <div className="opacity-90">{t.stat2Label}</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-1">{t.stat3}</div>
                <div className="opacity-90">{t.stat3Label}</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[#f7f7f5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.ctaTitle}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t.ctaSub}
            </p>
            <Button
              size="lg"
              onClick={handleGetStarted}
              disabled={isLoading}
              className="bg-neutral-900 hover:bg-neutral-800 text-white text-lg px-10 py-4"
            >
              <Upload className="mr-2 h-5 w-5" />
              {t.ctaBtn}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img
                src="./logo.svg"
                alt={`${t.brand} Logo`}
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-gray-900">{t.brand}</span>
            </div>
            <div className="flex items-center space-x-6 text-gray-600">
              <a href="#" className="hover:text-neutral-900 transition-colors">
                {t.footerPrivacy}
              </a>
              <a href="#" className="hover:text-neutral-900 transition-colors">
                {t.footerTerms}
              </a>
              <a href="#" className="hover:text-neutral-900 transition-colors">
                {t.footerContact}
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-500">
            <p>© 2024 {t.brand}. All rights reserved.</p>
            <p className="mt-2 text-sm">
              {t.poweredBy}{" "}
              <a
                href="https://vly.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 underline underline-offset-4 hover:opacity-80"
              >
                vly.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}