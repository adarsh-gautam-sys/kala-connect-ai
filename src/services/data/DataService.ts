/**
 * Backend-agnostic data service interface.
 * 
 * This interface abstracts database operations to enable switching between
 * Convex and Firebase without changing application code.
 * 
 * Usage:
 * - Today: Use ConvexAdapter with existing Convex backend
 * - Future: Switch to FirebaseAdapter by changing configuration
 */

import type { 
  User, 
  Craft, 
  CommunityPost, 
  CreateCraftRequest, 
  CreatePostRequest, 
  CraftAIPatch 
} from './types';

export interface DataService {
  // User operations
  users: {
    /** Get current authenticated user */
    getCurrent(): Promise<User | null>;
    
    /** Set role for current user */
    setRole(role: 'admin' | 'user' | 'member'): Promise<void>;
  };

  // Craft operations
  crafts: {
    /** Create a new craft submission */
    create(request: CreateCraftRequest): Promise<string>;
    
    /** Get craft by ID with file URLs populated */
    getById(id: string): Promise<Craft | null>;
    
    /** Get all crafts for current user */
    getUserCrafts(): Promise<Craft[]>;
    
    /** Get featured public crafts (up to 12) */
    getFeaturedPublic(): Promise<Craft[]>;
    
    /** Get crafts by region */
    getByRegion(region: string): Promise<Craft[]>;
    
    /** Update craft status */
    setStatus(craftId: string, status: 'uploading' | 'processing' | 'completed' | 'failed'): Promise<void>;
    
    /** Patch AI-generated fields */
    patchAI(craftId: string, patch: CraftAIPatch): Promise<void>;
    
    /** Set craft region */
    setRegion(craftId: string, region: string): Promise<void>;
    
    /** Attach audio file to craft */
    attachAudio(craftId: string, audioFileId: string): Promise<void>;
    
    /** Attach image file to craft */
    attachImage(craftId: string, imageFileId: string): Promise<void>;
  };

  // Community operations
  community: {
    /** List posts by cluster */
    listByCluster(cluster: string): Promise<CommunityPost[]>;
    
    /** Create a new community post */
    createPost(request: CreatePostRequest): Promise<string>;
  };

  // Storage operations
  storage: {
    /** Generate upload URL for file storage */
    generateUploadUrl(): Promise<string>;
    
    /** Get public URL for stored file */
    getUrl(fileId: string): Promise<string | null>;
  };
}
