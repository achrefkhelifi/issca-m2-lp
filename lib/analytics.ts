/**
 * Analytics, UTM/Click-ID attribution persistence, and
 * client/server deduplication for GA4 (gtag / GTM dataLayer) and Meta Pixel.
 */

import { PROGRAM_ID, PROGRAM_NAME } from "./schema";

export const ATTRIBUTION_STORAGE_KEY = "issca_join_attribution_v1";
export const LAST_SUBMISSION_STORAGE_KEY = "issca_join_last_submission_v1";
export const FIRED_EVENTS_STORAGE_KEY = "issca_join_fired_events_v1";

export type ConsentStatus = "granted" | "declined" | "undecided";

export interface AttributionData {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  fbclid: string;
  gclid: string;
  fbp: string;
  fbc: string;
  landingPage: string;
  capturedAt: string;
}

export interface StoredSubmissionSummary {
  submissionId: string;
  eventId: string;
  firstName: string;
  degreeLabel: string;
  readiness: string;
  submittedAt: string;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function getConsentStatus(): ConsentStatus {
  return "granted";
}

function getCookieValue(name: string): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : "";
}

export function captureAttributionFromUrl(): AttributionData {
  const empty: AttributionData = {
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmContent: "",
    utmTerm: "",
    fbclid: "",
    gclid: "",
    fbp: "",
    fbc: "",
    landingPage: "/",
    capturedAt: new Date().toISOString(),
  };

  if (typeof window === "undefined") return empty;

  try {
    const existingRaw = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    const existing: Partial<AttributionData> = existingRaw ? JSON.parse(existingRaw) : {};
    const params = new URLSearchParams(window.location.search);

    const fbclid = params.get("fbclid") || existing.fbclid || "";
    const fbp = getCookieValue("_fbp") || existing.fbp || "";
    let fbc = getCookieValue("_fbc") || existing.fbc || "";
    if (!fbc && fbclid) {
      fbc = `fb.1.${Date.now()}.${fbclid}`;
    }

    const merged: AttributionData = {
      utmSource: params.get("utm_source") || existing.utmSource || "",
      utmMedium: params.get("utm_medium") || existing.utmMedium || "",
      utmCampaign: params.get("utm_campaign") || existing.utmCampaign || "",
      utmContent: params.get("utm_content") || existing.utmContent || "",
      utmTerm: params.get("utm_term") || existing.utmTerm || "",
      fbclid,
      gclid: params.get("gclid") || existing.gclid || "",
      fbp,
      fbc,
      landingPage: existing.landingPage || window.location.pathname,
      capturedAt: existing.capturedAt || new Date().toISOString(),
    };

    window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return empty;
  }
}

export function getStoredAttribution(): AttributionData {
  return captureAttributionFromUrl();
}

export function generateEventId(prefix = "issca"): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function hasEventFired(eventKey: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.sessionStorage.getItem(FIRED_EVENTS_STORAGE_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    return list.includes(eventKey);
  } catch {
    return false;
  }
}

function markEventFired(eventKey: string): void {
  if (typeof window === "undefined") return;
  try {
    const raw = window.sessionStorage.getItem(FIRED_EVENTS_STORAGE_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(eventKey)) {
      list.push(eventKey);
      window.sessionStorage.setItem(FIRED_EVENTS_STORAGE_KEY, JSON.stringify(list));
    }
  } catch {
    // Ignore storage errors
  }
}

function pushGtmAndGtag(eventName: string, params: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    program_id: PROGRAM_ID,
    program_name: PROGRAM_NAME,
    ...params,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      program_id: PROGRAM_ID,
      program_name: PROGRAM_NAME,
      ...params,
    });
  }
}

export function trackProgramView(): void {
  if (typeof window === "undefined") return;

  const key = `view_content_${window.location.pathname}`;
  if (hasEventFired(key)) return;
  markEventFired(key);

  pushGtmAndGtag("view_item", {
    item_id: PROGRAM_ID,
    item_name: PROGRAM_NAME,
    item_category: "Master Professionnel",
  });

  if (typeof window.fbq === "function") {
    window.fbq("track", "ViewContent", {
      content_ids: [PROGRAM_ID],
      content_name: PROGRAM_NAME,
      content_category: "Admissions Master",
      content_type: "product",
    });
  }
}

export function trackCtaClick(ctaLocation: string, ctaLabel: string): void {
  if (typeof window === "undefined") return;

  pushGtmAndGtag("select_promotion", {
    promotion_id: ctaLocation,
    promotion_name: ctaLabel,
  });
}

export function trackFormStart(): void {
  if (typeof window === "undefined") return;
  if (hasEventFired("form_start_candidature")) return;
  markEventFired("form_start_candidature");

  pushGtmAndGtag("form_start", {
    form_id: "issca_candidature_master_ia",
    form_name: "Pré-candidature Master Startups & IA",
  });
}

export function trackFormStep(stepNumber: number, stepName: string): void {
  if (typeof window === "undefined") return;

  const key = `form_step_${stepNumber}`;
  if (hasEventFired(key)) return;
  markEventFired(key);

  pushGtmAndGtag("form_step_complete", {
    form_id: "issca_candidature_master_ia",
    step_number: stepNumber,
    step_name: stepName,
  });
}

export function trackConfirmedLead(params: {
  eventId: string;
  submissionId: string;
  degreeLevel: string;
  desiredIntake: string;
  readiness: string;
}): void {
  if (typeof window === "undefined") return;

  const dedupKey = `lead_confirmed_${params.eventId}`;
  if (hasEventFired(dedupKey)) return;
  markEventFired(dedupKey);

  pushGtmAndGtag("generate_lead", {
    event_id: params.eventId,
    submission_id: params.submissionId,
    degree_level: params.degreeLevel,
    desired_intake: params.desiredIntake,
    readiness: params.readiness,
    currency: "TND",
    value: 1,
  });

  if (typeof window.fbq === "function") {
    window.fbq(
      "track",
      "Lead",
      {
        content_name: PROGRAM_NAME,
        content_category: "Master Professionnel",
        content_ids: [PROGRAM_ID],
        status: params.readiness,
      },
      { eventID: params.eventId }
    );
  }
}

export function storeLastSubmission(summary: StoredSubmissionSummary): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(LAST_SUBMISSION_STORAGE_KEY, JSON.stringify(summary));
  } catch {
    // Ignore storage errors
  }
}

export function getLastSubmission(): StoredSubmissionSummary | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(LAST_SUBMISSION_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredSubmissionSummary) : null;
  } catch {
    return null;
  }
}
