import { getFocusableElements, nextFocus } from "@utils/methods";
import { useEffect, useRef } from "react";

/**
 * `preventScroll` returns focus without scrolling to it, for dialogs that open on their
 * own rather than from a control the reader is looking at.
 */
const useKeyboardFocus = <T extends HTMLElement>(
    open: boolean,
    onClose: () => void,
    preventScroll = false
) => {
    const ref = useRef<T>(null);
    const previousFocus = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (!open) return;

            switch (e.key) {
                case "Escape": {
                    onClose();
                    break;
                }
                case "Tab": {
                    e.preventDefault();
                    nextFocus(getFocusableElements(ref.current), !e.shiftKey);
                    break;
                }
                default:
                    break;
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [onClose, open]);

    useEffect(() => {
        if (open) {
            previousFocus.current = (document.activeElement as HTMLElement) ?? null;
            nextFocus(getFocusableElements(ref.current));
        } else {
            previousFocus.current?.focus?.({ preventScroll });
            previousFocus.current = null;
        }
    }, [open, preventScroll]);

    return ref;
};

export default useKeyboardFocus;
