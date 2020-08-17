import * as React from "react";
import Head from "next/head";
import { DarkModeToggle } from "components/dark-mode-toggle";
import "styles.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* HTML Meta Tags */}
        <title>Collected Notes</title>
        <meta
          name="description"
          content="The simplest, and most powerful note-taking blogging platform."
        />
        <meta
          name="image"
          content="https://photos.collectednotes.com/embed.png"
        />
        <meta name="keywords" content="notes, blog, note taking, simplicity." />

        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="Collected Notes" />
        <meta
          itemProp="description"
          content="The simplest, and most powerful note-taking blogging platform."
        />
        <meta
          itemProp="image"
          content="https://photos.collectednotes.com/embed.png"
        />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://collectednotes.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Collected Notes" />
        <meta
          property="og:description"
          content="The simplest, and most powerful note-taking blogging platform."
        />
        <meta
          property="og:image"
          content="https://photos.collectednotes.com/embed.png"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Collected Notes" />
        <meta
          name="twitter:description"
          content="The simplest, and most powerful note-taking blogging platform."
        />
        <meta
          name="twitter:image"
          content="https://photos.collectednotes.com/embed.png"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://static.collectednotes.com/assets/apple-touch-icon-312a7df912cb436668614c4991fff0aab7481d6146f69cb40d9587a23b5867eb.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://static.collectednotes.com/assets/favicon-32x32-830bcc50ba1db7a559cc9c92ffa6cf755a4e5b8c067bcfff1aea79f600950075.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://static.collectednotes.com/assets/favicon-16x16-11f4353cc4034de36fd7fb85e09898924184fbc090fb7ae1cc4930f5845e4181.png"
        />
      </Head>

      <main role="document">
        <div className="flex justify-end pt-4 pr-4 -mb-6 md:absolute md:top-0 md:right-0">
          <DarkModeToggle />
        </div>

        <Component {...pageProps} />
      </main>
    </>
  );
}
