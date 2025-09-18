"use node";

import { action } from "./_generated/server";

// Minimal BigQuery demo exporter.
// It inserts a single demo row into dataset.table so you can verify wiring.
// Configure via API Keys tab:
// - GOOGLE_APPLICATION_CREDENTIALS_JSON (full service account JSON)
// - GOOGLE_CLOUD_PROJECT_ID
// - BIGQUERY_DATASET (e.g., "analytics")
// - BIGQUERY_TABLE (e.g., "events")
export const exportDemo = action({
  args: {},
  handler: async () => {
    const {
      GOOGLE_APPLICATION_CREDENTIALS_JSON,
      GOOGLE_CLOUD_PROJECT_ID,
      BIGQUERY_DATASET,
      BIGQUERY_TABLE,
    } = process.env as Record<string, string | undefined>;

    if (!GOOGLE_APPLICATION_CREDENTIALS_JSON) {
      throw new Error("Missing GOOGLE_APPLICATION_CREDENTIALS_JSON");
    }
    if (!GOOGLE_CLOUD_PROJECT_ID) {
      throw new Error("Missing GOOGLE_CLOUD_PROJECT_ID");
    }

    const { BigQuery } = await import("@google-cloud/bigquery");

    let credentials: Record<string, unknown>;
    try {
      credentials = JSON.parse(GOOGLE_APPLICATION_CREDENTIALS_JSON);
    } catch {
      throw new Error("GOOGLE_APPLICATION_CREDENTIALS_JSON is not valid JSON");
    }

    const bigquery = new BigQuery({
      projectId: GOOGLE_CLOUD_PROJECT_ID,
      credentials,
    });

    const dataset = BIGQUERY_DATASET || "analytics";
    const table = BIGQUERY_TABLE || "events";

    const rows = [
      {
        event_type: "demo_event",
        source: "setup_check",
        timestamp: new Date().toISOString(),
      },
    ];

    await bigquery.dataset(dataset).table(table).insert(rows);

    return { ok: true, inserted: rows.length, dataset, table };
  },
});
