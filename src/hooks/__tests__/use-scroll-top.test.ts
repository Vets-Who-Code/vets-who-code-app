import { renderHook, act } from "@testing-library/react";
import useScrollTop from "../use-scroll-top";

describe("useScrollTop", () => {
    it("should return stick as false initially", () => {
        const { result } = renderHook(() => useScrollTop());
        expect(result.current.stick).toBe(false);
    });

    it("should set stick to true when scrolled past 300px", () => {
        const { result } = renderHook(() => useScrollTop());

        act(() => {
            Object.defineProperty(window, "pageYOffset", { value: 350, writable: true });
            window.dispatchEvent(new Event("scroll"));
        });

        expect(result.current.stick).toBe(true);
    });

    it("should set stick to false when scrolled back above 300px", () => {
        const { result } = renderHook(() => useScrollTop());

        act(() => {
            Object.defineProperty(window, "pageYOffset", { value: 350, writable: true });
            window.dispatchEvent(new Event("scroll"));
        });
        expect(result.current.stick).toBe(true);

        act(() => {
            Object.defineProperty(window, "pageYOffset", { value: 100, writable: true });
            window.dispatchEvent(new Event("scroll"));
        });
        expect(result.current.stick).toBe(false);
    });

    it("should call window.scrollTo on click handler", () => {
        const scrollToMock = vi.fn();
        window.scrollTo = scrollToMock;

        const { result } = renderHook(() => useScrollTop());
        result.current.onClickHandler();

        expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    });
});
