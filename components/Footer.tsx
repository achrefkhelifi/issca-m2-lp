import React from "react";
import Link from "next/link";
import { ISSCA_INSTITUTION } from "@/content/program";
import { formatFrench } from "@/lib/typography";

export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-issca-red text-white/90 pt-16 md:pt-20 pb-32 lg:pb-16 relative overflow-hidden border-t border-red-800/30"
    >
      {/* Subtle ambient glow effects like Cocon */}
      <div
        className="absolute top-0 right-0 w-[520px] h-[520px] bg-issca-navy/25 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-white/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-14 border-b border-white/20 items-start">
          {/* Column 1: White SVG Logo & Institutional Identity (6 columns) */}
          <div className="md:col-span-6 flex flex-col items-start">
            <Link href="/" className="inline-block group mb-5">
              <img
                src="/logo-footer.svg"
                alt="ISSCA Business School"
                width={220}
                height={104}
                loading="lazy"
                decoding="async"
                className="h-[68px] md:h-[84px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </Link>

            <p className="text-sm sm:text-[0.95rem] text-white/90 leading-relaxed max-w-[40ch]">
              {formatFrench(
                "Institut Supérieur Privé des Sciences Commerciales et des Affaires — Établissement privé d’enseignement supérieur agréé par l’État (Agrément MESRS n° 01/2018)."
              )}
            </p>
          </div>

          {/* Column 2: Campus Location (3 columns) */}
          <div className="md:col-span-3">
            <h2 className="text-white text-xs font-extrabold tracking-[0.16em] uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white inline-block" />
              {formatFrench("Campus Sousse")}
            </h2>

            <div className="flex items-start gap-3 text-sm text-white/90 bg-white/12 border border-white/20 rounded-2xl p-4 backdrop-blur-sm">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white flex-none mt-0.5"
                aria-hidden="true"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
              </svg>
              <span>
                <strong className="text-white font-bold block">
                  {formatFrench("Akouda — Sousse")}
                </strong>
                <span className="text-white/80 text-xs sm:text-[0.84rem] leading-relaxed block mt-0.5">
                  {formatFrench(ISSCA_INSTITUTION.addressLine)}
                </span>
              </span>
            </div>
          </div>

          {/* Column 3: Année universitaire 2026/2027 (3 columns) */}
          <div className="md:col-span-3">
            <h2 className="text-white text-xs font-extrabold tracking-[0.16em] uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white inline-block" />
              {formatFrench("Admissions 2026/2027")}
            </h2>

            <div className="bg-white/12 border border-white/20 rounded-2xl p-4 backdrop-blur-sm space-y-3">
              <div>
                <span className="text-white/80 font-bold text-xs uppercase tracking-wider block">
                  Année universitaire 2026/2027
                </span>
                <span className="text-white font-bold text-sm block mt-0.5">
                  {formatFrench("Inscriptions jusqu’au 28 novembre")}
                </span>
              </div>
              <Link
                href="/candidature"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-issca-red hover:bg-slate-100 transition-colors"
              >
                <span>Démarrer ma candidature</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright + TrueScaling.tn Credit & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-[0.84rem] text-white/80">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span>
              {formatFrench(
                `© ${new Date().getFullYear()} ISSCA Business School — Tous droits réservés`
              )}
            </span>
            <span className="hidden sm:inline opacity-40">·</span>
            <span className="text-white/75 text-xs">
              {formatFrench("Conçu par")}{" "}
              <a
                href="https://truescaling.tn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white font-bold underline underline-offset-2 transition-colors"
              >
                TrueScaling.tn
              </a>
            </span>
          </div>

          <div className="flex items-center gap-3.5 text-xs text-white/80">
            <Link
              href="/confidentialite"
              className="hover:text-white hover:underline transition-colors"
            >
              {formatFrench("Confidentialité")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
