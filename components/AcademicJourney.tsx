import React from "react";
import Link from "next/link";
import { ACADEMIC_JOURNEY } from "@/content/program";
import { formatFrench } from "@/lib/typography";

export function AcademicJourney() {
  return (
    <section
      id="programme"
      aria-labelledby="heading-programme"
      className="py-16 sm:py-24 bg-issca-surface border-b border-slate-200 cv-auto-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-issca-blue">
            Programme Officiel · 4 Semestres
          </p>
          <h2 id="heading-programme" className="mt-2 heading-section font-extrabold text-issca-navy">
            {formatFrench("Votre parcours sur deux ans")}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700">
            {formatFrench(
              "Une progression structurée du Master 1 au Master 2 pour maîtriser les fondamentaux managériaux et algorithmiques, puis piloter des projets d’intelligence artificielle et de croissance startup jusqu’au stage de fin d’études."
            )}
          </p>
        </div>

        {/* Vertical Academic Journey Timeline */}
        <ol className="mt-12 relative border-s-2 border-issca-blue/30 ms-3 sm:ms-6 space-y-10">
          {ACADEMIC_JOURNEY.map((sem) => (
            <li key={sem.id} className="ms-6 sm:ms-10 relative">
              {/* Timeline Node Badge */}
              <span
                aria-hidden="true"
                className="absolute -start-[2.35rem] sm:-start-[3.35rem] top-1 flex h-9 w-9 items-center justify-center rounded-full bg-issca-navy text-white ring-4 ring-issca-surface font-extrabold text-xs"
              >
                S{sem.semesterNumber}
              </span>

              <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-issca-blue">
                    {sem.yearLabel} · Semestre {sem.semesterNumber}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {sem.officialModules.length} unités d’enseignement officielles
                  </span>
                </div>

                <h3 className="mt-3 heading-card font-extrabold text-issca-navy">
                  {formatFrench(sem.title)}
                </h3>
                <p className="mt-1 text-sm font-semibold text-issca-blue">
                  {formatFrench(sem.subtitle)}
                </p>
                <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  {formatFrench(sem.summary)}
                </p>

                {/* Key Synthesis Pills */}
                <ul className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
                  {sem.keyHighlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="rounded-xl bg-issca-surface border border-slate-200/80 p-3 text-xs sm:text-sm font-medium text-slate-800 flex items-start gap-2"
                    >
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 rounded-full bg-issca-red mt-1.5 shrink-0"
                      />
                      <span>{formatFrench(highlight)}</span>
                    </li>
                  ))}
                </ul>

                {/* Accessible <details> & <summary> Expandable Complete Official Curriculum (No heading inside summary!) */}
                <div className="mt-6">
                  <details
                    className="issca-accordion"
                    open={sem.semesterNumber === 1}
                  >
                    <summary>
                      <span>
                        Voir les {sem.officialModules.length} modules officiels du Semestre{" "}
                        {sem.semesterNumber}
                      </span>
                    </summary>
                    <div className="p-4 sm:p-5 bg-white">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {sem.officialModules.map((moduleName) => (
                          <li
                            key={moduleName}
                            className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 py-1"
                          >
                            <svg
                              className="h-4 w-4 text-issca-blue shrink-0 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>{formatFrench(moduleName)}</span>
                          </li>
                        ))}
                      </ul>
                      {sem.footnote && (
                        <p className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600">
                          {formatFrench(sem.footnote)}
                        </p>
                      )}
                    </div>
                  </details>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <div>
            <p className="text-base font-bold text-issca-navy">
              {formatFrench("Vous souhaitez savoir comment ce programme s’adapte à votre diplôme actuel ?")}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {formatFrench(
                "Déposez votre pré-candidature pour faire évaluer votre parcours (M1 ou M2) par la commission pédagogique."
              )}
            </p>
          </div>
          <Link href="/candidature" className="btn-primary-red shrink-0 text-sm sm:text-base">
            <span>Démarrer ma candidature</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
