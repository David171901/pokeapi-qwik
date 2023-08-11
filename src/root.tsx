import { component$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/shared/router-head/router-head';

import './global.css';
import { QwikPartytown } from './components/partytown/partytown';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */

  const scriptGTM = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-${import.meta.env.PUBLIC_GTM}');`

  const scriptGTMv2 = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'GTM-MT5X58J');
  `

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <QwikPartytown forward={['dataLayer.push']} />
        {/* V1 */}
        <script dangerouslySetInnerHTML={scriptGTM} />
        {/* *** */}
        {/* V2 */}
        <script type="text/partytown" src={`https://www.googletagmanager.com/gtag/js?id=GTM-MT5X58J`}></script>
        <script type="text/partytown" dangerouslySetInnerHTML={scriptGTMv2}/>
        {/* *** */}
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        {/* V1 */}
        <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=GTM-${import.meta.env.PUBLIC_GTM}`}
          height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
