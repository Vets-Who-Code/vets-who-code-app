import { ElementType, useEffect } from "react";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider
import type { Session } from "next-auth"; // Import Session type
import type { AppProps, NextPage } from "next"; // Import NextPage
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

// Extend AppProps with support for a Layout property
interface CustomAppProps extends AppProps {
    Component: NextPage & {
        Layout?: ElementType; // Optional Layout property
    };
    pageProps: {
        session?: Session | null; // Explicitly type session
        [key: string]: unknown;
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
        <SessionProvider session={pageProps.session as Session | null}>
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