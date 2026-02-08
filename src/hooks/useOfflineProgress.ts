import { useEffect, useState } from "react";
import {
    getOfflineQueue,
    isOnline,
    saveOfflineProgress,
    syncOfflineProgress,
} from "@/lib/offline-sync";

export function useOfflineProgress() {
    const [pendingSync, setPendingSync] = useState(0);
    const [isSyncing, setIsSyncing] = useState(false);
    const [online, setOnline] = useState(true);

    useEffect(() => {
        // Update pending count and online status
        const updateStatus = () => {
            setPendingSync(getOfflineQueue().length);
            setOnline(isOnline());
        };

        updateStatus();

        // Auto-sync when coming online
        const handleOnline = async () => {
            setOnline(true);
            if (getOfflineQueue().length > 0) {
                await handleSync();
            }
        };

        const handleOffline = () => {
            setOnline(false);
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        window.addEventListener("storage", updateStatus);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
            window.removeEventListener("storage", updateStatus);
        };
    }, []);

    const updateProgress = async (
        enrollmentId: string,
        lessonId: string,
        completed: boolean,
        timeSpent: number
    ) => {
        if (!isOnline()) {
            // Save offline
            saveOfflineProgress({
                enrollmentId,
                lessonId,
                completed,
                timeSpent,
            });
            setPendingSync(getOfflineQueue().length);
            return { offline: true };
        }

        // Try to sync online
        try {
            const response = await fetch("/api/progress", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    enrollmentId,
                    lessonId,
                    completed,
                    timeSpent,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update progress");
            }

            return await response.json();
        } catch (error) {
            // Fallback to offline
            saveOfflineProgress({
                enrollmentId,
                lessonId,
                completed,
                timeSpent,
            });
            setPendingSync(getOfflineQueue().length);
            return { offline: true, error };
        }
    };

    const handleSync = async () => {
        setIsSyncing(true);
        try {
            const results = await syncOfflineProgress();
            setPendingSync(getOfflineQueue().length);
            return results;
        } finally {
            setIsSyncing(false);
        }
    };

    return {
        updateProgress,
        syncOfflineProgress: handleSync,
        pendingSync,
        isSyncing,
        isOnline: online,
    };
}
