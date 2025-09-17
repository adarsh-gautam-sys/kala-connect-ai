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