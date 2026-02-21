/**
 * Lightweight analytics for the Military-to-Civilian Resume Translator.
 * Fires events via Google Analytics (gtag) if available, otherwise no-ops.
 */

type TranslatorEvent =
    | { action: "translate_start"; mosCode?: string; branch?: string }
    | { action: "translate_complete"; mosCode?: string; source: "dictionary" | "ai" }
    | { action: "export_txt" }
    | { action: "export_pdf" }
    | { action: "copy_linkedin" }
    | { action: "enrichment_toggle"; open: boolean }
    | { action: "seo_page_view"; mosCode: string };

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

export function trackTranslatorEvent(event: TranslatorEvent): void {
    if (typeof window === "undefined" || !window.gtag) return;

    try {
        window.gtag("event", event.action, {
            event_category: "resume_translator",
            ...event,
        });
    } catch {
        // Analytics should never break the app
    }
}
