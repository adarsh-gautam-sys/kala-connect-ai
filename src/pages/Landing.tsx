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
import { useLocation } from "react-router";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  Bell,
  ShoppingCart,
  ChevronDown,
  User as UserIcon,
  Settings as SettingsIcon,
  LogOut as LogOutIcon,
} from "lucide-react";
import { Navbar } from "./landing/Navbar";
import { Hero } from "./landing/Hero";
import FeaturedCraftsCarousel from "@/components/FeaturedCraftsCarousel";
import { ValueProps } from "./landing/ValueProps";
import { BrandStory } from "./landing/BrandStory";
import { HowItWorks } from "./landing/HowItWorks";
import { Stats } from "./landing/Stats";
import { CtaSection } from "./landing/CtaSection";
import { Footer } from "./landing/Footer";

export default function Landing() {
  const { isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

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

  // Add: Smooth scroll to Shop section
  const scrollToShop = () => {
    const el = document.getElementById("shop");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-white"
    >
      {/* Navbar */}
      <Navbar
        brand={t.brand}
        pathname={pathname}
        isAuthenticated={isAuthenticated}
        onNavigate={navigate}
        lang={lang}
        setLang={setLang}
        t={t as unknown as Record<string, string>}
      />

      {/* Hero */}
      <Hero onShopNow={scrollToShop} onGetStarted={handleGetStarted} />

      {/* Featured */}
      <FeaturedCraftsCarousel />

      {/* Value Props */}
      <ValueProps />

      {/* Brand Story */}
      <BrandStory />

      {/* How It Works */}
      <HowItWorks
        features={features as unknown as Array<{ icon: any; title: string; description: string }>}
        title={t.howItWorks}
        subtitle={t.howItWorksSub}
      />

      {/* Stats */}
      <Stats t={t as unknown as Record<string, string>} />

      {/* CTA */}
      <CtaSection t={t as unknown as Record<string, string>} isLoading={isLoading} onGetStarted={handleGetStarted} />

      {/* Footer */}
      <Footer t={t as unknown as Record<string, string>} />
    </motion.div>
  );
}