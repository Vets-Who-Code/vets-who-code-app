import Breadcrumb from "@components/breadcrumb";
import MarkdownRenderer from "@components/markdown-renderer";
import { BuiltBy, LinkButtons, RepoStats, TechStack } from "@components/projects";
import SEO from "@components/seo/page-seo";
import siteConfig from "@data/site-config";
import Layout01 from "@layout/layout-01";
import { VWCProject } from "@utils/types";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { getProjectPageData, getProjectSlugs } from "../../lib/project";

type TProps = {
    project: VWCProject;
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const ProjectDetail: PageProps = ({ project }: TProps) => {
    const { details, repo } = project;
    const githubUrl = `https://github.com/${details.owner}/${details.repo}`;
    const shippedYear = details.shippedAt.slice(0, 4);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: details.name,
        description: details.summary,
        url: `${siteConfig.url}/projects/${details.slug}`,
        codeRepository: githubUrl,
        programmingLanguage: details.technologies,
        image: details.thumbnail.src,
        datePublished: details.shippedAt,
        contributor: details.builtBy.map(({ login }) => ({
            "@type": "Person",
            name: login,
            url: `https://github.com/${login}`,
        })),
        publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
        },
        ...(details.live_url
            ? {
                  targetProduct: {
                      "@type": "SoftwareApplication",
                      name: details.name,
                      url: details.live_url,
                  },
              }
            : {}),
    };

    return (
        <>
            <SEO title={details.name} description={details.summary} image={details.thumbnail.src} />
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </Head>
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/projects", label: "projects" },
                ]}
                currentPage={details.name}
                showTitle={false}
                hideHeading={true}
            />
            <div className="tw-container tw-pb-15 md:tw-pb-20 lg:tw-pb-[100px]">
                <div className="tw-grid tw-grid-cols-1 tw-gap-10 md:tw-grid-cols-3">
                    <div className="tw-space-y-6 md:tw-col-span-1">
                        <img
                            src={details.thumbnail.src}
                            alt={details.thumbnail.alt}
                            draggable="false"
                            className="tw-w-full tw-rounded-md tw-drop-shadow-lg"
                        />
                        {repo && <RepoStats repo={repo} />}
                        <BuiltBy contributors={details.builtBy} />
                    </div>
                    <div className="md:tw-col-span-2">
                        <p className="tw-mb-3 tw-flex tw-items-center tw-gap-3 tw-text-sm tw-uppercase tw-tracking-widest tw-text-primary">
                            <span className="tw-inline-block tw-h-0.5 tw-w-4 tw-bg-primary" />
                            {details.status} · Shipped {shippedYear}
                        </p>
                        <h1 className="tw-mb-2 tw-text-secondary">{details.name}</h1>
                        <h3 className="tw-text-primary">{details.headline}</h3>
                        <p className="tw-text-lg tw-text-secondary">{details.summary}</p>
                        <p className="tw-text-secondary">
                            <span className="tw-font-medium tw-uppercase tw-tracking-wider">
                                Serves:
                            </span>{" "}
                            {details.serves}
                        </p>
                        <TechStack techStack={details.technologies} />
                        <LinkButtons github_url={githubUrl} live_url={details.live_url} />
                        {details.long_description.map((pg) => (
                            <div key={pg} className="tw-text-secondary">
                                <MarkdownRenderer content={pg} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

ProjectDetail.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: getProjectSlugs().map((slug) => ({ params: { slug } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const project = await getProjectPageData(params?.slug as string);
    return {
        props: {
            project,
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default ProjectDetail;
