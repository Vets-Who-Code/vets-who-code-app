/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Theme } from "@radix-ui/themes";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        const pageProps = this.props?.__NEXT_DATA__?.props?.pageProps;
        const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID; // Get the GA ID from environment variables

        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://pro.fontawesome.com/releases/v5.15.4/css/all.css"
                        integrity="sha384-rqn26AG5Pj86AF4SO72RK5fyefcQ/x32DNQfChxWvbXIyXFePlEktwD18fEz+kQU"
                        crossOrigin="anonymous"
                    />
                    {gaId && ( // Only include the script if the GA ID is present
                        <>
                            <script
                                async
                                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                            />
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: `
                                        window.dataLayer = window.dataLayer || [];
                                        function gtag(){dataLayer.push(arguments);}
                                        gtag('js', new Date());
                                        gtag('config', '${gaId}');
                                    `,
                                }}
                            />
                        </>
                    )}
                </Head>
                <body className={pageProps.className}>
                    <Main />
                    <div id="portal" />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
