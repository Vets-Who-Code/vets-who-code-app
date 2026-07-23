import siteConfig from "@data/site-config";
import { DefaultSeo } from "next-seo";

const DefaultSEO = () => {
    return (
        <DefaultSeo
            title={siteConfig.name}
            titleTemplate={`%s - ${siteConfig.titleTemplate}`}
            defaultTitle={siteConfig.name}
            description={siteConfig.description}
            canonical={siteConfig.url}
            openGraph={{
                type: "website",
                locale: "en_IE",
                site_name: siteConfig.name,
                // One entry only: the second was the same asset declared 1230 wide,
                // which is a lie about a 1200px image and gave scrapers a coin flip.
                images: [
                    {
                        url: "https://res.cloudinary.com/vetswhocode/image/upload/v1609084190/hashflag-white-vscode_n5k5db.jpg",
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
                    content: "width=device-width, initial-scale=1, maximum-scale=1",
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
