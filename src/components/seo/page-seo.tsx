import siteConfig from "@data/site-config";
import { useRouter } from "next/router";
import { ArticleJsonLd, CourseJsonLd, NextSeo, NextSeoProps } from "next-seo";

interface SeoProps extends NextSeoProps {
    template?: string;
    jsonLdType?: "article" | "course";
    article?: {
        publishedTime: string;
        modifiedTime: string;
        /** Optional: bylines aren't tracked, so this is usually absent. */
        authors?: string[];
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

    // The homepage's title is literally "Home", which would print HOME as the
    // headline on the most-shared URL on the site. Fall through to the card's
    // own brand headline instead.
    const cardTitle = path === "/" ? "" : (title ?? "");
    const generatedCard = `${siteConfig.url}/api/og${
        cardTitle ? `?title=${encodeURIComponent(cardTitle)}` : ""
    }`;

    // Page artwork when it has some (blog posts, products); otherwise a branded
    // card generated from the title. Previously `image` was only read inside the
    // article branch, so a product page's own image was dropped and the share
    // fell through to the site-wide default.
    const ogImage = image || generatedCard;

    const imageMeta = {
        images: [
            {
                url: ogImage,
                alt: title,
                // Only declare dimensions for the card we render ourselves. A
                // caller-supplied image (Shopify product, blog artwork) is not
                // necessarily 1200x630, and a wrong declaration makes scrapers
                // crop or skip it. Extensionless endpoint needs an explicit type.
                ...(image ? {} : { width: 1200, height: 630, type: "image/png" }),
            },
        ],
    };

    // next-seo only emits article:* tags from a nested `article` key — spreading
    // these flat meant blog posts never had article metadata at all.
    const articleMeta = jsonLdType === "article" &&
        article && {
            type: "article",
            article,
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
                    ...imageMeta,
                    ...articleMeta,
                    // Caller-supplied openGraph wins over everything above.
                    ...openGraph,
                }}
            />
            {jsonLdType === "article" && article && (
                <ArticleJsonLd
                    type="Blog"
                    url={href}
                    title={title as string}
                    images={[ogImage]}
                    datePublished={article.publishedTime}
                    dateModified={article.modifiedTime}
                    // Vets Who Code publishes these; per-author bylines aren't
                    // tracked, and an undefined authorName is invalid JSON-LD.
                    // Organization, not Person — the org is the author.
                    authorName={
                        article.authors?.[0]
                            ? { name: article.authors[0], type: "Person" }
                            : { name: siteConfig.name, type: "Organization", url: siteConfig.url }
                    }
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
