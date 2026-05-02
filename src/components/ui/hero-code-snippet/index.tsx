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
const METHOD = "#84C1FF";
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
                            <span>~/vwc/train.ts</span>
                            <span className="tw-flex tw-items-center tw-gap-2">
                                <span
                                    className="tw-inline-block tw-h-[6px] tw-w-[6px] tw-rounded-full tw-bg-gold"
                                    style={{
                                        animation:
                                            "pulse-soft 2.4s ease-in-out infinite",
                                    }}
                                />
                                <span>since 2014 · live</span>
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
                                >{`// vetswhocode.io\n// engineers, not students.\n\n`}</span>
                                <span style={{ color: KEYWORD }}>const</span>
                                {` train = (veteran: `}
                                <span style={{ color: TYPE }}>Veteran</span>
                                {`) =>\n  hashflagStack\n    `}
                                <span style={{ color: PUNCT }}>.</span>
                                <span style={{ color: METHOD }}>deploy</span>
                                <span style={{ color: PUNCT }}>(</span>
                                veteran
                                <span style={{ color: PUNCT }}>)</span>
                                {`\n    `}
                                <span style={{ color: PUNCT }}>.</span>
                                <span style={{ color: METHOD }}>ship</span>
                                <span style={{ color: PUNCT }}>(</span>
                                realProduct
                                <span style={{ color: PUNCT }}>)</span>
                                {`\n    `}
                                <span style={{ color: PUNCT }}>.</span>
                                <span style={{ color: METHOD }}>hire</span>
                                <span style={{ color: PUNCT }}>();</span>
                                {`\n\n`}
                                <span
                                    style={{ color: COMMENT }}
                                >{`// 300+ deployed · $20M+ collective earnings · <1% acceptance`}</span>
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroCodeSnippet;
