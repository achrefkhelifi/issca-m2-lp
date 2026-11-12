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
      className="py-16 sm:py-24 bg-white cv-auto-section"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="rounded-3xl bg-issca-navy text-white p-8 sm:p-14 lg:p-16 text-center shadow-elevated relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-red-300 mb-5">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-issca-red" />
              <span>{deadline.badgeText}</span>
            </span>

            <h2
              id="heading-final-cta"
              className="heading-section font-extrabold text-white"
            >
              {formatFrench("Prêt(e) à rejoindre le Master ?")}
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-[46ch] mx-auto leading-relaxed">
              {formatFrench(
                "Déposez votre pré-candidature en deux minutes — un conseiller aux admissions vous rappelle sous 24h à 48h."
              )}
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href="/candidature"
                onClick={() =>
                  trackCtaClick("final_cta_primary", deadline.primaryCtaLabel)
                }
                className="btn-primary-red rounded-full text-base sm:text-lg px-9 py-4 shadow-card"
              >
                <span>{deadline.primaryCtaLabel}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
