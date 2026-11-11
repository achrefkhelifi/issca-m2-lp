import React from "react";
import Link from "next/link";
import { PEDAGOGY_FEATURES } from "@/content/program";
import { formatFrench } from "@/lib/typography";

export function LearningByDoing() {
  return (
    <section
      id="pedagogie"
      aria-labelledby="heading-pedagogie"
      className="py-16 sm:py-24 bg-white border-b border-slate-200 cv-auto-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Narrative & 4 Pedagogical Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-issca-blue">
                Approche Pédagogique · Learning by Doing
              </p>
              <h2
                id="heading-pedagogie"
                className="mt-2 heading-section font-extrabold text-issca-navy"
              >
                {formatFrench("Apprendre en faisant")}
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
                {formatFrench(
                  "Le Master Management des Startups et de l’IA privilégie la mise en situation réelle : projets d’innovation transversaux, séminaires startups & IA, interventions d’experts en activité et immersion longue en entreprise."
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {PEDAGOGY_FEATURES.map((feature) => (
                <article
                  key={feature.id}
                  className="rounded-2xl border border-slate-200 bg-issca-surface p-5 flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-flex items-center rounded-md bg-white border border-slate-200 px-2.5 py-0.5 text-xs font-bold text-issca-blue">
                      {formatFrench(feature.proofLabel)}
                    </span>
                    <h3 className="mt-3 text-base sm:text-lg font-bold text-issca-navy">
                      {formatFrench(feature.title)}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {formatFrench(feature.description)}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs sm:text-sm text-slate-600">
              {formatFrench(
                "Transparence : ISSCA Business School mobilise son réseau d’entreprises partenaires pour faciliter l’accès aux stages et aux opportunités d’insertion ou d’alternance. La sélection finale pour un stage ou un contrat relève de l’appréciation de l’entreprise d’accueil."
              )}
            </div>
          </div>

          {/* Right Column: Visual Illustration & Conversion Card */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-issca-surface p-3 shadow-sm">
              <img
                src="/images/campus/pedagogie-immersion.svg"
                alt="Synthèse de la pédagogie par l’action à ISSCA Business School : ateliers startups, chercheurs et praticiens, stages de 4 à 6 mois"
                width={720}
                height={520}
                loading="lazy"
                decoding="async"
                className="w-full h-auto rounded-xl"
              />
            </div>

            <div className="rounded-2xl bg-issca-navy text-white p-6 shadow-card">
              <p className="text-xs font-bold uppercase tracking-wider text-red-300">
                Immersion Professionnelle
              </p>
              <p className="mt-1 text-lg font-bold text-white">
                {formatFrench("4 à 6 mois de stage et Projet de Fin d’Études en Master 2")}
              </p>
              <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                {formatFrench(
                  "Construisez votre mémoire professionnel autour d’une problématique concrète de création de startup, de transformation digitale ou de déploiement IA."
                )}
              </p>
              <div className="mt-4">
                <Link
                  href="/candidature"
                  className="btn-primary-red w-full text-sm sm:text-base"
                >
                  <span>Candidater au Master</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
