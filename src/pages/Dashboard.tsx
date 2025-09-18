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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  Sun, 
  Moon, 
  MoreVertical, 
  Eye, 
  Heart, 
  Share2, 
  Edit, 
  Trash2, 
  Search,
  BarChart3,
  LayoutDashboard,
  Images,
  Settings,
  LogOut
} from "lucide-react";

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

  // Theme toggle (dark/light) persisted
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  // Search + Sort state
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "mostViewed">("newest");

  // Derive filtered/sorted crafts for display (UI-only sort/filter)
  const derivedCrafts = (crafts || [])
    .filter((c) =>
      c.artisanName.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest") return b._creationTime - a._creationTime;
      if (sortBy === "oldest") return a._creationTime - b._creationTime;
      // Demo "views" ordering: use hash from id string length as pseudo views
      const vA = String(a._id).length * 23;
      const vB = String(b._id).length * 23;
      return vB - vA;
    });

  // Demo stat helpers (UI-only)
  const totalCrafts = derivedCrafts.length;
  const totalViews = derivedCrafts.reduce((acc, c) => acc + String(c._id).length * 23, 0);
  const engagementRate = totalCrafts > 0 ? Math.min(100, Math.round((totalViews / (totalCrafts * 500)) * 100)) : 0;

  // Share helper
  const handleShareCraft = async (id: string) => {
    const url = `${window.location.origin}/craft/${id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "KalaConnect", text: "Check out this craft", url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success(lang === "en" ? "Link copied!" : "लिंक कॉपी हो गया!");
      }
    } catch {
      // ignore
    }
  };

  // Dummy handlers
  const handleEdit = () => toast.info(lang === "en" ? "Edit coming soon" : "एडिट जल्द ही");
  const handleDelete = () => toast.info(lang === "en" ? "Delete coming soon" : "डिलीट जल्द ही");

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
      {/* Header - Upgraded Navbar */}
      <div className="bg-white dark:bg-neutral-900 border-b dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                {t.hello}, {user.name || t.genericUser}
              </h1>
              <span className="hidden md:inline text-gray-600 dark:text-gray-300">{t.subtitle}</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Home */}
              <Button variant="outline" onClick={() => navigate("/")} className="hidden sm:inline-flex">
                Home
              </Button>

              {/* Language Select */}
              <Select
                value={lang}
                onValueChange={(v: "en" | "hi") => setLang(v)}
              >
                <SelectTrigger className="w-[90px]">
                  <SelectValue placeholder={t.langToggle} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                </SelectContent>
              </Select>

              {/* Theme toggle */}
              <Button
                variant="outline"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              {/* Notifications */}
              <Button variant="outline" aria-label="Notifications" title="Notifications">
                <Bell className="h-4 w-4" />
              </Button>

              {/* Profile Avatar */}
              <Avatar className="h-9 w-9">
                <AvatarFallback>
                  {(user.name || "A").slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Add New */}
              <Button onClick={() => navigate("/upload")} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                {t.addNew}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Left Sidebar (hidden on small screens) */}
      <div className="max-w-7xl mx-auto">
        <div className="md:grid md:grid-cols-[220px_1fr]">
          <aside className="hidden md:block border-r dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <nav className="p-4 space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Images className="h-4 w-4 mr-2" />
                My Crafts
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Separator className="my-2" />
              <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </nav>
          </aside>

          {/* Main column starts */}
          <div>

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
            <div className="px-4 sm:px-6 lg:px-8 py-6">
              {/* Analytics Widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600 dark:text-gray-300">Total Crafts</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalCrafts}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600 dark:text-gray-300">Total Views</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalViews}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600 dark:text-gray-300">Engagement Rate</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{engagementRate}%</div>
                  </CardContent>
                </Card>
              </div>

              {/* Search + Sort + Seed Demo */}
              <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-6">
                <div className="flex-1 flex items-center gap-2">
                  <div className="relative w-full md:w-80">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={lang === "en" ? "Search crafts..." : "शिल्प खोजें..."}
                      className="pl-9"
                    />
                  </div>
                  <Select value={sortBy} onValueChange={(v: "newest" | "oldest" | "mostViewed") => setSortBy(v)}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="mostViewed">Most Viewed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" onClick={handleSeedDemo}>
                  <Plus className="h-4 w-4 mr-2" />
                  {lang === "en" ? "Add Demo Crafts" : "डेमो शिल्प जोड़ें"}
                </Button>
              </div>

              {/* Crafts List */}
              {!derivedCrafts || derivedCrafts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-14"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/10079/10079028.png"
                    alt="Empty illustration"
                    className="h-24 w-24 mx-auto mb-4 opacity-80"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {t.emptyTitle}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {t.emptyBody}
                  </p>
                  <Button
                    onClick={() => navigate("/upload")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {lang === "en" ? "Create Your First Craft" : "अपना पहला शिल्प बनाएं"}
                  </Button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {derivedCrafts.map((craft, index) => {
                    // Demo stats & tags
                    const views = String(craft._id).length * 23;
                    const likes = Math.max(1, Math.round(views * 0.2));
                    const clicks = Math.max(1, Math.round(views * 0.1));
                    const tags = index % 2 === 0 ? ["Art", "Ceramics"] : ["Handmade", "Local"];

                    return (
                      <motion.div
                        key={craft._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-200">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg text-gray-900 dark:text-white">
                                {craft.artisanName}
                              </CardTitle>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant={craft.status === "completed" ? "default" : craft.status === "failed" ? "destructive" : "secondary"}
                                  className={craft.status === "completed" ? "bg-green-600" : ""}
                                >
                                  {getStatusText(craft.status)}
                                </Badge>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button size="icon" variant="ghost">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => navigate(`/craft/${craft._id}`)}>
                                      <Eye className="h-4 w-4 mr-2" /> View
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleEdit}>
                                      <Edit className="h-4 w-4 mr-2" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleShareCraft(String(craft._id))}>
                                      <Share2 className="h-4 w-4 mr-2" /> Share
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-700">
                                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
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
                                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                                />
                              </div>
                            )}

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {tags.map((tag) => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                              ))}
                            </div>

                            {/* Small Stats */}
                            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-4">
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" /> {views}
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4" /> {likes}
                              </div>
                              <div className="flex items-center gap-1">
                                <BarChart3 className="h-4 w-4" /> {clicks}
                              </div>
                            </div>

                            {/* Hover Quick Actions */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
                                <Button variant="outline" onClick={() => handleShareCraft(String(craft._id))}>
                                  <Share2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Floating Action Button */}
            <Button
              onClick={() => navigate("/upload")}
              className="fixed bottom-6 right-6 rounded-full h-12 w-12 p-0 bg-blue-600 hover:bg-blue-700 shadow-lg"
              aria-label="Create new craft"
              title="Create new craft"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}