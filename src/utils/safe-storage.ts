/**
 * SafeStorage - A secure wrapper for localStorage and sessionStorage operations
 * Provides error handling, validation, and TTL support for browser storage
 */

interface StorageItem<T> {
    value: T;
    expiry: number | null;
    timestamp: number;
}

type StorageType = 'local' | 'session';

class SafeStorageClass {
    private storage: Storage | null = null;
    private storageType: StorageType;

    constructor(type: StorageType = 'local') {
        this.storageType = type;
        // Delay initialization until first use to avoid SSR issues
        if (typeof window !== 'undefined') {
            this.initStorage();
        }
    }

    /**
     * Initialize storage with availability check
     */
    private initStorage(): void {
        // Check if we're in a browser environment
        if (typeof window === 'undefined') {
            this.storage = null;
            return;
        }

        try {
            const testKey = '__storage_test__';
            const storage = this.storageType === 'local' ? window.localStorage : window.sessionStorage;

            // Test if storage is available and working
            storage.setItem(testKey, 'test');
            storage.removeItem(testKey);

            this.storage = storage;
        } catch (error) {
            console.warn(`${this.storageType}Storage is not available:`, error);
            this.storage = null;
        }
    }

    /**
     * Ensure storage is initialized (for client-side usage)
     */
    private ensureInitialized(): void {
        if (!this.storage && typeof window !== 'undefined') {
            this.initStorage();
        }
    }

    /**
     * Check if storage is available
     */
    isAvailable(): boolean {
        this.ensureInitialized();
        return this.storage !== null;
    }

    /**
     * Get item from storage with type safety and error handling
     */
    getItem<T>(key: string, defaultValue: T): T {
        this.ensureInitialized();

        try {
            if (!this.storage) {
                return defaultValue;
            }

            const item = this.storage.getItem(key);

            if (!item) {
                return defaultValue;
            }

            const parsed: StorageItem<T> = JSON.parse(item);

            // Check if item has expired
            if (parsed.expiry && Date.now() > parsed.expiry) {
                this.removeItem(key);
                return defaultValue;
            }

            // Validate that value exists
            if (parsed.value === undefined || parsed.value === null) {
                return defaultValue;
            }

            return parsed.value;
        } catch (error) {
            console.error(`Error reading ${key} from ${this.storageType}Storage:`, error);

            // Try to remove corrupted data
            try {
                this.storage?.removeItem(key);
            } catch {
                // Silent fail on cleanup
            }

            return defaultValue;
        }
    }

    /**
     * Set item in storage with optional TTL
     * @param ttlMinutes - Time to live in minutes
     */
    setItem<T>(key: string, value: T, ttlMinutes?: number): boolean {
        this.ensureInitialized();

        try {
            if (!this.storage) {
                console.warn(`Cannot set ${key}: ${this.storageType}Storage is not available`);
                return false;
            }

            // Check for undefined or null values
            if (value === undefined || value === null) {
                console.warn(`Cannot set ${key}: value is ${value}`);
                return false;
            }

            const item: StorageItem<T> = {
                value,
                expiry: ttlMinutes ? Date.now() + (ttlMinutes * 60 * 1000) : null,
                timestamp: Date.now()
            };

            const serialized = JSON.stringify(item);

            // Check size limit (roughly 5MB for safety)
            if (serialized.length > 5 * 1024 * 1024) {
                console.error(`Cannot set ${key}: Data too large (${serialized.length} bytes)`);
                return false;
            }

            this.storage.setItem(key, serialized);
            return true;
        } catch (error) {
            // Handle quota exceeded error
            if (error instanceof Error && error.name === 'QuotaExceededError') {
                console.error(`Storage quota exceeded for ${key}`);

                // Try to clear expired items and retry once
                this.clearExpired();

                try {
                    const item: StorageItem<T> = {
                        value,
                        expiry: ttlMinutes ? Date.now() + (ttlMinutes * 60 * 1000) : null,
                        timestamp: Date.now()
                    };
                    this.storage?.setItem(key, JSON.stringify(item));
                    return true;
                } catch {
                    return false;
                }
            }

            console.error(`Error writing ${key} to ${this.storageType}Storage:`, error);
            return false;
        }
    }

