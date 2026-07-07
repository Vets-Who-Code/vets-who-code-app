import { act, renderHook, waitFor } from "@testing-library/react";
import type { MilitaryProfile } from "@/lib/military-translator";
import useTranslator from "../use-translator";

const mockFetch = vi.fn();
global.fetch = mockFetch;

const PROFILE: MilitaryProfile = {
    jobTitle: "11B",
    rank: "Sergeant",
    branch: "Army",
    duties: "Led an infantry squad in training and combat operations",
    achievements: "Awarded Army Commendation Medal",
    yearsOfService: 6,
};

// The hook fires two requests in parallel: the AI translate call (whose
// X-Enrichment-Warnings header we care about) and a career-pathways call.
function mockTranslate(warningsHeader: string | null) {
    mockFetch.mockImplementation((url: string) => {
        if (url === "/api/military-resume/translate") {
            return Promise.resolve({
                ok: true,
                json: async () => ({
                    jobTitle: "Operations Manager",
                    summary: "Results-driven operations leader",
                    keyResponsibilities: [],
                    achievements: [],
                    suggestions: [],
                }),
                headers: {
                    get: (name: string) =>
                        name === "X-Enrichment-Warnings" ? warningsHeader : null,
                },
            });
        }
        // career-pathways — not under test; return a non-ok so it resolves to null
        return Promise.resolve({ ok: false });
    });
}

describe("useTranslator", () => {
    beforeEach(() => {
        mockFetch.mockReset();
    });

    it("populates warnings from the X-Enrichment-Warnings header", async () => {
        mockTranslate("cert-equivalencies,training-pipeline");
        const { result } = renderHook(() => useTranslator());

        act(() => {
            result.current.translate(PROFILE);
        });

        await waitFor(() => expect(result.current.resultSource).toBe("ai"));
        expect(result.current.warnings).toEqual(["cert-equivalencies", "training-pipeline"]);
    });

    it("leaves warnings empty when the header is absent", async () => {
        mockTranslate(null);
        const { result } = renderHook(() => useTranslator());

        act(() => {
            result.current.translate(PROFILE);
        });

        await waitFor(() => expect(result.current.resultSource).toBe("ai"));
        expect(result.current.warnings).toEqual([]);
    });
});
