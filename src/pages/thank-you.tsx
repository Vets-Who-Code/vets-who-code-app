import ThankYouBlock from "@components/common/thank-you-block";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Button from "@ui/button";
import type { NextPage } from "next";
import Script from "next/script";

const ADS_ID = "AW-926316930";

type PageProps = NextPage & {
    Layout: typeof Layout;
};

// Donorbox's post-donation "Redirect to URL" sends donors here, so a visit is a
// completed donation and fires the Google Ads purchase conversion.
const ThankYou: PageProps = () => (
    <>
        <SEO title="Thank You" description="Your donation to Vets Who Code went through." />
        <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
            strategy="afterInteractive"
        />
        <Script id="ads-donation-conversion" strategy="afterInteractive">
            {`
                window.dataLayer = window.dataLayer || [];
                window.gtag = window.gtag || function(){dataLayer.push(arguments);};
                gtag('js', new Date());
                gtag('config', '${ADS_ID}');
                gtag('event', 'conversion', {
                    'send_to': '${ADS_ID}/E26SCKaxkqwdEILz2bkD',
                    'value': 1.0,
                    'currency': 'USD',
                    'transaction_id': ''
                });
            `}
        </Script>
        <ThankYouBlock
            heading="Thank You for Your Donation"
            message="Your gift helps veterans become software engineers. A receipt from Donorbox is on its way to your inbox."
        />
        <div className="tw-bg-white-100 tw-pb-16 tw-text-center">
            <Button path="/">Back to Home</Button>
        </div>
    </>
);

ThankYou.Layout = Layout;

export const getStaticProps = () => ({
    props: {
        layout: {
            headerShadow: true,
            headerFluid: false,
            footerMode: "light",
        },
    },
});

export default ThankYou;
