import { MonoMeta, SectionEyebrow, SharpHeadline, StatStrip } from "@components/ui/design-system";
import {
    CLOSE,
    type CodeBlock,
    type Cta,
    DATA_SOURCES,
    HERO,
    isPending,
    KIT,
    LAWS,
    MODULES,
    OUTCOMES,
    PRIVACY,
    SCORING_CHAIN,
    type SectionIntro,
} from "@data/job-hunting-ai";
import Button from "@ui/button";
import clsx from "clsx";
import { useState } from "react";
import styles from "./job-hunting-ai.module.css";

const CONTAINER = "tw-mx-auto tw-w-full tw-max-w-[1230px] tw-px-6";
const SECTION = "tw-py-16 md:tw-py-[96px]";
const BODY = "tw-font-body tw-text-[15px] tw-leading-body";
const HEADLINE = "!tw-font-black";

// White card: 1px silver border, 2px red top border and a lift on hover. The red bar is a
// pseudo-element so the hover doesn't shift the layout.
const CARD = clsx(
    "tw-relative tw-h-full tw-border tw-border-solid tw-border-gray-100 tw-bg-white tw-p-[30px]",
    "tw-transition tw-duration-200 tw-ease-out hover:-tw-translate-y-0.5 hover:tw-shadow-4md hover:tw-shadow-navy/10",
    "before:tw-absolute before:tw-inset-x-[-1px] before:tw-top-[-1px] before:tw-h-[2px] before:tw-bg-red before:tw-opacity-0 before:tw-transition-opacity before:tw-content-[''] hover:before:tw-opacity-100"
);

const pad = (n: number) => String(n).padStart(2, "0");

const CtaButton = ({ cta }: { cta: Cta }) => {
    if (isPending(cta.href)) {
        return (
            <span
                aria-disabled="true"
                className={clsx(
                    "tw-inline-flex tw-min-h-[48px] tw-min-w-max tw-cursor-not-allowed tw-items-center tw-justify-center tw-border tw-border-solid tw-px-7 tw-text-xs tw-font-bold tw-uppercase tw-tracking-wider tw-opacity-50 md:tw-min-h-[52px] md:tw-px-10 [font-family:var(--font-headline)]",
                    cta.variant === "primary" && "tw-border-red tw-bg-red tw-text-white",
                    cta.variant === "light" && "tw-border-white tw-bg-white tw-text-navy",
                    cta.variant === "ghost" && "tw-border-white/15 tw-text-white"
                )}
            >
                {cta.label}
            </span>
        );
    }
    return (
        <Button
            path={cta.href}
            size="md"
            variant={cta.variant === "ghost" ? "outlined" : "contained"}
            color={cta.variant === "primary" ? "primary" : "light"}
            hover="default"
            {...(cta.href.startsWith("#") ? { target: "_self" as const } : {})}
        >
            {cta.label}
        </Button>
    );
};

const CtaRow = ({ ctas, className }: { ctas: Cta[]; className?: string }) => (
    <div className={clsx("tw-flex tw-flex-wrap tw-gap-4", className)}>
        {ctas.map((cta) => (
            <CtaButton key={cta.label} cta={cta} />
        ))}
    </div>
);

const Intro = ({ intro, id }: { intro: SectionIntro; id: string }) => (
    <header className="tw-max-w-[760px]">
        <SectionEyebrow label={intro.eyebrow} size="md" />
        <SharpHeadline id={id} className={clsx("tw-mt-5", HEADLINE)}>
            {intro.title}
        </SharpHeadline>
        <p className={clsx(BODY, "tw-mb-0 tw-mt-5 tw-text-gray-300")}>{intro.lede}</p>
    </header>
);

const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        } catch {
            setCopied(false);
        }
    };
    return (
        <button
            type="button"
            aria-label="Copy command"
            onClick={copy}
            className="tw-inline-flex tw-h-8 tw-w-8 tw-shrink-0 tw-items-center tw-justify-center tw-border tw-border-solid tw-border-white/20 tw-bg-transparent tw-text-gray-100 tw-transition hover:tw-border-gold hover:tw-text-gold active:tw-scale-95"
        >
            <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
            >
                {copied ? (
                    <path d="M5 12l5 5L20 7" />
                ) : (
                    <>
                        <rect x="9" y="9" width="11" height="11" />
                        <path d="M5 15H4V4h11v1" />
                    </>
                )}
            </svg>
        </button>
    );
};

