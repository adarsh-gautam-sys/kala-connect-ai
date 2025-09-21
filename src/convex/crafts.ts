import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

// Create a new craft submission
export const create = mutation({
  args: {
    artisanName: v.string(),
    craftPhoto: v.id("_storage"),
    voiceNote: v.id("_storage"),
    whatsappNumber: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("User must be authenticated");
    }

    const craftId = await ctx.db.insert("crafts", {
      userId: user._id,
      artisanName: args.artisanName,
      craftPhoto: args.craftPhoto,
      voiceNote: args.voiceNote,
      whatsappNumber: args.whatsappNumber,
      status: "uploading",
    });

    return craftId;
  },
});

// Internal function for AI processing to get craft by ID
export const getById = query({
  args: { id: v.id("crafts") },
  handler: async (ctx, args) => {
    const craft = await ctx.db.get(args.id);
    if (!craft) return null;

    // Get file URLs
    const craftPhotoUrl = await ctx.storage.getUrl(craft.craftPhoto);
    const voiceNoteUrl = await ctx.storage.getUrl(craft.voiceNote);
    const enhancedPhotoUrl = craft.enhancedPhoto 
      ? await ctx.storage.getUrl(craft.enhancedPhoto)
      : null;

    return {
      ...craft,
      craftPhotoUrl,
      voiceNoteUrl,
      enhancedPhotoUrl,
    };
  },
});

// Get user's crafts
export const getUserCrafts = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];

    const crafts = await ctx.db
      .query("crafts")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();

    // Get file URLs for each craft
    const craftsWithUrls = await Promise.all(
      crafts.map(async (craft) => {
        const craftPhotoUrl = await ctx.storage.getUrl(craft.craftPhoto);
        const enhancedPhotoUrl = craft.enhancedPhoto 
          ? await ctx.storage.getUrl(craft.enhancedPhoto)
          : null;

        return {
          ...craft,
          craftPhotoUrl,
          enhancedPhotoUrl,
        };
      })
    );

    return craftsWithUrls;
  },
});

// Internal mutation for AI processing updates
export const updateWithAIResults = mutation({
  args: {
    id: v.id("crafts"),
    transcribedText: v.optional(v.string()),
    translatedText: v.optional(v.string()),
    productDescription: v.optional(v.string()),
    socialCaption: v.optional(v.string()),
    enhancedPhoto: v.optional(v.id("_storage")),
    language: v.optional(v.string()),
    targetLanguage: v.optional(v.string()),
    status: v.union(v.literal("processing"), v.literal("completed"), v.literal("failed")),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

// Generate file upload URL
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Attach audio file to existing craft
export const attachAudio = mutation({
  args: {
    craftId: v.id("crafts"),
    audioFileId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) throw new Error("User must be authenticated");

    const craft = await ctx.db.get(args.craftId);
    if (!craft || craft.userId !== user._id) {
      throw new Error("Craft not found or access denied");
    }

    await ctx.db.patch(args.craftId, { audioFileId: args.audioFileId });
  },
});

// Attach additional image to craft
export const attachImage = mutation({
  args: {
    craftId: v.id("crafts"),
    imageFileId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) throw new Error("User must be authenticated");

    const craft = await ctx.db.get(args.craftId);
    if (!craft || craft.userId !== user._id) {
      throw new Error("Craft not found or access denied");
    }

    await ctx.db.patch(args.craftId, { imageFileId: args.imageFileId });
  },
});

// Update craft with AI-generated fields
export const patchAIFields = mutation({
  args: {
    craftId: v.id("crafts"),
    aiStory: v.optional(v.string()),
    aiCaption: v.optional(v.string()),
    aiTags: v.optional(v.array(v.string())),
    transcription: v.optional(v.string()),
    translation: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { craftId, ...updates } = args;
    await ctx.db.patch(craftId, updates);
  },
});

// Set craft status
export const setStatus = mutation({
  args: {
    craftId: v.id("crafts"),
    status: v.union(
      v.literal("uploading"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.craftId, { status: args.status });
  },
});

// Set craft region for geographic filtering
export const setRegion = mutation({
  args: {
    craftId: v.id("crafts"),
    region: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.craftId, { region: args.region });
  },
});

// Get crafts by region for /explore page
export const getByRegion = query({
  args: { region: v.string() },
  handler: async (ctx, args) => {
    // Use composite index instead of filter to avoid full table scan
    const crafts = await ctx.db
      .query("crafts")
      .withIndex("by_region_and_status", (q) =>
        q.eq("region", args.region).eq("status", "completed")
      )
      .collect();

    // Get file URLs for each craft
    const craftsWithUrls = await Promise.all(
      crafts.map(async (craft) => {
        const craftPhotoUrl = await ctx.storage.getUrl(craft.craftPhoto);
        const enhancedPhotoUrl = craft.enhancedPhoto
          ? await ctx.storage.getUrl(craft.enhancedPhoto)
          : null;

        return {
          ...craft,
          craftPhotoUrl,
          enhancedPhotoUrl,
        };
      })
    );

    return craftsWithUrls;
  },
});

// Get public featured crafts (latest completed), up to 12
export const getFeaturedPublic = query({
  args: {},
  handler: async (ctx) => {
    const q = ctx.db
      .query("crafts")
      .withIndex("by_status", (iq) => iq.eq("status", "completed"))
      .order("desc");

    // Prefer take(12) if available; otherwise collect and slice.
    // Using for-await to avoid loading too much:
    const results: any[] = [];
    for await (const row of q) {
      results.push(row);
      if (results.length >= 12) break;
    }

    const mapped = await Promise.all(
      results.map(async (craft) => {
        const primaryId = craft.enhancedPhoto ?? craft.craftPhoto;
        const imageUrl = primaryId ? await ctx.storage.getUrl(primaryId) : null;
        return {
          ...craft,
          imageUrl,
          productName: craft.aiTags?.[0] ? craft.aiTags[0].toString() : "Handcrafted Piece",
          // price is optional in current schema—left null for now; UI handles fallback
          price: null as number | null,
        };
      })
    );

    return mapped;
  },
});