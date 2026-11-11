"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getDeadlineStatus, type DeadlineStatus } from "@/lib/deadline";

export function DeadlineBanner() {
  const [status, setStatus] = useState<DeadlineStatus>(() => getDeadlineStatus());

  useEffect(() => {
    setStatus(getDeadlineStatus());
  }, []);

  return (
    <div
      role="region"
      aria-label="Date limite des inscriptions"
      className={
        status.isExpired
          ? "bg-issca-navy text-white border-b border-slate-700"
          : "bg-issca-red text-white"
      }
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 text-xs sm:text-sm flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 font-medium">
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 rounded-full bg-white animate-pulse"
          />
          <span>{status.bannerText}</span>
          {status.countdownChipText && (
            <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-bold tracking-wide text-white">
              {status.countdownChipText}
            </span>
          )}
        </div>
        <Link
          href="/candidature"
          className="inline-flex items-center gap-1 font-bold underline underline-offset-4 hover:text-slate-100 whitespace-nowrap"
        >
          <span>{status.isExpired ? "Contacter les admissions" : "Déposer ma pré-candidature"}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
