"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

// Main AI processing pipeline
export const processCraft = action({
  args: {
    craftId: v.id("crafts"),
  },
  handler: async (ctx, args) => {
    try {
      // Update status to processing
      await ctx.runMutation(api.crafts.updateWithAIResults, {
        id: args.craftId,
        status: "processing",
      });

      // Get craft data
      const craft = await ctx.runQuery(api.crafts.getById, {
        id: args.craftId,
      });

      if (!craft) {
        throw new Error("Craft not found");
      }

      // TODO: Download files from storage
      // const craftPhotoBlob = await ctx.storage.get(craft.craftPhoto);
      // const voiceNoteBlob = await ctx.storage.get(craft.voiceNote);

      // Step 1: Process speech to text
      const transcribedText = await processSpeechToText(craft.voiceNote);
      
      // Step 2: Detect language and translate if needed
      const { translatedText, detectedLanguage } = await translateText(
        transcribedText, 
        "en" // Target English for now
      );

      // Step 3: Generate product description and social caption
      const { productDescription, socialCaption } = await generateStoryAndCaption(
        translatedText,
        craft.artisanName
      );

      // Step 4: Enhance photo (placeholder for now)
      const enhancedPhotoId = await enhancePhoto(craft.craftPhoto);

      // Update craft with results (omit undefined fields)
      const updateArgs: Record<string, any> = {
        id: args.craftId,
        transcribedText,
        translatedText,
        productDescription,
        socialCaption,
        language: detectedLanguage,
        targetLanguage: "en",
        status: "completed",
      };
      if (enhancedPhotoId) {
        updateArgs.enhancedPhoto = enhancedPhotoId;
      }
      await ctx.runMutation(api.crafts.updateWithAIResults, updateArgs);

      return { success: true };
    } catch (error) {
      console.error("AI processing failed:", error);
      
      // Update status to failed
      await ctx.runMutation(api.crafts.updateWithAIResults, {
        id: args.craftId,
        status: "failed",
      });

      throw error;
    }
  },
});

// New action for processing artisan media with full AI pipeline
export const processArtisanMedia = action({
  args: {
    craftId: v.id("crafts"),
  },
  handler: async (ctx, args) => {
    try {
      // Update status to processing
      await ctx.runMutation(api.crafts.setStatus, {
        craftId: args.craftId,
        status: "processing",
      });

      // Get craft data
      const craft = await ctx.runQuery(api.crafts.getById, {
        id: args.craftId,
      });

      if (!craft) {
        throw new Error("Craft not found");
      }

      let transcription = "";
      let translation = "";
      let aiStory = "";
      let aiCaption = "";
      let aiTags: string[] = [];

      // Step 1: Process speech to text if audio exists
      if (craft.audioFileId || craft.voiceNote) {
        const audioId = craft.audioFileId || craft.voiceNote;
        transcription = await processSpeechToTextEnhanced(audioId);
      }

      // Step 2: Translate if needed
      if (transcription) {
        const result = await translateTextEnhanced(transcription, "en");
        translation = result.translatedText;
      }

      // Step 3: Generate AI story and caption using Vertex AI
      if (translation || craft.artisanName) {
        const content = translation || `Handcrafted by ${craft.artisanName}`;
        const result = await generateStoryAndCaptionEnhanced(content, craft.artisanName);
        aiStory = result.productDescription;
        aiCaption = result.socialCaption;
      }

      // Step 4: Generate tags from image using Vision AI
      if (craft.craftPhoto) {
        aiTags = await generateTagsFromImage(craft.craftPhoto);
      }

      // Update craft with AI results
      await ctx.runMutation(api.crafts.patchAIFields, {
        craftId: args.craftId,
        aiStory,
        aiCaption,
        aiTags,
        transcription,
        translation,
      });

      await ctx.runMutation(api.crafts.setStatus, {
        craftId: args.craftId,
        status: "completed",
      });

      return { success: true };
    } catch (error) {
      console.error("AI processing failed:", error);
      
      await ctx.runMutation(api.crafts.setStatus, {
        craftId: args.craftId,
        status: "failed",
      });

      throw error;
    }
  },
});

