import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CNDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <script src="dark-mode.js" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
