"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CURRENT_SITUATION_OPTIONS,
  DEGREE_LEVEL_OPTIONS,
  DESIRED_INTAKE_OPTIONS,
  getCurrentSituationLabel,
  getDegreeLabel,
  getDesiredIntakeLabel,
  getReadinessLabel,
  GRADUATION_YEAR_OPTIONS,
  READINESS_OPTIONS,
  step1Schema,
  step2Schema,
  step3Schema,
  type CurrentSituationValue,
  type DegreeLevelValue,
  type DesiredIntakeValue,
  type ReadinessValue,
} from "@/lib/schema";
import {
  generateEventId,
  getConsentStatus,
  getStoredAttribution,
  storeLastSubmission,
  trackConfirmedLead,
  trackFormStart,
  trackFormStep,
} from "@/lib/analytics";
import { getDeadlineStatus, type DeadlineStatus } from "@/lib/deadline";
import { buildAdmissionsWhatsAppUrl, ISSCA_INSTITUTION } from "@/content/program";
import { formatFrench } from "@/lib/typography";

type FunnelStep = 1 | 2 | 3 | 4;

interface FormState {
  degreeLevel: DegreeLevelValue | "";
  specialization: string;
  institution: string;
  graduationYear: string;
  desiredIntake: DesiredIntakeValue;
  currentSituation: CurrentSituationValue | "";
  readiness: ReadinessValue | "";
  motivation: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  comments: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
  website: string; // Honeypot
}

const STEP_TITLES: Record<FunnelStep, { label: string; subtitle: string }> = {
  1: {
    label: "1. Parcours académique",
    subtitle: "Vérifions l’adéquation de votre diplôme avec les prérequis du Master.",
  },
  2: {
    label: "2. Projet & disponibilité",
    subtitle: "Précisez votre objectif et votre calendrier en vue de la clôture du 28 novembre 2026.",
  },
  3: {
    label: "3. Coordonnées personnelles",
    subtitle: "Indiquez comment un conseiller aux admissions d’ISSCA peut vous joindre.",
  },
  4: {
    label: "4. Vérification & envoi",
    subtitle: "Relisez votre récapitulatif avant d’envoyer votre pré-candidature.",
  },
};

