import {
  buildAdmissionsSummary,
  buildOdooOpportunityTitle,
  CAMPUS_NAME,
  candidatureSchema,
  FORM_VERSION,
  getCurrentSituationLabel,
  getDegreeLabel,
  getDesiredIntakeLabel,
  getReadinessLabel,
  INSTITUTION_NAME,
  normalizePhone,
  PROGRAM_ID,
  PROGRAM_NAME,
} from "../lib/schema";
import { getDeadlineStatus, REGISTRATION_DEADLINE_ISO } from "../lib/deadline";
import { buildAdmissionsWhatsAppUrl, ISSCA_INSTITUTION } from "../content/program";

export interface Env {
  ASSETS: {
    fetch: (request: Request | string) => Promise<Response>;
  };
  ENVIRONMENT?: string;
  SITE_URL?: string;
  PROGRAM_ID?: string;
  REGISTRATION_DEADLINE?: string;
  N8N_WEBHOOK_URL?: string;
  N8N_WEBHOOK_SECRET?: string;
  RESEND_API_KEY?: string;
  ADMISSIONS_NOTIFICATION_EMAIL?: string;
  RESEND_FROM_EMAIL?: string;
  META_PIXEL_ID?: string;
  META_CAPI_ACCESS_TOKEN?: string;
  META_TEST_EVENT_CODE?: string;
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 8;
const MAX_BODY_BYTES = 16 * 1024; // 16 KB

const ipRequestLog = new Map<string, number[]>();
const processedIdempotencyKeys = new Map<
  string,
  { submissionId: string; eventId: string; timestamp: string }
>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const recent = (ipRequestLog.get(ip) || []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipRequestLog.set(ip, recent);
    return false;
  }
  recent.push(now);
  ipRequestLog.set(ip, recent);
  return true;
}

function isAllowedOrigin(request: Request, env: Env): boolean {
  const origin = request.headers.get("Origin");
  if (!origin) return true; // Same-origin fetch in some browsers or server tools

  try {
    const url = new URL(origin);
    const host = url.hostname.toLowerCase();
    if (
      host === "join.issca.tn" ||
      host === "issca.tn" ||
      host.endsWith(".issca.tn") ||
      host.endsWith(".workers.dev") ||
      host === "localhost" ||
      host === "127.0.0.1"
    ) {
      return true;
    }
    if (env.SITE_URL) {
      const configuredHost = new URL(env.SITE_URL).hostname.toLowerCase();
      if (host === configuredHost) return true;
    }
    return false;
  } catch {
    return false;
  }
}

async function sha256Hex(value: string): Promise<string> {
  const normalized = value.trim().toLowerCase();
  const encoded = new TextEncoder().encode(normalized);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function postToN8nWithRetry(
  webhookUrl: string,
  secret: string | undefined,
  idempotencyKey: string,
  payload: Record<string, unknown>
): Promise<{ ok: boolean; status: number }> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Idempotency-Key": idempotencyKey,
    "X-Source": "join.issca.tn",
  };
  if (secret) {
    headers["X-Webhook-Secret"] = secret;
  }

  for (let attempt = 1; attempt <= 2; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7000);
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (response.ok) {
        return { ok: true, status: response.status };
      }
      // Do not retry 4xx client errors
      if (response.status >= 400 && response.status < 500) {
        return { ok: false, status: response.status };
      }
    } catch {
      clearTimeout(timer);
      if (attempt === 2) {
        return { ok: false, status: 504 };
      }
    }
  }
  return { ok: false, status: 502 };
}

