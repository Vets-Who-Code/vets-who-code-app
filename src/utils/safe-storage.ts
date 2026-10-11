/**
 * SafeStorage - localStorage/sessionStorage that never throws.
 * Returns defaults during SSR and when the browser blocks storage (private mode).
 * Values are stored as { value, expiry, timestamp } with optional TTL.
 */

interface StorageItem<T> {
    value: T;
    expiry: number | null;
    timestamp: number;
}

type StorageType = "local" | "session";

class SafeStorageClass {
    constructor(private readonly storageType: StorageType) {}

    // Accessing window.localStorage can itself throw when storage is blocked.
    private get storage(): Storage | null {
        if (typeof window === "undefined") return null;
        try {
            return this.storageType === "local" ? window.localStorage : window.sessionStorage;
        } catch {
            return null;
        }
    }

    getItem<T>(key: string, defaultValue: T): T {
        try {
            const item = this.storage?.getItem(key);
            if (!item) return defaultValue;

            const parsed: StorageItem<T> = JSON.parse(item);
            if (parsed.expiry && Date.now() > parsed.expiry) {
                this.removeItem(key);
                return defaultValue;
            }
            return parsed.value ?? defaultValue;
        } catch {
            return defaultValue;
        }
    }

    /**
     * @param ttlMinutes - Time to live in minutes
     * @returns false when the value could not be stored
     */
    setItem<T>(key: string, value: T, ttlMinutes?: number): boolean {
        try {
            const storage = this.storage;
            if (!storage) return false;

            const item: StorageItem<T> = {
                value,
                expiry: ttlMinutes ? Date.now() + ttlMinutes * 60 * 1000 : null,
                timestamp: Date.now(),
            };
            storage.setItem(key, JSON.stringify(item));
            return true;
        } catch (error) {
            console.error(`Error writing ${key} to ${this.storageType}Storage:`, error);
            return false;
        }
    }

    removeItem(key: string): void {
        try {
            this.storage?.removeItem(key);
        } catch {
            // Storage blocked; nothing to remove
        }
    }
}

export const SafeLocalStorage = new SafeStorageClass("local");
export const SafeSessionStorage = new SafeStorageClass("session");
