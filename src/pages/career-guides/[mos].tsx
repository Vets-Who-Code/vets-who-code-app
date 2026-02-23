import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";
import type { CareerPathway, CognitiveProfile } from "@/lib/military-translator";

/** MOS codes with data across all 4 sources — highest-quality pages */
const SEO_MOS_CODES = [
    "11B", "25B", "35F", "68W", "31B", "42A", "92Y",
    "88M", "91B", "3P0X1", "HM", "CTN", "0311", "2651",
] as const;

interface TrainingData {
    branch: string;
    title: string;
    program: string;
    hours: number;
    weeks?: number;
    topics: string[];
    civilian_certs: string[];
    ace_credits?: string;
}

interface CertData {
    direct_qualifies: string[];
    partial_coverage: Array<{ cert: string; coverage: number; gaps: string }>;
    recommended_next: string[];
}

interface SystemEntry {
    military: string;
    civilian: string;
}

interface SystemsData {
    branch: string;
    title: string;
    systems: SystemEntry[];
}

interface MosPageProps {
    mosCode: string;
    training: TrainingData;
    certs: CertData;
    systems: SystemsData;
    pathways: CareerPathway[];
    cognitiveProfile: CognitiveProfile | null;
}

type PageWithLayout = NextPage<MosPageProps> & {
    Layout?: typeof Layout01;
};

function formatSalary(salary: number): string {
    return `$${(salary / 1000).toFixed(0)}K`;
}

const DATA_SOURCE_LABELS: Record<string, string> = {
    lightcast: "Salary data powered by Lightcast",
    census_acs: "Source: US Census Bureau ACS",
    curated: "Salary estimates from VWC career data",
};