async function sendResendNotification(
  apiKey: string,
  toEmail: string,
  fromEmail: string,
  subject: string,
  textSummary: string,
  htmlBody: string
): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject,
        text: textSummary,
        html: htmlBody,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function sendMetaCapiLeadEvent(params: {
  pixelId: string;
  accessToken: string;
  testEventCode?: string;
  eventId: string;
  eventSourceUrl: string;
  clientIp: string;
  userAgent: string;
  email: string;
  phoneNormalized: string;
  firstName: string;
  lastName: string;
  city: string;
  fbp: string;
  fbc: string;
  degreeLevel: string;
  readiness: string;
}): Promise<void> {
  try {
    const digitsOnlyPhone = params.phoneNormalized.replace(/\D/g, "");
    const [emHash, phHash, fnHash, lnHash, ctHash, countryHash] = await Promise.all([
      sha256Hex(params.email),
      sha256Hex(digitsOnlyPhone),
      sha256Hex(params.firstName),
      sha256Hex(params.lastName),
      sha256Hex(params.city),
      sha256Hex("tn"),
    ]);

    const userData: Record<string, unknown> = {
      em: [emHash],
      ph: [phHash],
      fn: [fnHash],
      ln: [lnHash],
      ct: [ctHash],
      country: [countryHash],
      client_ip_address: params.clientIp || undefined,
      client_user_agent: params.userAgent || undefined,
    };
    if (params.fbp) userData.fbp = params.fbp;
    if (params.fbc) userData.fbc = params.fbc;

    const body: Record<string, unknown> = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_id: params.eventId,
          event_source_url: params.eventSourceUrl,
          user_data: userData,
          custom_data: {
            content_name: PROGRAM_NAME,
            content_category: "Master Professionnel",
            content_ids: [PROGRAM_ID],
            degree_level: params.degreeLevel,
            status: params.readiness,
          },
        },
      ],
    };

    if (params.testEventCode) {
      body.test_event_code = params.testEventCode;
    }

    const url = `https://graph.facebook.com/v21.0/${encodeURIComponent(
      params.pixelId
    )}/events?access_token=${encodeURIComponent(params.accessToken)}`;

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    // Non-blocking: Meta CAPI errors must never fail the candidate submission
  }
}

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
  extraHeaders: Record<string, string> = {}
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders,
    },
  });
}

