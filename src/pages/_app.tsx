import { ElementType, useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import Head from "next/head";
import SEO from "@components/seo/deafult-seo";
import FallbackLayout from "@layout/fallback";
import "@assets/css/font-awesome-pro.min.css";
import "@assets/css/font-linea.css";
import "@assets/css/fonts.css";
import "@assets/css/tailwind.css";
import "@assets/css/swiper.css";
import "@assets/css/globals.css";

import { UIProvider } from "../contexts/ui-context";
import { UserProvider } from "../contexts/user-context";

interface CustomAppProps extends Omit<AppProps, "Component"> {
    Component: AppProps["Component"] & { Layout: ElementType };
    pageProps: {
        [key: string]: unknown;
    };
}

const MyApp = ({ Component, pageProps }: CustomAppProps) => {
    const router = useRouter();
    const Layout = Component.Layout || FallbackLayout;
    const layoutProps =
        typeof pageProps.layout === "object" ? pageProps.layout : {};

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        document.activeElement instanceof HTMLElement &&
            document.activeElement.blur();
    }, [router]);

    useEffect(() => {
        document.body.className = (pageProps.className as string) || "";
    });

    return (
        <UIProvider>
            <UserProvider>
                <Layout {...layoutProps}>
                    <Head>
                        <link
                            rel="stylesheet"
                            href="https://gists.rawgit.com/mfd/f3d96ec7f0e8f034cc22ea73b3797b59/raw/856f1dbb8d807aabceb80b6d4f94b464df461b3e/gotham.css"
                        />
                    </Head>
                    <SEO />
                    <Component {...pageProps} />
                </Layout>
            </UserProvider>
        </UIProvider>
    );
};

export default MyApp;