    /**
     * Remove item from storage
     */
    removeItem(key: string): void {
        this.ensureInitialized();

        try {
            this.storage?.removeItem(key);
        } catch (error) {
            console.error(`Error removing ${key} from ${this.storageType}Storage:`, error);
        }
    }

    /**
     * Clear all storage
     */
    clear(): void {
        this.ensureInitialized();

        try {
            this.storage?.clear();
        } catch (error) {
            console.error(`Error clearing ${this.storageType}Storage:`, error);
        }
    }

    /**
     * Get all keys from storage
     */
    getAllKeys(): string[] {
        this.ensureInitialized();

        try {
            if (!this.storage) {
                return [];
            }

            return Object.keys(this.storage);
        } catch (error) {
            console.error(`Error getting keys from ${this.storageType}Storage:`, error);
            return [];
        }
    }

    /**
     * Clear expired items from storage
     */
    clearExpired(): void {
        this.ensureInitialized();

        try {
            if (!this.storage) {
                return;
            }

            const keys = this.getAllKeys();

            for (const key of keys) {
                try {
                    const item = this.storage.getItem(key);
                    if (!item) continue;

                    const parsed = JSON.parse(item);

                    // Check if item has expiry and is expired
                    if (parsed.expiry && Date.now() > parsed.expiry) {
                        this.storage.removeItem(key);
                    }
                } catch {
                    // Skip invalid items
                }
            }
        } catch (error) {
            console.error(`Error clearing expired items from ${this.storageType}Storage:`, error);
        }
    }

    /**
     * Get storage size in bytes
     */
    getStorageSize(): number {
        this.ensureInitialized();

        try {
            if (!this.storage) {
                return 0;
            }

            let size = 0;
            const keys = this.getAllKeys();

            for (const key of keys) {
                const item = this.storage.getItem(key);
                if (item) {
                    size += key.length + item.length;
                }
            }

            return size;
        } catch (error) {
            console.error(`Error calculating ${this.storageType}Storage size:`, error);
            return 0;
        }
    }

    /**
     * Migrate old format data to new format
     */
    migrateItem<T>(key: string, defaultValue: T): T {
        this.ensureInitialized();

        try {
            if (!this.storage) {
                return defaultValue;
            }

            const item = this.storage.getItem(key);

            if (!item) {
                return defaultValue;
            }

            // Try to parse as new format first
            try {
                const parsed: StorageItem<T> = JSON.parse(item);
                if (parsed.value !== undefined && parsed.timestamp !== undefined) {
                    // Already in new format
                    return this.getItem(key, defaultValue);
                }
            } catch {
                // Not in new format, continue with migration
            }

            // Parse as old format (direct value)
            const oldValue = JSON.parse(item);

            // Save in new format
            this.setItem(key, oldValue);

            return oldValue;
        } catch (error) {
            console.error(`Error migrating ${key} in ${this.storageType}Storage:`, error);

            // Remove corrupted data
            try {
                this.storage?.removeItem(key);
            } catch {
                // Silent fail on cleanup
            }

            return defaultValue;
        }
    }
}

// Create singleton instances
export const SafeLocalStorage = new SafeStorageClass('local');
export const SafeSessionStorage = new SafeStorageClass('session');

// Default export for backward compatibility
export default SafeLocalStorage;

/**
 * React hook for using SafeStorage
 */
export function useSafeStorage<T>(
    key: string,
    defaultValue: T,
    options?: {
        type?: StorageType;
        ttlMinutes?: number;
    }
) {
    const storage = options?.type === 'session' ? SafeSessionStorage : SafeLocalStorage;

    const getValue = (): T => {
        return storage.getItem(key, defaultValue);
    };

    const setValue = (value: T): boolean => {
        return storage.setItem(key, value, options?.ttlMinutes);
    };

    const removeValue = (): void => {
        storage.removeItem(key);
    };

    return {
        value: getValue(),
        setValue,
        removeValue,
        isAvailable: storage.isAvailable()
    };
}