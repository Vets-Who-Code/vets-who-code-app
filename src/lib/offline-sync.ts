export interface OfflineProgress {
    enrollmentId: string;
    lessonId: string;
    completed: boolean;
    timeSpent: number;
    timestamp: number;
}

const STORAGE_KEY = "vwc_offline_progress";

/**
 * Save progress to localStorage when offline
 */
export function saveOfflineProgress(progress: Omit<OfflineProgress, "timestamp">): void {
    try {
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

        localStorage.setItem(STORAGE_KEY, JSON.stringify(offlineQueue));
    } catch (error) {
        console.error("Failed to save offline progress:", error);
    }
}

/**
 * Get all offline progress records
 */
export function getOfflineQueue(): OfflineProgress[] {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Failed to get offline queue:", error);
        return [];
    }
}

/**
 * Clear offline progress queue
 */
export function clearOfflineQueue(): void {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error("Failed to clear offline queue:", error);
    }
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
