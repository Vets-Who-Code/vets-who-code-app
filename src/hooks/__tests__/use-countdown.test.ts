import { renderHook, act } from "@testing-library/react";
import useCountdown from "../use-countdown";

describe("useCountdown", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should return [0, 0, 0, 0] for a past date", () => {
        const pastDate = new Date(Date.now() - 100000).toISOString();
        const { result } = renderHook(() => useCountdown(pastDate));
        expect(result.current).toEqual([0, 0, 0, 0]);
    });

    it("should return correct countdown values for a future date", () => {
        const futureDate = new Date(Date.now() + 90061000).toISOString(); // ~1d 1h 1m 1s
        const { result } = renderHook(() => useCountdown(futureDate));

        const [days, hours, minutes, seconds] = result.current;
        expect(days).toBe(1);
        expect(hours).toBe(1);
        expect(minutes).toBe(1);
        expect(seconds).toBe(1);
    });

    it("should update countdown over time", () => {
        const futureDate = new Date(Date.now() + 5000).toISOString(); // 5 seconds
        const { result } = renderHook(() => useCountdown(futureDate));

        expect(result.current[3]).toBeGreaterThan(0);

        act(() => {
            vi.advanceTimersByTime(3000);
        });

        const secondsAfter = result.current[3];
        expect(secondsAfter).toBeLessThanOrEqual(2);
    });
});
