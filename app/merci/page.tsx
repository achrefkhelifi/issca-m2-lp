import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { DeadlineBanner } from "@/components/DeadlineBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  buildAdmissionsWhatsAppUrl,
  ISSCA_INSTITUTION,
  TUITION_AND_ADMISSIONS_CONFIG,
} from "@/content/program";
import { formatFrench } from "@/lib/typography";

export const metadata: Metadata = {
  title: "Pré-candidature reçue — Prochaines étapes d’admission",
  description:
    "Confirmation de réception de votre pré-candidature au Master Management des Startups et de l’IA à ISSCA Business School.",
  robots: {
    index: false,
    follow: false,
  },
};

const ADMISSION_STATUS_STAGES = [
  {
    step: 1,
    title: "Pré-candidature reçue",
    statusLabel: "Validé aujourd’hui",
    state: "completed" as const,
    description:
      "Votre demande en ligne a bien été enregistrée par le service des admissions d’ISSCA Business School.",
  },
  {
    step: 2,
    title: "Appel d’un conseiller",
    statusLabel: "Prochaine étape",
    state: "active" as const,
    description:
      "Un conseiller aux admissions vous rappelle sous 24h à 48h pour répondre à vos questions et faire le point sur votre dossier.",
  },
  {
    step: 3,
    title: "Validation du dossier",
    statusLabel: "Par la commission",
    state: "upcoming" as const,
    description:
      "Validation de vos pièces académiques par l’équipe pédagogique du Master.",
  },
  {
    step: 4,
    title: "Inscription confirmée",
    statusLabel: "Avant le 28 novembre",
    state: "upcoming" as const,
    description:
      "Dépôt définitif du dossier administratif avant la date finale d’inscription du 28 novembre.",
  },
];

export default function MerciPage() {
  const whatsappConfirmationUrl = buildAdmissionsWhatsAppUrl(
    "Bonjour ISSCA Business School, je viens d'envoyer ma pré-candidature sur join.issca.tn pour le Master Management des Startups et de l'IA (année universitaire 2026/2027)."
  );

  return (
    <>
      <DeadlineBanner />
      <Header minimal />
      <main
        id="main-content"
        className="flex-1 bg-issca-surface py-10 sm:py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Top Confirmation Card */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-10 shadow-card">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1 text-xs font-extrabold text-emerald-800">
              <svg
                className="h-4 w-4 text-emerald-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Étape 1 validée · Pré-candidature transmise</span>
            </div>

            <h1
              id="main-heading"
              tabIndex={-1}
              className="mt-4 heading-section font-extrabold text-issca-navy focus:outline-none"
            >
              {formatFrench(
                "Merci ! Votre pré-candidature a bien été enregistrée."
              )}
            </h1>

            <p className="mt-3 text-base sm:text-lg text-slate-700 leading-relaxed">
              {formatFrench(
                "Votre demande pour le Master Professionnel en Management des Startups et de l’Intelligence Artificielle a été transmise à l’équipe des admissions d’ISSCA Business School à Sousse."
              )}
            </p>

            {/* 4-Stage Admission Progress Tracker */}
            <div className="mt-8">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-issca-blue">
                Suivi des étapes de votre admission
              </h2>
              <ol className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {ADMISSION_STATUS_STAGES.map((stage) => {
                  const cardStyle =
                    stage.state === "completed"
                      ? "border-emerald-300 bg-emerald-50/50"
                      : stage.state === "active"
                      ? "border-issca-blue bg-blue-50/50 ring-2 ring-issca-blue/20"
                      : "border-slate-200 bg-slate-50";

                  const badgeStyle =
                    stage.state === "completed"
                      ? "bg-emerald-700 text-white"
                      : stage.state === "active"
                      ? "bg-issca-red text-white"
                      : "bg-slate-200 text-slate-700";

                  return (
                    <li
                      key={stage.step}
                      className={`rounded-xl border p-4 flex flex-col justify-between ${cardStyle}`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-extrabold text-issca-navy">
                            0{stage.step}
                          </span>
                          <span
                            className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${badgeStyle}`}
                          >
                            {stage.statusLabel}
                          </span>
                        </div>
                        <p className="mt-2.5 text-sm font-bold text-issca-navy">
                          {formatFrench(stage.title)}
                        </p>
                        <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                          {formatFrench(stage.description)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Next Action & Documents Preparation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left: Prepare Your Dossier */}
            <div className="md:col-span-7 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h2 className="heading-card font-extrabold text-issca-navy">
                {formatFrench("Pièces à préparer pour votre dossier")}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {formatFrench(
                  "Pour accélérer votre inscription avant le dernier délai du 28 novembre, vous pouvez préparer les pièces suivantes :"
                )}
              </p>
              <ul className="mt-4 space-y-2.5">
                {TUITION_AND_ADMISSIONS_CONFIG.requiredDossierDocuments.map((doc) => (
                  <li
                    key={doc}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800"
                  >
                    <svg
                      className="h-4 w-4 text-issca-blue shrink-0 mt-0.5"
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

            {/* Right: Direct Advisor Contact */}
            <div className="md:col-span-5 rounded-2xl bg-issca-navy text-white p-6 sm:p-8 flex flex-col justify-between shadow-card">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-red-300">
                  Contact Direct Admissions
                </p>
                <h2 className="mt-2 text-lg sm:text-xl font-extrabold text-white">
                  {formatFrench("Une question urgente ?")}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {formatFrench(
                    "Vous pouvez également joindre directement le service des admissions sur WhatsApp ou par téléphone."
                  )}
                </p>

                <div className="mt-5 space-y-3">
                  <a
                    href={whatsappConfirmationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-red rounded-full w-full text-center text-sm"
                  >
                    <span>Écrire aux admissions sur WhatsApp</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                  <a
                    href={`tel:${ISSCA_INSTITUTION.phoneAdmissionsTel}`}
                    className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-white/15"
                  >
                    Appeler le {ISSCA_INSTITUTION.phoneAdmissionsDisplay}
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/15">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-200 hover:text-white"
                >
                  <span aria-hidden="true">←</span>
                  <span>Retourner à la présentation du Master</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