// Quick transcription for business voice notes
export const transcribeQuick = action({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await processSpeechToTextEnhanced(args.storageId);
  },
});

// AI Grant Assistant for financial guidance
export const askGrantAssistant = action({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    // Use Vertex AI or OpenRouter for grant assistance
    const systemPrompt = `You are an AI assistant helping Indian artisans find grants, funding, and business opportunities. 
    Provide practical, actionable advice about government schemes, NGO programs, and business development for traditional crafts.
    Keep responses concise and include specific program names when possible.`;
    
    return await callAIModel(systemPrompt, args.prompt);
  },
});

// RAG-based artisan bot for product questions
export const askArtisanBot = action({
  args: {
    craftId: v.id("crafts"),
    question: v.string(),
  },
  handler: async (ctx, args): Promise<string> => {
    // Get craft context
    const craft: any = await ctx.runQuery(api.crafts.getById, {
      id: args.craftId,
    });

    if (!craft) {
      throw new Error("Craft not found");
    }

    // Build context from AI-generated content
    const context = [
      craft.aiStory && `Story: ${craft.aiStory}`,
      craft.aiCaption && `Caption: ${craft.aiCaption}`,
      craft.aiTags && `Tags: ${craft.aiTags.join(", ")}`,
      craft.transcription && `Artisan's words: ${craft.transcription}`,
      `Artisan: ${craft.artisanName}`,
    ].filter(Boolean).join("\n");

    const systemPrompt: string = `You are representing ${craft.artisanName}, an Indian artisan. 
    Answer questions about this specific craft using the provided context. 
    Be authentic, warm, and knowledgeable about traditional craftsmanship.
    
    Context about this craft:
    ${context}`;

    return await callAIModel(systemPrompt, args.question);
  },
});

// Placeholder wrappers using requested names/signatures for future API integrations:

/**
 * TODO: Integrate Google Cloud Speech-to-Text here.
 * Provide the audio file (Convex storage Id) and return the transcript.
 */
export async function process_speech_to_text(audio_file: Id<"_storage">): Promise<string> {
  // For now, delegate to the internal helper (mocked).
  return processSpeechToText(audio_file as unknown as string);
}

/**
 * TODO: Integrate Google Translation API here.
 * Translate the given text into the target language; also detect the source language.
 */
export async function translate_text(
  text: string,
  target_language: string
): Promise<{ translatedText: string; detectedLanguage: string }> {
  // For now, delegate to the internal helper (mocked).
  return translateText(text, target_language);
}

/**
 * TODO: Integrate Vertex AI Generative model here.
 * Generate a product description and a social media caption from the provided text.
 */
export async function generate_story_and_caption(
  text: string
): Promise<{ productDescription: string; socialCaption: string }> {
  // For now, delegate to the internal helper (mocked). Artisan name is optional in this placeholder.
  return generateStoryAndCaption(text, "Artisan");
}

/**
 * TODO: Integrate Vision AI here.
 * Enhance an image given its Convex storage Id and return the enhanced file Id (or undefined if unchanged).
 */
export async function enhance_photo(
  photo_file: Id<"_storage">
): Promise<Id<"_storage"> | undefined> {
  // For now, delegate to the internal helper (mocked).
  return enhancePhoto(photo_file);
}

// TODO: Integrate Google Cloud Speech-to-Text API
async function processSpeechToText(audioFileId: string): Promise<string> {
  // Placeholder implementation
  console.log("TODO: Integrate Google Cloud Speech-to-Text here");
  console.log("Processing audio file:", audioFileId);
  
  // Mock response for now
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
  
  return "यह एक सुंदर हस्तशिल्प है जो मैंने बनाया है। इसमें पारंपरिक कला का उपयोग किया गया है।";
}

// TODO: Integrate Google Translation API
async function translateText(text: string, targetLanguage: string): Promise<{
  translatedText: string;
  detectedLanguage: string;
}> {
  console.log("TODO: Integrate Google Translation API here");
  console.log("Translating text:", text, "to", targetLanguage);
  
  // Mock response for now
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    translatedText: "This is a beautiful handicraft that I have made. It uses traditional art techniques.",
    detectedLanguage: "hi", // Hindi
  };
}

