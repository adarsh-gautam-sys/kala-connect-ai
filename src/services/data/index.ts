/**
 * Data service facade with runtime configuration.
 * 
 * Usage:
 * 1. Today: Automatically uses Convex (configured in bootstrap)
 * 2. Future: Call configureDataService({ type: 'firebase', firebase: deps }) to switch
 * 
 * Migration path:
 * - Add Firebase config to environment
 * - Initialize Firebase app and services
 * - Call configureDataService with Firebase dependencies
 * - Remove Convex dependencies when ready
 */

import type { DataService } from './DataService';
import { createConvexDataService } from './adapters/ConvexAdapter';
import { createFirebaseDataService } from './adapters/FirebaseAdapter';

interface ConvexConfig {
  type: 'convex';
  client: {
    query: (query: any, args?: any) => Promise<any>;
    mutation: (mutation: any, args?: any) => Promise<any>;
    action?: (action: any, args?: any) => Promise<any>;
  };
}

interface FirebaseConfig {
  type: 'firebase';
  firebase: {
    firestore: any;
    storage?: any;
    auth?: any;
  };
}

type DataServiceConfig = ConvexConfig | FirebaseConfig;

let dataServiceInstance: DataService | undefined;

/**
 * Configure the data service with backend-specific dependencies.
 * Call this once at application bootstrap.
 */
export function configureDataService(config: DataServiceConfig): void {
  switch (config.type) {
    case 'convex':
      dataServiceInstance = createConvexDataService(config.client);
      break;
    case 'firebase':
      dataServiceInstance = createFirebaseDataService(config.firebase);
      break;
    default:
      throw new Error(`Unknown data service type: ${(config as any).type}`);
  }
}

/**
 * Get the configured data service instance.
 * Throws if not configured - call configureDataService first.
 */
export function getDataService(): DataService {
  if (!dataServiceInstance) {
    throw new Error(
      'Data service not configured. Call configureDataService() at application bootstrap.'
    );
  }
  return dataServiceInstance;
}

/**
 * Ensure data service is configured, throwing a helpful error if not.
 */
export function ensureConfigured(): void {
  if (!dataServiceInstance) {
    throw new Error(
      'Data service not configured. Add configureDataService() call to your app initialization.'
    );
  }
}

/**
 * Check if data service is configured.
 */
export function isConfigured(): boolean {
  return dataServiceInstance !== undefined;
}
