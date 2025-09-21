import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
    }).index("email", ["email"]), // index for the email. do not remove or modify

    // Craft submissions table
    crafts: defineTable({
      userId: v.id("users"),
      artisanName: v.string(),
      craftPhoto: v.id("_storage"), // File storage ID for craft photo
      voiceNote: v.id("_storage"), // File storage ID for voice note
      
      // New AI-enhanced fields for KalaSetu
      audioFileId: v.optional(v.id("_storage")), // Additional audio for AI processing
      imageFileId: v.optional(v.id("_storage")), // Additional image reference
      aiStory: v.optional(v.string()), // AI-generated product story
      aiCaption: v.optional(v.string()), // AI-generated social caption
      aiTags: v.optional(v.array(v.string())), // AI-generated tags from Vision API
      transcription: v.optional(v.string()), // Speech-to-text result
      translation: v.optional(v.string()), // Translated text
      region: v.optional(v.string()), // For geographic filtering on /explore
      
      // AI-processed content (existing fields)
      enhancedPhoto: v.optional(v.id("_storage")), // Enhanced photo from AI
      productDescription: v.optional(v.string()), // Generated description
      socialCaption: v.optional(v.string()), // Generated social media caption
      transcribedText: v.optional(v.string()), // Speech-to-text result
      translatedText: v.optional(v.string()), // Translated text
      
      // Processing status
      status: v.union(
        v.literal("uploading"),
        v.literal("processing"), 
        v.literal("completed"),
        v.literal("failed")
      ),
      
      // Contact info
      whatsappNumber: v.optional(v.string()),
      
      // Metadata
      language: v.optional(v.string()), // Original language detected
      targetLanguage: v.optional(v.string()), // Translation target
    })
      .index("by_user", ["userId"])
      .index("by_status", ["status"])
      .index("by_region", ["region"])
      .index("by_region_and_status", ["region", "status"]), // New index

    // Community posts for artisan forum (Kala-Gaon)
    community_posts: defineTable({
      userId: v.id("users"),
      cluster: v.string(), // Geographic or skill-based cluster
      body: v.string(),
      title: v.optional(v.string()),
    })
      .index("by_cluster", ["cluster"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;