import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>IT Consultis - Pokemon</title>
        <link
          rel="icon"
          href="https://itc.it-consultis.net/favicon/favicon.ico"
          type="image/ico"
        ></link>
        <meta
          name="description"
          content="IT Consultis (ITC) is a leading Digital Transformation Consultancy based in Shanghai, China &amp; Asia, empowering brands to maximize their ROI."
        ></meta>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
