/**
 * Registration deadline management evaluated strictly in the Africa/Tunis timezone.
 * Official registration closing date: November 28, 2026 (2026-11-28T23:59:59+01:00).
 *
 * Uses native Temporal API (Temporal.Now.zonedDateTimeISO('Africa/Tunis') + .until())
 * when available in modern runtimes, with an Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Tunis' })
 * fallback so every browser computes identical calendar-day differentials in Tunisia time.
 */

export const REGISTRATION_DEADLINE_ISO = "2026-11-28";
export const REGISTRATION_TIMEZONE = "Africa/Tunis";
export const REGISTRATION_DEADLINE_LABEL = "28 novembre 2026";

export interface DeadlineStatus {
  deadlineIso: string;
  deadlineLabel: string;
  timeZone: string;
  tunisDateIso: string;
  isExpired: boolean;
  daysRemaining: number;
  urgencyLevel: "open" | "closing_soon" | "final_days" | "closed";
  bannerText: string;
  badgeText: string;
  countdownChipText: string | null;
  primaryCtaLabel: string;
  funnelSubtext: string;
}

interface TemporalLikeDuration {
  days: number;
  sign: number;
}

interface TemporalLikeZonedDateTime {
  until(
    other: unknown,
    options: { largestUnit: string; smallestUnit: string }
  ): TemporalLikeDuration;
  toPlainDate(): { toString(): string };
}

interface TemporalGlobal {
  Now: {
    zonedDateTimeISO(tz: string): TemporalLikeZonedDateTime;
  };
  ZonedDateTime: {
    from(item: string): unknown;
  };
}

function computeViaTemporal(): { tunisDateIso: string; diffDays: number } | null {
  try {
    const g = globalThis as unknown as { Temporal?: TemporalGlobal };
    if (!g.Temporal?.Now?.zonedDateTimeISO || !g.Temporal?.ZonedDateTime?.from) {
      return null;
    }

    const now = g.Temporal.Now.zonedDateTimeISO(REGISTRATION_TIMEZONE);
    const end = g.Temporal.ZonedDateTime.from(
      `${REGISTRATION_DEADLINE_ISO}T23:59:59[${REGISTRATION_TIMEZONE}]`
    );
    const remaining = now.until(end, {
      largestUnit: "day",
      smallestUnit: "day",
    });

    const tunisDateIso = now.toPlainDate().toString();
    if (remaining.sign < 0) {
      return { tunisDateIso, diffDays: -1 };
    }
    return { tunisDateIso, diffDays: remaining.days };
  } catch {
    return null;
  }
}

function computeViaIntl(referenceDate: Date = new Date()): {
  tunisDateIso: string;
  diffDays: number;
} {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: REGISTRATION_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(referenceDate);
  const year = Number(parts.find((p) => p.type === "year")?.value ?? "2026");
  const month = Number(parts.find((p) => p.type === "month")?.value ?? "11");
  const day = Number(parts.find((p) => p.type === "day")?.value ?? "11");

  const tunisDateIso = `${String(year).padStart(4, "0")}-${String(month).padStart(
    2,
    "0"
  )}-${String(day).padStart(2, "0")}`;

  const [targetY, targetM, targetD] = REGISTRATION_DEADLINE_ISO.split("-").map(Number);
  const currentUtcMidnight = Date.UTC(year, month - 1, day);
  const targetUtcMidnight = Date.UTC(targetY, targetM - 1, targetD);

  const diffDays = Math.round(
    (targetUtcMidnight - currentUtcMidnight) / (1000 * 60 * 60 * 24)
  );

  return { tunisDateIso, diffDays };
}

export function getDeadlineStatus(referenceDate?: Date): DeadlineStatus {
  const computed =
    referenceDate === undefined ? computeViaTemporal() ?? computeViaIntl() : computeViaIntl(referenceDate);

  const { tunisDateIso, diffDays } = computed;
  const isExpired = diffDays < 0;
  const daysRemaining = Math.max(0, diffDays);

  if (isExpired) {
    return {
      deadlineIso: REGISTRATION_DEADLINE_ISO,
      deadlineLabel: REGISTRATION_DEADLINE_LABEL,
      timeZone: REGISTRATION_TIMEZONE,
      tunisDateIso,
      isExpired: true,
      daysRemaining: 0,
      urgencyLevel: "closed",
      bannerText:
        "Clôture des inscriptions du 28 novembre 2026 atteinte — Contactez le service des admissions pour connaître les prochaines sessions ou déposer un dossier tardif.",
      badgeText: "Session du 28 novembre 2026 clôturée · Contactez l’administration",
      countdownChipText: null,
      primaryCtaLabel: "Contacter le service des admissions",
      funnelSubtext:
        "La date limite du 28 novembre 2026 étant passée, votre dossier sera transmis au service des admissions pour étude de disponibilité ou orientation vers la prochaine session.",
    };
  }

  let urgencyLevel: DeadlineStatus["urgencyLevel"] = "open";
  if (daysRemaining <= 5) {
    urgencyLevel = "final_days";
  } else if (daysRemaining <= 21) {
    urgencyLevel = "closing_soon";
  }

  const countdownChipText =
    daysRemaining === 0
      ? "Dernier jour (clôture ce soir à 23h59, heure de Tunis)"
      : daysRemaining === 1
      ? "J-1 avant clôture (heure de Tunis)"
      : `J-${daysRemaining} (${daysRemaining}\u00A0jours restants)`;

  return {
    deadlineIso: REGISTRATION_DEADLINE_ISO,
    deadlineLabel: REGISTRATION_DEADLINE_LABEL,
    timeZone: REGISTRATION_TIMEZONE,
    tunisDateIso,
    isExpired: false,
    daysRemaining,
    urgencyLevel,
    bannerText: `Inscriptions ouvertes jusqu’au ${REGISTRATION_DEADLINE_LABEL}`,
    badgeText: `Clôture des inscriptions\u202F: ${REGISTRATION_DEADLINE_LABEL}`,
    countdownChipText,
    primaryCtaLabel: "Démarrer ma candidature",
    funnelSubtext: `Les dossiers complets doivent être finalisés avant le ${REGISTRATION_DEADLINE_LABEL}. Déposez votre pré-candidature en 2\u00A0minutes pour être accompagné(e) par un conseiller.`,
  };
}
