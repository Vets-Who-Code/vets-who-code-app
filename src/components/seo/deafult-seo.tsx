import siteConfig from "@data/site-config";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import { canonicalFor } from "./page-seo";

const DefaultSEO = () => {
    // Router-derived, not the site URL: the routes that render no PageSeo used to
    // inherit a homepage canonical, which told crawlers to drop them. Pages that
    // do render PageSeo override this — next/head keeps the last keyed tag.
    const { asPath } = useRouter();
    return (
        <DefaultSeo
            // No `title`: with one here, next-seo fills the template with it and
            // the brand prints twice. `defaultTitle` carries it instead.
            titleTemplate={siteConfig.titleTemplate}
            defaultTitle={siteConfig.name}
            description={siteConfig.description}
            canonical={canonicalFor(asPath)}
            openGraph={{
                type: "website",
                locale: "en_US",
                site_name: siteConfig.name,
                // One entry only: the second was the same asset declared 1230 wide,
                // which is a lie about a 1200px image and gave scrapers a coin flip.
                // The generated card replaces a 2020 VS Code screenshot.
                images: [
                    {
                        url: `${siteConfig.url}/api/og`,
                        width: 1200,
                        height: 630,
                        alt: `${siteConfig.name} — free software engineering training for veterans and military spouses`,
                    },
                ],
            }}
            // handle/site omitted until the real X account is confirmed — "@site"
            // and "@handle" were attributing every share to accounts we don't own.
            twitter={{
                cardType: "summary_large_image",
            }}
            additionalMetaTags={[
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
                {
                    name: "apple-mobile-web-app-capable",
                    content: "yes",
                },
                {
                    name: "theme-color",
                    content: "#ffffff",
                },
            ]}
            additionalLinkTags={[
                {
                    rel: "apple-touch-icon",
                    href: "https://res.cloudinary.com/vetswhocode/image/upload/v1609084190/hashflag-white-vscode_n5k5db.jpg",
                },
                {
                    rel: "manifest",
                    href: "/manifest.json",
                },
            ]}
        />
    );
};

export default DefaultSEO;