const MosPage: PageWithLayout = ({ mosCode, training, certs, systems, pathways, cognitiveProfile }) => {
    const pageTitle = `${mosCode} ${training.title} — Military-to-Civilian Career Guide`;
    const pageDescription = `Free career guide for ${training.branch} ${mosCode} (${training.title}). Discover civilian job matches, salary data, certification pathways, and training equivalencies. Built by veterans, for veterans.`;

    return (
        <>
            <SEO title={pageTitle} description={pageDescription} />
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebPage",
                            "name": pageTitle,
                            "description": pageDescription,
                            "url": `https://vetswhocode.io/career-guides/${mosCode.toLowerCase()}`,
                            "isPartOf": {
                                "@type": "WebSite",
                                "name": "Military Career Guides",
                                "url": "https://vetswhocode.io/career-guides",
                            },
                            "creator": {
                                "@type": "Organization",
                                "name": "Vets Who Code",
                                "url": "https://vetswhocode.io",
                            },
                        }),
                    }}
                />
            </Head>

            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/career-guides", label: "Career Guides" },
                ]}
                currentPage={`${mosCode} Career Guide`}
                showTitle={false}
            />

            <div className="tw-container tw-py-16">
                <div className="tw-mx-auto tw-max-w-5xl">
                    {/* Header */}
                    <div className="tw-mb-10">
                        <span className="tw-inline-block tw-bg-[#091f40] tw-text-white tw-text-xs tw-font-semibold tw-px-3 tw-py-1 tw-rounded-full tw-mb-3">
                            {training.branch}
                        </span>
                        <h1 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-[#091f40] tw-mb-2">
                            {mosCode}: {training.title}
                        </h1>
                        <p className="tw-text-lg tw-text-gray-600">
                            Career transition guide for {training.branch} {training.title} ({mosCode})
                        </p>
                    </div>

                    {/* CTA to translator */}
                    <div className="tw-bg-gradient-to-r tw-from-[#091f40] tw-to-[#1a3a6b] tw-rounded-lg tw-p-6 tw-mb-10 tw-text-white">
                        <h2 className="tw-text-xl tw-font-bold tw-mb-2 tw-text-white">
                            Translate Your {mosCode} Experience Now
                        </h2>
                        <p className="tw-text-white tw-mb-4">
                            Get a personalized AI-powered translation of your military experience into civilian resume language.
                        </p>
                        <Link
                            href="/resume-translator"
                            className="tw-inline-block tw-bg-[#c5a44e] tw-text-[#091f40] tw-font-bold tw-px-6 tw-py-3 tw-rounded-lg hover:tw-bg-[#d4b55e] tw-transition-colors"
                        >
                            Start Free Translation
                        </Link>
                    </div>

                    {/* Career Pathways */}
                    {pathways.length > 0 && (
                        <section className="tw-mb-10">
                            <h2 className="tw-text-2xl tw-font-bold tw-text-[#091f40] tw-mb-4">
                                Civilian Career Pathways
                            </h2>
                            <p className="tw-text-gray-600 tw-mb-6">
                                Top civilian roles for {mosCode} veterans, with average salary and market demand data.
                            </p>
                            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                                {pathways.map((pathway) => (
                                    <div
                                        key={pathway.role}
                                        className="tw-border tw-border-gray-200 tw-rounded-lg tw-p-5"
                                    >
                                        <div className="tw-flex tw-items-start tw-justify-between tw-mb-2">
                                            <h3 className="tw-font-semibold tw-text-[#091f40]">
                                                {pathway.role}
                                            </h3>
                                            <div className="tw-text-right">
                                                <span className="tw-text-lg tw-font-bold tw-text-[#c5a44e]">
                                                    {formatSalary(pathway.avgSalary)}
                                                </span>
                                                {pathway.salaryRange && (
                                                    <p className="tw-text-xs tw-text-gray-500">
                                                        {formatSalary(pathway.salaryRange.p25)}&ndash;{formatSalary(pathway.salaryRange.p75)} range
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="tw-flex tw-gap-2 tw-mb-3">
                                            <span className="tw-text-xs tw-bg-blue-50 tw-text-blue-700 tw-px-2 tw-py-0.5 tw-rounded">
                                                {pathway.matchLevel}
                                            </span>
                                            <span className="tw-text-xs tw-bg-green-50 tw-text-green-700 tw-px-2 tw-py-0.5 tw-rounded">
                                                {pathway.demand}
                                            </span>
                                        </div>
                                        {pathway.skillsToClose && pathway.skillsToClose.length > 0 && (
                                            <div>
                                                <p className="tw-text-xs tw-text-gray-500 tw-mb-1">Skills to develop:</p>
                                                <div className="tw-flex tw-flex-wrap tw-gap-1">
                                                    {pathway.skillsToClose.map((skill) => (
                                                        <span
                                                            key={skill}
                                                            className="tw-text-xs tw-bg-gray-100 tw-text-gray-600 tw-px-2 tw-py-0.5 tw-rounded"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {pathways.length > 0 && (
                                <p className="tw-text-xs tw-text-gray-400 tw-text-right tw-mt-3">
                                    {DATA_SOURCE_LABELS[pathways[0]?.dataSource || "curated"]}
                                </p>
                            )}
                        </section>
                    )}

                    {/* Hidden Strengths / Cognitive Skills */}
                    {cognitiveProfile && (
                        <section className="tw-mb-10">
                            <h2 className="tw-text-2xl tw-font-bold tw-text-[#091f40] tw-mb-2">
                                <i className="fas fa-brain tw-mr-2 tw-text-[#c5203e]" />
                                Hidden Strengths
                            </h2>
                            <p className="tw-text-gray-600 tw-mb-6">
                                Cognitive skills your {mosCode} training built — and where they transfer.
                            </p>

                            <div className="tw-space-y-3 tw-mb-8">
                                {cognitiveProfile.cognitiveSkills.map((cs) => (
                                    <div key={cs.skill} className="tw-bg-gray-50 tw-rounded-lg tw-p-4">
                                        <h3 className="tw-font-semibold tw-text-[#091f40] tw-mb-1">{cs.skill}</h3>
                                        <p className="tw-text-sm tw-text-gray-500 tw-italic tw-mb-2">{cs.militaryContext}</p>
                                        <p className="tw-text-sm tw-text-gray-700">{cs.civilianTranslation}</p>
                                    </div>
                                ))}
                            </div>

                            <h3 className="tw-text-lg tw-font-semibold tw-text-[#091f40] tw-mb-3">
                                Non-Obvious Career Matches
                            </h3>
                            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                                {cognitiveProfile.nonObviousCareers.map((career) => (
                                    <div key={career.role} className="tw-border tw-border-gray-200 tw-rounded-lg tw-p-5">
                                        <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
                                            <h4 className="tw-font-semibold tw-text-[#091f40]">{career.role}</h4>
                                            <span className="tw-text-xs tw-bg-gray-100 tw-text-gray-500 tw-px-2 tw-py-0.5 tw-rounded tw-font-mono">
                                                SOC {career.socCode}
                                            </span>
                                        </div>
                                        <p className="tw-text-sm tw-text-gray-700">{career.whyItFits}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Training & Education */}
                    <section className="tw-mb-10">
                        <h2 className="tw-text-2xl tw-font-bold tw-text-[#091f40] tw-mb-4">
                            Training & Education Equivalencies
                        </h2>
                        <div className="tw-bg-gray-50 tw-rounded-lg tw-p-6">
                            <h3 className="tw-font-semibold tw-text-[#091f40] tw-mb-1">
                                {training.program}
                            </h3>
                            <div className="tw-flex tw-flex-wrap tw-gap-4 tw-text-sm tw-text-gray-600 tw-mb-4">
                                <span>{training.hours.toLocaleString()} training hours</span>
                                {training.weeks && <span>{training.weeks} weeks</span>}
                                {training.ace_credits && (
                                    <span className="tw-text-[#c5a44e] tw-font-medium">
                                        {training.ace_credits}
                                    </span>
                                )}
                            </div>
                            <h4 className="tw-font-medium tw-text-[#091f40] tw-mb-2">
                                Topics Covered
                            </h4>
                            <ul className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-1 tw-text-sm tw-text-gray-700">
                                {training.topics.map((topic) => (
                                    <li key={topic} className="tw-flex tw-items-start">
                                        <span className="tw-mr-2 tw-text-[#c5a44e]">&bull;</span>
                                        {topic}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Certifications */}
                    <section className="tw-mb-10">
                        <h2 className="tw-text-2xl tw-font-bold tw-text-[#091f40] tw-mb-4">
                            Certification Pathways
                        </h2>
                        {certs.direct_qualifies.length > 0 && (
                            <div className="tw-mb-4">
                                <h3 className="tw-font-semibold tw-text-green-700 tw-mb-2">
                                    <i className="fas fa-check-circle tw-mr-1" />
                                    Ready to Certify
                                </h3>
                                <div className="tw-flex tw-flex-wrap tw-gap-2">
                                    {certs.direct_qualifies.map((cert) => (
                                        <span
                                            key={cert}
                                            className="tw-bg-green-50 tw-text-green-800 tw-px-3 tw-py-1 tw-rounded-full tw-text-sm tw-font-medium"
                                        >
                                            {cert}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {certs.partial_coverage.length > 0 && (
                            <div className="tw-mb-4">
                                <h3 className="tw-font-semibold tw-text-[#091f40] tw-mb-2">
                                    Partial Coverage
                                </h3>
                                <div className="tw-space-y-3">
                                    {certs.partial_coverage.map((item) => (
                                        <div key={item.cert} className="tw-bg-gray-50 tw-rounded-lg tw-p-4">
                                            <div className="tw-flex tw-items-center tw-justify-between tw-mb-1">
                                                <span className="tw-font-medium tw-text-sm">{item.cert}</span>
                                                <span className="tw-text-sm tw-font-bold tw-text-[#c5a44e]">
                                                    {item.coverage}% covered
                                                </span>
                                            </div>
                                            <div className="tw-w-full tw-bg-gray-200 tw-rounded-full tw-h-2 tw-mb-2">
                                                <div
                                                    className="tw-bg-[#c5a44e] tw-h-2 tw-rounded-full"
                                                    style={{ width: `${item.coverage}%` }}
                                                />
                                            </div>
                                            <p className="tw-text-xs tw-text-gray-500">{item.gaps}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {certs.recommended_next.length > 0 && (
                            <div>
                                <h3 className="tw-font-semibold tw-text-[#091f40] tw-mb-2">
                                    Recommended Next Certifications
                                </h3>
                                <div className="tw-flex tw-flex-wrap tw-gap-2">
                                    {certs.recommended_next.map((cert) => (
                                        <span
                                            key={cert}
                                            className="tw-bg-blue-50 tw-text-blue-800 tw-px-3 tw-py-1 tw-rounded-full tw-text-sm"
                                        >
                                            {cert}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Technical Systems */}
                    {systems.systems.length > 0 && (
                        <section className="tw-mb-10">
                            <h2 className="tw-text-2xl tw-font-bold tw-text-[#091f40] tw-mb-4">
                                Technical Systems Translation
                            </h2>
                            <p className="tw-text-gray-600 tw-mb-4">
                                Military systems you&apos;ve used and their civilian equivalents for your resume.
                            </p>
                            <div className="tw-overflow-x-auto">
                                <table className="tw-w-full tw-text-sm">
                                    <thead>
                                        <tr className="tw-bg-gray-50">
                                            <th className="tw-text-left tw-p-3 tw-font-semibold tw-text-[#091f40]">
                                                Military System
                                            </th>
                                            <th className="tw-text-left tw-p-3 tw-font-semibold tw-text-[#091f40]">
                                                Civilian Equivalent
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {systems.systems.map((sys) => (
                                            <tr key={sys.military} className="tw-border-b tw-border-gray-100">
                                                <td className="tw-p-3 tw-text-gray-700 tw-font-medium">
                                                    {sys.military}
                                                </td>
                                                <td className="tw-p-3 tw-text-gray-600">
                                                    {sys.civilian}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    {/* Bottom CTA */}
                    <div className="tw-bg-gray-50 tw-rounded-lg tw-p-8 tw-text-center">
                        <h2 className="tw-text-2xl tw-font-bold tw-text-[#091f40] tw-mb-2">
                            Ready to Translate Your Experience?
                        </h2>
                        <p className="tw-text-gray-600 tw-mb-6">
                            Our AI-powered translator converts your {mosCode} experience into ATS-optimized civilian resume language.
                        </p>
                        <Link
                            href="/resume-translator"
                            className="tw-inline-block tw-bg-[#091f40] tw-text-white tw-font-bold tw-px-8 tw-py-3 tw-rounded-lg hover:tw-bg-[#0d2a54] tw-transition-colors"
                        >
                            Translate My Resume — Free
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

MosPage.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = async () => {
    // Pre-render the highest-quality pages at build time; all other valid
    // MOS codes are generated on-demand via fallback: "blocking"
    const paths = SEO_MOS_CODES.map((mos) => ({
        params: { mos: mos.toLowerCase() },
    }));
    return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const mosParam = (params?.mos as string).toUpperCase();

    const dataDir = path.join(process.cwd(), "src/data");
    const trainingMap = JSON.parse(
        fs.readFileSync(path.join(dataDir, "training-pipeline.json"), "utf-8")
    ) as Record<string, TrainingData>;
    const certsMap = JSON.parse(
        fs.readFileSync(path.join(dataDir, "cert-equivalencies.json"), "utf-8")
    ) as Record<string, CertData>;
    const systemsMap = JSON.parse(
        fs.readFileSync(path.join(dataDir, "military-systems-map.json"), "utf-8")
    ) as Record<string, SystemsData>;
    const pathwaysMap = JSON.parse(
        fs.readFileSync(path.join(dataDir, "career-pathways-map.json"), "utf-8")
    ) as Record<string, CareerPathway[]>;
    const cognitiveMap = JSON.parse(
        fs.readFileSync(path.join(dataDir, "cognitive-skills-map.json"), "utf-8")
    ) as Record<string, CognitiveProfile>;

    // Resolve the canonical MOS key: check SEO list first, then match
    // against training data keys (handles mixed-case codes like IT_NAVY)
    const mosCode =
        SEO_MOS_CODES.find((c) => c.toUpperCase() === mosParam) ||
        Object.keys(trainingMap).find((k) => k.toUpperCase() === mosParam) ||
        mosParam;

    const training = trainingMap[mosCode];
    if (!training) {
        return { notFound: true };
    }

    return {
        props: {
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
            mosCode,
            training,
            certs: certsMap[mosCode] || { direct_qualifies: [], partial_coverage: [], recommended_next: [] },
            systems: systemsMap[mosCode] || { branch: training.branch, title: training.title, systems: [] },
            pathways: pathwaysMap[mosCode] || [],
            cognitiveProfile: cognitiveMap[mosCode] || null,
        },
    };
};

export default MosPage;
