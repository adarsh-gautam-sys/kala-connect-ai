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

  // Add: Demo products for the shop section (for demonstration purposes)
  const demoProducts = [
    {
      id: "d1",
      title: "Terracotta Vase",
      price: "₹1,499",
      image:
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800&auto=format&fit=crop",
      blurb: "Handcrafted terracotta vase with natural glaze.",
    },
    {
      id: "d2",
      title: "Earthy Clay Cup Set",
      price: "₹899",
      image:
        "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=800&auto=format&fit=crop",
      blurb: "Set of 2 cups — perfect for chai or coffee.",
    },
    {
      id: "d3",
      title: "Wheel-thrown Bowl",
      price: "₹1,199",
      image:
        "https://images.unsplash.com/photo-1523419409543-05aece9b77be?q=80&w=800&auto=format&fit=crop",
      blurb: "Minimal bowl with a warm, matte finish.",
    },
    {
      id: "d4",
      title: "Clay Planter",
      price: "₹1,299",
      image:
        "https://images.unsplash.com/photo-1616499615995-11b8199e80a6?q=80&w=800&auto=format&fit=crop",
      blurb: "Breathable clay pot for indoor greens.",
    },
    {
      id: "d5",
      title: "Serving Plate",
      price: "₹1,099",
      image:
        "https://images.unsplash.com/photo-1508161250369-0c3b3e8a04a5?q=80&w=800&auto=format&fit=crop",
      blurb: "Elegant plate with subtle rim detail.",
    },
    {
      id: "d6",
      title: "Decorative Jar",
      price: "₹1,799",
      image:
        "https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=800&auto=format&fit=crop",
      blurb: "Statement piece for living spaces.",
    },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-white"
    >
      {/* Navigation - Redesigned */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            {/* Left: Logo + Mobile menu */}
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>{t.brand}</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {/* Mobile: Shop */}
                    <div>
                      <div className="text-xs uppercase text-gray-500 mb-2">Shop</div>
                      <div className="grid gap-2">
                        <Button variant="ghost" className="justify-start" onClick={() => navigate("/")}>
                          Shop All
                        </Button>
                        <Button variant="ghost" className="justify-start">Categories</Button>
                      </div>
                    </div>
                    {/* Mobile: For Artisans */}
                    <div>
                      <div className="text-xs uppercase text-gray-500 mb-2">For Artisans</div>
                      <div className="grid gap-2">
                        <Button variant="ghost" className="justify-start">Join as Artisan</Button>
                        <Button variant="ghost" className="justify-start">Pricing</Button>
                        <Button variant="ghost" className="justify-start" onClick={() => navigate("/dashboard")}>
                          Dashboard
                        </Button>
                      </div>
                    </div>
                    {/* Mobile: Stories */}
                    <div>
                      <div className="text-xs uppercase text-gray-500 mb-2">Stories</div>
                      <div className="grid gap-2">
                        <Button variant="ghost" className="justify-start">Featured Artists</Button>
                        <Button variant="ghost" className="justify-start">Blogs</Button>
                      </div>
                    </div>
                    {/* Mobile: About */}
                    <div>
                      <div className="text-xs uppercase text-gray-500 mb-2">About</div>
                      <div className="grid gap-2">
                        <Button variant="ghost" className="justify-start">About Us</Button>
                        <Button variant="ghost" className="justify-start">Mission</Button>
                        <Button variant="ghost" className="justify-start">Team</Button>
                      </div>
                    </div>
                    {/* Mobile: Contact */}
                    <div>
                      <div className="text-xs uppercase text-gray-500 mb-2">Contact</div>
                      <div className="grid gap-2">
                        <Button variant="ghost" className="justify-start">Contact Form</Button>
                        <Button variant="ghost" className="justify-start">FAQs</Button>
                      </div>
                    </div>

                    {/* Mobile: Language */}
                    <div>
                      <div className="text-xs uppercase text-gray-500 mb-2">Language</div>
                      <div className="grid gap-2">
                        <Button
                          variant={lang === "en" ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setLang("en")}
                        >
                          English
                        </Button>
                        <Button
                          variant={lang === "hi" ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setLang("hi")}
                        >
                          हिंदी
                        </Button>
                      </div>
                    </div>

                    {/* Mobile: Auth */}
                    <div className="pt-2 border-t">
                      {isAuthenticated ? (
                        <div className="grid gap-2">
                          <Button className="justify-start" onClick={() => navigate("/dashboard")}>
                            Dashboard
                          </Button>
                          <Button variant="outline" className="justify-start">
                            Profile
                          </Button>
                          <Button variant="outline" className="justify-start">
                            Settings
                          </Button>
                          <Button variant="destructive" className="justify-start" onClick={() => navigate("/auth")}>
                            Logout
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button onClick={() => navigate("/auth")} className="flex-1">
                            Sign In
                          </Button>
                          <Button variant="outline" onClick={() => navigate("/auth")} className="flex-1">
                            Sign Up
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <img
                src="./logo.svg"
                alt={`${t.brand} Logo`}
                width={40}
                height={40}
                className="rounded-lg cursor-pointer"
                onClick={() => navigate("/")}
              />
              <span
                className="text-2xl font-bold tracking-tight cursor-pointer hidden sm:inline"
                onClick={() => navigate("/")}
              >
                {t.brand}
              </span>
            </div>

            {/* Center: Desktop nav with dropdowns */}
            <div className="hidden md:flex items-center gap-2 lg:gap-4">
              {/* Shop */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`group ${pathname.startsWith("/shop") ? "text-neutral-900 bg-neutral-100" : "text-gray-700"} hover:text-neutral-900`}
                  >
                    Shop
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => navigate("/")}>Shop All</DropdownMenuItem>
                  <DropdownMenuItem>Categories</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* For Artisans */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`group ${pathname.startsWith("/dashboard") ? "text-neutral-900 bg-neutral-100" : "text-gray-700"} hover:text-neutral-900`}
                  >
                    For Artisans
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>Join as Artisan</DropdownMenuItem>
                  <DropdownMenuItem>Pricing</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>Dashboard</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Stories */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="group text-gray-700 hover:text-neutral-900">
                    Stories
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>Featured Artists</DropdownMenuItem>
                  <DropdownMenuItem>Blogs</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* About */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="group text-gray-700 hover:text-neutral-900">
                    About
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>About Us</DropdownMenuItem>
                  <DropdownMenuItem>Mission</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Contact */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="group text-gray-700 hover:text-neutral-900">
                    Contact
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>Contact Form</DropdownMenuItem>
                  <DropdownMenuItem>FAQs</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Right: Icons, language, auth */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Shopping Cart */}
              <Button variant="ghost" size="icon" aria-label="Cart" title="Cart">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              {/* Notifications */}
              <Button variant="ghost" size="icon" aria-label="Notifications" title="Notifications">
                <Bell className="h-5 w-5" />
              </Button>

              {/* Language selector dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="hidden sm:inline-flex">
                    <Globe className="h-4 w-4 mr-2" />
                    {t.langToggle}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Language</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setLang("en")}>English</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLang("hi")}>हिंदी</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Auth conditional */}
              {isAuthenticated ? (
                <div className="flex items-center gap-1 sm:gap-2">
                  <Button
                    onClick={() => navigate("/dashboard")}
                    className="hidden sm:inline-flex bg-neutral-900 hover:bg-neutral-800 text-white"
                  >
                    Dashboard
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="p-0 h-9 w-9 rounded-full">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-neutral-200 text-neutral-700">
                            KC
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <UserIcon className="mr-2 h-4 w-4" /> Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <SettingsIcon className="mr-2 h-4 w-4" /> Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate("/auth")} className="text-red-600">
                        <LogOutIcon className="mr-2 h-4 w-4" /> Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Button variant="ghost" onClick={() => navigate("/auth")}>
                    Sign In
                  </Button>
                  <Button className="bg-neutral-900 hover:bg-neutral-800 text-white" onClick={() => navigate("/auth")}>
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Split Hero (updated styling) */}
      <section className="border-b">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left panel with subtle gradient */}
          <div
            className="flex items-center"
            style={{
              background:
                "radial-gradient(1200px 600px at -10% 20%, rgba(230, 212, 192, 0.6), transparent 60%), linear-gradient(180deg, #f7f3ee 0%, #efe7de 100%)",
            }}
          >
            <div className="w-full max-w-2xl mx-auto px-6 py-16 md:py-24">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
                  The Beauty of Handcrafted Ceramics
                </h1>
                <p className="text-lg text-neutral-700">
                  <span className="font-semibold">Embrace the Art of Clay — Where</span>
                  {" "}Tradition Meets Creativity
                </p>
                <p className="text-neutral-600">
                  Build a professional product page with just a photo and a voice note — powered by AI.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Primary (filled): Shop Now */}
                  <Button
                    className="bg-[#a4553b] hover:bg-[#8f4731] text-white transition-colors"
                    onClick={scrollToShop}
                  >
                    Shop Now
                  </Button>
                  {/* Secondary (outlined): Get Started */}
                  <Button
                    variant="outline"
                    className="border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
                    onClick={handleGetStarted}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right image panel (unchanged image) */}
          <div className="relative h-[420px] md:h-[560px] lg:h-full">
            <img
              src="https://harmless-tapir-303.convex.cloud/api/storage/d8a1de6d-57da-44b9-a928-9e6322def17a"
              alt="Artisan pottery in progress"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Crafts (Shop) */}
      <section id="shop" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {lang === "en" ? "Featured Crafts" : "विशेष शिल्प"}
            </h2>
            <p className="text-lg text-gray-600">
              {lang === "en"
                ? "A glimpse of how artisan products will look in your storefront"
                : "आपके स्टोरफ्रंट में उत्पाद ऐसे दिखाई देंगे"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoProducts.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">{item.blurb}</p>
                      </div>
                      <div className="text-right font-semibold text-gray-900">
                        {item.price}
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button
                        className="w-full bg-neutral-900 hover:bg-neutral-800 text-white"
                        onClick={handleGetStarted}
                      >
                        {lang === "en" ? "View Details" : "विवरण देखें"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition: 3-column icons */}
      <section className="py-14 md:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-xl bg-gradient-to-br from-[#faf6f2] to-white">
              <div className="w-11 h-11 rounded-full bg-[#a4553b] text-white flex items-center justify-center mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                AI-Powered Storytelling
              </h3>
              <p className="text-gray-600 text-sm">
                Turn voice notes into compelling product stories and captions.
              </p>
            </div>

            <div className="p-6 border rounded-xl bg-gradient-to-br from-[#faf6f2] to-white">
              <div className="w-11 h-11 rounded-full bg-[#8f4731] text-white flex items-center justify-center mb-4">
                <Upload className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Instant Digital Storefront
              </h3>
              <p className="text-gray-600 text-sm">
                Create a polished page for your craft in minutes.
              </p>
            </div>

            <div className="p-6 border rounded-xl bg-gradient-to-br from-[#faf6f2] to-white">
              <div className="w-11 h-11 rounded-full bg-[#73402b] text-white flex items-center justify-center mb-4">
                <Globe className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Global Reach for Local Crafts
              </h3>
              <p className="text-gray-600 text-sm">
                Share with buyers worldwide and grow your audience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 md:py-20 bg-[#f7f3ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Story
              </h2>
              <p className="text-lg text-gray-700">
                KalaConnect empowers artisans with AI tools to showcase their craft, tell their stories, and reach global buyers.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <img
                src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=600&auto=format&fit=crop"
                alt="Artisan at work 1"
                className="h-32 w-full object-cover rounded-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1523419409543-05aece9b77be?q=80&w=600&auto=format&fit=crop"
                alt="Artisan ceramics 2"
                className="h-32 w-full object-cover rounded-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=600&auto=format&fit=crop"
                alt="Clay shaping 3"
                className="h-32 w-full object-cover rounded-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1508161250369-0c3b3e8a04a5?q=80&w=600&auto=format&fit=crop"
                alt="Pottery wheel 4"
                className="h-32 w-full object-cover rounded-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=600&auto=format&fit=crop"
                alt="Handcrafted bowl 5"
                className="h-32 w-full object-cover rounded-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1616499615995-11b8199e80a6?q=80&w=600&auto=format&fit=crop"
                alt="Fired ceramics 6"
                className="h-32 w-full object-cover rounded-lg"
              />
            </div>
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
          </div>
        </div>
      </footer>
    </motion.div>
  );
}