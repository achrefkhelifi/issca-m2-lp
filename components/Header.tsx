"use client";

import React, { useState } from "react";
import Link from "next/link";
import { trackCtaClick } from "@/lib/analytics";

const NAV_ITEMS = [
  { href: "/#profils", label: "Pour qui\u202F?" },
  { href: "/#debouches", label: "Métiers" },
  { href: "/#programme", label: "Programme (2\u00A0ans)" },
  { href: "/#pedagogie", label: "Pédagogie" },
  { href: "/#frais-admission", label: "Frais & Admission" },
  { href: "/#faq", label: "FAQ" },
] as const;

interface HeaderProps {
  minimal?: boolean;
}

export function Header({ minimal = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[4.25rem] items-center justify-between gap-4 py-2">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="ISSCA Business School — Accueil Master Management des Startups et de l’IA"
          >
            <img
              src="/issca-logo.svg"
              alt="Logo ISSCA Business School"
              width={138}
              height={46}
              className="h-10 sm:h-11 w-auto object-contain"
            />
            <div className="hidden xl:block border-l border-slate-200 pl-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-issca-blue">
                Master Professionnel · Bac+5
              </p>
              <p className="text-xs font-semibold text-slate-700">
                Management des Startups &amp; IA · Sousse
              </p>
            </div>
          </Link>

          {!minimal && (
            <nav
              aria-label="Navigation principale"
              className="hidden lg:flex items-center gap-1"
            >
              <ul className="flex items-center gap-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="inline-flex min-h-[2.75rem] items-center rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-issca-navy transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="flex items-center gap-2.5">
            {minimal ? (
              <Link
                href="/"
                className="inline-flex min-h-[2.75rem] items-center gap-1.5 rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <span aria-hidden="true">←</span>
                <span>Retour au programme</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/candidature"
                  onClick={() => trackCtaClick("header_desktop", "Démarrer ma candidature")}
                  className="btn-primary-red text-sm px-4 py-2.5 shadow-sm"
                >
                  <span>Démarrer ma candidature</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-nav-drawer"
                  aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu de navigation"}
                  className="lg:hidden inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg border border-slate-300 text-slate-800 hover:bg-slate-100"
                >
                  {mobileMenuOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {!minimal && mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Menu mobile"
          className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 shadow-lg"
        >
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-[48px] items-center rounded-lg px-3 py-2 text-base font-semibold text-slate-800 hover:bg-slate-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-3 border-t border-slate-200">
            <Link
              href="/candidature"
              onClick={() => {
                setMobileMenuOpen(false);
                trackCtaClick("header_mobile_drawer", "Démarrer ma candidature");
              }}
              className="btn-primary-red w-full text-center text-base"
            >
              Démarrer ma candidature
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