const Code = ({ block }: { block: CodeBlock }) => (
    <div className="tw-min-w-0">
        <MonoMeta size="md" tone="gold" as="p" className="tw-mb-2">
            {block.label}
        </MonoMeta>
        <div className="tw-flex tw-items-start tw-gap-3 tw-bg-navy tw-p-4">
            <pre
                className={clsx(
                    "tw-m-0 tw-min-w-0 tw-flex-1 tw-overflow-x-auto tw-bg-transparent tw-p-0 tw-font-mono tw-text-[13px] tw-leading-[1.7]",
                    block.highlight ? "tw-text-gold" : "tw-text-white"
                )}
            >
                <code>{block.lines.join("\n")}</code>
            </pre>
            <CopyButton text={block.lines.join("\n")} />
        </div>
    </div>
);

const JobHuntingAiContainer = () => (
    <div className={styles.page}>
        {/* 1. Hero */}
        <section
            className={clsx("dark-section", styles.hero, "tw-pb-0 tw-pt-16 md:tw-pt-[96px]")}
            aria-labelledby="jh-title"
        >
            <div className={CONTAINER}>
                <SectionEyebrow label={HERO.eyebrow} tone="dark" size="md" />
                <SharpHeadline
                    as="h1"
                    size="h1"
                    tone="white"
                    className={clsx("tw-mt-6", HEADLINE)}
                    id="jh-title"
                >
                    {HERO.title}
                </SharpHeadline>
                <p className="tw-mb-0 tw-mt-6 tw-max-w-[760px] tw-font-heading tw-text-[clamp(18px,2vw,22px)] tw-font-bold tw-uppercase tw-leading-[1.35] tw-text-gold">
                    {HERO.subhead}
                </p>
                <p className={clsx(BODY, "tw-mb-0 tw-mt-5 tw-max-w-[660px] tw-text-gray-100")}>
                    {HERO.lede}
                </p>
                <CtaRow ctas={HERO.ctas} className="tw-mt-9" />
                <StatStrip
                    cells={HERO.stats}
                    valueTone="gold"
                    className={clsx("tw-mt-14", styles.stats)}
                />
                <MonoMeta size="md" as="p" className="tw-m-0 tw-py-6 !tw-text-gray-100">
                    {HERO.meta}
                </MonoMeta>
            </div>
        </section>

        {/* 2. What you'll leave with */}
        <section className={clsx(SECTION, "tw-bg-cream")} aria-labelledby="jh-outcomes">
            <div className={CONTAINER}>
                <Intro intro={OUTCOMES} id="jh-outcomes" />
                <ol className="tw-m-0 tw-mt-12 tw-grid tw-list-none tw-grid-cols-1 tw-gap-6 tw-p-0 sm:tw-grid-cols-2 lg:tw-grid-cols-4">
                    {OUTCOMES.items.map((item, i) => (
                        <li key={item.title} className={CARD}>
                            <MonoMeta size="md" tone="accent">
                                {pad(i + 1)}
                            </MonoMeta>
                            <h3 className="tw-mb-0 tw-mt-4 tw-font-heading tw-text-[18px] tw-font-extrabold tw-uppercase tw-leading-[1.2] tw-text-navy [letter-spacing:-0.02em]">
                                {item.title}
                            </h3>
                            <p className={clsx(BODY, "tw-mb-0 tw-mt-3 tw-text-gray-300")}>
                                {item.body}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>

        {/* 3. The Three Laws */}
        <section className={clsx(SECTION, "dark-section tw-bg-navy")} aria-label="The Three Laws">
            <div className={CONTAINER}>
                <ol className="tw-m-0 tw-grid tw-list-none tw-grid-cols-1 tw-gap-6 tw-p-0 md:tw-grid-cols-3">
                    {LAWS.map((law, i) => (
                        <li
                            key={law.title}
                            className="tw-border tw-border-solid tw-border-white/15 tw-p-[30px]"
                        >
                            <span
                                aria-hidden="true"
                                className="tw-block tw-font-heading tw-text-[64px] tw-font-black tw-leading-none tw-text-gold"
                            >
                                {i + 1}
                            </span>
                            <h3 className="tw-mb-0 tw-mt-5 tw-font-heading tw-text-[22px] tw-font-black tw-uppercase tw-leading-[1.15] tw-text-white [letter-spacing:-0.02em]">
                                {law.title}
                            </h3>
                            <p className={clsx(BODY, "tw-mb-0 tw-mt-3 tw-text-gray-100")}>
                                {law.body}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>

        {/* 4. Modules and take-home labs */}
        <section id="labs" className={clsx(SECTION, "tw-bg-cream")} aria-labelledby="jh-labs">
            <div className={CONTAINER}>
                <Intro intro={MODULES} id="jh-labs" />
                <ol className="tw-m-0 tw-mt-12 tw-list-none tw-border tw-border-solid tw-border-gray-100 tw-bg-white tw-p-0">
                    {MODULES.items.map((mod) => (
                        <li
                            key={mod.id}
                            className="tw-grid tw-grid-cols-1 tw-gap-4 tw-border-0 tw-border-t tw-border-solid tw-border-gray-100 tw-p-6 first:tw-border-t-0 md:tw-grid-cols-[64px_minmax(0,1fr)_minmax(0,320px)] md:tw-gap-8 md:tw-p-[30px]"
                        >
                            <span className="tw-font-mono tw-text-[14px] tw-font-bold tw-uppercase tw-tracking-[0.1em] tw-text-red">
                                {mod.id}
                            </span>
                            <div className="tw-min-w-0">
                                <h3 className="tw-m-0 tw-font-heading tw-text-[18px] tw-font-extrabold tw-uppercase tw-leading-[1.2] tw-text-navy [letter-spacing:-0.02em]">
                                    {mod.title}
                                </h3>
                                <p className={clsx(BODY, "tw-mb-0 tw-mt-2 tw-text-gray-300")}>
                                    {mod.lab}
                                </p>
                            </div>
                            {mod.tools.length > 0 ? (
                                <ul className="tw-m-0 tw-flex tw-min-w-0 tw-list-none tw-flex-wrap tw-content-start tw-gap-2 tw-p-0">
                                    {mod.tools.map((tool) => (
                                        <li
                                            key={tool}
                                            className="tw-bg-navy/[0.06] tw-px-2 tw-py-1 tw-font-mono tw-text-[12px] tw-leading-[1.4] tw-text-navy"
                                        >
                                            {tool}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <span aria-hidden="true" />
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </section>

        {/* 5. The scoring chain */}
        <section
            className={clsx(SECTION, "tw-bg-cream tw-pt-0 md:tw-pt-0")}
            aria-labelledby="jh-chain"
        >
            <div className={CONTAINER}>
                <Intro intro={SCORING_CHAIN} id="jh-chain" />
                <ol className="tw-m-0 tw-mt-12 tw-grid tw-list-none tw-grid-cols-1 tw-gap-6 tw-p-0 sm:tw-grid-cols-2 lg:tw-grid-cols-4">
                    {SCORING_CHAIN.steps.map((step, i) => (
                        <li key={step.title} className={CARD}>
                            <MonoMeta size="md" tone="accent">
                                Step {i + 1}
                            </MonoMeta>
                            <h5 className="tw-mb-0 tw-mt-4 tw-break-words tw-font-mono tw-text-[16px] tw-font-bold tw-text-navy">
                                {step.title}
                            </h5>
                            <p className={clsx(BODY, "tw-mb-0 tw-mt-3 tw-text-gray-300")}>
                                {step.body}
                            </p>
                        </li>
                    ))}
                </ol>
                <p className="tw-mb-0 tw-mt-8 tw-max-w-[760px] tw-font-mono tw-text-[12px] tw-leading-[1.6] tw-text-gray-300">
                    {SCORING_CHAIN.footnote}
                </p>
            </div>
        </section>

        {/* 6. Get the kit */}
        <section
            id="kit"
            className={clsx(SECTION, "dark-section tw-bg-ink")}
            aria-labelledby="jh-kit"
        >
            <div
                className={clsx(
                    CONTAINER,
                    "tw-grid tw-grid-cols-1 tw-gap-12 lg:tw-grid-cols-2 lg:tw-gap-16"
                )}
            >
                <div className="tw-min-w-0">
                    <SectionEyebrow label={KIT.eyebrow} tone="dark" size="md" />
                    <SharpHeadline id="jh-kit" tone="white" className={clsx("tw-mt-5", HEADLINE)}>
                        {KIT.title}
                    </SharpHeadline>
                    <p className={clsx(BODY, "tw-mb-0 tw-mt-5 tw-text-gray-100")}>{KIT.lede}</p>
                    <ul className="tw-m-0 tw-mt-6 tw-list-none tw-space-y-3 tw-p-0">
                        {KIT.bullets.map((b) => (
                            <li key={b} className={clsx(BODY, "tw-flex tw-gap-3 tw-text-gray-100")}>
                                <span
                                    aria-hidden="true"
                                    className="tw-mt-[0.8em] tw-inline-block tw-h-[2px] tw-w-3 tw-shrink-0 tw-bg-gold"
                                />
                                {b}
                            </li>
                        ))}
                    </ul>
                    <CtaRow ctas={KIT.ctas} className="tw-mt-9" />
                    <p id="slides" className={clsx(BODY, "tw-mb-0 tw-mt-6")}>
                        {isPending(KIT.slides.href) ? (
                            <span
                                aria-disabled="true"
                                className="tw-cursor-not-allowed tw-text-gray-100 tw-opacity-60"
                            >
                                {KIT.slides.label}
                            </span>
                        ) : (
                            <a
                                href={KIT.slides.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tw-text-white tw-underline tw-decoration-gold tw-underline-offset-4 hover:tw-text-gold"
                            >
                                {KIT.slides.label}
                            </a>
                        )}
                    </p>
                </div>
                <div className="tw-flex tw-min-w-0 tw-flex-col tw-gap-6">
                    {KIT.codeBlocks.map((block) => (
                        <Code key={block.label} block={block} />
                    ))}
                </div>
            </div>
        </section>

        {/* 7. Data sources */}
        <section className={clsx(SECTION, "tw-bg-cream")} aria-labelledby="jh-data">
            <div className={CONTAINER}>
                <Intro intro={DATA_SOURCES} id="jh-data" />
                <ul className="tw-m-0 tw-mt-12 tw-grid tw-list-none tw-grid-cols-1 tw-gap-6 tw-p-0 sm:tw-grid-cols-2 lg:tw-grid-cols-3">
                    {DATA_SOURCES.items.map((source) => {
                        const inner = (
                            <>
                                <h3 className="tw-m-0 tw-font-heading tw-text-[18px] tw-font-extrabold tw-uppercase tw-leading-[1.2] tw-text-navy [letter-spacing:-0.02em]">
                                    {source.title}
                                    {source.href ? (
                                        <span aria-hidden="true" className="tw-ml-2 tw-text-red">
                                            ↗
                                        </span>
                                    ) : null}
                                </h3>
                                <p className={clsx(BODY, "tw-mb-0 tw-mt-3 tw-text-gray-300")}>
                                    {source.body}
                                </p>
                            </>
                        );
                        return (
                            <li key={source.title}>
                                {source.href ? (
                                    <a
                                        href={source.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={clsx(CARD, "tw-block tw-no-underline")}
                                    >
                                        {inner}
                                    </a>
                                ) : (
                                    <div className={CARD}>{inner}</div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>

        {/* 8. Privacy + close */}
        <section className={clsx(SECTION, "tw-bg-cream tw-pt-0 md:tw-pt-0")}>
            <div className={clsx(CONTAINER, "tw-grid tw-grid-cols-1 tw-gap-6 lg:tw-grid-cols-2")}>
                <div className="tw-border tw-border-solid tw-border-gray-100 tw-bg-white tw-p-[30px] md:tw-p-12">
                    <SectionEyebrow label={PRIVACY.eyebrow} size="md" />
                    <h4 className="tw-mb-0 tw-mt-5 tw-font-heading tw-text-[24px] tw-font-black tw-uppercase tw-leading-[1.15] tw-text-navy [letter-spacing:-0.02em]">
                        {PRIVACY.title}
                    </h4>
                    <p className={clsx(BODY, "tw-mb-0 tw-mt-4 tw-text-gray-300")}>{PRIVACY.body}</p>
                </div>
                <div className="dark-section tw-bg-navy tw-p-[30px] md:tw-p-12">
                    <SharpHeadline as="h3" size="h3" tone="white" className={HEADLINE}>
                        {CLOSE.title}
                    </SharpHeadline>
                    <p className={clsx(BODY, "tw-mb-0 tw-mt-4 tw-text-gray-100")}>{CLOSE.body}</p>
                    <CtaRow ctas={CLOSE.ctas} className="tw-mt-8" />
                </div>
            </div>
        </section>
    </div>
);

export default JobHuntingAiContainer;
