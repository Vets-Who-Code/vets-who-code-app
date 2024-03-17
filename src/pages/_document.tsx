/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        const pageProps = this.props?.__NEXT_DATA__?.props?.pageProps;
        const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID; // Get the GA ID from environment variables

        return (
            <Html lang="en">
                <Head>
                    {gaId && ( // Only include the script if the GA ID is present
                        <>
                            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
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
