"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getDeadlineStatus, type DeadlineStatus } from "@/lib/deadline";
import { formatFrench } from "@/lib/typography";
import { trackCtaClick } from "@/lib/analytics";

const HERO_PILLS = [
  "Accessible dès Bac+3 (Licence / Ingénieur)",
  "Possibilité d’alternance",
  "Stage de 4 à 6 mois en M2",
  "Partenariats & échanges : ISIT Paris, Collège de Paris & Beijing Polytechnic",
  "Agrément MESRS n° 01/2018",
] as const;

export function Hero() {
  const [deadline, setDeadline] = useState<DeadlineStatus>(() => getDeadlineStatus());

  useEffect(() => {
    setDeadline(getDeadlineStatus());
  }, []);

  return (
    <section
      aria-labelledby="main-heading"
      className="relative overflow-hidden bg-white pt-6 pb-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-14 items-center">
          {/* Left Column: Clear, Spacious Value Proposition */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200/80 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-issca-blue mb-5">
              <span className="h-2 w-2 rounded-full bg-issca-red" aria-hidden="true" />
              {formatFrench("Sousse · Année universitaire 2026/2027 · Bac+5")}
            </span>

            <h1
              id="main-heading"
              tabIndex={-1}
              className="heading-hero font-extrabold text-issca-navy tracking-tight focus:outline-none"
            >
              {formatFrench(
                "L’IA transforme les entreprises. Préparez-vous à les diriger."
              )}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed max-w-[36em]">
              <strong className="font-bold text-issca-navy">
                {formatFrench("Master Management des Startups et de l’Intelligence Artificielle.")}
              </strong>{" "}
              {formatFrench(
                "Deux ans à ISSCA Business School pour apprendre à lancer un produit, piloter des projets IA et diriger des équipes innovantes."
              )}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/candidature"
                onClick={() => trackCtaClick("hero_primary", deadline.primaryCtaLabel)}
                className="btn-primary-red rounded-full text-base px-7 py-3.5 shadow-card"
              >
                <span>{deadline.primaryCtaLabel}</span>
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href="#parcours"
                onClick={() => trackCtaClick("hero_secondary", "Voir les 4 semestres")}
                className="btn-secondary-outline rounded-full text-base px-6 py-3.5"
              >
                <span>{formatFrench("Voir les 4 semestres")}</span>
              </a>
            </div>

            {/* Cocon-style Checkmark Fact Pills */}
            <div className="mt-9 flex flex-wrap gap-2.5">
              {HERO_PILLS.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-2 rounded-full bg-issca-surface border border-slate-200 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-issca-navy"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="text-issca-red shrink-0"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{formatFrench(pill)}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Official Visual Frame */}
          <div className="mx-auto w-full max-w-[460px] lg:max-w-none">
            <div className="relative rounded-3xl overflow-hidden bg-issca-navy shadow-elevated border border-slate-200/80">
              <img
                src="/images/campus/hero-master-ia.jpg"
                alt="ISSCA Business School — Master Professionnel en Management des startups et de l’IA, inscriptions jusqu’au 28 novembre"
                width={819}
                height={1024}
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
