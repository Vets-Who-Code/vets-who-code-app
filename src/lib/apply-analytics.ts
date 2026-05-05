type ApplyEvent =
    | { action: "step_view"; step: number }
    | { action: "step_complete"; step: number }
    | { action: "validation_error"; step: number; field: string }
    | { action: "github_lookup"; status: "found" | "not_found" | "error" }
    | { action: "form_submit"; success: boolean }
    | { action: "form_reset" };

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

export function trackApplyEvent(event: ApplyEvent): void {
    if (typeof window === "undefined" || !window.gtag) return;

    try {
        window.gtag("event", event.action, {
            event_category: "apply_form",
            ...event,
        });
    } catch {
        // Analytics should never break the app
    }
}
