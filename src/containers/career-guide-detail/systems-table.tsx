import { SectionHeader } from "./section-helpers";
import type { SystemsData } from "./types";

interface Props {
    systems: SystemsData;
}

const DOMAIN_FOR = (military: string): string => {
    const m = military.toLowerCase();
    if (/network|router|switch|firewall|comm/.test(m)) return "Networking";
    if (/radar|sensor|sonar|signal/.test(m)) return "Signals";
    if (/database|sql|record/.test(m)) return "Data";
    if (/weapon|missile|gun|fire control/.test(m)) return "Weapons";
    if (/aircraft|drone|uav/.test(m)) return "Aviation";
    if (/medical|treat/.test(m)) return "Medical";
    if (/vehicle|engine|hull|chassis/.test(m)) return "Platform";
    return "Operations";
};

const SystemsTable = ({ systems }: Props) => {
    if (systems.systems.length === 0) return null;

    return (
        <section
            id="sec-systems"
            className="tw-border-t tw-border-cream/10 tw-bg-secondary tw-py-20 md:tw-py-24"
        >
            <div className="tw-container tw-flex tw-flex-col tw-gap-10">
                <SectionHeader
                    number="/ 07"
                    eyebrow="Systems Translation"
                    title="What you ran, in their words."
                    lede="Military systems you operated and their civilian equivalents for your resume."
                />

                <div className="tw-overflow-x-auto tw-border-t tw-border-cream/10">
                    <table className="tw-w-full">
                        <thead>
                            <tr className="tw-bg-secondary">
                                <th className="tw-w-[35%] tw-px-4 tw-py-4 tw-text-left tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.12em] tw-text-[#8590a6]">
                                    Military System
                                </th>
                                <th className="tw-w-[50%] tw-px-4 tw-py-4 tw-text-left tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.12em] tw-text-[#8590a6]">
                                    Civilian Equivalent
                                </th>
                                <th className="tw-px-4 tw-py-4 tw-text-right tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.12em] tw-text-[#8590a6]">
                                    Domain
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {systems.systems.map((sys) => (
                                <tr
                                    key={sys.military}
                                    className="tw-border-t tw-border-cream/10 tw-transition-colors hover:tw-bg-[#0c2549]"
                                >
                                    <td className="tw-px-4 tw-py-4 tw-font-mono tw-text-[13.5px] tw-text-cream">
                                        {sys.military}
                                    </td>
                                    <td className="tw-px-4 tw-py-4 tw-font-body tw-text-[15px] tw-text-[#c4cad6]">
                                        {sys.civilian}
                                    </td>
                                    <td className="tw-px-4 tw-py-4 tw-text-right tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.1em] tw-text-accent">
                                        {DOMAIN_FOR(sys.military)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default SystemsTable;
