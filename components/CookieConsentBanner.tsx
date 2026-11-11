"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  getConsentStatus,
  setConsentStatus,
  type ConsentStatus,
} from "@/lib/analytics";

export function CookieConsentBanner() {
  const [status, setStatus] = useState<ConsentStatus>("granted"); // Avoid hydration flash until mounted
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setStatus(getConsentStatus());
  }, []);

  if (!mounted || status !== "undecided") {
    return null;
  }

  return (
    <aside
      aria-label="Gestion des cookies et de la mesure d’audience"
      className="fixed bottom-16 lg:bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 rounded-2xl bg-issca-navy text-white p-5 shadow-elevated border border-slate-700"
    >
      <p className="text-sm font-bold text-white">
        Mesure d’audience et respect de votre vie privée
      </p>
      <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
        Nous utilisons des traceurs de mesure d’audience (Google Analytics, Meta Pixel) pour évaluer nos campagnes d’admission. Vous pouvez accepter ou refuser ces traceurs sans aucun impact sur le traitement de votre candidature.{" "}
        <Link href="/confidentialite" className="underline text-blue-200 hover:text-white">
          En savoir plus
        </Link>
        .
      </p>
      <div className="mt-4 flex items-center justify-end gap-2.5">
        <button
          type="button"
          onClick={() => {
            setConsentStatus("declined");
            setStatus("declined");
          }}
          className="inline-flex min-h-[40px] items-center justify-center rounded-lg border border-slate-500 px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/10"
        >
          Continuer sans accepter
        </button>
        <button
          type="button"
          onClick={() => {
            setConsentStatus("granted");
            setStatus("granted");
          }}
          className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-issca-red px-4 py-1.5 text-xs font-bold text-white hover:bg-issca-red-hover"
        >
          Accepter
        </button>
      </div>
    </aside>
  );
}
