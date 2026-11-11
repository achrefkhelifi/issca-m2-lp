import React from "react";
import { COMPETENCY_PILLARS } from "@/content/program";
import { formatFrench } from "@/lib/typography";

export function CompetencyPillars() {
  return (
    <section
      id="competences"
      aria-labelledby="heading-competences"
      className="py-16 sm:py-24 bg-white border-b border-slate-200 cv-auto-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-issca-blue">
              Architecture des Compétences
            </p>
            <h2 id="heading-competences" className="mt-2 heading-section font-extrabold text-issca-navy">
              {formatFrench("Les compétences que vous allez développer")}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-700">
              {formatFrench(
                "Plutôt que d’isoler la technologie de la stratégie, le programme articule trois piliers complémentaires sur quatre semestres."
              )}
            </p>
          </div>
          <div>
            <a
              href="#programme"
              className="btn-secondary-outline text-sm px-5 py-2.5"
            >
              <span>Consulter les modules par semestre</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {COMPETENCY_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="rounded-2xl border border-slate-200 bg-issca-surface p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center justify-center rounded-lg bg-issca-navy px-3 py-1 text-sm font-extrabold text-white">
                    Pilier {pillar.number}
                  </span>
                </div>
                <h3 className="mt-5 heading-card font-extrabold text-issca-navy">
                  {formatFrench(pillar.title)}
                </h3>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-issca-blue">
                  {formatFrench(pillar.subtitle)}
                </p>
                <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  {formatFrench(pillar.description)}
                </p>
              </div>

              <ul className="mt-6 pt-5 border-t border-slate-200 space-y-2.5">
                {pillar.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-800"
                  >
                    <svg
                      className="h-4 w-4 text-issca-red shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{formatFrench(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
