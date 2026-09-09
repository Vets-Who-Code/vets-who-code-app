import { SafeLocalStorage, SafeSessionStorage } from "@utils/safe-storage";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styles from "./EngagementModal.module.css";

interface EngagementModalProps {
    headline: string;
    body: string;
    cta1: { label: string; href: string };
    cta2: { label: string; href: string };
    forceShow?: boolean;
}

interface CustomWindow extends Window {
    openEngagementModal?: () => void;
}

declare let window: CustomWindow;

// Dismissal is permanent (localStorage), not per-session. The previous flag lived in
// sessionStorage, so a visitor who closed the modal saw it again on their next visit.
const DISMISSED_KEY = "vwc_engagement_modal_dismissed";
const VISIT_COUNT_KEY = "vwc_visit_count";
const VISIT_COUNTED_KEY = "vwc_visit_counted";

/** Cold traffic converts badly on a financial ask. Wait for the second visit. */
const MIN_VISITS = 2;
/** Fraction of the page a visitor must reach before the ask is earned. */
const SCROLL_THRESHOLD = 0.7;

export const EngagementModal: React.FC<EngagementModalProps> = ({
    headline,
    body,
    cta1,
    cta2,
    forceShow,
}) => {
    const [open, setOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    // Expose method to manually open modal for debugging
    // This can be called from browser console: window.openEngagementModal()
    // Comment out or remove before pushing to production
    useEffect(() => {
        return () => {
            if (typeof window !== "undefined") {
                delete window.openEngagementModal;
            }
        };
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        if (forceShow) {
            const timer = setTimeout(() => setOpen(true), 3000);
            return () => clearTimeout(timer);
        }

        if (SafeLocalStorage.getItem<boolean>(DISMISSED_KEY, false)) return;

        // Count each browsing session once, so "visits" means visits and not page views.
        let visits = SafeLocalStorage.getItem<number>(VISIT_COUNT_KEY, 0);
        if (!SafeSessionStorage.getItem<boolean>(VISIT_COUNTED_KEY, false)) {
            visits += 1;
            SafeLocalStorage.setItem(VISIT_COUNT_KEY, visits);
            SafeSessionStorage.setItem(VISIT_COUNTED_KEY, true);
        }

        // First-time visitors are still deciding what this place is. Never interrupt them.
        if (visits < MIN_VISITS) return;

        const reveal = () => {
            setOpen(true);
            SafeLocalStorage.setItem(DISMISSED_KEY, true);
        };

        // Earned by reading: 70% of the page.
        const onScroll = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollable <= 0) return;
            if (window.scrollY / scrollable >= SCROLL_THRESHOLD) reveal();
        };

        // Exit intent: cursor leaving through the top of the viewport. Pointer-based,
        // so it never fires on touch devices, where a takeover hurts most.
        const onMouseOut = (e: MouseEvent) => {
            if (e.clientY <= 0 && !e.relatedTarget) reveal();
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        const finePointer = window.matchMedia("(pointer: fine)").matches;
        if (finePointer) document.addEventListener("mouseout", onMouseOut);

        return () => {
            window.removeEventListener("scroll", onScroll);
            if (finePointer) document.removeEventListener("mouseout", onMouseOut);
        };
    }, [forceShow]);

    // Accessibility: close on ESC
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") dismiss();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open]);

    // Accessibility: focus trap
    useEffect(() => {
        if (!open || !modalRef.current) return;
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length) focusable[0].focus();
    }, [open]);

    // Dismiss on click outside
    const dismiss = () => {
        setOpen(false);
        SafeLocalStorage.setItem(DISMISSED_KEY, true);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) dismiss();
    };

    return (
        <>
            {/* Development-only testing button - Remove or comment out before pushing to production */}
            {false && process.env.NODE_ENV === "development" && (
                <div className={styles.testModalButtonContainer}>
                    <button
                        type="button"
                        className="tw-rounded tw-bg-secondary tw-px-4 tw-py-2 tw-text-white tw-shadow-lg"
                        onClick={() => setOpen(true)}
                    >
                        Test Modal
                    </button>
                </div>
            )}

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="tw-fixed tw-inset-0 tw-z-[100] tw-flex tw-items-center tw-justify-center tw-bg-black/50 tw-p-2 sm:tw-p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleBackdropClick}
                        aria-modal="true"
                        role="dialog"
                    >
                        <motion.div
                            ref={modalRef}
                            className="tw-relative tw-flex tw-max-h-[95vh] tw-min-h-[520px] tw-w-full tw-max-w-2xl tw-flex-col tw-items-center tw-gap-6 tw-overflow-y-auto tw-rounded-2xl tw-border-4 tw-border-secondary tw-bg-white tw-p-6 tw-shadow-2xl tw-outline-none sm:tw-min-h-[600px] sm:tw-max-w-3xl sm:tw-p-16"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            tabIndex={-1}
                        >
                            <button
                                type="button"
                                aria-label="Close"
                                className="tw-absolute tw-right-6 tw-top-6 tw-text-4xl tw-text-secondary hover:tw-text-primary focus:tw-outline-none"
                                onClick={dismiss}
                            >
                                &times;
                            </button>
                            <h2 className="tw-mb-2 tw-mt-4 tw-text-center tw-text-4xl tw-font-extrabold tw-text-primary sm:tw-text-5xl">
                                {headline}
                            </h2>
                            <div className="tw-mb-2 tw-flex tw-justify-center">
                                <Link
                                    href="/"
                                    className="tw-inline-block tw-h-48 tw-w-auto sm:tw-h-64"
                                >
                                    <img
                                        src="https://res.cloudinary.com/vetswhocode/image/upload/v1627489569/flag_ohssvk.gif"
                                        alt="Animated Flag Logo"
                                        className="tw-h-full tw-w-auto"
                                    />
                                </Link>
                            </div>
                            <p className="tw-mb-4 tw-text-center tw-text-xl tw-text-secondary sm:tw-text-2xl">
                                {body}
                            </p>
                            <div className="tw-mt-4 tw-flex tw-w-full tw-flex-col tw-gap-4 sm:tw-flex-row">
                                <a
                                    href={cta1.href}
                                    className={`${styles.button} tw-group tw-relative tw-flex tw-w-full tw-items-center tw-justify-center tw-rounded tw-bg-primary tw-px-8 tw-py-4 tw-text-lg tw-font-semibold tw-text-white tw-transition hover:tw-bg-secondary hover:tw-text-white focus:tw-ring-2 focus:tw-ring-primary`}
                                >
                                    <span className="tw-leading-none">{cta1.label}</span>
                                    <span className={styles.emoji} aria-hidden="true">
                                        💖
                                    </span>
                                </a>
                                {cta2.href.startsWith("#") ? (
                                    <Link
                                        href={cta2.href}
                                        className={`${styles.button} tw-group tw-relative tw-flex tw-w-full tw-items-center tw-justify-center tw-rounded tw-bg-secondary tw-px-8 tw-py-4 tw-text-lg tw-font-semibold tw-text-white tw-transition hover:tw-bg-accent hover:tw-text-secondary focus:tw-ring-2 focus:tw-ring-secondary`}
                                        passHref={true}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            dismiss();
                                            const targetId = cta2.href.substring(1);
                                            const targetElement = document.getElementById(targetId);
                                            if (targetElement) {
                                                setTimeout(() => {
                                                    targetElement.scrollIntoView({
                                                        behavior: "smooth",
                                                        block: "start",
                                                    });
                                                }, 300);
                                            }
                                        }}
                                    >
                                        <span className="tw-leading-none">{cta2.label}</span>
                                        <span className={styles.emoji} aria-hidden="true">
                                            🚀
                                        </span>
                                    </Link>
                                ) : (
                                    <a
                                        href={cta2.href}
                                        className={`${styles.button} tw-group tw-relative tw-flex tw-w-full tw-items-center tw-justify-center tw-rounded tw-bg-secondary tw-px-8 tw-py-4 tw-text-lg tw-font-semibold tw-text-white tw-transition hover:tw-bg-accent hover:tw-text-secondary focus:tw-ring-2 focus:tw-ring-secondary`}
                                    >
                                        <span className="tw-leading-none">{cta2.label}</span>
                                        <span className={styles.emoji} aria-hidden="true">
                                            🚀
                                        </span>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default EngagementModal;
