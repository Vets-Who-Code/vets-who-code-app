import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <>
        <Html lang="en" color-mode="light">
          <Head>
            <link rel="shortcut icon" href="/favicon.png" />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      </>
    )
  }
}
