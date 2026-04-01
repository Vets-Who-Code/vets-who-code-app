import { renderHook, act } from "@testing-library/react";
import useClickOutside from "../use-click-outside";

describe("useClickOutside", () => {
    it("should call onClose when clicking outside the element", () => {
        const onClose = vi.fn();
        const { result } = renderHook(() => useClickOutside<HTMLDivElement>(onClose));

        const div = document.createElement("div");
        Object.defineProperty(result.current, "current", { value: div, writable: true });

        act(() => {
            document.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(onClose).toHaveBeenCalled();
    });

    it("should call onClose when pressing Escape", () => {
        const onClose = vi.fn();
        renderHook(() => useClickOutside<HTMLDivElement>(onClose));

        act(() => {
            document.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape" }));
        });

        expect(onClose).toHaveBeenCalled();
    });

    it("should not call onClose for non-Escape keys", () => {
        const onClose = vi.fn();
        renderHook(() => useClickOutside<HTMLDivElement>(onClose));

        act(() => {
            document.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter" }));
        });

        expect(onClose).not.toHaveBeenCalled();
    });

    it("should clean up event listeners on unmount", () => {
        const onClose = vi.fn();
        const { unmount } = renderHook(() => useClickOutside<HTMLDivElement>(onClose));

        unmount();

        act(() => {
            document.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape" }));
        });

        expect(onClose).not.toHaveBeenCalled();
    });
});
