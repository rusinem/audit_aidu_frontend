import Script from 'next/script';
import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name='title' content='Terminal' />
          <meta name='description' content='Terminal' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <body className='scroll-smooth'>
          <Main />
          <NextScript />
          <Script
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `!function(e,o){!window.omni?window.omni=[]:'';window.omni.push(o);o.g_config={widget_id:"14458-r3hvv7ts"}; o.email_widget=o.email_widget||{};var w=o.email_widget;w.readyQueue=[];o.config=function(e){ this.g_config.user=e};w.ready=function(e){this.readyQueue.push(e)};var r=e.getElementsByTagName("script")[0];c=e.createElement("script");c.type="text/javascript",c.async=!0;c.src="https://omnidesk.ru/bundles/acmesite/js/cwidget0.2.min.js";r.parentNode.insertBefore(c,r)}(document,[]);`,
            }}
          ></Script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
