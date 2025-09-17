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
};
