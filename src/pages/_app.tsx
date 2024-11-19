import { ElementType, useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider
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
        session?: unknown; // Add session type for NextAuth
    };
}

const MyApp = ({ Component, pageProps }: CustomAppProps) => {
    const router = useRouter();
    const Layout = Component.Layout || FallbackLayout;
    const layoutProps =
        typeof pageProps.layout === "object" ? pageProps.layout : {};

    useEffect(() => {
        document.activeElement instanceof HTMLElement &&
            document.activeElement.blur();
    }, [router]);

    useEffect(() => {
        document.body.className = (pageProps.className as string) || "";
    });

    return (
        <SessionProvider session={pageProps.session}> {/* Wrap everything in SessionProvider */}
            <UIProvider>
                <UserProvider>
                    <Layout {...layoutProps}>
                        <SEO />
                        <Component {...pageProps} />
                    </Layout>
                </UserProvider>
            </UIProvider>
        </SessionProvider>
    );
};

export default MyApp;