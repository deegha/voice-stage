/**
 * Created by Deegha on 19/03/2019
 */
import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {

  // static async getInitialProps(ctx) {
  //   // Check if in production
  //   const isProduction = process.env.NODE_ENV === 'production';
  //   const initialProps = await Document.getInitialProps(ctx);
  //   // Pass isProduction flag back through props
  //   return { ...initialProps, isProduction };
  // }

  // setGoogleTags = () => {
  //   return {
  //     __html: `
  //       window.dataLayer = window.dataLayer || [];
  //       function gtag(){dataLayer.push(arguments);}
  //       gtag('js', new Date());
  //       gtag('config', 'UA-119670959-4');
  //     `
  //   };
  // }

  render() {

    // const { isProduction } = this.props
    return (
      <html>
        
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          
        </body>
      </html>
    )
  }
}




// {isProduction && (
//   <React.Fragment>
//     <script
//       async
//       src="https://www.googletagmanager.com/gtag/js?id=UA-119670959-4"
//     />
//     {/* We call the function above to inject the contents of the script tag */}
//     <script dangerouslySetInnerHTML={this.setGoogleTags()} />
//   </React.Fragment>
// )}