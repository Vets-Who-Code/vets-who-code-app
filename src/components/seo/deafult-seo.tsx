import { DefaultSeo } from "next-seo";
import siteConfig from "@data/site-config";

const SEO = () => {
    return (
        <DefaultSeo
            title={siteConfig.name}
            titleTemplate={`%s - ${siteConfig.titleTemplate}`}
            defaultTitle={siteConfig.name}
            description={siteConfig.description}
            canonical="https://maxcoach-react.pages.dev/"
            openGraph={{
                type: "website",
                locale: "en_IE",
                site_name: siteConfig.name,
                images: [
                    {
                        url: "https://maxcoach-react.pages.dev/images/about/about-me/about-me-popup-video-poster.jpg",
                        width: 800,
                        height: 600,
                        alt: "Og Image Alt",
                    },
                    {
                        url: "https://maxcoach-react.pages.dev/images/about/about-me/about-me-popup-video-poster.jpg",
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
                        "width=device-width, initial-scale=1 maximum-scale=1",
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
                    href: "/icons/icon-192x192.png",
                },
                {
                    rel: "manifest",
                    href: "/manifest.json",
                },
            ]}
        />
    );
};
export default SEO;
