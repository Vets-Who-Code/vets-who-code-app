import { DefaultSeo } from 'next-seo'
import { ToastContainer } from 'react-toastify'
import Head from 'next/head'
import ThemeProvider from '../store/ThemeProvider'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Script from 'next/script'

// libraries
import 'react-toastify/dist/ReactToastify.css'
import '../assets/lib/bootstrap/dist/css/bootstrap.css'
import '../assets/lib/bootstrap/dist/css/bootstrap-theme.css'

import '../assets/css/main.css'
import '../assets/css/custom.css'
import '../assets/css/nav.css'
import '../assets/css/toggle.css'
import '../assets/css/pagination.css'
import '../assets/css/video.css'
import '../assets/css/loader.css'
import '../assets/css/apply-form.css'
import '../assets/css/card.css'
import '../assets/css/board.css'
import '../assets/css/code-of-conduct.css'
import '../assets/css/job-form.css'

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <DefaultSeo
        title="#VetsWhoCode 🇺🇸 "
        titleTemplate="%s | Retool - Retrain - Relaunch"
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://vetswhocode.io',
          image:
            'https://res.cloudinary.com/vetswhocode/image/upload/v1609084190/hashflag-white-vscode_n5k5db.jpg',
        }}
        description="#VetsWhoCode is a veteran-led 501(c)(3) charitable non-profit that focuses on teaching veterans how to program free of charge so that they may find gainful employment after service."
        twitter={{
          handle: '@vetswhocode',
          site: '@vetswhocode',
          cardType: 'summary_large_image',
          image:
            'https://res.cloudinary.com/vetswhocode/image/upload/v1609084190/hashflag-white-vscode_n5k5db.jpg',
        }}
      />
      <ThemeProvider>
        <main className="main_container">
          <ToastContainer />
          <Nav />
          <Component {...pageProps} />
          <Footer />
        </main>
      </ThemeProvider>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script id="google-analytics" strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
                `}
      </Script>
    </>
  )
}