// TODO: Integrate Vertex AI Generative model
async function generateStoryAndCaption(text: string, artisanName: string): Promise<{
  productDescription: string;
  socialCaption: string;
}> {
  console.log("TODO: Integrate Vertex AI Generative model here");
  console.log("Generating story for:", text, "by", artisanName);
  
  // Mock response for now
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    productDescription: `Discover the artistry of ${artisanName} in this exquisite handcrafted piece. This beautiful handicraft showcases traditional techniques passed down through generations. Each detail reflects the dedication and skill of the artisan, making it a unique addition to any collection. The intricate work demonstrates the rich cultural heritage and craftsmanship that defines authentic handmade art.`,
    socialCaption: `✨ Handcrafted with love by ${artisanName} ✨\n\n🎨 Traditional techniques meet modern artistry\n💫 Each piece tells a unique story\n🌟 Supporting local artisans and their craft\n\n#HandmadeWithLove #TraditionalCraft #ArtisanMade #कलाConnect #SupportLocal #HandcraftedArt`,
  };
}

// TODO: Integrate Vision AI for photo enhancement
async function enhancePhoto(photoFileId: Id<"_storage">): Promise<Id<"_storage"> | undefined> {
  console.log("TODO: Integrate Vision AI here");
  console.log("Enhancing photo:", photoFileId);
  
  // Mock response for now - return the same photo ID
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For now, return undefined to use original photo
  return undefined;
}

// Enhanced helper functions for KalaSetu

async function processSpeechToTextEnhanced(audioFileId: Id<"_storage">): Promise<string> {
  // TODO: Integrate Google Cloud Speech-to-Text API
  console.log("Processing speech to text for:", audioFileId);
  
  // Mock enhanced response
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return "यह मेरी हस्तनिर्मित कलाकृति है जो पारंपरिक तकनीकों से बनाई गई है। इसमें प्राकृतिक रंगों का उपयोग किया गया है।";
}

async function translateTextEnhanced(text: string, targetLanguage: string): Promise<{
  translatedText: string;
  detectedLanguage: string;
}> {
  // TODO: Integrate Google Translation API
  console.log("Translating text:", text, "to", targetLanguage);
  
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    translatedText: "This is my handcrafted artwork made using traditional techniques. Natural colors have been used in this.",
    detectedLanguage: "hi",
  };
}

async function generateStoryAndCaptionEnhanced(text: string, artisanName: string): Promise<{
  productDescription: string;
  socialCaption: string;
}> {
  // TODO: Integrate Vertex AI Gemini
  console.log("Generating enhanced story for:", text, "by", artisanName);
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    productDescription: `Discover the timeless artistry of ${artisanName} in this exquisite handcrafted piece. Rooted in centuries-old traditions, this artwork showcases the authentic techniques passed down through generations. Each stroke and detail reflects the artisan's deep connection to their cultural heritage, making this not just a product, but a piece of living history. The use of natural materials and traditional methods ensures that every piece is unique, carrying the soul and story of its creator.`,
    socialCaption: `✨ Handcrafted with heritage by ${artisanName} ✨\n\n🎨 Traditional techniques meet timeless beauty\n🌿 Made with natural materials and authentic methods\n💫 Each piece tells a unique cultural story\n🏛️ Preserving centuries-old craftsmanship\n\n#HandmadeHeritage #TraditionalCraft #KalaSetu #ArtisanMade #IndianCrafts #AuthenticArt #CulturalPreservation`,
  };
}

async function generateTagsFromImage(imageFileId: Id<"_storage">): Promise<string[]> {
  // TODO: Integrate Vision AI for label detection
  console.log("Generating tags from image:", imageFileId);
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock tags based on common craft categories
  return ["handmade", "traditional", "ceramic", "pottery", "artisan", "indian-craft", "heritage", "natural-materials"];
}

async function callAIModel(systemPrompt: string, userPrompt: string): Promise<string> {
  // TODO: Integrate Vertex AI Gemini or OpenRouter
  console.log("Calling AI model with prompts");
  
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock response
  return "I'd be happy to help you with information about grants and funding opportunities for artisans. There are several government schemes like the PM Vishwakarma Yojana and various state-level craft development programs that provide financial support, training, and market linkages for traditional artisans.";
}