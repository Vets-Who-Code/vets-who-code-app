import { SafeLocalStorage, SafeSessionStorage } from "../safe-storage";

describe("SafeStorage", () => {
    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    describe("SafeLocalStorage", () => {
        it("should be available in test environment", () => {
            expect(SafeLocalStorage.isAvailable()).toBe(true);
        });

        it("should set and get items", () => {
            SafeLocalStorage.setItem("test", "hello");
            expect(SafeLocalStorage.getItem("test", "default")).toBe("hello");
        });

        it("should return default value for missing keys", () => {
            expect(SafeLocalStorage.getItem("missing", "fallback")).toBe("fallback");
        });

        it("should handle complex objects", () => {
            const data = { name: "John", scores: [1, 2, 3] };
            SafeLocalStorage.setItem("complex", data);
            expect(SafeLocalStorage.getItem("complex", null)).toEqual(data);
        });

        it("should remove items", () => {
            SafeLocalStorage.setItem("toRemove", "value");
            SafeLocalStorage.removeItem("toRemove");
            expect(SafeLocalStorage.getItem("toRemove", "default")).toBe("default");
        });

        it("should clear all items", () => {
            SafeLocalStorage.setItem("a", 1);
            SafeLocalStorage.setItem("b", 2);
            SafeLocalStorage.clear();
            expect(SafeLocalStorage.getItem("a", null)).toBe(null);
            expect(SafeLocalStorage.getItem("b", null)).toBe(null);
        });

        it("should reject null and undefined values", () => {
            expect(SafeLocalStorage.setItem("key", null)).toBe(false);
            expect(SafeLocalStorage.setItem("key", undefined)).toBe(false);
        });

        it("should handle TTL expiration", () => {
            vi.useFakeTimers();

            SafeLocalStorage.setItem("expiring", "value", 1); // 1 minute TTL

            expect(SafeLocalStorage.getItem("expiring", "default")).toBe("value");

            vi.advanceTimersByTime(2 * 60 * 1000); // 2 minutes later

            expect(SafeLocalStorage.getItem("expiring", "default")).toBe("default");

            vi.useRealTimers();
        });

        it("should return all keys", () => {
            SafeLocalStorage.setItem("key1", "a");
            SafeLocalStorage.setItem("key2", "b");
            const keys = SafeLocalStorage.getAllKeys();
            expect(keys).toContain("key1");
            expect(keys).toContain("key2");
        });

        it("should calculate storage size", () => {
            SafeLocalStorage.setItem("sizeTest", "value");
            expect(SafeLocalStorage.getStorageSize()).toBeGreaterThan(0);
        });

        it("should clear expired items", () => {
            vi.useFakeTimers();

            SafeLocalStorage.setItem("expires", "value", 1); // 1 minute
            SafeLocalStorage.setItem("stays", "value"); // no expiry

            vi.advanceTimersByTime(2 * 60 * 1000);

            SafeLocalStorage.clearExpired();

            expect(SafeLocalStorage.getItem("expires", "gone")).toBe("gone");
            expect(SafeLocalStorage.getItem("stays", "gone")).toBe("value");

            vi.useRealTimers();
        });

        it("should handle corrupted data gracefully", () => {
            localStorage.setItem("corrupt", "not-valid-json{{{");
            expect(SafeLocalStorage.getItem("corrupt", "default")).toBe("default");
        });

        it("should migrate old format data", () => {
            localStorage.setItem("oldFormat", JSON.stringify("oldValue"));
            const result = SafeLocalStorage.migrateItem("oldFormat", "default");
            expect(result).toBe("oldValue");
        });
    });

    describe("SafeSessionStorage", () => {
        it("should be available in test environment", () => {
            expect(SafeSessionStorage.isAvailable()).toBe(true);
        });

        it("should set and get items independently from localStorage", () => {
            SafeLocalStorage.setItem("shared", "local");
            SafeSessionStorage.setItem("shared", "session");

            expect(SafeLocalStorage.getItem("shared", "")).toBe("local");
            expect(SafeSessionStorage.getItem("shared", "")).toBe("session");
        });
    });
});
