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
                        url: "https://res.cloudinary.com/vetswhocode/image/upload/v1656268751/favicon_dpiacy.png",
                        width: 800,
                        height: 600,
                        alt: "Og Image Alt",
                    },
                    {
                        url: "https://res.cloudinary.com/vetswhocode/image/upload/v1656268751/favicon_dpiacy.png",
                        width: 900,
                        height: 800,
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
                    content:
                        "width=device-width, initial-scale=1, maximum-scale=1",
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
                    href: "https://res.cloudinary.com/vetswhocode/image/upload/f_auto,q_auto/v1656268751/favicon_dpiacy.png",
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
