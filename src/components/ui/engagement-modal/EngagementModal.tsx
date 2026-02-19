import { SafeSessionStorage } from "@utils/safe-storage";
import { AnimatePresence, motion } from "framer-motion";
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

const MODAL_FLAG = "vwc_engagement_modal_shown";

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

        // Use SafeSessionStorage to check if modal was shown
        const modalShown = SafeSessionStorage.getItem<boolean>(MODAL_FLAG, false);
        if (modalShown) return;

        const timer = setTimeout(() => {
            setOpen(true);
            // Mark modal as shown with SafeSessionStorage
            SafeSessionStorage.setItem(MODAL_FLAG, true);
        }, 3000);

        return () => clearTimeout(timer);
    }, [forceShow]);

    // Accessibility: close on ESC
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
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
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) setOpen(false);
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
                        className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-bg-black/50 tw-p-2 sm:tw-p-6"
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
                                onClick={() => setOpen(false)}
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
                                    className={`${styles.button} tw-group tw-w-full tw-rounded tw-bg-primary tw-px-8 tw-py-4 tw-text-center tw-text-lg tw-font-semibold tw-text-white tw-transition hover:tw-bg-secondary hover:tw-text-white focus:tw-ring-2 focus:tw-ring-primary`}
                                >
                                    <span className="tw-group-hover:tw-mr-2 tw-inline-block tw-transition-all">
                                        {cta1.label}
                                    </span>
                                    <span className={`${styles.emoji}`} aria-hidden="true">
                                        💖
                                    </span>
                                </a>
                                {cta2.href.startsWith("#") ? (
                                    <Link
                                        href={cta2.href}
                                        className={`${styles.button} tw-group tw-w-full tw-rounded tw-bg-secondary tw-px-8 tw-py-4 tw-text-center tw-text-lg tw-font-semibold tw-text-white tw-transition hover:tw-bg-accent hover:tw-text-secondary focus:tw-ring-2 focus:tw-ring-secondary`}
                                        passHref={true}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setOpen(false);
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
                                        <span className="tw-group-hover:tw-mr-2 tw-inline-block tw-transition-all">
                                            {cta2.label}
                                        </span>
                                        <span className={`${styles.emoji}`} aria-hidden="true">
                                            🚀
                                        </span>
                                    </Link>
                                ) : (
                                    <a
                                        href={cta2.href}
                                        className={`${styles.button} tw-group tw-w-full tw-rounded tw-bg-secondary tw-px-8 tw-py-4 tw-text-center tw-text-lg tw-font-semibold tw-text-white tw-transition hover:tw-bg-accent hover:tw-text-secondary focus:tw-ring-2 focus:tw-ring-secondary`}
                                    >
                                        <span className="tw-group-hover:tw-mr-2 tw-inline-block tw-transition-all">
                                            {cta2.label}
                                        </span>
                                        <span className={`${styles.emoji}`} aria-hidden="true">
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
