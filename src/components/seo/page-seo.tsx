import siteConfig from "@data/site-config";
import { ArticleJsonLd, CourseJsonLd, NextSeo, NextSeoProps } from "next-seo";
import { useEffect, useState } from "react";

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
    const [href, setHref] = useState("");
    useEffect(() => {
        setHref(window.location.href);
    }, []);

    const articleMeta = jsonLdType === "article" && {
        type: "article",
        ...article,
        images: [
            {
                url: image as string,
                width: 1230,
                height: 630,
                alt: title,
            },
            {
                url: image as string,
                width: 1230,
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