export function CandidatureFunnel() {
  const router = useRouter();
  const [step, setStep] = useState<FunnelStep>(1);
  const [deadline, setDeadline] = useState<DeadlineStatus>(() => getDeadlineStatus());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<{
    message: string;
    whatsappUrl: string;
  } | null>(null);

  const idempotencyKeyRef = useRef<string>("");
  const eventIdRef = useRef<string>("");
  const stepHeadingRef = useRef<HTMLHeadingElement | null>(null);

  const [form, setForm] = useState<FormState>({
    degreeLevel: "",
    specialization: "",
    institution: "",
    graduationYear: "2026 (en cours d’obtention)",
    desiredIntake: "session_nov_2026",
    currentSituation: "",
    readiness: "",
    motivation: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    comments: "",
    privacyConsent: false,
    marketingConsent: false,
    website: "",
  });

  useEffect(() => {
    setDeadline(getDeadlineStatus());
    if (!idempotencyKeyRef.current) {
      idempotencyKeyRef.current = generateEventId("idem");
    }
    if (!eventIdRef.current) {
      eventIdRef.current = generateEventId("lead");
    }
  }, []);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    trackFormStart();
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (submitError) {
      setSubmitError(null);
    }
  }

  function validateSingleField(fieldName: keyof FormState, currentForm: FormState = form) {
    let schemaToUse: typeof step1Schema | typeof step2Schema | typeof step3Schema | null =
      null;
    if (
      fieldName === "degreeLevel" ||
      fieldName === "specialization" ||
      fieldName === "institution" ||
      fieldName === "graduationYear"
    ) {
      schemaToUse = step1Schema;
    } else if (
      fieldName === "desiredIntake" ||
      fieldName === "currentSituation" ||
      fieldName === "readiness" ||
      fieldName === "motivation"
    ) {
      schemaToUse = step2Schema;
    } else if (
      fieldName === "firstName" ||
      fieldName === "lastName" ||
      fieldName === "phone" ||
      fieldName === "email" ||
      fieldName === "city" ||
      fieldName === "comments" ||
      fieldName === "privacyConsent"
    ) {
      schemaToUse = step3Schema;
    }

    if (!schemaToUse) return;
    const result = schemaToUse.safeParse(currentForm);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === fieldName);
      if (issue) {
        setErrors((prev) => ({ ...prev, [fieldName]: issue.message }));
      }
    }
  }

  function validateStep(targetStep: 1 | 2 | 3): boolean {
    const schema =
      targetStep === 1 ? step1Schema : targetStep === 2 ? step2Schema : step3Schema;
    const parsed = schema.safeParse(form);
    if (parsed.success) {
      setErrors({});
      return true;
    }
    const nextErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] || "form");
      if (!nextErrors[key]) {
        nextErrors[key] = issue.message;
      }
    }
    setErrors(nextErrors);
    return false;
  }

  function handleNextStep() {
    if (step === 1 && validateStep(1)) {
      trackFormStep(1, "Parcours académique");
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => stepHeadingRef.current?.focus(), 60);
    } else if (step === 2 && validateStep(2)) {
      trackFormStep(2, "Projet et disponibilité");
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => stepHeadingRef.current?.focus(), 60);
    } else if (step === 3 && validateStep(3)) {
      trackFormStep(3, "Coordonnées personnelles");
      setStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => stepHeadingRef.current?.focus(), 60);
    }
  }

  function handlePrevStep(target?: FunnelStep) {
    setErrors({});
    setSubmitError(null);
    const prev = target ?? ((Math.max(1, step - 1) as FunnelStep));
    setStep(prev);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => stepHeadingRef.current?.focus(), 60);
  }

  async function handleFinalSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate all 3 steps before POST
    if (!validateStep(1)) {
      setStep(1);
      return;
    }
    if (!validateStep(2)) {
      setStep(2);
      return;
    }
    if (!validateStep(3)) {
      setStep(3);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const attribution = getStoredAttribution();
    const consentStatus = getConsentStatus();

    const payload = {
      degreeLevel: form.degreeLevel as DegreeLevelValue,
      specialization: form.specialization.trim(),
      institution: form.institution.trim(),
      graduationYear: form.graduationYear,
      desiredIntake: form.desiredIntake,
      currentSituation: form.currentSituation as CurrentSituationValue,
      readiness: form.readiness as ReadinessValue,
      motivation: form.motivation.trim(),
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim().toLowerCase(),
      city: form.city.trim(),
      comments: form.comments.trim(),
      privacyConsent: form.privacyConsent,
      marketingConsent: form.marketingConsent,
      website: form.website,
      eventId: eventIdRef.current,
      idempotencyKey: idempotencyKeyRef.current,
      submittedFrom: "/candidature",
      utmSource: attribution.utmSource,
      utmMedium: attribution.utmMedium,
      utmCampaign: attribution.utmCampaign,
      utmContent: attribution.utmContent,
      utmTerm: attribution.utmTerm,
      fbclid: attribution.fbclid,
      gclid: attribution.gclid,
      fbp: attribution.fbp,
      fbc: attribution.fbc,
      analyticsConsent: consentStatus === "granted",
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Idempotency-Key": idempotencyKeyRef.current,
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        submissionId?: string;
        eventId?: string;
        message?: string;
        fallbackWhatsAppUrl?: string;
        fieldErrors?: Record<string, string>;
      } | null;

      if (!response.ok || !data?.ok) {
        if (data?.fieldErrors) {
          setErrors(data.fieldErrors);
        }
        const fallbackMsg =
          data?.message ||
          "Une erreur technique temporaire a empêché la transmission de votre pré-candidature. Vous pouvez réessayer ou transmettre votre demande directement sur WhatsApp.";
        const fallbackUrl =
          data?.fallbackWhatsAppUrl ||
          buildAdmissionsWhatsAppUrl(
            `Bonjour ISSCA Business School, je souhaite soumettre ma pré-candidature au Master Management des Startups et de l'IA (${form.firstName} ${form.lastName}).`
          );
        setSubmitError({ message: fallbackMsg, whatsappUrl: fallbackUrl });
        setIsSubmitting(false);
        return;
      }

      const confirmedSubmissionId = data.submissionId || `ISSCA-${Date.now()}`;
      const confirmedEventId = data.eventId || eventIdRef.current;

      storeLastSubmission({
        submissionId: confirmedSubmissionId,
        eventId: confirmedEventId,
        firstName: form.firstName.trim(),
        degreeLabel: getDegreeLabel(form.degreeLevel as DegreeLevelValue),
        readiness: form.readiness,
        submittedAt: new Date().toISOString(),
      });

      trackConfirmedLead({
        eventId: confirmedEventId,
        submissionId: confirmedSubmissionId,
        degreeLevel: form.degreeLevel,
        desiredIntake: form.desiredIntake,
        readiness: form.readiness,
      });

      router.push(`/merci?ref=${encodeURIComponent(confirmedSubmissionId)}`);
    } catch {
      const fallbackUrl = buildAdmissionsWhatsAppUrl(
        `Bonjour ISSCA Business School, je souhaite soumettre ma pré-candidature au Master Management des Startups et de l'IA (${form.firstName} ${form.lastName}, ${getDegreeLabel(
          (form.degreeLevel as DegreeLevelValue) || "licence_bac3"
        )}).`
      );
      setSubmitError({
        message:
          "Impossible de joindre le serveur de candidature (vérifiez votre connexion internet). Vous pouvez réessayer immédiatement ou envoyer votre pré-candidature via WhatsApp.",
        whatsappUrl: fallbackUrl,
      });
      setIsSubmitting(false);
    }
  }

  function renderFieldError(fieldName: string) {
    const err = errors[fieldName];
    if (!err) return null;
    return (
      <p
        id={`${fieldName}-error`}
        role="alert"
        className="mt-1.5 flex items-start gap-1.5 text-xs sm:text-sm font-semibold text-issca-red"
      >
        <svg
          className="h-4 w-4 shrink-0 mt-0.5 text-issca-red"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{formatFrench(err)}</span>
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Top Deadline & Program Context Card */}
      <div className="rounded-2xl bg-issca-navy text-white p-5 sm:p-6 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-xs font-bold text-red-300">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-issca-red" />
            <span>{deadline.badgeText}</span>
          </span>
          {deadline.countdownChipText && (
            <span className="text-xs font-bold text-blue-200">
              {deadline.countdownChipText}
            </span>
          )}
        </div>
        <h1
          id="main-heading"
          tabIndex={-1}
          className="mt-3 text-xl sm:text-2xl font-extrabold text-white focus:outline-none"
        >
          {formatFrench(
            "Pré-candidature — Master Management des Startups et de l’IA"
          )}
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
          {formatFrench(deadline.funnelSubtext)}
        </p>
      </div>

      {/* Progress Bar & Stepper Header */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-8 shadow-card">
        <div className="mb-6">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span
              id="progress-step-label"
              className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-issca-blue"
            >
              Étape {step} sur 4 — {STEP_TITLES[step].label.slice(3)}
            </span>
            <span className="text-xs font-bold text-slate-600">
              {step * 25}&nbsp;% complété
            </span>
          </div>
          <progress
            className="issca-progress"
            value={step}
            max={4}
            aria-labelledby="progress-step-label"
          />

          {/* Step Pills */}
          <ol className="mt-4 grid grid-cols-4 gap-2 text-xs">
            {([1, 2, 3, 4] as FunnelStep[]).map((s) => {
              const isCurrent = s === step;
              const isCompleted = s < step;
              return (
                <li
                  key={s}
                  className={`rounded-lg px-2.5 py-1.5 font-semibold truncate border ${
                    isCurrent
                      ? "bg-blue-50 border-issca-blue text-issca-navy"
                      : isCompleted
                      ? "bg-emerald-50/70 border-emerald-200 text-emerald-900"
                      : "bg-slate-50 border-slate-200 text-slate-500"
                  }`}
                >
                  <span className="hidden sm:inline">{STEP_TITLES[s].label}</span>
                  <span className="sm:hidden">Étape {s}</span>
                </li>
              );
            })}
          </ol>
        </div>

        <form onSubmit={handleFinalSubmit} noValidate>
          {/* Anti-spam honeypot */}
          <div className="visually-hidden" aria-hidden="true">
            <label htmlFor="website-hp">Ne pas remplir ce champ</label>
            <input
              id="website-hp"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => updateField("website", e.target.value)}
            />
          </div>

          <div className="border-b border-slate-200 pb-4 mb-6">
            <h2
              ref={stepHeadingRef}
              tabIndex={-1}
              className="text-lg sm:text-xl font-extrabold text-issca-navy focus:outline-none"
            >
              {formatFrench(STEP_TITLES[step].label)}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              {formatFrench(STEP_TITLES[step].subtitle)}
            </p>
          </div>

          {/* STEP 1: ACADEMIC ELIGIBILITY */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Degree Level Radio Cards (<fieldset> + <legend> for 4 mutually exclusive options) */}
              <fieldset
                aria-describedby={errors.degreeLevel ? "degreeLevel-error" : undefined}
              >
                <legend className="text-sm sm:text-base font-bold text-issca-navy">
                  Quel est votre niveau d’études actuel (ou dernier diplôme obtenu)&nbsp;?{" "}
                  <span className="text-issca-red">*</span>
                </legend>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DEGREE_LEVEL_OPTIONS.map((option) => {
                    const checked = form.degreeLevel === option.value;
                    return (
                      <label
                        key={option.value}
                        className={`cursor-pointer rounded-xl border p-4 flex items-start gap-3 transition-colors ${
                          checked
                            ? "border-issca-blue bg-blue-50/60 ring-2 ring-issca-blue/20"
                            : "border-slate-300 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="degreeLevel"
                          value={option.value}
                          checked={checked}
                          onChange={() => updateField("degreeLevel", option.value)}
                          className="mt-1 h-4 w-4 text-issca-blue focus:ring-issca-blue"
                        />
                        <div>
                          <span className="block text-sm font-bold text-issca-navy">
                            {formatFrench(option.label)}
                          </span>
                          <span className="mt-1 block text-xs text-slate-600 leading-relaxed">
                            {formatFrench(option.description)}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
                {renderFieldError("degreeLevel")}
              </fieldset>

              {/* Specialization Input */}
              <div>
                <label
                  htmlFor="specialization"
                  className="block text-sm sm:text-base font-bold text-issca-navy mb-1.5"
                >
                  Spécialité ou filière d’études <span className="text-issca-red">*</span>
                </label>
                <p id="specialization-hint" className="text-xs text-slate-600 mb-2">
                  Ex.&nbsp;: Gestion, Marketing, Informatique de gestion, Génie logiciel, Économie, Finance...
                </p>
                <input
                  id="specialization"
                  name="specialization"
                  type="text"
                  required
                  value={form.specialization}
                  onChange={(e) => updateField("specialization", e.target.value)}
                  onBlur={() => validateSingleField("specialization")}
                  aria-invalid={Boolean(errors.specialization)}
                  aria-describedby={
                    errors.specialization
                      ? "specialization-hint specialization-error"
                      : "specialization-hint"
                  }
                  placeholder="Votre spécialité actuelle ou de diplôme"
                  className="form-input-field"
                />
                {renderFieldError("specialization")}
              </div>

              {/* Institution Input */}
              <div>
                <label
                  htmlFor="institution"
                  className="block text-sm sm:text-base font-bold text-issca-navy mb-1.5"
                >
                  Université, faculté ou école d’origine{" "}
                  <span className="text-issca-red">*</span>
                </label>
                <input
                  id="institution"
                  name="institution"
                  type="text"
                  required
                  value={form.institution}
                  onChange={(e) => updateField("institution", e.target.value)}
                  onBlur={() => validateSingleField("institution")}
                  aria-invalid={Boolean(errors.institution)}
                  aria-describedby={errors.institution ? "institution-error" : undefined}
                  placeholder="Ex. : IHEC, FSEG Sousse, ISG, ESSTHS, ISSCA..."
                  className="form-input-field"
                />
                {renderFieldError("institution")}
              </div>

              {/* Graduation Year Radio Buttons (5 options -> exposed as visible radios per modern-web-guidance) */}
              <fieldset
                aria-describedby={
                  errors.graduationYear ? "graduationYear-error" : undefined
                }
              >
                <legend className="text-sm sm:text-base font-bold text-issca-navy">
                  Année d’obtention du diplôme (ou prévue){" "}
                  <span className="text-issca-red">*</span>
                </legend>
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {GRADUATION_YEAR_OPTIONS.map((yr) => {
                    const checked = form.graduationYear === yr;
                    return (
                      <label
                        key={yr}
                        className={`cursor-pointer inline-flex min-h-[48px] items-center gap-2 rounded-xl border px-4 py-2 text-xs sm:text-sm font-semibold transition-colors ${
                          checked
                            ? "border-issca-blue bg-blue-50 text-issca-navy"
                            : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="graduationYear"
                          value={yr}
                          checked={checked}
                          onChange={() => updateField("graduationYear", yr)}
                          className="h-4 w-4 text-issca-blue"
                        />
                        <span>{yr}</span>
                      </label>
                    );
                  })}
                </div>
                {renderFieldError("graduationYear")}
              </fieldset>

              <div className="pt-4 flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn-primary-red w-full sm:w-auto text-base px-7"
                >
                  <span>Continuer vers l’étape 2</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ADMISSION INTENTIONS */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Desired Intake */}
              <fieldset
                aria-describedby={errors.desiredIntake ? "desiredIntake-error" : undefined}
              >
                <legend className="text-sm sm:text-base font-bold text-issca-navy">
                  Pour quelle année universitaire candidatez-vous&nbsp;?{" "}
                  <span className="text-issca-red">*</span>
                </legend>
                <div className="mt-3 space-y-3">
                  {DESIRED_INTAKE_OPTIONS.map((option) => {
                    const checked = form.desiredIntake === option.value;
                    return (
                      <label
                        key={option.value}
                        className={`cursor-pointer rounded-xl border p-4 flex items-start gap-3 transition-colors ${
                          checked
                            ? "border-issca-blue bg-blue-50/60 ring-2 ring-issca-blue/20"
                            : "border-slate-300 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="desiredIntake"
                          value={option.value}
                          checked={checked}
                          onChange={() => updateField("desiredIntake", option.value)}
                          className="mt-1 h-4 w-4 text-issca-blue"
                        />
                        <div>
                          <span className="block text-sm font-bold text-issca-navy">
                            {formatFrench(option.label)}
                          </span>
                          <span className="mt-0.5 block text-xs text-slate-600">
                            {formatFrench(option.description)}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
                {renderFieldError("desiredIntake")}
              </fieldset>

              {/* Current Situation */}
              <fieldset
                aria-describedby={
                  errors.currentSituation ? "currentSituation-error" : undefined
                }
              >
                <legend className="text-sm sm:text-base font-bold text-issca-navy">
                  Quelle est votre situation actuelle&nbsp;?{" "}
                  <span className="text-issca-red">*</span>
                </legend>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CURRENT_SITUATION_OPTIONS.map((option) => {
                    const checked = form.currentSituation === option.value;
                    return (
                      <label
                        key={option.value}
                        className={`cursor-pointer rounded-xl border p-3.5 flex items-center gap-3 transition-colors min-h-[48px] ${
                          checked
                            ? "border-issca-blue bg-blue-50/60 ring-2 ring-issca-blue/20"
                            : "border-slate-300 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="currentSituation"
                          value={option.value}
                          checked={checked}
                          onChange={() => updateField("currentSituation", option.value)}
                          className="h-4 w-4 text-issca-blue shrink-0"
                        />
                        <span className="text-xs sm:text-sm font-bold text-issca-navy">
                          {formatFrench(option.label)}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {renderFieldError("currentSituation")}
              </fieldset>

              {/* Readiness before November 28, 2026 */}
              <fieldset
                aria-describedby={errors.readiness ? "readiness-error" : undefined}
              >
                <legend className="text-sm sm:text-base font-bold text-issca-navy">
                  Disponibilité par rapport à la clôture du 28 novembre 2026{" "}
                  <span className="text-issca-red">*</span>
                </legend>
                <div className="mt-3 space-y-3">
                  {READINESS_OPTIONS.map((option) => {
                    const checked = form.readiness === option.value;
                    return (
                      <label
                        key={option.value}
                        className={`cursor-pointer rounded-xl border p-4 flex items-start justify-between gap-3 transition-colors ${
                          checked
                            ? "border-issca-blue bg-blue-50/60 ring-2 ring-issca-blue/20"
                            : "border-slate-300 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="readiness"
                            value={option.value}
                            checked={checked}
                            onChange={() => updateField("readiness", option.value)}
                            className="mt-1 h-4 w-4 text-issca-blue shrink-0"
                          />
                          <span className="text-xs sm:text-sm font-bold text-issca-navy">
                            {formatFrench(option.label)}
                          </span>
                        </div>
                        <span className="hidden sm:inline-flex shrink-0 items-center rounded-md bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700">
                          {option.badge}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {renderFieldError("readiness")}
              </fieldset>

              {/* Optional Motivation */}
              <div>
                <label
                  htmlFor="motivation"
                  className="block text-sm sm:text-base font-bold text-issca-navy mb-1"
                >
                  Votre objectif professionnel ou projet startup{" "}
                  <span className="text-xs font-normal text-slate-500">(facultatif)</span>
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  rows={3}
                  value={form.motivation}
                  onChange={(e) => updateField("motivation", e.target.value)}
                  placeholder="Ex. : Créer une startup, évoluer vers un poste de Product Manager / Consultant IA..."
                  className="form-input-field"
                />
                {renderFieldError("motivation")}
              </div>

              <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handlePrevStep(1)}
                  className="btn-secondary-outline text-sm px-5"
                >
                  <span aria-hidden="true">←</span>
                  <span>Étape précédente</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn-primary-red text-base px-7"
                >
                  <span>Continuer vers mes coordonnées</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PERSONAL DETAILS */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-bold text-issca-navy mb-1.5"
                  >
                    Prénom <span className="text-issca-red">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    onBlur={() => validateSingleField("firstName")}
                    aria-invalid={Boolean(errors.firstName)}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                    placeholder="Votre prénom"
                    className="form-input-field"
                  />
                  {renderFieldError("firstName")}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-bold text-issca-navy mb-1.5"
                  >
                    Nom de famille <span className="text-issca-red">*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    onBlur={() => validateSingleField("lastName")}
                    aria-invalid={Boolean(errors.lastName)}
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                    placeholder="Votre nom"
                    className="form-input-field"
                  />
                  {renderFieldError("lastName")}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-bold text-issca-navy mb-1.5"
                  >
                    Numéro de téléphone (WhatsApp / Appel){" "}
                    <span className="text-issca-red">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    onBlur={() => validateSingleField("phone")}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    placeholder="Ex. : 20 390 039 ou +216 20 390 039"
                    className="form-input-field"
                  />
                  {renderFieldError("phone")}
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-bold text-issca-navy mb-1.5"
                  >
                    Ville de résidence <span className="text-issca-red">*</span>
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    required
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    onBlur={() => validateSingleField("city")}
                    aria-invalid={Boolean(errors.city)}
                    aria-describedby={errors.city ? "city-error" : undefined}
                    placeholder="Ex. : Sousse, Monastir, Tunis..."
                    className="form-input-field"
                  />
                  {renderFieldError("city")}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-issca-navy mb-1.5"
                >
                  Adresse e-mail <span className="text-issca-red">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  required
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  onBlur={() => validateSingleField("email")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="prenom.nom@exemple.com"
                  className="form-input-field"
                />
                {renderFieldError("email")}
              </div>

              <div>
                <label
                  htmlFor="comments"
                  className="block text-sm font-bold text-issca-navy mb-1"
                >
                  Questions particulières pour le conseiller aux admissions{" "}
                  <span className="text-xs font-normal text-slate-500">(facultatif)</span>
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  rows={2}
                  value={form.comments}
                  onChange={(e) => updateField("comments", e.target.value)}
                  placeholder="Ex. : Demande de précision sur l'intégration en M2, les horaires, l'échéancier..."
                  className="form-input-field"
                />
                {renderFieldError("comments")}
              </div>

              {/* Privacy & Marketing Consents */}
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div>
                  <label className="cursor-pointer flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="privacyConsent"
                      checked={form.privacyConsent}
                      onChange={(e) => updateField("privacyConsent", e.target.checked)}
                      aria-invalid={Boolean(errors.privacyConsent)}
                      aria-describedby={
                        errors.privacyConsent ? "privacyConsent-error" : undefined
                      }
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-issca-blue focus:ring-issca-blue shrink-0"
                    />
                    <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      J’accepte que mes informations soient traitées par{" "}
                      <strong>{ISSCA_INSTITUTION.shortName}</strong> aux fins d’étude de ma
                      pré-candidature et de prise de contact par le service des admissions.{" "}
                      <Link
                        href="/confidentialite"
                        target="_blank"
                        className="underline text-issca-blue hover:text-issca-navy"
                      >
                        Politique de confidentialité
                      </Link>{" "}
                      <span className="text-issca-red">*</span>
                    </span>
                  </label>
                  {renderFieldError("privacyConsent")}
                </div>

                <label className="cursor-pointer flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="marketingConsent"
                    checked={form.marketingConsent}
                    onChange={(e) => updateField("marketingConsent", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-issca-blue focus:ring-issca-blue shrink-0"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    J’accepte de recevoir par e-mail ou WhatsApp les actualités, journées portes
                    ouvertes et informations sur les programmes d’ISSCA Business School (facultatif).
                  </span>
                </label>
              </div>

              <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handlePrevStep(2)}
                  className="btn-secondary-outline text-sm px-5"
                >
                  <span aria-hidden="true">←</span>
                  <span>Étape précédente</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn-primary-red text-base px-7"
                >
                  <span>Vérifier ma candidature</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & CONFIRM SUBMISSION */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="rounded-xl bg-issca-surface border border-slate-200 p-4 sm:p-5 space-y-4">
                {/* Section 1 Recap */}
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-issca-blue">
                      1. Parcours académique
                    </p>
                    <p className="mt-1 text-sm font-bold text-issca-navy">
                      {form.degreeLevel ? getDegreeLabel(form.degreeLevel) : ""} ·{" "}
                      {form.specialization}
                    </p>
                    <p className="text-xs text-slate-600">
                      Établissement : {form.institution} ({form.graduationYear})
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handlePrevStep(1)}
                    className="text-xs font-bold text-issca-blue underline hover:text-issca-navy shrink-0"
                  >
                    Modifier
                  </button>
                </div>

                {/* Section 2 Recap */}
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-issca-blue">
                      2. Projet &amp; Disponibilité
                    </p>
                    <p className="mt-1 text-sm font-bold text-issca-navy">
                      {getDesiredIntakeLabel(form.desiredIntake)}
                    </p>
                    <p className="text-xs text-slate-600">
                      Situation :{" "}
                      {form.currentSituation
                        ? getCurrentSituationLabel(form.currentSituation)
                        : ""}{" "}
                      ·{" "}
                      {form.readiness ? getReadinessLabel(form.readiness) : ""}
                    </p>
                    {form.motivation && (
                      <p className="mt-1 text-xs text-slate-700 italic">
                        « {form.motivation} »
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handlePrevStep(2)}
                    className="text-xs font-bold text-issca-blue underline hover:text-issca-navy shrink-0"
                  >
                    Modifier
                  </button>
                </div>

                {/* Section 3 Recap */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-issca-blue">
                      3. Coordonnées personnelles
                    </p>
                    <p className="mt-1 text-sm font-bold text-issca-navy">
                      {form.firstName} {form.lastName} ({form.city})
                    </p>
                    <p className="text-xs text-slate-600">
                      Tél. : {form.phone} · E-mail : {form.email}
                    </p>
                    {form.comments && (
                      <p className="mt-1 text-xs text-slate-700">
                        Remarque : {form.comments}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handlePrevStep(3)}
                    className="text-xs font-bold text-issca-blue underline hover:text-issca-navy shrink-0"
                  >
                    Modifier
                  </button>
                </div>
              </div>

              <div className="rounded-xl bg-blue-50/70 border border-blue-200 p-4 text-xs sm:text-sm text-slate-700">
                <p className="font-bold text-issca-navy">
                  Que se passe-t-il après l’envoi de votre pré-candidature&nbsp;?
                </p>
                <p className="mt-1 leading-relaxed">
                  Votre demande est enregistrée auprès du service des admissions d’ISSCA Business School. Un conseiller vous contactera rapidement pour valider les pièces de votre dossier et planifier votre entretien d’admission avant la clôture du 28 novembre 2026.
                </p>
              </div>

              {/* Upstream Error Banner + WhatsApp Fallback */}
              {submitError && (
                <div
                  role="alert"
                  className="rounded-xl bg-red-50 border border-red-300 p-4 text-xs sm:text-sm text-slate-900 space-y-3"
                >
                  <p className="font-bold text-issca-red flex items-center gap-2">
                    <svg
                      className="h-5 w-5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Envoi temporairement interrompu</span>
                  </p>
                  <p>{formatFrench(submitError.message)}</p>
                  <div>
                    <a
                      href={submitError.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary-outline text-xs sm:text-sm px-4 py-2"
                    >
                      <span>Transmettre ma candidature via WhatsApp</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              )}

              <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handlePrevStep(3)}
                  className="btn-secondary-outline text-sm px-5 disabled:opacity-50"
                >
                  <span aria-hidden="true">←</span>
                  <span>Modifier mes coordonnées</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary-red text-base sm:text-lg px-8 py-3.5 shadow-card disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Envoyer ma pré-candidature</span>
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
