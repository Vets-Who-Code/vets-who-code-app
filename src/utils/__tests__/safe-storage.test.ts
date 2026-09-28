import { SafeLocalStorage, SafeSessionStorage } from "../safe-storage";

// happy-dom's Storage proxy ignores `delete`, so vi.restoreAllMocks() cannot undo a
// vi.spyOn(localStorage, "setItem"). Put the real method back by hand instead.
const realSetItem = localStorage.setItem;

describe("SafeStorage", () => {
    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    afterEach(() => {
        Object.defineProperty(localStorage, "setItem", {
            value: realSetItem,
            configurable: true,
            writable: true,
        });
        vi.useRealTimers();
        vi.unstubAllGlobals();
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

        it("should clear expired items and retry once when the quota is exceeded", () => {
            vi.useFakeTimers();

            SafeLocalStorage.setItem("expires", "value", 1); // 1 minute
            SafeLocalStorage.setItem("stays", "value"); // no expiry

            vi.advanceTimersByTime(2 * 60 * 1000);

            vi.spyOn(localStorage, "setItem").mockImplementationOnce(() => {
                throw new DOMException("Quota exceeded", "QuotaExceededError");
            });

            expect(SafeLocalStorage.setItem("new", "value")).toBe(true);
            expect(localStorage.getItem("expires")).toBe(null);
            expect(SafeLocalStorage.getItem("stays", "gone")).toBe("value");
            expect(SafeLocalStorage.getItem("new", "gone")).toBe("value");
        });

        it("should return false when a write throws", () => {
            vi.spyOn(localStorage, "setItem").mockImplementation(() => {
                throw new DOMException("Blocked", "SecurityError");
            });

            expect(SafeLocalStorage.setItem("key", "value")).toBe(false);
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

    describe("stored format", () => {
        // Values already in users' browsers use this envelope. Changing it orphans stored carts.
        it("should write the { value, expiry, timestamp } envelope byte for byte", () => {
            vi.useFakeTimers();
            vi.setSystemTime(1_700_000_000_000);

            SafeLocalStorage.setItem("shopify_cart_id", "gid://shopify/Cart/abc", 60);
            SafeLocalStorage.setItem("checklist", { github: true });

            expect(localStorage.getItem("shopify_cart_id")).toBe(
                '{"value":"gid://shopify/Cart/abc","expiry":1700003600000,"timestamp":1700000000000}'
            );
            expect(localStorage.getItem("checklist")).toBe(
                '{"value":{"github":true},"expiry":null,"timestamp":1700000000000}'
            );
        });

        it("should read values stored in the existing format", () => {
            vi.useFakeTimers();
            vi.setSystemTime(1_700_000_000_000);

            localStorage.setItem(
                "shopify_cart_id",
                '{"value":"gid://shopify/Cart/abc","expiry":1700003600000,"timestamp":1699999000000}'
            );
            localStorage.setItem(
                "checklist",
                '{"value":{"github":true},"expiry":null,"timestamp":1699999000000}'
            );

            expect(SafeLocalStorage.getItem("shopify_cart_id", null)).toBe(
                "gid://shopify/Cart/abc"
            );
            expect(SafeLocalStorage.getItem("checklist", {})).toEqual({ github: true });
        });
    });

    describe("when storage is unavailable", () => {
        it("should return defaults and refuse writes during SSR", async () => {
            vi.stubGlobal("window", undefined);
            vi.resetModules();
            const { SafeLocalStorage: ssrStorage } = await import("../safe-storage");

            expect(ssrStorage.getItem("key", "fallback")).toBe("fallback");
            expect(ssrStorage.setItem("key", "value")).toBe(false);
            expect(() => ssrStorage.removeItem("key")).not.toThrow();
            expect(localStorage.getItem("key")).toBe(null);
        });

        it("should return defaults and refuse writes when the browser blocks storage", async () => {
            vi.spyOn(localStorage, "setItem").mockImplementation(() => {
                throw new DOMException("Blocked", "SecurityError");
            });
            vi.resetModules();
            const { SafeLocalStorage: blockedStorage } = await import("../safe-storage");

            expect(blockedStorage.setItem("key", "value")).toBe(false);
            expect(blockedStorage.getItem("key", "fallback")).toBe("fallback");
            expect(() => blockedStorage.removeItem("key")).not.toThrow();
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
