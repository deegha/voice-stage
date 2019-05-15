/**
 * Created by Deegha on 19/03/2019
 */
import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {

  static async getInitialProps(ctx) {
    // Check if in production
    const isProduction = process.env.NODE_ENV === 'production'
    const initialProps = await Document.getInitialProps(ctx);
    // Pass isProduction flag back through props
    return { ...initialProps, isProduction };
  }

  setGoogleTags = () => {
    return {
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-139535555-1');
      `
    };
  }

  render() {

    const { isProduction } = this.props
    return (
      <html lang="en">
        
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
          {isProduction && (
            <React.Fragment>
              <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=UA-139535555-1"
              />
              {/* We call the function above to inject the contents of the script tag */}
              <script dangerouslySetInnerHTML={this.setGoogleTags()} />
            </React.Fragment>
          )}
        </body>
      </html>
    )
  }
}
