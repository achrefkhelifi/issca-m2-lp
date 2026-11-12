"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getDeadlineStatus, type DeadlineStatus } from "@/lib/deadline";
import { trackCtaClick } from "@/lib/analytics";

export function MobileStickyBar() {
  const [deadline, setDeadline] = useState<DeadlineStatus>(() => getDeadlineStatus());

  useEffect(() => {
    setDeadline(getDeadlineStatus());
  }, []);

  return (
    <div
      role="region"
      aria-label="Accès rapide à la candidature"
      className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-slate-200 px-4 py-2.5 shadow-elevated"
    >
      <div className="mx-auto max-w-md flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wider text-issca-red truncate">
            {deadline.isExpired
              ? "Année 2026/2027 · Contactez-nous"
              : "Inscriptions jusqu’au 28 novembre"}
          </p>
          <p className="text-xs font-bold text-issca-navy truncate">
            Master Startups &amp; IA · 2026/2027
          </p>
        </div>
        <Link
          href="/candidature"
          onClick={() => trackCtaClick("mobile_sticky_bar", deadline.primaryCtaLabel)}
          className="btn-primary-red rounded-full text-xs sm:text-sm px-4 py-2.5 shrink-0"
        >
          <span>{deadline.isExpired ? "Nous contacter" : "Candidater"}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
