import type { PersistStorage, StorageValue } from "zustand/middleware";

/**
 * Creates a localStorage-based storage with automatic expiration.
 * Stored data will be automatically removed and return null after the expiration time.
 *
 * @param expirationMs - Time in milliseconds before stored data expires (default: 24 hours)
 * @returns A PersistStorage compatible object with expiration functionality
 */
export function createExpiringStorage<S>(expirationMs: number = 24 * 60 * 60 * 1000): PersistStorage<S> {
  return {
    getItem: (name) => {
      const str = localStorage.getItem(name);
      if (!str) return null;

      try {
        const { state, timestamp } = JSON.parse(str);
        const now = Date.now();

        // Check if the stored state has expired
        if (timestamp && now - timestamp > expirationMs) {
          localStorage.removeItem(name);
          return null;
        }

        return state as StorageValue<S>;
      } catch (e) {
        return null;
      }
    },
    setItem: (name, value) => {
      const str = JSON.stringify({
        state: value,
        timestamp: Date.now(),
      });
      localStorage.setItem(name, str);
    },
    removeItem: (name) => localStorage.removeItem(name),
  };
}
