import { Button } from "@/components/ui/button";
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
  ChevronDown,
  User as UserIcon,
  Settings as SettingsIcon,
  LogOut as LogOutIcon,
  Globe,
  ShoppingCart,
  Heart,
  Sun,
  Moon,
} from "lucide-react";
import React, { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";

type Props = {
  brand: string;
  pathname: string;
  isAuthenticated: boolean;
  onNavigate: (to: string) => void;
  lang: "en" | "hi";
  setLang: (l: "en" | "hi") => void;
  t: Record<string, string>;
};

function NavbarImpl({
  brand,
  pathname,
  isAuthenticated,
  onNavigate,
  lang,
  setLang,
  t,
}: Props) {
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Fallback: ensure we're on home, then attempt after a tick
      onNavigate("/");
      setTimeout(() => {
        const el2 = document.getElementById(id);
        if (el2) el2.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  const joinAsArtisan = () => {
    if (isAuthenticated) onNavigate("/upload");
    else onNavigate("/auth");
  };

  const { items, count, total, remove, clear, updateQty } = useCart();
  const [cartOpen, setCartOpen] = React.useState(false);

  // Add theme toggle (persisted)
  const [theme, setTheme] = React.useState<"light" | "dark">(() => {
    try {
      const saved = localStorage.getItem("theme");
      return saved === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });
  React.useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
      const root = document.documentElement;
      if (theme === "dark") root.classList.add("dark");
      else root.classList.remove("dark");
    } catch {
      // no-op
    }
  }, [theme]);

  // Add: auth actions for real sign-out
  const { signOut } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
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
                  <div>
                    <div className="text-xs uppercase text-gray-500 mb-2">Shop</div>
                    <div className="grid gap-2">
                      <Button variant="ghost" className="justify-start" onClick={() => onNavigate("/shop")}>
                        {t.shopAll}
                      </Button>
                      <Button variant="ghost" className="justify-start" onClick={() => onNavigate("/shop?category=Ceramics")}>Categories</Button>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase text-gray-500 mb-2">For Artisans</div>
                    <div className="grid gap-2">
                      <Button variant="ghost" className="justify-start" onClick={() => scrollToId("how-it-works")}>How It Works</Button>
                      <Button variant="ghost" className="justify-start" onClick={joinAsArtisan}>Join as Artisan</Button>
                      <Button variant="ghost" className="justify-start" onClick={() => onNavigate("/artisans")}>Pricing & Benefits</Button>
                      <Button variant="ghost" className="justify-start" onClick={() => onNavigate("/stories")}>Success Stories</Button>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase text-gray-500 mb-2">Stories</div>
                    <div className="grid gap-2">
                      <Button variant="ghost" className="justify-start" onClick={() => onNavigate("/stories")}>Featured Artists</Button>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase text-gray-500 mb-2">About</div>
                    <div className="grid gap-2">
                      <Button variant="ghost" className="justify-start" onClick={() => onNavigate("/about")}>{t.about}</Button>
                      <Button variant="ghost" className="justify-start" onClick={() => onNavigate("/team")}>Team</Button>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase text-gray-500 mb-2">Contact</div>
                    <div className="grid gap-2">
                      <Button variant="ghost" className="justify-start" onClick={() => onNavigate("/contact")}>{t.contact}</Button>
                    </div>
                  </div>

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

                  <div className="pt-2 border-t">
                    {isAuthenticated ? (
                      <div className="grid gap-2">
                        <Button className="justify-start" onClick={() => onNavigate("/dashboard")}>
                          Dashboard
                        </Button>
                        <Button variant="outline" className="justify-start">
                          Profile
                        </Button>
                        <Button variant="outline" className="justify-start">
                          Settings
                        </Button>
                        {/* Change: real sign out on mobile drawer */}
                        <Button
                          variant="destructive"
                          className="justify-start"
                          onClick={async () => {
                            try {
                              await signOut();
                              onNavigate("/");
                            } catch (e) {
                              console.error("Sign out failed", e);
                            }
                          }}
                        >
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button onClick={() => onNavigate("/auth")} className="flex-1">
                          Sign In
                        </Button>
                        <Button variant="outline" onClick={() => onNavigate("/auth")} className="flex-1">
                          Sign Up
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <img
              src="https://harmless-tapir-303.convex.cloud/api/storage/7ee63668-6e97-4a67-8eac-1ace3a277f56"
              alt={`${t.brand} Logo`}
              className="h-9 w-9 sm:h-10 sm:w-10 object-contain cursor-pointer"
              onClick={() => onNavigate("/")}
            />
            <span
              className="text-2xl font-bold tracking-tight cursor-pointer hidden sm:inline"
              onClick={() => onNavigate("/")}
            >
              {t.brand}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <Button
              variant="ghost"
              className={`${pathname.startsWith("/dashboard") ? "text-neutral-900 bg-neutral-100" : "text-gray-700"} hover:text-neutral-900`}
              onClick={() => scrollToId("how-it-works")}
            >
              For Artisans
            </Button>
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-neutral-900"
              onClick={() => onNavigate("/stories")}
            >
              Stories
            </Button>
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-neutral-900"
              onClick={() => onNavigate("/about")}
            >
              {t.about}
            </Button>
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-neutral-900"
              onClick={() => onNavigate("/contact")}
            >
              {t.contact}
            </Button>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="outline"
              className="hidden sm:inline-flex"
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              aria-label="Toggle language"
              title="Toggle language"
            >
              <Globe className="h-4 w-4 mr-2" />
              {lang === "en" ? "EN" : "HI"}
            </Button>

            <Button
              onClick={() => onNavigate("/shop")}
              variant="ghost"
              className="hidden md:inline-flex"
            >
              {t.shopAll}
            </Button>

            <Button
              variant="outline"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative sm:hidden"
                  aria-label="Open cart"
                  title="Open cart"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {count > 0 ? (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-neutral-900 text-white text-[10px] flex items-center justify-center">
                      {count}
                    </span>
                  ) : null}
                </Button>
              </SheetTrigger>

              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="hidden sm:inline-flex items-center gap-2"
                  aria-label="Open cart"
                  title="Open cart"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {count > 0 ? <span className="ml-1 text-sm font-semibold">({count})</span> : null}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[380px] sm:w-[420px]">
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-3">
                  {items.length === 0 ? (
                    <div className="text-sm text-gray-600">Your cart is empty.</div>
                  ) : (
                    <>
                      <div className="space-y-3 max-h-[60vh] overflow-auto pr-1">
                        {items.map((it) => (
                          <Card key={it.id} className="overflow-hidden">
                            <CardContent className="p-3">
                              <div className="flex gap-3">
                                <img
                                  src={it.image}
                                  alt={it.title}
                                  className="h-16 w-16 rounded object-cover"
                                />
                                <div className="flex-1">
                                  <div className="font-semibold text-sm">{it.title}</div>
                                  <div className="text-xs text-gray-600">₹{it.price}</div>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Input
                                      type="number"
                                      min={1}
                                      value={it.quantity}
                                      onChange={(e) => updateQty(it.id, Number(e.target.value || 1))}
                                      className="h-8 w-16"
                                    />
                                    <Button size="sm" variant="ghost" onClick={() => remove(it.id)}>
                                      Remove
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <div className="pt-3 border-t">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm text-gray-700">Total</div>
                          <div className="font-semibold">₹{total}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white">
                            Checkout
                          </Button>
                          <Button variant="outline" onClick={clear}>
                            Clear
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {isAuthenticated ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  onClick={() => onNavigate("/dashboard")}
                  className="hidden sm:inline-flex bg-neutral-900 hover:bg-neutral-800 text-white"
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className="p-0 h-9 w-9 rounded-full"
                  onClick={() => onNavigate("/dashboard")}
                  aria-label="Profile"
                  title="Profile"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-neutral-200 text-neutral-700">
                      KC
                    </AvatarFallback>
                  </Avatar>
                </Button>
                <Button
                  variant="outline"
                  onClick={async () => {
                    try {
                      await signOut();
                      onNavigate("/");
                    } catch (e) {
                      console.error("Sign out failed", e);
                    }
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" onClick={() => onNavigate("/auth")}>
                  Sign In
                </Button>
                <Button
                  className="bg-neutral-900 hover:bg-neutral-800 text-white"
                  onClick={() => onNavigate("/auth")}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export const Navbar = memo(NavbarImpl);