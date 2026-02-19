import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        const pageProps = this.props?.__NEXT_DATA__?.props?.pageProps;
        const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID; // Get the GA ID from environment variables

        return (
            <Html lang="en">
                <Head>
                    {/* PWA Meta Tags */}
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                    <meta name="apple-mobile-web-app-title" content="Vets Who Code" />
                    <meta name="theme-color" content="#091f40" />

                    {/* Favicon and Icons */}
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="apple-touch-icon" href="/images/favicon.png" />

                    <link
                        rel="stylesheet"
                        href="https://pro.fontawesome.com/releases/v5.15.4/css/all.css"
                        integrity="sha384-rqn26AG5Pj86AF4SO72RK5fyefcQ/x32DNQfChxWvbXIyXFePlEktwD18fEz+kQU"
                        crossOrigin="anonymous"
                    />
                    {gaId && ( // Only include the script if the GA ID is present
                        <>
                            <script
                                async={true}
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
