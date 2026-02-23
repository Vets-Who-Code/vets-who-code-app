import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import ResumeTranslator from "@components/translator/ResumeTranslator";
import Layout01 from "@layout/layout-01";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import type { JobCodeEntry } from "@/types/job-codes";

type TProps = {
    jobCodeIndex: JobCodeEntry[];
};

type PageWithLayout = NextPage<TProps> & {
    Layout?: typeof Layout01;
};

const RESUME_TIPS = {
    dos: [
        "Use action verbs to start each bullet point",
        "Include specific numbers and metrics",
        "Focus on results and outcomes",
        "Highlight transferable leadership skills",
    ],
    donts: [
        "Use military acronyms without explanation",
        "Assume civilians know military terminology",
        "List duties without showing impact",
        "Forget to quantify your achievements",
    ],
};

const ResumeTranslatorPage: PageWithLayout = ({ jobCodeIndex }) => {
    return (
        <>
            <SEO
                title="Military-to-Civilian Resume Translator"
                description="Free AI-powered military-to-civilian resume translator. Convert your MOS, rank, and duties into ATS-optimized civilian resume language instantly. Supports all branches — Army, Navy, Marines, Air Force, Coast Guard. Built by veterans, for veterans."
            />
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebApplication",
                            "name": "Military-to-Civilian Resume Translator",
                            "description": "Free AI-powered tool that translates military experience (MOS codes, rank, duties) into civilian resume language. Instant results with 10-layer extraction engine.",
                            "url": "https://vetswhocode.io/resume-translator",
                            "applicationCategory": "BusinessApplication",
                            "operatingSystem": "Any",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "USD",
                            },
                            "creator": {
                                "@type": "Organization",
                                "name": "Vets Who Code",
                                "url": "https://vetswhocode.io",
                            },
                            "featureList": [
                                "Military MOS/AFSC to civilian job title translation",
                                "AI-powered resume bullet generation",
                                "ATS-optimized output",
                                "PDF and TXT resume export",
                                "LinkedIn summary export",
                                "Certification pathway recommendations",
                                "Career pathway mapping with salary data",
                                "Supports 4,455+ military job codes",
                                "All U.S. military branches supported",
                            ],
                        }),
                    }}
                />
            </Head>
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Military-to-Civilian Translator"
                showTitle={false}
            />

            <div className="tw-container tw-py-16">
                <ResumeTranslator
                    className="tw-mx-auto tw-max-w-5xl"
                    jobCodeIndex={jobCodeIndex}
                />

                {/* Career Guides CTA */}
                <div className="tw-mt-16 tw-mx-auto tw-max-w-5xl">
                    <div className="tw-bg-gradient-to-r tw-from-[#091f40] tw-to-[#1a3a6b] tw-rounded-lg tw-p-8 tw-text-white">
                        <h2 className="tw-text-2xl tw-font-bold tw-mb-2 tw-text-white">
                            Browse Career Guides by Job Code
                        </h2>
                        <p className="tw-text-white tw-mb-4">
                            Explore detailed career guides for every military job code — including civilian career pathways, certification equivalencies, training data, and salary information.
                        </p>
                        <Link
                            href="/career-guides"
                            className="tw-inline-block tw-bg-[#c5a44e] tw-text-[#091f40] tw-font-bold tw-px-6 tw-py-3 tw-rounded-lg hover:tw-bg-[#d4b55e] tw-transition-colors"
                        >
                            Browse All Career Guides
                        </Link>
                    </div>
                </div>

                {/* Resume Writing Tips */}
                <div className="tw-mt-16 tw-mx-auto tw-max-w-5xl">
                    <div className="tw-bg-gray-50 tw-rounded-lg tw-p-8">
                        <h2 className="tw-text-2xl tw-font-bold tw-text-[#091f40] tw-mb-4">
                            Resume Writing Tips
                        </h2>
                        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
                            <div>
                                <h3 className="tw-font-semibold tw-text-[#091f40] tw-mb-2">
                                    <i className="fas fa-check-circle tw-text-success tw-mr-2" />
                                    Do:
                                </h3>
                                <ul className="tw-space-y-2 tw-text-gray-700">
                                    {RESUME_TIPS.dos.map((tip) => (
                                        <li
                                            key={tip}
                                            className="tw-flex tw-items-start"
                                        >
                                            <span className="tw-mr-2">
                                                &bull;
                                            </span>
                                            <span>{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="tw-font-semibold tw-text-[#091f40] tw-mb-2">
                                    <i className="fas fa-times-circle tw-text-danger tw-mr-2" />
                                    Don&apos;t:
                                </h3>
                                <ul className="tw-space-y-2 tw-text-gray-700">
                                    {RESUME_TIPS.donts.map((tip) => (
                                        <li
                                            key={tip}
                                            className="tw-flex tw-items-start"
                                        >
                                            <span className="tw-mr-2">
                                                &bull;
                                            </span>
                                            <span>{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

ResumeTranslatorPage.Layout = Layout01;

export const getStaticProps: GetStaticProps = async () => {
    const jobCodeIndex = (await import("@data/job-codes-index.json")).default;
    return {
        props: {
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
            jobCodeIndex,
        },
    };
};

export default ResumeTranslatorPage;
