/**
 * Firebase implementation of DataService (scaffold for future use).
 * 
 * This adapter provides the structure for Firebase integration.
 * Complete the TODOs below when ready to migrate from Convex.
 * 
 * Firestore Collections:
 * - users: User documents with auth integration
 * - crafts: Craft documents with file references
 * - community_posts: Community post documents
 * 
 * Storage:
 * - Firebase Storage bucket for craft photos, voice notes, enhanced images
 */

import type { DataService } from '../DataService';
import type { User, Craft, CommunityPost, CreateCraftRequest, CreatePostRequest, CraftAIPatch } from '../types';

interface FirebaseDependencies {
  firestore: any; // Firestore instance
  storage?: any; // Firebase Storage instance
  auth?: any; // Firebase Auth instance
}

export function createFirebaseDataService(deps: FirebaseDependencies): DataService {
  const { firestore, storage, auth } = deps;

  return {
    users: {
      async getCurrent(): Promise<User | null> {
        // TODO: Implement Firebase Auth getCurrentUser
        // 1. Get current user from Firebase Auth
        // 2. Query users collection by auth UID
        // 3. Return user document or null
        throw new Error('FirebaseAdapter.users.getCurrent not implemented');
      },

      async setRole(role: 'admin' | 'user' | 'member'): Promise<void> {
        // TODO: Implement user role update
        // 1. Get current user ID from auth
        // 2. Update users/{userId} document with new role
        // 3. Handle auth claims if using custom claims
        throw new Error('FirebaseAdapter.users.setRole not implemented');
      },
    },

    crafts: {
      async create(request: CreateCraftRequest): Promise<string> {
        // TODO: Implement craft creation
        // 1. Get current user ID from auth
        // 2. Create document in crafts collection
        // 3. Return document ID
        throw new Error('FirebaseAdapter.crafts.create not implemented');
      },

      async getById(id: string): Promise<Craft | null> {
        // TODO: Implement craft retrieval
        // 1. Query crafts/{id} document
        // 2. Generate signed URLs for storage files
        // 3. Return craft with URLs populated
        throw new Error('FirebaseAdapter.crafts.getById not implemented');
      },

      async getUserCrafts(): Promise<Craft[]> {
        // TODO: Implement user crafts query
        // 1. Get current user ID
        // 2. Query crafts where userId == currentUserId
        // 3. Order by creation time desc
        // 4. Generate URLs for each craft
        throw new Error('FirebaseAdapter.crafts.getUserCrafts not implemented');
      },

      async getFeaturedPublic(): Promise<Craft[]> {
        // TODO: Implement featured crafts query
        // 1. Query crafts where status == 'completed'
        // 2. Order by creation time desc
        // 3. Limit to 12 results
        // 4. Generate URLs for each craft
        throw new Error('FirebaseAdapter.crafts.getFeaturedPublic not implemented');
      },

      async getByRegion(region: string): Promise<Craft[]> {
        // TODO: Implement region-based query
        // 1. Query crafts where region == region AND status == 'completed'
        // 2. Generate URLs for results
        throw new Error('FirebaseAdapter.crafts.getByRegion not implemented');
      },

      async setStatus(craftId: string, status: 'uploading' | 'processing' | 'completed' | 'failed'): Promise<void> {
        // TODO: Implement status update
        // Update crafts/{craftId} document with new status
        throw new Error('FirebaseAdapter.crafts.setStatus not implemented');
      },

      async patchAI(craftId: string, patch: CraftAIPatch): Promise<void> {
        // TODO: Implement AI fields update
        // Update crafts/{craftId} document with AI-generated content
        throw new Error('FirebaseAdapter.crafts.patchAI not implemented');
      },

      async setRegion(craftId: string, region: string): Promise<void> {
        // TODO: Implement region update
        // Update crafts/{craftId} document with region
        throw new Error('FirebaseAdapter.crafts.setRegion not implemented');
      },

      async attachAudio(craftId: string, audioFileId: string): Promise<void> {
        // TODO: Implement audio attachment
        // Update crafts/{craftId} document with audioFileId
        throw new Error('FirebaseAdapter.crafts.attachAudio not implemented');
      },

      async attachImage(craftId: string, imageFileId: string): Promise<void> {
        // TODO: Implement image attachment
        // Update crafts/{craftId} document with imageFileId
        throw new Error('FirebaseAdapter.crafts.attachImage not implemented');
      },
    },

    community: {
      async listByCluster(cluster: string): Promise<CommunityPost[]> {
        // TODO: Implement community posts query
        // 1. Query community_posts where cluster == cluster
        // 2. Order by creation time desc
        // 3. Join with users collection for author names
        throw new Error('FirebaseAdapter.community.listByCluster not implemented');
      },

      async createPost(request: CreatePostRequest): Promise<string> {
        // TODO: Implement post creation
        // 1. Get current user ID
        // 2. Create document in community_posts collection
        // 3. Return document ID
        throw new Error('FirebaseAdapter.community.createPost not implemented');
      },
    },

    storage: {
      async generateUploadUrl(): Promise<string> {
        // TODO: Implement Firebase Storage upload URL generation
        // 1. Generate signed upload URL for Firebase Storage
        // 2. Return URL for client-side upload
        throw new Error('FirebaseAdapter.storage.generateUploadUrl not implemented');
      },

      async getUrl(fileId: string): Promise<string | null> {
        // TODO: Implement Firebase Storage URL generation
        // 1. Generate signed download URL for file
        // 2. Return public URL or null if not found
        throw new Error('FirebaseAdapter.storage.getUrl not implemented');
      },
    },
  };
}
