import { resolveProfileTab } from "@/lib/profile-tabs";
import { PROFILE_TABS } from "@/types/profile";

describe("resolveProfileTab", () => {
    it("returns each valid tab id unchanged", () => {
        for (const tab of PROFILE_TABS) {
            expect(resolveProfileTab(tab.id)).toBe(tab.id);
        }
    });

    it("defaults to command-center when the value is absent", () => {
        expect(resolveProfileTab(undefined)).toBe("command-center");
    });

    it("defaults to command-center for garbage values", () => {
        expect(resolveProfileTab("not-a-tab")).toBe("command-center");
        expect(resolveProfileTab("")).toBe("command-center");
        expect(resolveProfileTab("SETTINGS")).toBe("command-center");
    });

    it("uses the first entry when the query value is an array", () => {
        expect(resolveProfileTab(["settings", "arsenal"])).toBe("settings");
        expect(resolveProfileTab(["bogus", "settings"])).toBe("command-center");
        expect(resolveProfileTab([])).toBe("command-center");
    });
});