async function handleLeadSubmission(request: Request, env: Env): Promise<Response> {
  if (!isAllowedOrigin(request, env)) {
    return jsonResponse(
      {
        ok: false,
        code: "FORBIDDEN_ORIGIN",
        message: "Origine de la requête non autorisée.",
      },
      403
    );
  }

  const clientIp =
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ||
    "0.0.0.0";

  if (!checkRateLimit(clientIp)) {
    return jsonResponse(
      {
        ok: false,
        code: "RATE_LIMITED",
        message:
          "Trop de tentatives ont été détectées depuis votre connexion. Veuillez patienter quelques minutes ou contacter directement les admissions sur WhatsApp.",
        fallbackWhatsAppUrl: buildAdmissionsWhatsAppUrl(),
      },
      429
    );
  }

  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return jsonResponse(
      {
        ok: false,
        code: "INVALID_CONTENT_TYPE",
        message: "Le format de la requête doit être application/json.",
      },
      415
    );
  }

  const rawText = await request.text();
  if (rawText.length > MAX_BODY_BYTES) {
    return jsonResponse(
      {
        ok: false,
        code: "PAYLOAD_TOO_LARGE",
        message: "Les données envoyées dépassent la taille maximale autorisée.",
      },
      413
    );
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(rawText);
  } catch {
    return jsonResponse(
      {
        ok: false,
        code: "INVALID_JSON",
        message: "Corps JSON invalide.",
      },
      400
    );
  }

  // Silent honeypot check if bot filled `website`
  if (
    parsedJson &&
    typeof parsedJson === "object" &&
    "website" in parsedJson &&
    typeof (parsedJson as { website?: unknown }).website === "string" &&
    ((parsedJson as { website: string }).website || "").trim().length > 0
  ) {
    return jsonResponse({
      ok: true,
      submissionId: "ISSCA-BOT-IGNORED",
      eventId: "ignored",
    });
  }

  const validation = candidatureSchema.safeParse(parsedJson);
  if (!validation.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of validation.error.issues) {
      const pathKey = issue.path.join(".") || "form";
      if (!fieldErrors[pathKey]) {
        fieldErrors[pathKey] = issue.message;
      }
    }
    return jsonResponse(
      {
        ok: false,
        code: "VALIDATION_ERROR",
        message: "Veuillez vérifier les champs signalés dans le formulaire.",
        fieldErrors,
      },
      422
    );
  }

  const data = validation.data;

  // Idempotency check to prevent duplicate Odoo CRM opportunities on double click or network retry
  const existingSubmission = processedIdempotencyKeys.get(data.idempotencyKey);
  if (existingSubmission) {
    return jsonResponse({
      ok: true,
      deduplicated: true,
      submissionId: existingSubmission.submissionId,
      eventId: existingSubmission.eventId,
      timestamp: existingSubmission.timestamp,
    });
  }

  const timestamp = new Date().toISOString();
  const shortHash = data.idempotencyKey.replace(/[^a-zA-Z0-9]/g, "").slice(-6).toUpperCase();
  const submissionId = `ISSCA-${timestamp.slice(0, 10).replace(/-/g, "")}-${shortHash}`;

  const deadlineStatus = getDeadlineStatus();
  const isPriorityBeforeDeadline = data.readiness === "pret_avant_28_nov";
  const normalizedPhone = normalizePhone(data.phone);
  const opportunityTitle = buildOdooOpportunityTitle(data);
  const admissionsSummary = buildAdmissionsSummary(data, submissionId);
  const userAgent = request.headers.get("User-Agent") || "";
  const ipCountry = request.headers.get("CF-IPCountry") || "TN";
  const siteUrl = env.SITE_URL || "https://join.issca.tn";

  const webhookPayload: Record<string, unknown> = {
    submissionId,
    idempotencyKey: data.idempotencyKey,
    eventId: data.eventId,
    timestamp,
    formVersion: FORM_VERSION,
    program: {
      id: env.PROGRAM_ID || PROGRAM_ID,
      name: PROGRAM_NAME,
      institution: INSTITUTION_NAME,
      campus: CAMPUS_NAME,
      registrationDeadline: env.REGISTRATION_DEADLINE || REGISTRATION_DEADLINE_ISO,
      deadlineExpiredAtSubmission: deadlineStatus.isExpired,
      daysRemainingAtSubmission: deadlineStatus.daysRemaining,
    },
    odoo: {
      opportunityTitle,
      priority: isPriorityBeforeDeadline ? "high_before_28_nov" : "standard",
      priorityStarCount: isPriorityBeforeDeadline ? "3" : "1",
      tags: [
        "Master Startups & IA",
        "join.issca.tn",
        getDegreeLabel(data.degreeLevel),
        isPriorityBeforeDeadline ? "Prioritaire 28 Nov" : "À accompagner",
      ],
      internalNote: admissionsSummary,
    },
    candidate: {
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: `${data.firstName} ${data.lastName}`,
      phoneRaw: data.phone,
      phoneNormalized: normalizedPhone,
      email: data.email,
      city: data.city,
    },
    academic: {
      degreeLevel: data.degreeLevel,
      degreeLabel: getDegreeLabel(data.degreeLevel),
      specialization: data.specialization,
      institution: data.institution,
      graduationYear: data.graduationYear,
    },
    intentions: {
      desiredIntake: data.desiredIntake,
      desiredIntakeLabel: getDesiredIntakeLabel(data.desiredIntake),
      currentSituation: data.currentSituation,
      currentSituationLabel: getCurrentSituationLabel(data.currentSituation),
      readiness: data.readiness,
      readinessLabel: getReadinessLabel(data.readiness),
      readyBeforeNov28: isPriorityBeforeDeadline,
      motivation: data.motivation || "",
      comments: data.comments || "",
    },
    consent: {
      privacyConsent: data.privacyConsent,
      marketingConsent: data.marketingConsent,
      analyticsConsent: data.analyticsConsent,
    },
    attribution: {
      submittedFrom: data.submittedFrom,
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
      utmContent: data.utmContent,
      utmTerm: data.utmTerm,
      fbclid: data.fbclid,
      gclid: data.gclid,
      fbp: data.fbp,
      fbc: data.fbc,
      ipCountry,
      userAgent,
    },
  };

  let n8nSucceeded = false;
  let resendSucceeded = false;
  const hasN8nConfigured = Boolean(env.N8N_WEBHOOK_URL && env.N8N_WEBHOOK_URL.trim());
  const hasResendConfigured = Boolean(env.RESEND_API_KEY && env.RESEND_API_KEY.trim());

  if (hasN8nConfigured && env.N8N_WEBHOOK_URL) {
    const n8nResult = await postToN8nWithRetry(
      env.N8N_WEBHOOK_URL.trim(),
      env.N8N_WEBHOOK_SECRET,
      data.idempotencyKey,
      webhookPayload
    );
    n8nSucceeded = n8nResult.ok;
  }

  if (hasResendConfigured && env.RESEND_API_KEY) {
    const toEmail =
      env.ADMISSIONS_NOTIFICATION_EMAIL || ISSCA_INSTITUTION.emailAdmissions;
    const fromEmail =
      env.RESEND_FROM_EMAIL || "Admissions ISSCA <admissions@join.issca.tn>";
    const subjectPrefix = isPriorityBeforeDeadline
      ? "🔴 [PRIORITAIRE 28 NOV] "
      : "🎓 [Pré-candidature] ";
    const subject = `${subjectPrefix}${opportunityTitle}`;

    const htmlBody = `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 640px; margin: 0 auto; color: #0F2347;">
        <div style="background: #0F2347; color: #FFFFFF; padding: 20px 24px; border-radius: 10px 10px 0 0;">
          <p style="margin: 0; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: #FCA5A5;">
            ISSCA Business School · Admissions Master
          </p>
          <h1 style="margin: 6px 0 0; font-size: 18px;">${escapeHtml(opportunityTitle)}</h1>
        </div>
        <div style="border: 1px solid #E2E8F0; border-top: none; padding: 24px; border-radius: 0 0 10px 10px; background: #FFFFFF;">
          <p style="margin: 0 0 16px; padding: 12px; border-radius: 8px; background: ${
            isPriorityBeforeDeadline ? "#FEF2F2" : "#F8FAFC"
          }; border-left: 4px solid ${isPriorityBeforeDeadline ? "#D11623" : "#1C4E9E"};">
            <strong>Disponibilité (Clôture 28 nov. 2026) :</strong> ${escapeHtml(
              getReadinessLabel(data.readiness)
            )}
          </p>
          <pre style="white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, monospace; font-size: 13px; line-height: 1.5; background: #F8FAFC; padding: 16px; border-radius: 8px; border: 1px solid #E2E8F0;">${escapeHtml(
            admissionsSummary
          )}</pre>
        </div>
      </div>
    `;

    resendSucceeded = await sendResendNotification(
      env.RESEND_API_KEY.trim(),
      toEmail,
      fromEmail,
      subject,
      admissionsSummary,
      htmlBody
    );
  }

  const isLocalDevDryRun = !hasN8nConfigured && !hasResendConfigured;

  if (!isLocalDevDryRun && !n8nSucceeded && !resendSucceeded) {
    return jsonResponse(
      {
        ok: false,
        code: "UPSTREAM_DELIVERY_FAILED",
        message:
          "Le serveur de réception des candidatures rencontre une indisponibilité temporaire. Afin qu’aucune donnée ne soit perdue, veuillez réessayer dans un instant ou transmettre directement votre demande via WhatsApp au service des admissions.",
        fallbackWhatsAppUrl: buildAdmissionsWhatsAppUrl(
          `Bonjour ISSCA Business School, je souhaite soumettre ma pré-candidature au Master Management des Startups et de l'IA (${data.firstName} ${data.lastName} - ${getDegreeLabel(
            data.degreeLevel
          )}).`
        ),
      },
      502
    );
  }

  // Record idempotency key after confirmed upstream delivery
  processedIdempotencyKeys.set(data.idempotencyKey, {
    submissionId,
    eventId: data.eventId,
    timestamp,
  });

  // Fire server-side Meta Conversions API (Lead) when consented and configured
  if (
    (data.analyticsConsent || data.marketingConsent) &&
    env.META_PIXEL_ID &&
    env.META_CAPI_ACCESS_TOKEN
  ) {
    await sendMetaCapiLeadEvent({
      pixelId: env.META_PIXEL_ID,
      accessToken: env.META_CAPI_ACCESS_TOKEN,
      testEventCode: env.META_TEST_EVENT_CODE,
      eventId: data.eventId,
      eventSourceUrl: `${siteUrl}${data.submittedFrom || "/candidature"}`,
      clientIp,
      userAgent,
      email: data.email,
      phoneNormalized: normalizedPhone,
      firstName: data.firstName,
      lastName: data.lastName,
      city: data.city,
      fbp: data.fbp,
      fbc: data.fbc,
      degreeLevel: data.degreeLevel,
      readiness: data.readiness,
    });
  }

  return jsonResponse({
    ok: true,
    submissionId,
    eventId: data.eventId,
    timestamp,
    mode: isLocalDevDryRun ? "development_dry_run" : "production",
  });
}

