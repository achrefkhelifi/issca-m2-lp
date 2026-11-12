import React from "react";
import Link from "next/link";
// import { TUITION_AND_ADMISSIONS_CONFIG } from "@/content/program";
import { formatFrench } from "@/lib/typography";

const SIMPLE_STEPS = [
  {
    step: "Étape 1",
    title: "Pré-candidature en ligne",
    badge: "2 minutes",
    featured: true,
    description:
      "Remplissez le formulaire sur ce site. Aucun document scanné ni paiement n’est demandé aujourd’hui.",
  },
  {
    step: "Étape 2",
    title: "Appel d’un conseiller",
    badge: "Sous 24h–48h",
    featured: false,
    description:
      "Suite à votre formulaire, un conseiller aux admissions vous rappelle pour répondre à vos questions et valider votre dossier.",
  },
  {
    step: "Étape 3",
    title: "Inscription définitive",
    badge: "Jusqu’au 28 novembre",
    featured: false,
    description:
      "Vous transmettez vos pièces justificatives et finalisez votre inscription administrative pour rejoindre la promotion.",
  },
] as const;

export function TuitionAndAdmissions() {
  return (
    <section
      id="admission"
      aria-labelledby="heading-admission"
      className="py-20 sm:py-28 bg-white cv-auto-section"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="max-w-xl">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-issca-blue mb-2">
            {formatFrench("Admission — Année universitaire 2026/2027")}
          </p>
          <h2
            id="heading-admission"
            className="heading-section font-extrabold text-issca-navy"
          >
            {formatFrench("Trois étapes simples pour rejoindre le Master")}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            {formatFrench(
              "Dernier délai d’inscription : 28 novembre. Tout commence par le formulaire en ligne afin qu’un conseiller vous rappelle."
            )}
          </p>
        </div>

        {/* 3 Clean Step Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {SIMPLE_STEPS.map((item) => (
            <article
              key={item.step}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all ${
                item.featured
                  ? "bg-white border-2 border-issca-red shadow-card"
                  : "bg-issca-surface border border-slate-200/90"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-issca-blue">
                    {item.step}
                  </span>
                  <span
                    className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      item.featured
                        ? "bg-red-50 text-issca-red"
                        : "bg-white border border-slate-200 text-slate-600"
                    }`}
                  >
                    {formatFrench(item.badge)}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-issca-navy">
                  {formatFrench(item.title)}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {formatFrench(item.description)}
                </p>
              </div>

              {item.featured && (
                <div className="mt-7 pt-4 border-t border-slate-200/70">
                  <Link
                    href="/candidature"
                    className="btn-primary-red rounded-full w-full text-sm"
                  >
                    <span>Démarrer ma candidature</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Frais d’études & facilités strip (Commented out for now — uncomment if needed later)
        <div className="mt-8 rounded-2xl bg-issca-surface border border-slate-200/90 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <span className="w-8 h-8 rounded-full bg-issca-blue text-white flex items-center justify-center flex-none font-bold text-sm">
              i
            </span>
            <p className="text-sm sm:text-base text-slate-700 leading-snug">
              <strong className="font-bold text-issca-navy">
                {formatFrench("Frais d’études & facilités :")}
              </strong>{" "}
              {formatFrench(
                `${TUITION_AND_ADMISSIONS_CONFIG.indicativeAnnualMasterFeeTnd} (barème indicatif Master, + ${TUITION_AND_ADMISSIONS_CONFIG.indicativeRegistrationFeeResidentTnd} d’inscription), payable en 3 tranches (inscription, 1er déc., 1er mars) ou -6 % au comptant.`
              )}
            </p>
          </div>
          <span className="rounded-full bg-white border border-slate-200 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-issca-navy whitespace-nowrap">
            {formatFrench("3 tranches disponibles")}
          </span>
        </div>
        */}
      </div>
    </section>
  );
}
