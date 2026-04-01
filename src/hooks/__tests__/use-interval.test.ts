import { renderHook } from "@testing-library/react";
import useInterval from "../use-interval";

describe("useInterval", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should call callback at the specified interval", () => {
        const callback = vi.fn();
        renderHook(() => useInterval(callback, 1000));

        expect(callback).not.toHaveBeenCalled();

        vi.advanceTimersByTime(1000);
        expect(callback).toHaveBeenCalledTimes(1);

        vi.advanceTimersByTime(2000);
        expect(callback).toHaveBeenCalledTimes(3);
    });

    it("should clear interval on unmount", () => {
        const callback = vi.fn();
        const { unmount } = renderHook(() => useInterval(callback, 1000));

        vi.advanceTimersByTime(1000);
        expect(callback).toHaveBeenCalledTimes(1);

        unmount();

        vi.advanceTimersByTime(5000);
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should use the latest callback", () => {
        let count = 0;
        const { rerender } = renderHook(
            ({ cb }) => useInterval(cb, 1000),
            { initialProps: { cb: () => { count += 1; } } }
        );

        vi.advanceTimersByTime(1000);
        expect(count).toBe(1);

        rerender({ cb: () => { count += 10; } });

        vi.advanceTimersByTime(1000);
        expect(count).toBe(11);
    });
});
