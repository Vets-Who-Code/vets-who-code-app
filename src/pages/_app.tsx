import { ElementType, useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { Analytics } from "@vercel/analytics/react";
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
    Component: AppProps["Component"] & { Layout?: ElementType };
    pageProps: {
        session?: Session | null;
        layout?: Record<string, unknown>;
        className?: string;
        [key: string]: unknown;
    };
}

const MyApp = ({ Component, pageProps }: CustomAppProps): JSX.Element => {
    const router = useRouter();
    const Layout = Component.Layout || FallbackLayout;
    const layoutProps = pageProps.layout || {};

    useEffect(() => {
        // Replace the expression with a more explicit check and action
        const activeElement = document.activeElement;
        if (activeElement instanceof HTMLElement) {
            activeElement.blur();
        }
    }, [router]);

    useEffect(() => {
        document.body.className = pageProps.className || "";
    }, [pageProps.className]);

    return (
        <SessionProvider session={pageProps.session}>
            <UIProvider>
                <UserProvider>
                    <Layout {...layoutProps}>
                        <SEO />
                        <Component {...pageProps} />
                        <Analytics />
                    </Layout>
                </UserProvider>
            </UIProvider>
        </SessionProvider>
    );
};

export default MyApp;