/**
 * Centralized Convex (server-side) environment variables for AI + Analytics.
 * Configure these in the Integrations/API Keys UI (Convex server env), NOT .env files.
 *
 * Use `requireEnv("KEY")` inside actions/mutations when a key must be present.
 *
 * Example usage in an action:
 *   const projectId = requireEnv("GOOGLE_CLOUD_PROJECT_ID");
 *   // Initialize Google clients with `projectId` and credentials below.
 */

export function requireEnv(name: keyof typeof ENV): string {
  const v = ENV[name];
  if (!v) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return v;
}

/**
 * Optional API-key style credentials (in addition to service account JSON) for Google APIs.
 * Prefer GOOGLE_APPLICATION_CREDENTIALS_JSON for server-side security; these are provided
 * for teams/projects that use API key based access control.
 */
export const ENV = {
  // Google Cloud project info (used by Speech-to-Text, Translation, Vertex AI, Vision)
  GOOGLE_CLOUD_PROJECT_ID: process.env.GOOGLE_CLOUD_PROJECT_ID,
  GOOGLE_CLOUD_LOCATION: process.env.GOOGLE_CLOUD_LOCATION, // e.g. "us-central1"

  /**
   * Service Account JSON (stringified) to auth Google APIs securely on the server.
   * Store the full JSON content as a single env var.
   * Example: JSON.stringify(serviceAccountObject)
   */
  GOOGLE_APPLICATION_CREDENTIALS_JSON:
    process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON,

  // BigQuery (for AI dashboard analytics)
  BIGQUERY_DATASET: process.env.BIGQUERY_DATASET, // e.g. "analytics"
  BIGQUERY_TABLE: process.env.BIGQUERY_TABLE,     // e.g. "events"

  // Looker Studio / Embed-related settings (if using secured embedding or proxying)
  LOOKER_EMBED_URL: process.env.LOOKER_EMBED_URL, // public dashboard URL or embed endpoint
  LOOKER_EMBED_SSO_SECRET: process.env.LOOKER_EMBED_SSO_SECRET, // optional if doing SSO embed signing

  // --- AI & NLP API Keys (optional; prefer service accounts on server) ---
  VERTEX_AI_API_KEY: process.env.VERTEX_AI_API_KEY,              // Generative AI (text/images)
  VISION_API_KEY: process.env.VISION_API_KEY,                    // Cloud Vision (enhance, bg removal)
  TRANSLATION_API_KEY: process.env.TRANSLATION_API_KEY,          // Cloud Translation
  SPEECH_TO_TEXT_API_KEY: process.env.SPEECH_TO_TEXT_API_KEY,    // Speech-to-Text
  TEXT_TO_SPEECH_API_KEY: process.env.TEXT_TO_SPEECH_API_KEY,    // Text-to-Speech (optional)
  DIALOGFLOW_CX_API_KEY: process.env.DIALOGFLOW_CX_API_KEY,      // Dialogflow CX (optional)

  // --- Firebase / Cloud Storage (optional for external hosting) ---
  FIREBASE_SERVICE_ACCOUNT_JSON: process.env.FIREBASE_SERVICE_ACCOUNT_JSON, // stringified SA JSON
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,            // e.g. myapp.appspot.com

  // --- BigQuery (optional if using API Key; prefer SA JSON) ---
  BIGQUERY_API_KEY: process.env.BIGQUERY_API_KEY, // Optional; SA JSON recommended

} as const;