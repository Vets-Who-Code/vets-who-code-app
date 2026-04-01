import { renderHook, act } from "@testing-library/react";
import useWindowSize from "../use-window-size";

describe("useWindowSize", () => {
    it("should return window dimensions after mount", () => {
        Object.defineProperty(window, "innerWidth", { value: 1024, writable: true });
        Object.defineProperty(window, "innerHeight", { value: 768, writable: true });

        const { result } = renderHook(() => useWindowSize());

        expect(result.current.width).toBe(1024);
        expect(result.current.height).toBe(768);
    });

    it("should update dimensions on resize", () => {
        const { result } = renderHook(() => useWindowSize());

        act(() => {
            Object.defineProperty(window, "innerWidth", { value: 800, writable: true });
            Object.defineProperty(window, "innerHeight", { value: 600, writable: true });
            window.dispatchEvent(new Event("resize"));
        });

        expect(result.current.width).toBe(800);
        expect(result.current.height).toBe(600);
    });

    it("should clean up resize listener on unmount", () => {
        const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
        const { unmount } = renderHook(() => useWindowSize());

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith("resize", expect.any(Function));
        removeEventListenerSpy.mockRestore();
    });
});
