import { saveOfflineProgress, getOfflineQueue, clearOfflineQueue, isOnline } from "@/lib/offline-sync";

// Mock SafeLocalStorage
const store = new Map<string, string>();

vi.mock("@utils/safe-storage", () => {
    const SafeLocalStorage = {
        getItem: vi.fn((key: string, defaultValue: unknown) => {
            const item = store.get(key);
            if (!item) return defaultValue;
            try {
                return JSON.parse(item);
            } catch {
                return defaultValue;
            }
        }),
        setItem: vi.fn((key: string, value: unknown) => {
            store.set(key, JSON.stringify(value));
            return true;
        }),
        removeItem: vi.fn((key: string) => {
            store.delete(key);
        }),
    };

    return { SafeLocalStorage };
});

describe("offline-sync", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        store.clear();
    });

    describe("getOfflineQueue", () => {
        it("should return empty array when no data exists", () => {
            expect(getOfflineQueue()).toEqual([]);
        });
    });

    describe("saveOfflineProgress", () => {
        it("should save progress to the queue", () => {
            saveOfflineProgress({
                enrollmentId: "e1",
                lessonId: "l1",
                completed: true,
                timeSpent: 120,
            });

            const queue = getOfflineQueue();
            expect(queue).toHaveLength(1);
            expect(queue[0].enrollmentId).toBe("e1");
            expect(queue[0].lessonId).toBe("l1");
            expect(queue[0].completed).toBe(true);
        });

        it("should update existing progress for same enrollment/lesson", () => {
            saveOfflineProgress({
                enrollmentId: "e1",
                lessonId: "l1",
                completed: false,
                timeSpent: 60,
            });

            saveOfflineProgress({
                enrollmentId: "e1",
                lessonId: "l1",
                completed: true,
                timeSpent: 120,
            });

            const queue = getOfflineQueue();
            expect(queue).toHaveLength(1);
            expect(queue[0].completed).toBe(true);
            expect(queue[0].timeSpent).toBe(120);
        });

        it("should add separate entries for different lessons", () => {
            saveOfflineProgress({
                enrollmentId: "e1",
                lessonId: "l1",
                completed: true,
                timeSpent: 60,
            });

            saveOfflineProgress({
                enrollmentId: "e1",
                lessonId: "l2",
                completed: false,
                timeSpent: 30,
            });

            const queue = getOfflineQueue();
            expect(queue).toHaveLength(2);
        });
    });

    describe("clearOfflineQueue", () => {
        it("should clear the queue", () => {
            saveOfflineProgress({
                enrollmentId: "e1",
                lessonId: "l1",
                completed: true,
                timeSpent: 60,
            });

            clearOfflineQueue();
            expect(getOfflineQueue()).toEqual([]);
        });
    });

    describe("isOnline", () => {
        it("should return navigator.onLine value", () => {
            Object.defineProperty(navigator, "onLine", { value: true, writable: true });
            expect(isOnline()).toBe(true);

            Object.defineProperty(navigator, "onLine", { value: false, writable: true });
            expect(isOnline()).toBe(false);
        });
    });
});
