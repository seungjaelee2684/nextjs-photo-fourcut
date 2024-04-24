import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

export default class MyDocument extends Document {

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="title" content="Love Four Cut" />
          <meta name="description" content="내 사진 꾸미기" />
          <meta name="keywords" content="사진, 인생네컷, 인생, 네컷, 이미지, 꾸미기, 테마, 스티커, 스티커사진" />
          <meta property="og:title" content="Love Four Cut" />
          <meta property="og:description" content="내 사진 꾸미기" />
          <meta property="og:image" content="/images/L.png" />
          <link rel="icon" href="/images/L.png" />
          <title>Love Four Cut</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}