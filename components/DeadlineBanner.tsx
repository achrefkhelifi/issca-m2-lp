"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getDeadlineStatus, type DeadlineStatus } from "@/lib/deadline";
import { formatFrench } from "@/lib/typography";

export function DeadlineBanner() {
  const [status, setStatus] = useState<DeadlineStatus>(() => getDeadlineStatus());

  useEffect(() => {
    setStatus(getDeadlineStatus());
  }, []);

  return (
    <aside
      aria-label="Date limite des inscriptions"
      className="bg-issca-navy text-white border-b border-white/10 py-2 px-3 text-center relative z-50"
    >
      <Link
        href="/candidature"
        className="mx-auto max-w-[1200px] inline-flex items-center justify-center gap-2 sm:gap-2.5 text-xs sm:text-[0.84rem] leading-tight group"
      >
        <span className="inline-flex items-center rounded-full bg-issca-red px-2 py-0.5 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-white shrink-0">
          {status.academicYear}
        </span>

        {/* Short mobile text so it always stays on 1 clean line */}
        <span className="font-medium text-white/95 sm:hidden">
          {status.isExpired
            ? "Inscriptions clôturées"
            : formatFrench("Dernier délai d’inscription : 28 nov.")}
        </span>

        {/* Full desktop text */}
        <span className="hidden sm:inline font-medium text-white/95">
          {formatFrench(status.bannerText)}
        </span>

        <span className="inline-flex items-center gap-0.5 font-bold text-red-300 underline underline-offset-2 group-hover:text-white transition-colors shrink-0">
          <span className="sm:hidden">Candidater</span>
          <span className="hidden sm:inline">
            {status.isExpired ? "Nous contacter" : "Déposer ma candidature"}
          </span>
          <span aria-hidden="true">→</span>
        </span>
      </Link>
    </aside>
  );
}
