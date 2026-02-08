import { SafeLocalStorage } from "@utils/safe-storage";

export interface OfflineProgress {
    enrollmentId: string;
    lessonId: string;
    completed: boolean;
    timeSpent: number;
    timestamp: number;
}

const STORAGE_KEY = "vwc_offline_progress";
// Offline progress expires after 30 days
const OFFLINE_TIMEOUT_MINUTES = 30 * 24 * 60;

/**
 * Save progress to localStorage when offline
 */
export function saveOfflineProgress(progress: Omit<OfflineProgress, "timestamp">): void {
    const offlineQueue = getOfflineQueue();

    // Add timestamp
    const progressWithTimestamp: OfflineProgress = {
        ...progress,
        timestamp: Date.now(),
    };

    // Check if this lesson progress already exists in queue
    const existingIndex = offlineQueue.findIndex(
        (p) => p.enrollmentId === progress.enrollmentId && p.lessonId === progress.lessonId
    );

    if (existingIndex >= 0) {
        // Update existing record
        offlineQueue[existingIndex] = progressWithTimestamp;
    } else {
        // Add new record
        offlineQueue.push(progressWithTimestamp);
    }

    // Use SafeStorage to save queue with expiration
    const saved = SafeLocalStorage.setItem(STORAGE_KEY, offlineQueue, OFFLINE_TIMEOUT_MINUTES);

    if (!saved) {
        console.error("Failed to save offline progress - storage may be full or unavailable");
    }
}

/**
 * Get all offline progress records
 */
export function getOfflineQueue(): OfflineProgress[] {
    // Use SafeStorage to get queue with automatic error handling
    return SafeLocalStorage.getItem<OfflineProgress[]>(STORAGE_KEY, []);
}

/**
 * Clear offline progress queue
 */
export function clearOfflineQueue(): void {
    // Use SafeStorage to remove queue
    SafeLocalStorage.removeItem(STORAGE_KEY);
}

/**
 * Sync offline progress to server
 */
export async function syncOfflineProgress(): Promise<{
    success: number;
    failed: number;
    errors: any[];
}> {
    const queue = getOfflineQueue();

    if (queue.length === 0) {
        return { success: 0, failed: 0, errors: [] };
    }

    const results = {
        success: 0,
        failed: 0,
        errors: [] as any[],
    };

    // Process each progress record
    for (const progress of queue) {
        try {
            const response = await fetch("/api/progress", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    enrollmentId: progress.enrollmentId,
                    lessonId: progress.lessonId,
                    completed: progress.completed,
                    timeSpent: progress.timeSpent,
                }),
            });

            if (response.ok) {
                results.success++;
            } else {
                results.failed++;
                results.errors.push({
                    progress,
                    error: await response.text(),
                });
            }
        } catch (error) {
            results.failed++;
            results.errors.push({ progress, error });
        }
    }

    // Clear queue if all synced successfully
    if (results.failed === 0) {
        clearOfflineQueue();
    }

    return results;
}

/**
 * Check if browser is online
 */
export function isOnline(): boolean {
    return typeof navigator !== "undefined" ? navigator.onLine : true;
}
