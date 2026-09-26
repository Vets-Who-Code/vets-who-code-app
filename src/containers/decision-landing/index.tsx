import { SectionEyebrow, SharpHeadline } from "@components/ui/design-system";
import { PROGRAM_FACTS } from "@data/accelerator";
import siteConfig from "@data/site-config";
import Button from "@ui/button";
import Link from "next/link";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import type { LandingFrontmatter } from "@/lib/mdx-pages";

type TProps = {
    frontmatter: LandingFrontmatter;
    mdxSource: MDXRemoteSerializeResult;
};

// Body links are plain MDX anchors on purpose: MarkdownRenderer would add
// target="_blank" rel="nofollow", which defeats the internal links to /apply
// and /curriculum these pages exist to carry.
const DecisionLandingContainer = ({ frontmatter, mdxSource }: TProps) => (
    <>
        <section
            className="dark-section tw-bg-navy tw-py-20 md:tw-py-[100px]"
            aria-labelledby="landing-heading"
        >
            <div className="tw-container">
                <SectionEyebrow
                    tone="dark"
                    label="For Veterans"
                    subLabel={siteConfig.cohortStatus}
                />
                <h1
                    id="landing-heading"
                    className="tw-mt-6 tw-max-w-[16em] tw-font-heading tw-text-[clamp(34px,5.4vw,72px)] tw-font-black tw-uppercase tw-leading-none tw-tracking-[-0.02em] tw-text-white"
                >
                    {frontmatter.title}
                </h1>
                <p className="tw-mt-6 tw-max-w-[660px] tw-text-[18px] tw-leading-[1.7] tw-text-[#DEE2E6]">
                    {frontmatter.lede}
                </p>
                <div className="tw-mt-8 tw-flex tw-flex-wrap tw-items-center tw-gap-6">
                    <Button path="/apply" size="md" color="primary" hover="default">
                        Apply
                    </Button>
                    <Link
                        href="/curriculum"
                        className="tw-font-heading tw-text-[14px] tw-font-medium tw-uppercase tw-tracking-[0.04em] tw-text-gold hover:tw-text-gold-light hover:tw-underline hover:tw-underline-offset-4"
                    >
                        See the curriculum →
                    </Link>
                </div>

                {/* Facts come from PROGRAM_FACTS so these pages cannot drift from /programs/accelerator. */}
                <dl className="tw-mt-14 tw-grid tw-grid-cols-2 tw-gap-px tw-border-t tw-border-[#B9D6F2]/[0.14] tw-bg-[#B9D6F2]/[0.14] md:tw-grid-cols-3 lg:tw-grid-cols-6">
                    {PROGRAM_FACTS.map(([term, value]) => (
                        <div key={term} className="tw-bg-navy tw-px-4 tw-py-5">
                            <dt className="tw-font-mono tw-text-[9.5px] tw-uppercase tw-tracking-[0.1em] tw-text-[#DEE2E6]">
                                {term}
                            </dt>
                            <dd className="tw-mt-2 tw-font-heading tw-text-[15px] tw-font-bold tw-leading-[1.35] tw-text-white">
                                {value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>

        <section className="tw-bg-white tw-py-16 md:tw-py-24">
            <div className="tw-container">
                <div className="tw-prose tw-max-w-[760px] prose-headings:tw-font-heading prose-headings:tw-uppercase prose-headings:tw-text-navy prose-a:tw-text-red prose-strong:tw-text-navy md:tw-prose-lg">
                    <MDXRemote {...mdxSource} />
                </div>
            </div>
        </section>

        {/* Visible FAQ text is the same array PageSeo turns into FAQPage JSON-LD. */}
        <section className="tw-bg-cream tw-py-16 md:tw-py-24" aria-labelledby="faq-heading">
            <div className="tw-container">
                <SectionEyebrow label="FAQ" />
                <SharpHeadline as="h2" size="h2" className="tw-mt-4">
                    <span id="faq-heading">Frequently asked questions</span>
                </SharpHeadline>
                <div className="tw-mt-12 tw-max-w-[860px] tw-border-t tw-border-navy/10">
                    {frontmatter.faq.map((item) => (
                        <div key={item.question} className="tw-border-b tw-border-navy/10 tw-py-7">
                            <h3 className="tw-m-0 tw-font-heading tw-text-[18px] tw-font-bold tw-text-navy">
                                {item.question}
                            </h3>
                            <p className="tw-mb-0 tw-mt-3 tw-text-[16px] tw-leading-[1.7] tw-text-body">
                                {item.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className="tw-bg-red tw-py-[72px]">
            <div className="tw-container tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-8">
                <div className="tw-max-w-[720px]">
                    <p className="tw-mb-4 tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.12em] tw-text-white">
                        {siteConfig.cohortStatus}
                    </p>
                    <h2 className="tw-m-0 tw-font-heading tw-text-[clamp(26px,3.2vw,40px)] tw-font-black tw-uppercase tw-text-white">
                        Retool. Retrain. Relaunch.
                    </h2>
                </div>
                <div className="tw-flex tw-flex-wrap tw-gap-3.5">
                    <Button path="/apply" color="light" size="md">
                        Apply
                    </Button>
                    <Button path="/programs/accelerator" color="light" variant="outlined" size="md">
                        About the accelerator
                    </Button>
                </div>
            </div>
        </section>
    </>
);

export default DecisionLandingContainer;
