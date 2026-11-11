"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import {
  captureAttributionFromUrl,
  getConsentStatus,
  trackProgramView,
  type ConsentStatus,
} from "@/lib/analytics";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

export function AnalyticsScripts() {
  const [consent, setConsent] = useState<ConsentStatus>("undecided");

  useEffect(() => {
    captureAttributionFromUrl();
    const current = getConsentStatus();
    setConsent(current);

    const handleConsentUpdate = (e: Event) => {
      const custom = e as CustomEvent<ConsentStatus>;
      setConsent(custom.detail);
    };

    window.addEventListener("issca:consent-updated", handleConsentUpdate);
    return () => {
      window.removeEventListener("issca:consent-updated", handleConsentUpdate);
    };
  }, []);

  useEffect(() => {
    if (consent === "granted") {
      trackProgramView();
    }
  }, [consent]);

  if (consent !== "granted") {
    return null;
  }

  return (
    <>
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
              GA_MEASUREMENT_ID
            )}`}
            strategy="afterInteractive"
          />
          <Script id="issca-ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {GTM_ID && (
        <Script id="issca-gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}

      {META_PIXEL_ID && (
        <Script id="issca-meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
