import { motion } from "framer-motion";
import type { LanguageBreakdownEntry } from "@/types/profile";

interface LanguageBreakdownProps {
    languages: LanguageBreakdownEntry[];
    isLoading: boolean;
}

const LanguageBreakdown = ({ languages, isLoading }: LanguageBreakdownProps) => {
    if (isLoading) {
        return (
            <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-sm">
                <div className="tw-h-4 tw-w-32 tw-rounded tw-bg-navy/10 tw-animate-pulse tw-mb-4" />
                <div className="tw-h-6 tw-w-full tw-rounded-full tw-bg-navy/5 tw-animate-pulse" />
            </div>
        );
    }

    if (languages.length === 0) return null;

    return (
        <div className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm">
            <h3 className="tw-mb-4 tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60">
                Language Intel
            </h3>

            {/* Stacked bar */}
            <div className="tw-flex tw-h-5 tw-w-full tw-overflow-hidden tw-rounded-full">
                {languages.map((lang, i) => (
                    <motion.div
                        key={lang.language}
                        initial={{ width: 0 }}
                        animate={{ width: `${lang.percentage}%` }}
                        transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                        className="tw-h-full tw-first:tw-rounded-l-full tw-last:tw-rounded-r-full"
                        style={{ backgroundColor: lang.color }}
                        title={`${lang.language}: ${lang.percentage}%`}
                    />
                ))}
            </div>

            {/* Legend */}
            <div className="tw-mt-4 tw-flex tw-flex-wrap tw-gap-x-4 tw-gap-y-2">
                {languages.map((lang) => (
                    <div
                        key={lang.language}
                        className="tw-flex tw-items-center tw-gap-1.5 tw-font-mono tw-text-xs"
                    >
                        <span
                            className="tw-inline-block tw-h-2.5 tw-w-2.5 tw-rounded-full"
                            style={{ backgroundColor: lang.color }}
                        />
                        <span className="tw-text-gray-300">{lang.language}</span>
                        <span className="tw-text-ink/60">{lang.percentage}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LanguageBreakdown;
