/**
 * Client-side (Vite) environment variables. Configure these in the API Keys tab
 * as VITE_* vars. These are safe for the browser and are read via import.meta.env.
 *
 * Example usage in React:
 *   import { VITE_LOOKER_DASHBOARD_URL } from "@/lib/env";
 *   <iframe src={VITE_LOOKER_DASHBOARD_URL} ... />
 */

// Looker dashboard public/embed URL for the AI analytics view
export const VITE_LOOKER_DASHBOARD_URL =
  (import.meta.env.VITE_LOOKER_DASHBOARD_URL as string | undefined) || undefined;

// Optional: Public read-only endpoint your backend exposes for trending insights, etc.
export const VITE_PUBLIC_INSIGHTS_API_URL =
  (import.meta.env.VITE_PUBLIC_INSIGHTS_API_URL as string | undefined) || undefined;
