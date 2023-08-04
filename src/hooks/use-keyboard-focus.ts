import { useEffect, useRef } from "react";
import { getFocusableElements, nextFocus } from "@utils/methods";

const useKeyboardFocus = <T extends HTMLElement>(
    open: boolean,
    onClose: () => void
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
            previousFocus.current =
                (document.activeElement as HTMLElement) ?? null;
            nextFocus(getFocusableElements(ref.current));
        } else {
            previousFocus.current?.focus?.();
            previousFocus.current = null;
        }
    }, [open]);

    return ref;
};

export default useKeyboardFocus;
