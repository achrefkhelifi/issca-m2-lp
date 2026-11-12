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
      className="md:hidden fixed left-0 right-0 bottom-0 z-40 p-3 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-elevated"
    >
      <Link
        href="/candidature"
        onClick={() => trackCtaClick("mobile_sticky_bar", deadline.primaryCtaLabel)}
        className="btn-primary-red rounded-full w-full justify-center text-sm py-3 shadow-sm"
      >
        <span>{deadline.primaryCtaLabel}</span>
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
