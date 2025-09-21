"use node";

import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

// Seeding demo crafts for the current user:
// - Downloads a few public images
// - Stores them in Convex storage
// - Creates craft records with a tiny placeholder audio
export const demo = action({
  args: {},
  handler: async (ctx): Promise<{ ok: true; count: number; craftId: Id<"crafts"> }> => {
    // Small placeholder audio (1 byte)
    const audioBlob = new Blob([new Uint8Array([0])], { type: "audio/webm" });
    const audioId: Id<"_storage"> = await ctx.storage.store(audioBlob);

    // Curated single-craft samples: relevant images + names
    const samples: Array<{ artisanName: string; imageUrl: string; whatsapp?: string }> = [
      {
        artisanName: "Aarav Pottery Studio",
        imageUrl: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800&auto=format&fit=crop",
        whatsapp: "+91 9000000001",
      },
      {
        artisanName: "Meera Handloom Textiles",
        imageUrl: "https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=800&auto=format&fit=crop",
        whatsapp: "+91 9000000002",
      },
      {
        artisanName: "Raghav Woodcraft",
        imageUrl: "https://images.unsplash.com/photo-1523419409543-05aece9b77be?q=80&w=800&auto=format&fit=crop",
        whatsapp: "+91 9000000003",
      },
      {
        artisanName: "Nisha Terracotta",
        imageUrl: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=800&auto=format&fit=crop",
        whatsapp: "+91 9000000004",
      },
      {
        artisanName: "Zari & Weaves",
        imageUrl: "https://images.unsplash.com/photo-1534945773095-d45fd38f7b68?q=80&w=800&auto=format&fit=crop",
        whatsapp: "+91 9000000005",
      },
    ];

    // Pick one sample per call
    const pick = samples[Math.floor(Math.random() * samples.length)];

    // Download and store the image
    const res = await fetch(pick.imageUrl);
    const buf = await res.arrayBuffer();
    const photoBlob = new Blob([buf], { type: "image/jpeg" });
    const photoId: Id<"_storage"> = await ctx.storage.store(photoBlob);

    // Create a single craft
    const craftId: Id<"crafts"> = await ctx.runMutation(api.crafts.create, {
      artisanName: pick.artisanName,
      craftPhoto: photoId,
      voiceNote: audioId,
      whatsappNumber: pick.whatsapp ?? "+91 9000000000",
    });

    // Immediately run the AI pipeline so all features populate
    await ctx.runAction(api.aiProcessing.processArtisanMedia, { craftId });

    return { ok: true, count: 1, craftId };
  },
});