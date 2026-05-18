import SEO from "@components/seo/page-seo";
import CareerGuideDetailContainer from "@containers/career-guide-detail";
import { buildDetail } from "@containers/career-guide-detail/derive";
import type {
    CareerGuideDetail,
    CertData,
    CognitiveProfile,
    PathwayEntry,
    SystemsData,
    TechPathway,
    TrainingData,
} from "@containers/career-guide-detail/types";
import Layout01 from "@layout/layout-01";
import fs from "fs";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import path from "path";

const SEO_MOS_CODES = [
    "11B",
    "25B",
    "35F",
    "68W",
    "31B",
    "42A",
    "92Y",
    "88M",
    "91B",
    "3P0X1",
    "HM",
    "CTN",
    "0311",
    "2651",
] as const;

interface TechRoleSeed {
    key: string;
    title: string;
    track: string;
    socCode: string;
    description: string;
    stack: string[];
}

interface TechPathwayBundle {
    techRoles: Array<{
        roleKey: string;
        matchLevel: "high" | "good" | "moderate";
        whyItFits: string;
    }>;
    skillsYouHave: Array<{ from: string; to: string }>;
    skillsToLearn: Array<{ skill: string; forRole: string }>;
}

interface MosPageProps {
    detail: CareerGuideDetail;
}

type PageWithLayout = NextPage<MosPageProps> & {
    Layout?: typeof Layout01;
};

const MosPage: PageWithLayout = ({ detail }) => {
    const pageTitle = `${detail.code} ${detail.training.title} — Military-to-Civilian Career Guide`;
    const pageDescription = `Free career guide for ${detail.training.branch} ${detail.code} (${detail.training.title}). Civilian career pathways, salary data, certification pathways, and training equivalencies. Built by veterans, for veterans.`;

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
                            name: pageTitle,
                            description: pageDescription,
                            url: `https://vetswhocode.io/career-guides/${detail.code.toLowerCase()}`,
                            isPartOf: {
                                "@type": "WebSite",
                                name: "Military Career Guides",
                                url: "https://vetswhocode.io/career-guides",
                            },
                            creator: {
                                "@type": "Organization",
                                name: "Vets Who Code",
                                url: "https://vetswhocode.io",
                            },
                        }),
                    }}
                />
            </Head>
            <CareerGuideDetailContainer detail={detail} />
        </>
    );
};

MosPage.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = async () => {
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
    ) as Record<string, PathwayEntry[]>;
    const cognitiveMap = JSON.parse(
        fs.readFileSync(path.join(dataDir, "cognitive-skills-map.json"), "utf-8")
    ) as Record<string, CognitiveProfile>;

    const techPathwaysPath = path.join(dataDir, "tech-pathways-map.json");
    const techTaxonomyPath = path.join(dataDir, "tech-roles-taxonomy.json");
    const techPathwaysMap: Record<string, TechPathwayBundle> = fs.existsSync(techPathwaysPath)
        ? (JSON.parse(fs.readFileSync(techPathwaysPath, "utf-8")) as Record<
              string,
              TechPathwayBundle
          >)
        : {};
    const techTaxonomy: { roles: TechRoleSeed[] } = fs.existsSync(techTaxonomyPath)
        ? (JSON.parse(fs.readFileSync(techTaxonomyPath, "utf-8")) as { roles: TechRoleSeed[] })
        : { roles: [] };
    const taxonomyByKey = new Map(techTaxonomy.roles.map((r) => [r.key, r]));

    const mosCode =
        SEO_MOS_CODES.find((c) => c.toUpperCase() === mosParam) ||
        Object.keys(trainingMap).find((k) => k.toUpperCase() === mosParam) ||
        mosParam;

    const training = trainingMap[mosCode];
    if (!training) return { notFound: true };

    const techBundle = techPathwaysMap[mosCode];
    const techPathway: TechPathway | null = techBundle
        ? {
              roles: techBundle.techRoles
                  .map((r) => {
                      const seed = taxonomyByKey.get(r.roleKey);
                      if (!seed) return null;
                      return {
                          roleKey: r.roleKey,
                          matchLevel: r.matchLevel,
                          whyItFits: r.whyItFits,
                          title: seed.title,
                          track: seed.track,
                          socCode: seed.socCode,
                          description: seed.description,
                          stack: seed.stack,
                      };
                  })
                  .filter((r): r is NonNullable<typeof r> => r !== null),
              skillsYouHave: techBundle.skillsYouHave,
              skillsToLearn: techBundle.skillsToLearn,
          }
        : null;

    const detail = buildDetail({
        code: mosCode,
        training,
        certs: certsMap[mosCode] || {
            direct_qualifies: [],
            partial_coverage: [],
            recommended_next: [],
        },
        systems: systemsMap[mosCode] || {
            branch: training.branch,
            title: training.title,
            systems: [],
        },
        pathways: pathwaysMap[mosCode] || [],
        cognitiveProfile: cognitiveMap[mosCode] || null,
        techPathway,
    });

    return {
        props: {
            layout: {
                headerShadow: false,
                headerFluid: false,
                footerMode: "dark",
                bodyClass: "tw-bg-secondary",
            },
            detail,
        },
    };
};

export default MosPage;
