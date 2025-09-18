import { Toaster } from "@/components/ui/sonner";
import { VlyToolbar } from "../vly-toolbar-readonly.tsx";
import { InstrumentationProvider } from "@/instrumentation.tsx";
import AuthPage from "@/pages/Auth.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import Upload from "@/pages/Upload.tsx";
import CraftPage from "@/pages/CraftPage.tsx";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import "./index.css";
import Landing from "./pages/Landing.tsx";
import NotFound from "./pages/NotFound.tsx";
import ShopPage from "@/pages/Shop.tsx";
import Stories from "@/pages/Stories.tsx";
import About from "@/pages/About.tsx";
import Team from "@/pages/Team.tsx";
import Contact from "@/pages/Contact.tsx";
import Artisans from "@/pages/Artisans.tsx";
import "./types/global.d.ts";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);



function RouteSyncer() {
  const location = useLocation();
  // Only run sync logic in production to avoid dev HMR DOM conflicts
  const isProd = import.meta.env.PROD;

  useEffect(() => {
    if (!isProd) return;
    // Defer posting route changes to parent to avoid running during commit
    const id = setTimeout(() => {
      window.parent.postMessage(
        { type: "iframe-route-change", path: location.pathname },
        "*",
      );
    }, 0);
    return () => clearTimeout(id);
  }, [location.pathname, isProd]);

  useEffect(() => {
    if (!isProd) return;
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "navigate") {
        // Defer navigation to next tick to avoid interfering with React commits
        setTimeout(() => {
          if (event.data.direction === "back") window.history.back();
          if (event.data.direction === "forward") window.history.forward();
        }, 0);
      }
    }
    window.addEventListener("message", handleMessage, { passive: true });
    return () => window.removeEventListener("message", handleMessage);
  }, [isProd]);

  return null;
}


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VlyToolbar />
    <InstrumentationProvider>
      <ConvexAuthProvider client={convex}>
        <BrowserRouter>
          <RouteSyncer />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<AuthPage redirectAfterAuth="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/craft/:id" element={<CraftPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/artisans" element={<Artisans />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </ConvexAuthProvider>
    </InstrumentationProvider>
  </StrictMode>,
);