"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HERO_CONTENT, ISSCA_INSTITUTION } from "@/content/program";
import { getDeadlineStatus, type DeadlineStatus } from "@/lib/deadline";
import { formatFrench } from "@/lib/typography";
import { trackCtaClick } from "@/lib/analytics";

export function Hero() {
  const [deadline, setDeadline] = useState<DeadlineStatus>(() => getDeadlineStatus());

  useEffect(() => {
    setDeadline(getDeadlineStatus());
  }, []);

  return (
    <section
      aria-labelledby="main-heading"
      className="relative overflow-hidden bg-gradient-to-b from-issca-surface via-white to-white pt-6 pb-14 sm:pt-12 sm:pb-20 border-b border-slate-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow & Deadline Status Pill */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center rounded-md bg-issca-navy px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {HERO_CONTENT.eyebrow}
              </span>
              <span
                className={
                  deadline.isExpired
                    ? "inline-flex items-center gap-1.5 rounded-md bg-slate-200 px-3 py-1 text-xs font-bold text-slate-800"
                    : "inline-flex items-center gap-1.5 rounded-md bg-red-50 border border-red-200 px-3 py-1 text-xs font-bold text-issca-red"
                }
              >
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-issca-red"
                />
                <span>{deadline.badgeText}</span>
              </span>
            </div>

            {/* Primary H1 Headline (target of skip link with tabindex="-1") */}
            <div className="space-y-3">
              <p className="text-sm sm:text-base font-bold text-issca-blue">
                {formatFrench(HERO_CONTENT.programTitle)}
              </p>
              <h1
                id="main-heading"
                tabIndex={-1}
                className="heading-hero font-extrabold text-issca-navy focus:outline-none"
              >
                {formatFrench(HERO_CONTENT.headline)}
              </h1>
            </div>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-700 max-w-2xl leading-relaxed">
              {formatFrench(HERO_CONTENT.supportingCopy)}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <Link
                href="/candidature"
                onClick={() => trackCtaClick("hero_primary", HERO_CONTENT.primaryCta)}
                className="btn-primary-red text-base sm:text-lg px-7 py-3.5 shadow-card"
              >
                <span>{deadline.primaryCtaLabel}</span>
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href="#programme"
                onClick={() => trackCtaClick("hero_secondary", HERO_CONTENT.secondaryCta)}
                className="btn-secondary-outline text-base px-6 py-3.5"
              >
                <span>{HERO_CONTENT.secondaryCta}</span>
              </a>
            </div>

            {/* Micro-reassurance */}
            <p className="text-xs sm:text-sm text-slate-600 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                <svg
                  className="h-4 w-4 text-emerald-700 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Pré-candidature en 2&nbsp;minutes (sans dépôt de fichiers)
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                <svg
                  className="h-4 w-4 text-issca-blue shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Retour rapide d’un conseiller aux admissions
              </span>
            </p>

            {/* Key Program Facts Grid */}
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-200">
              {HERO_CONTENT.keyFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-xl bg-slate-50 border border-slate-200/80 p-3"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-issca-navy">
                    {formatFrench(fact.value)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right Column: Institutional Visual Card (LCP optimized with fetchpriority="high") */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-issca-navy p-2 sm:p-3 shadow-elevated border border-slate-200">
              <img
                src="/images/campus/hero-campus.svg"
                alt="Campus ISSCA Business School à Akouda, Sousse — Master Management des Startups et de l’Intelligence Artificielle"
                width={800}
                height={600}
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto rounded-xl object-cover"
              />
              <div className="mt-3 rounded-xl bg-white/95 p-4 text-slate-800">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-issca-blue">
                      Admission Session Actuelle
                    </p>
                    <p className="text-sm font-bold text-issca-navy mt-0.5">
                      Date limite d’inscription&nbsp;: {deadline.deadlineLabel}
                    </p>
                  </div>
                  {deadline.countdownChipText && (
                    <span className="inline-flex shrink-0 items-center rounded-md bg-red-100 px-2.5 py-1 text-xs font-extrabold text-issca-red">
                      {deadline.countdownChipText}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs text-slate-600">
                  {formatFrench(ISSCA_INSTITUTION.ministryAuthorizationText)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
