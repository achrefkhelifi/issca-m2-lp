import React from "react";
import Link from "next/link";
import {
  buildAdmissionsWhatsAppUrl,
  TUITION_AND_ADMISSIONS_CONFIG,
} from "@/content/program";
import { formatFrench } from "@/lib/typography";

export function TuitionAndAdmissions() {
  const whatsappAdvisorUrl = buildAdmissionsWhatsAppUrl(
    "Bonjour ISSCA Business School, je souhaite obtenir la confirmation des frais d'études et des modalités d'échéancier pour le Master Management des Startups et de l'IA."
  );

  return (
    <section
      id="frais-admission"
      aria-labelledby="heading-frais-admission"
      className="py-16 sm:py-24 bg-white border-b border-slate-200 cv-auto-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-issca-blue">
            Transparence Financière &amp; Procédure
          </p>
          <h2
            id="heading-frais-admission"
            className="mt-2 heading-section font-extrabold text-issca-navy"
          >
            {formatFrench("Frais et modalités d’admission")}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700">
            {formatFrench(
              "Un processus d’admission clair en trois étapes et des modalités de règlement échelonnées pour vous permettre de préparer votre rentrée en toute sérénité."
            )}
          </p>
        </div>

        {/* 3-Step Admission Procedure */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TUITION_AND_ADMISSIONS_CONFIG.admissionSteps.map((step) => (
            <div
              key={step.stepNumber}
              className="rounded-2xl bg-issca-surface border border-slate-200 p-6"
            >
              <span className="inline-flex items-center justify-center rounded-lg bg-issca-red px-3 py-1 text-xs font-extrabold text-white">
                Étape {step.stepNumber}
              </span>
              <h3 className="mt-4 heading-card font-bold text-issca-navy">
                {formatFrench(step.title)}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {formatFrench(step.description)}
              </p>
            </div>
          ))}
        </div>

        {/* Tuition & Required Documents Two-Column Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Tuition & Confirmed Payment Modalities */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <span className="inline-flex items-center rounded-md bg-blue-50 border border-blue-200 px-2.5 py-1 text-xs font-bold text-issca-blue">
                  Barème Master &amp; Échéancier
                </span>
                <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-issca-navy">
                  {formatFrench("Frais d’études et facilités de paiement")}
                </h3>
              </div>
              {TUITION_AND_ADMISSIONS_CONFIG.showIndicativePublishedRate && (
                <div className="rounded-xl bg-issca-surface border border-slate-200 px-4 py-3 text-left sm:text-right">
                  <p className="text-xs font-semibold text-slate-500">
                    Barème Master publié (indicatif)
                  </p>
                  <p className="text-xl font-extrabold text-issca-navy">
                    {formatFrench(TUITION_AND_ADMISSIONS_CONFIG.indicativeAnnualMasterFeeTnd)}
                  </p>
                  <p className="text-[11px] font-medium text-slate-600">
                    + {formatFrench(TUITION_AND_ADMISSIONS_CONFIG.indicativeRegistrationFeeResidentTnd)} de frais d’inscription
                  </p>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5">
              {formatFrench(TUITION_AND_ADMISSIONS_CONFIG.feeVerificationDisclaimer)}
            </p>

            {/* 3 Installments Schedule */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-issca-navy">
                Règlement en 3 tranches documenté
              </h4>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TUITION_AND_ADMISSIONS_CONFIG.installmentPlan.map((item) => (
                  <div
                    key={item.tranche}
                    className="rounded-xl bg-issca-surface border border-slate-200 p-3.5"
                  >
                    <p className="text-xs font-extrabold uppercase text-issca-blue">
                      {item.tranche}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-800">
                      {formatFrench(item.timing)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Advantages & Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Dispositions particulières
                </h4>
                <ul className="mt-2.5 space-y-2">
                  {TUITION_AND_ADMISSIONS_CONFIG.paymentAdvantages.map((adv) => (
                    <li
                      key={adv}
                      className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-issca-red mt-2 shrink-0"
                      />
                      <span>{formatFrench(adv)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Moyens de paiement acceptés
                </h4>
                <ul className="mt-2.5 space-y-2">
                  {TUITION_AND_ADMISSIONS_CONFIG.acceptedPaymentMethods.map((method) => (
                    <li
                      key={method}
                      className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-issca-blue mt-2 shrink-0"
                      />
                      <span>{formatFrench(method)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs sm:text-sm font-semibold text-slate-700">
                Une question sur le barème ou l’échéancier mensuel&nbsp;?
              </p>
              <a
                href={whatsappAdvisorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-outline text-xs sm:text-sm px-4 py-2"
              >
                <span>Poser une question financière à un conseiller</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* Right: Required Official Dossier Documents Checklist */}
          <div className="lg:col-span-5 rounded-2xl bg-issca-navy text-white p-6 sm:p-8 flex flex-col justify-between shadow-card">
            <div>
              <span className="inline-flex items-center rounded-md bg-white/10 px-2.5 py-1 text-xs font-bold text-blue-200">
                Pièces du dossier (Étape 2)
              </span>
              <h3 className="mt-3 text-xl sm:text-2xl font-extrabold text-white">
                {formatFrench("Documents requis pour l’inscription définitive")}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {formatFrench(
                  "Ces pièces ne sont pas demandées lors de la pré-candidature en ligne, mais seront à présenter lors de l’étude complète de votre dossier :"
                )}
              </p>

              <ul className="mt-5 space-y-3">
                {TUITION_AND_ADMISSIONS_CONFIG.requiredDossierDocuments.map((doc) => (
                  <li
                    key={doc}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-100"
                  >
                    <svg
                      className="h-4 w-4 text-red-400 shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{formatFrench(doc)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-white/15 space-y-3">
              <p className="text-xs text-slate-300">
                {formatFrench(
                  "Clôture des inscriptions : 28 novembre 2026. Initiez votre dossier dès aujourd’hui en 2 minutes."
                )}
              </p>
              <Link
                href="/candidature"
                className="btn-primary-red w-full text-center text-base"
              >
                <span>Démarrer ma candidature</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
