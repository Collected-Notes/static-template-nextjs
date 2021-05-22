import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CNDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {process.env.FEED_HOME_PAGE_URL && (
            <link
              rel="alternate"
              type="application/feed+json"
              href="/api/feed?format=json"
            />
          )}
          {process.env.FEED_HOME_PAGE_URL && (
            <link
              rel="alternate"
              type="application/rss+xml"
              href="/api/feed?format=xml"
            />
          )}
        </Head>
        <body>
          <script src="dark-mode.js" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
