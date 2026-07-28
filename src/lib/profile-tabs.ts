import { PROFILE_TABS, type ProfileTab } from "@/types/profile";

const VALID_TAB_IDS = new Set<string>(PROFILE_TABS.map((tab) => tab.id));

/**
 * Resolves a `?tab=` query value to a valid ProfileTab.
 * Falls back to "command-center" when the value is absent or invalid.
 */
export function resolveProfileTab(queryValue: string | string[] | undefined): ProfileTab {
    const value = Array.isArray(queryValue) ? queryValue[0] : queryValue;
    if (value && VALID_TAB_IDS.has(value)) {
        return value as ProfileTab;
    }
    return "command-center";
}
