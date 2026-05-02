import SectionTitle from "@components/section-title";

const monoLabel = {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
};

const codeBody = {
    fontFamily: "var(--font-mono)",
    fontSize: "13.5px",
    lineHeight: "1.75",
};

const COMMENT = "rgba(185, 214, 242, 0.55)";
const KEYWORD = "#FDB330";
const TYPE = "#FFE169";
const STRING_COLOR = "#FFE169";
const NUMBER = "#FFE169";
const PUNCT = "rgba(248, 249, 250, 0.7)";
const IDENT = "#F8F9FA";

const HeroCodeSnippet = () => {
    return (
        <section className="dark-section tw-bg-navy tw-py-20 md:tw-py-[120px]">
            <div className="tw-container">
                <SectionTitle
                    color="C"
                    align="center"
                    subtitle="What you'll ship"
                    title="Real code, real engineers."
                    titleSize="large"
                    className="tw-mb-12 md:tw-mb-16"
                />

                <div className="tw-mx-auto tw-max-w-[860px]">
                    <div className="tw-overflow-hidden tw-border tw-border-[rgba(185,214,242,0.08)] tw-shadow-2xl">
                        {/* File path bar */}
                        <div
                            className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-2 tw-border-b tw-border-[rgba(185,214,242,0.08)] tw-bg-[#061a40] tw-px-5 tw-py-3"
                            style={{ ...monoLabel, color: "rgba(185, 214, 242, 0.65)" }}
                        >
                            <span>~/cohort-2024/modules/squad-roster.ts</span>
                            <span className="tw-flex tw-items-center tw-gap-2">
                                <span
                                    className="tw-inline-block tw-h-[6px] tw-w-[6px] tw-rounded-full tw-bg-gold"
                                    style={{
                                        animation:
                                            "pulse-soft 2.4s ease-in-out infinite",
                                    }}
                                />
                                <span>module 04 · typescript</span>
                            </span>
                        </div>

                        {/* Code body — template literals preserve newlines inside <pre> */}
                        <pre
                            className="tw-overflow-x-auto tw-bg-[#0a1f40] tw-px-6 tw-py-7 md:tw-px-9 md:tw-py-9"
                            style={{ ...codeBody, color: IDENT }}
                        >
                            <code>
                                <span
                                    style={{ color: COMMENT }}
                                >{`// Filter combat-ready engineers from the squad roster\n// Built during Module 04 — TypeScript fundamentals\n\n`}</span>
                                <span style={{ color: KEYWORD }}>interface</span>
                                {` `}
                                <span style={{ color: TYPE }}>ServiceMember</span>
                                {` `}
                                <span style={{ color: PUNCT }}>{`{`}</span>
                                {`\n  callsign: `}
                                <span style={{ color: KEYWORD }}>string</span>
                                <span style={{ color: PUNCT }}>;</span>
                                {`\n  branch: `}
                                <span
                                    style={{ color: STRING_COLOR }}
                                >{`'army' | 'navy' | 'air-force' | 'marines'`}</span>
                                <span style={{ color: PUNCT }}>;</span>
                                {`\n  yearsOfService: `}
                                <span style={{ color: KEYWORD }}>number</span>
                                <span style={{ color: PUNCT }}>;</span>
                                {`\n`}
                                <span style={{ color: PUNCT }}>{`}`}</span>
                                {`\n\n`}
                                <span style={{ color: KEYWORD }}>const</span>
                                {` deploySquad = (roster: `}
                                <span style={{ color: TYPE }}>ServiceMember[]</span>
                                {`): `}
                                <span style={{ color: TYPE }}>ServiceMember[]</span>
                                {` =>\n  roster.filter(member => member.yearsOfService >= `}
                                <span style={{ color: NUMBER }}>4</span>
                                <span style={{ color: PUNCT }}>);</span>
                            </code>
                        </pre>

                        {/* Attribution footer */}
                        <div
                            className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-2 tw-border-t tw-border-[rgba(185,214,242,0.08)] tw-bg-[#061a40] tw-px-5 tw-py-4"
                            style={{ ...monoLabel, color: "rgba(185, 214, 242, 0.7)" }}
                        >
                            <span>Source: VWC curriculum · Cohort 2024</span>
                            <span
                                style={{ color: KEYWORD }}
                            >{`// engineers, not students`}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroCodeSnippet;
