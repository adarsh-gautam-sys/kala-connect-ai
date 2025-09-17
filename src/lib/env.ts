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

// Optional: Firebase public storage bucket name (only if you plan to read public files from client)
export const VITE_FIREBASE_STORAGE_BUCKET =
  (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined) || undefined;

// Optional: Dialogflow CX Agent ID for client-side routing to your bot (if embedding)
export const VITE_DIALOGFLOW_CX_AGENT_ID =
  (import.meta.env.VITE_DIALOGFLOW_CX_AGENT_ID as string | undefined) || undefined;