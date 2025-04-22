import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    var canvas = document.createElement('canvas');
                    if (!canvas.getContext || !canvas.getContext('2d')) {
                      document.documentElement.classList.add('no-canvas');
                    }
                  } catch(e) {
                    document.documentElement.classList.add('no-canvas');
                    console.error('Canvas detection error:', e);
                  }
                })();
              `,
            }}
          />
        </Head>
        <body className="font-sans bg-gray-50 dark:bg-gray-950 text-secondary dark:text-gray-100">
          <div id="fallback-background" className="fallback-background"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
