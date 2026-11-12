"use client";

import React from "react";
import Link from "next/link";
import { trackCtaClick } from "@/lib/analytics";

interface HeaderProps {
  minimal?: boolean;
}

export function Header({ minimal = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/70">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="flex min-h-[4.25rem] items-center justify-between gap-4 py-2.5">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="ISSCA Business School — Accueil"
          >
            <img
              src="/issca-logo.svg"
              alt="ISSCA Business School"
              width={138}
              height={46}
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          <div className="flex items-center">
            {minimal ? (
              <Link
                href="/"
                className="inline-flex min-h-[2.75rem] items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span aria-hidden="true">←</span>
                <span>Retour</span>
              </Link>
            ) : (
              <Link
                href="/candidature"
                onClick={() => trackCtaClick("header_cta", "Démarrer ma candidature")}
                className="btn-primary-red rounded-full text-sm px-5 py-2.5 shadow-sm"
              >
                <span>Démarrer ma candidature</span>
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
