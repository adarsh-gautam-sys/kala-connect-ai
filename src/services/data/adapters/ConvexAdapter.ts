/**
 * Convex implementation of DataService.
 * 
 * This adapter wraps existing Convex functions to provide the DataService interface.
 * It maintains compatibility with the current backend while enabling future migration.
 * 
 * ID Mapping: Convex Id<'table'> types are cast to/from strings internally.
 */

import { api } from '@/convex/_generated/api';
import type { DataService } from '../DataService';
import type { User, Craft, CommunityPost, CreateCraftRequest, CreatePostRequest, CraftAIPatch } from '../types';

interface ConvexClient {
  query: (query: any, args?: any) => Promise<any>;
  mutation: (mutation: any, args?: any) => Promise<any>;
  action?: (action: any, args?: any) => Promise<any>;
}

export function createConvexDataService(client: ConvexClient): DataService {
  return {
    users: {
      async getCurrent(): Promise<User | null> {
        try {
          const user = await client.query(api.users.currentUser);
          return user ? { ...user, _id: user._id as string } : null;
        } catch (error) {
          console.error('ConvexAdapter.users.getCurrent failed:', error);
          throw error;
        }
      },

      async setRole(role: 'admin' | 'user' | 'member'): Promise<void> {
        try {
          await client.mutation(api.users.setRole, { role });
        } catch (error) {
          console.error('ConvexAdapter.users.setRole failed:', error);
          throw error;
        }
      },
    },

    crafts: {
      async create(request: CreateCraftRequest): Promise<string> {
        try {
          const craftId = await client.mutation(api.crafts.create, {
            artisanName: request.artisanName,
            craftPhoto: request.craftPhoto as any, // Cast to Convex Id
            voiceNote: request.voiceNote as any, // Cast to Convex Id
            whatsappNumber: request.whatsappNumber,
          });
          return craftId as string;
        } catch (error) {
          console.error('ConvexAdapter.crafts.create failed:', error);
          throw error;
        }
      },

      async getById(id: string): Promise<Craft | null> {
        try {
          const craft = await client.query(api.crafts.getById, { id: id as any });
          return craft ? { ...craft, _id: craft._id as string, userId: craft.userId as string } : null;
        } catch (error) {
          console.error('ConvexAdapter.crafts.getById failed:', error);
          throw error;
        }
      },

      async getUserCrafts(): Promise<Craft[]> {
        try {
          const crafts = await client.query(api.crafts.getUserCrafts);
          return crafts.map((craft: any) => ({
            ...craft,
            _id: craft._id as string,
            userId: craft.userId as string,
          }));
        } catch (error) {
          console.error('ConvexAdapter.crafts.getUserCrafts failed:', error);
          throw error;
        }
      },

      async getFeaturedPublic(): Promise<Craft[]> {
        try {
          const crafts = await client.query(api.crafts.getFeaturedPublic);
          return crafts.map((craft: any) => ({
            ...craft,
            _id: craft._id as string,
            userId: craft.userId as string,
          }));
        } catch (error) {
          console.error('ConvexAdapter.crafts.getFeaturedPublic failed:', error);
          throw error;
        }
      },

      async getByRegion(region: string): Promise<Craft[]> {
        try {
          const crafts = await client.query(api.crafts.getByRegion, { region });
          return crafts.map((craft: any) => ({
            ...craft,
            _id: craft._id as string,
            userId: craft.userId as string,
          }));
        } catch (error) {
          console.error('ConvexAdapter.crafts.getByRegion failed:', error);
          throw error;
        }
      },

      async setStatus(craftId: string, status: 'uploading' | 'processing' | 'completed' | 'failed'): Promise<void> {
        try {
          await client.mutation(api.crafts.setStatus, { craftId: craftId as any, status });
        } catch (error) {
          console.error('ConvexAdapter.crafts.setStatus failed:', error);
          throw error;
        }
      },

      async patchAI(craftId: string, patch: CraftAIPatch): Promise<void> {
        try {
          await client.mutation(api.crafts.patchAIFields, { craftId: craftId as any, ...patch });
        } catch (error) {
          console.error('ConvexAdapter.crafts.patchAI failed:', error);
          throw error;
        }
      },

      async setRegion(craftId: string, region: string): Promise<void> {
        try {
          await client.mutation(api.crafts.setRegion, { craftId: craftId as any, region });
        } catch (error) {
          console.error('ConvexAdapter.crafts.setRegion failed:', error);
          throw error;
        }
      },

      async attachAudio(craftId: string, audioFileId: string): Promise<void> {
        try {
          await client.mutation(api.crafts.attachAudio, { 
            craftId: craftId as any, 
            audioFileId: audioFileId as any 
          });
        } catch (error) {
          console.error('ConvexAdapter.crafts.attachAudio failed:', error);
          throw error;
        }
      },

      async attachImage(craftId: string, imageFileId: string): Promise<void> {
        try {
          await client.mutation(api.crafts.attachImage, { 
            craftId: craftId as any, 
            imageFileId: imageFileId as any 
          });
        } catch (error) {
          console.error('ConvexAdapter.crafts.attachImage failed:', error);
          throw error;
        }
      },
    },

    community: {
      async listByCluster(cluster: string): Promise<CommunityPost[]> {
        try {
          const posts = await client.query(api.community.listByCluster, { cluster });
          return posts.map((post: any) => ({
            ...post,
            _id: post._id as string,
            userId: post.userId as string,
          }));
        } catch (error) {
          console.error('ConvexAdapter.community.listByCluster failed:', error);
          throw error;
        }
      },

      async createPost(request: CreatePostRequest): Promise<string> {
        try {
          const postId = await client.mutation(api.community.createPost, request);
          return postId as string;
        } catch (error) {
          console.error('ConvexAdapter.community.createPost failed:', error);
          throw error;
        }
      },
    },

    storage: {
      async generateUploadUrl(): Promise<string> {
        try {
          return await client.mutation(api.crafts.generateUploadUrl);
        } catch (error) {
          console.error('ConvexAdapter.storage.generateUploadUrl failed:', error);
          throw error;
        }
      },

      async getUrl(fileId: string): Promise<string | null> {
        try {
          // Note: Convex storage URLs are handled by the storage.getUrl() method
          // This is a placeholder - actual implementation would need storage access
          // For now, return null and let existing code handle URL generation
          return null;
        } catch (error) {
          console.error('ConvexAdapter.storage.getUrl failed:', error);
          throw error;
        }
      },
    },
  };
}
