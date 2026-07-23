import siteConfig from "@data/site-config";
import { useRouter } from "next/router";
import { ArticleJsonLd, CourseJsonLd, NextSeo, NextSeoProps } from "next-seo";

interface SeoProps extends NextSeoProps {
    template?: string;
    jsonLdType?: "article" | "course";
    article?: {
        publishedTime: string;
        modifiedTime: string;
        authors: string[];
        tags: string[];
    };
    image?: string;
    instructor?: {
        name: string;
        path: string;
    };
}

const PageSeo = ({
    title,
    description,
    template,
    openGraph,
    jsonLdType,
    article,
    image,
    instructor,
}: SeoProps) => {
    // Built from the router, not window.location in an effect — scrapers don't
    // run JS, so the effect version left og:url empty and every share fell back
    // to the site-wide canonical (the homepage).
    const { asPath } = useRouter();
    // asPath can be absent when the router is mocked or not yet mounted; fall
    // back to the bare site URL rather than rendering "undefined" into og:url.
    const path = asPath?.split(/[?#]/)[0] ?? "";
    const href = `${siteConfig.url}${path === "/" ? "" : path}`;

    const articleMeta = jsonLdType === "article" &&
        image && {
            type: "article",
            ...article,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        };

    return (
        <>
            <NextSeo
                title={title}
                titleTemplate={
                    template ? `${title ?? ""} - ${template}` : `%s - ${siteConfig.titleTemplate}`
                }
                description={description}
                canonical={href}
                openGraph={{
                    url: href,
                    title,
                    description,
                    ...openGraph,
                    ...articleMeta,
                }}
            />
            {jsonLdType === "article" && article && (
                <ArticleJsonLd
                    type="Blog"
                    url={href}
                    title={title as string}
                    images={[image as string]}
                    datePublished={article.publishedTime}
                    dateModified={article.modifiedTime}
                    authorName={article.authors[0]}
                    description={description as string}
                />
            )}
            {jsonLdType === "course" && instructor && (
                <CourseJsonLd
                    courseName={title as string}
                    description="Introductory CS course laying out the basics."
                    provider={{
                        name: instructor.name,
                        url: href,
                    }}
                />
            )}
        </>
    );
};

PageSeo.defaultProps = {
    template: siteConfig.name,
};

export default PageSeo;
