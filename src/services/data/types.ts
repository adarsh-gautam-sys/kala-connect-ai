/**
 * Domain types for the data service abstraction layer.
 * These types are backend-agnostic and map to both Convex and Firebase schemas.
 * 
 * ID Mapping:
 * - Convex: Id<'table'> -> string (cast internally in adapters)
 * - Firebase: document ID -> string (direct mapping)
 */

export interface User {
  _id: string;
  name?: string;
  email?: string;
  image?: string;
  role?: 'admin' | 'user' | 'member';
  emailVerificationTime?: number;
  isAnonymous?: boolean;
}

export interface Craft {
  _id: string;
  userId: string;
  artisanName: string;
  craftPhoto: string; // Storage file ID
  voiceNote: string; // Storage file ID
  
  // AI-enhanced fields
  audioFileId?: string;
  imageFileId?: string;
  aiStory?: string;
  aiCaption?: string;
  aiTags?: string[];
  transcription?: string;
  translation?: string;
  region?: string;
  
  // Legacy AI fields
  enhancedPhoto?: string;
  productDescription?: string;
  socialCaption?: string;
  transcribedText?: string;
  translatedText?: string;
  
  // Status and metadata
  status: 'uploading' | 'processing' | 'completed' | 'failed';
  whatsappNumber?: string;
  language?: string;
  targetLanguage?: string;
  
  // Runtime URLs (populated by adapters)
  craftPhotoUrl?: string;
  voiceNoteUrl?: string;
  enhancedPhotoUrl?: string;
  imageUrl?: string;
  
  // Creation time (auto-populated)
  _creationTime?: number;
}

export interface CommunityPost {
  _id: string;
  userId: string;
  cluster: string;
  body: string;
  title?: string;
  _creationTime?: number;
  
  // Populated by queries
  authorName?: string;
}

export type StorageFileId = string;

export interface CreateCraftRequest {
  artisanName: string;
  craftPhoto: StorageFileId;
  voiceNote: StorageFileId;
  whatsappNumber?: string;
}

export interface CreatePostRequest {
  body: string;
  title?: string;
  cluster?: string;
}

export interface CraftAIPatch {
  aiStory?: string;
  aiCaption?: string;
  aiTags?: string[];
  transcription?: string;
  translation?: string;
}
