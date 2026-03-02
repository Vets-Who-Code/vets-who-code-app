import type { ProfileTab } from "@/types/profile";
import { PROFILE_TABS } from "@/types/profile";

interface ProfileNavProps {
    activeTab: ProfileTab;
    onTabChange: (tab: ProfileTab) => void;
    isOwner?: boolean;
}

const OWNER_ONLY_TABS: ProfileTab[] = ["settings"];

const ProfileNav = ({ activeTab, onTabChange, isOwner = true }: ProfileNavProps) => {
    const visibleTabs = isOwner
        ? PROFILE_TABS
        : PROFILE_TABS.filter((tab) => !OWNER_ONLY_TABS.includes(tab.id));

    return (
    <div className="tw-mb-8">
        <nav className="tw-flex tw-gap-1 tw-overflow-x-auto tw-border-b tw-border-navy/10 tw-pb-px">
            {visibleTabs.map((tab) => (
                <button
                    key={tab.id}
                    type="button"
                    onClick={() => onTabChange(tab.id)}
                    className={`tw-flex tw-items-center tw-gap-2 tw-whitespace-nowrap tw-border-b-2 tw-px-4 tw-py-3 tw-font-mono tw-text-xs tw-font-semibold tw-uppercase tw-tracking-wider tw-transition-all ${
                        activeTab === tab.id
                            ? "tw-border-gold tw-text-navy"
                            : "tw-border-transparent tw-text-gray-300 hover:tw-border-gold/30 hover:tw-text-navy/80"
                    }`}
                >
                    <i className={tab.icon} />
                    <span>{tab.label}</span>
                </button>
            ))}
        </nav>
    </div>
    );
};

export default ProfileNav;
