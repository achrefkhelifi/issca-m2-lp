import React from "react";
import Link from "next/link";
import { CANDIDATE_PROFILES, ELIGIBILITY_CONDITIONS } from "@/content/program";
import { formatFrench } from "@/lib/typography";

export function CandidateProfiles() {
  return (
    <section
      id="profils"
      aria-labelledby="heading-profils"
      className="py-16 sm:py-24 bg-white border-b border-slate-200 cv-auto-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-issca-blue">
            Orientation &amp; Adéquation
          </p>
          <h2 id="heading-profils" className="mt-2 heading-section font-extrabold text-issca-navy">
            {formatFrench("Ce Master est-il fait pour vous ?")}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700">
            {formatFrench(
              "Ce programme s’adresse aux profils qui souhaitent allier vision managériale, esprit entrepreneurial et compréhension opérationnelle de l’intelligence artificielle."
            )}
          </p>
        </div>

        {/* Three Candidate Profile Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {CANDIDATE_PROFILES.map((profile) => (
            <article
              key={profile.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-issca-surface p-6 sm:p-7 shadow-sm"
            >
              <div>
                <span className="inline-flex items-center rounded-md bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-issca-blue">
                  {formatFrench(profile.badge)}
                </span>
                <h3 className="mt-4 heading-card font-bold text-issca-navy">
                  {formatFrench(profile.title)}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  {formatFrench(profile.description)}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <p className="text-xs sm:text-sm font-semibold text-slate-600">
                  {formatFrench(profile.backgroundNote)}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Documented Academic Eligibility Box */}
        <div className="mt-10 rounded-2xl bg-issca-navy text-white p-6 sm:p-8 lg:p-10 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-200">
                <span>Conditions d’accès officielles</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {formatFrench(ELIGIBILITY_CONDITIONS.title)}
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {formatFrench(ELIGIBILITY_CONDITIONS.summary)}
              </p>
              <p className="text-sm text-blue-200 font-medium">
                {formatFrench(ELIGIBILITY_CONDITIONS.m2DirectNote)}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 pt-2 border-t border-white/15">
                {formatFrench(ELIGIBILITY_CONDITIONS.disclaimer)}
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col items-stretch sm:items-start lg:items-end justify-center gap-3">
              <Link
                href="/candidature"
                className="btn-primary-red w-full sm:w-auto text-center text-base px-6 py-3.5"
              >
                <span>Vérifier mon éligibilité</span>
                <span aria-hidden="true">→</span>
              </Link>
              <p className="text-xs text-slate-300 lg:text-right">
                Étude personnalisée de votre parcours par l’équipe d’admission d’ISSCA.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
