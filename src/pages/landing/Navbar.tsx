import { Button } from "@/components/ui/button";
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
  Globe,
} from "lucide-react";
import { memo } from "react";

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
                      <Button variant="ghost" className="justify-start" onClick={() => onNavigate("/")}>
                        Shop All
                      </Button>
                      <Button variant="ghost" className="justify-start">Categories</Button>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase text-gray-500 mb-2">For Artisans</div>
                    <div className="grid gap-2">
                      <Button variant="ghost" className="justify-start">Join as Artisan</Button>
                      <Button variant="ghost" className="justify-start">Pricing</Button>
                      <Button variant="ghost" className="justify-start" onClick={() => onNavigate("/dashboard")}>
                        Dashboard
                      </Button>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase text-gray-500 mb-2">Stories</div>
                    <div className="grid gap-2">
                      <Button variant="ghost" className="justify-start">Featured Artists</Button>
                      <Button variant="ghost" className="justify-start">Blogs</Button>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase text-gray-500 mb-2">About</div>
                    <div className="grid gap-2">
                      <Button variant="ghost" className="justify-start">About Us</Button>
                      <Button variant="ghost" className="justify-start">Mission</Button>
                      <Button variant="ghost" className="justify-start">Team</Button>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase text-gray-500 mb-2">Contact</div>
                    <div className="grid gap-2">
                      <Button variant="ghost" className="justify-start">Contact Form</Button>
                      <Button variant="ghost" className="justify-start">FAQs</Button>
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
                        <Button variant="destructive" className="justify-start" onClick={() => onNavigate("/auth")}>
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
              src="./logo.svg"
              alt={`${t.brand} Logo`}
              width={40}
              height={40}
              className="rounded-lg cursor-pointer"
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
                <DropdownMenuItem onClick={() => onNavigate("/")}>Shop All</DropdownMenuItem>
                <DropdownMenuItem>Categories</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
                <DropdownMenuItem onClick={() => onNavigate("/dashboard")}>Dashboard</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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

          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" aria-label="Cart" title="Cart">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notifications" title="Notifications">
              <Bell className="h-5 w-5" />
            </Button>

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

            {isAuthenticated ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  onClick={() => onNavigate("/dashboard")}
                  className="hidden sm:inline-flex bg-neutral-900 hover:bg-neutral-800 text-white"
                >
                  Dashboard
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0 h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-neutral-200 text-neutral-700">KC</AvatarFallback>
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
                    <DropdownMenuItem onClick={() => onNavigate("/auth")} className="text-red-600">
                      <LogOutIcon className="mr-2 h-4 w-4" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" onClick={() => onNavigate("/auth")}>
                  Sign In
                </Button>
                <Button className="bg-neutral-900 hover:bg-neutral-800 text-white" onClick={() => onNavigate("/auth")}>
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
