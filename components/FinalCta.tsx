"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getDeadlineStatus, type DeadlineStatus } from "@/lib/deadline";
import { formatFrench } from "@/lib/typography";
import { trackCtaClick } from "@/lib/analytics";

export function FinalCta() {
  const [deadline, setDeadline] = useState<DeadlineStatus>(() => getDeadlineStatus());

  useEffect(() => {
    setDeadline(getDeadlineStatus());
  }, []);

  return (
    <section
      aria-labelledby="heading-final-cta"
      className="py-16 sm:py-24 bg-issca-navy text-white cv-auto-section"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs sm:text-sm font-bold text-red-300">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-issca-red" />
          <span>{deadline.badgeText}</span>
          {deadline.countdownChipText && (
            <span className="text-white">· {deadline.countdownChipText}</span>
          )}
        </span>

        <h2
          id="heading-final-cta"
          className="mt-6 heading-section font-extrabold text-white max-w-3xl mx-auto"
        >
          {formatFrench(
            "Prêt(e) à construire votre avenir dans le management et l’IA ?"
          )}
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
          {formatFrench(
            "Complétez votre pré-candidature en quelques minutes. Un conseiller aux admissions d’ISSCA Business School prendra contact avec vous pour étudier votre dossier et organiser votre entretien."
          )}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
          <Link
            href="/candidature"
            onClick={() => trackCtaClick("final_cta_section", deadline.primaryCtaLabel)}
            className="btn-primary-red text-base sm:text-lg px-8 py-4 shadow-elevated"
          >
            <span>{deadline.primaryCtaLabel}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <p className="mt-5 text-xs sm:text-sm text-slate-300">
          {formatFrench(
            "Aucun frais ni document scanné n’est exigé lors de cette première étape en ligne."
          )}
        </p>
      </div>
    </section>
  );
}
