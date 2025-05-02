import { DefaultSeo } from "next-seo";
import siteConfig from "@data/site-config";

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
                images: [
                    {
                        url: "https://res.cloudinary.com/vetswhocode/image/upload/v1609084190/hashflag-white-vscode_n5k5db.jpg",
                        width: 1200,
                        height: 630,
                        alt: "Og Image Alt",
                    },
                    {
                        url: "https://res.cloudinary.com/vetswhocode/image/upload/v1609084190/hashflag-white-vscode_n5k5db.jpg",
                        width: 1230,
                        height: 630,
                        alt: "Og Image Alt Second",
                    },
                ],
            }}
            twitter={{
                handle: "@handle",
                site: "@site",
                cardType: "summary_large_image",
            }}
            facebook={{
                appId: "1234567890",
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