const workerHandler = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/lead" || url.pathname === "/api/lead/") {
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": request.headers.get("Origin") || "https://join.issca.tn",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, X-Idempotency-Key",
            "Access-Control-Max-Age": "86400",
          },
        });
      }
      if (request.method === "POST") {
        return handleLeadSubmission(request, env);
      }
      return jsonResponse(
        {
          ok: false,
          code: "METHOD_NOT_ALLOWED",
          message: "Méthode HTTP non autorisée. Utilisez POST /api/lead.",
        },
        405
      );
    }

    if (url.pathname === "/api/health") {
      const deadline = getDeadlineStatus();
      return jsonResponse({
        ok: true,
        service: "issca-join",
        programId: PROGRAM_ID,
        deadlineIso: deadline.deadlineIso,
        tunisDateIso: deadline.tunisDateIso,
        daysRemaining: deadline.daysRemaining,
        isExpired: deadline.isExpired,
      });
    }

    // Serve static Next.js export via Cloudflare Workers Assets binding
    if (env.ASSETS && typeof env.ASSETS.fetch === "function") {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) {
        return assetResponse;
      }
      const notFoundUrl = new URL("/404.html", request.url);
      const notFoundAsset = await env.ASSETS.fetch(new Request(notFoundUrl.toString(), request));
      return new Response(notFoundAsset.body, {
        status: 404,
        headers: notFoundAsset.headers,
      });
    }

    return new Response("Not Found", { status: 404 });
  },
};

export default workerHandler;
