import { renderHook } from "@testing-library/react";
import useMount from "../use-mount";

describe("useMount", () => {
    it("should return true after mounting", () => {
        const { result } = renderHook(() => useMount());
        expect(result.current).toBe(true);
    });
});
