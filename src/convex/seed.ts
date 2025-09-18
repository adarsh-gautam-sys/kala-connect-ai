"use node";

import { action } from "./_generated/server";
import { api } from "./_generated/api";

// Seeding demo crafts for the current user:
// - Downloads a few public images
// - Stores them in Convex storage
// - Creates craft records with a tiny placeholder audio
export const demo = action({
  args: {},
  handler: async (ctx) => {
    // Small placeholder audio (1 byte)
    const audioBlob = new Blob([new Uint8Array([0])], { type: "audio/webm" });
    const audioId = await ctx.storage.store(audioBlob);

    const imageUrls: Array<string> = [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523419409543-05aece9b77be?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=800&auto=format&fit=crop",
    ];

    for (const [i, url] of imageUrls.entries()) {
      const res = await fetch(url);
      const buf = await res.arrayBuffer();
      const photoBlob = new Blob([buf], { type: "image/jpeg" });
      const photoId = await ctx.storage.store(photoBlob);

      await ctx.runMutation(api.crafts.create, {
        artisanName: `Demo Artisan ${i + 1}`,
        craftPhoto: photoId,
        voiceNote: audioId,
        whatsappNumber: "+91 9000000000",
      });
    }

    return { ok: true, count: imageUrls.length };
  },
});
