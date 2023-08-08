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

  const scriptGTM = `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'GTM-P4JZT3Z9');`

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <QwikPartytown forward={['dataLayer.push']} />
        <script
          async
          type="text/partytown"
          src="https://www.googletagmanager.com/gtag/js?id=GTM-P4JZT3Z9"
        />
        <script type="text/partytown">
          {scriptGTM}
        </script>
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
