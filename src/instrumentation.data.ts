/**
 * Optional data service bootstrap.
 * 
 * This module attempts to auto-configure the data service with Convex
 * if available in the current environment. This keeps the abstraction
 * layer ready to use without requiring immediate refactoring.
 * 
 * Future: Replace this with explicit Firebase configuration when migrating.
 */

import { configureDataService } from './services/data';

// Attempt to configure with Convex if available
// This is a temporary bootstrap - replace with explicit Firebase config during migration
try {
  // Check if we're in a browser environment with potential Convex client access
  if (typeof window !== 'undefined') {
    // For now, we'll configure this when the Convex client is available
    // The actual configuration will happen in components that have access to the Convex client
    console.log('Data service abstraction layer loaded - ready for configuration');
  }
} catch (error) {
  // Silently fail - the data service will be configured explicitly when needed
  console.debug('Data service auto-configuration skipped:', error);
}

// Export a helper for components to configure the service when they have access to Convex client
export function configureWithConvexClient(client: any) {
  try {
    configureDataService({
      type: 'convex',
      client: {
        query: client.query.bind(client),
        mutation: client.mutation.bind(client),
        action: client.action?.bind(client),
      },
    });
  } catch (error) {
    console.error('Failed to configure data service with Convex client:', error);
  }
}
