import React from "react";
import { CAREER_CLUSTERS } from "@/content/program";
import { formatFrench } from "@/lib/typography";

export function CareerOpportunities() {
  return (
    <section
      id="debouches"
      aria-labelledby="heading-debouches"
      className="py-16 sm:py-24 bg-issca-surface border-b border-slate-200 cv-auto-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-issca-blue">
            Perspectives Professionnelles
          </p>
          <h2 id="heading-debouches" className="mt-2 heading-section font-extrabold text-issca-navy">
            {formatFrench("Les métiers qui s’ouvrent à vous")}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700">
            {formatFrench(
              "En combinant gestion d’entreprise, culture startup et maîtrise des enjeux de l’intelligence artificielle, ce Master prépare à trois grandes familles de métiers recherchés par les entreprises innovantes."
            )}
          </p>
        </div>

        {/* 3 Career Clusters */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {CAREER_CLUSTERS.map((cluster) => {
            const topBorderClass =
              cluster.accentColor === "red"
                ? "border-t-4 border-t-issca-red"
                : cluster.accentColor === "blue"
                ? "border-t-4 border-t-issca-blue"
                : "border-t-4 border-t-issca-navy";

            return (
              <div
                key={cluster.id}
                className={`rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-sm flex flex-col justify-between ${topBorderClass}`}
              >
                <div>
                  <h3 className="heading-card font-extrabold text-issca-navy">
                    {formatFrench(cluster.title)}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm font-medium text-slate-600">
                    {formatFrench(cluster.subtitle)}
                  </p>

                  <ul className="mt-6 space-y-5">
                    {cluster.roles.map((role) => (
                      <li
                        key={role.title}
                        className="rounded-xl bg-slate-50 border border-slate-200/80 p-4"
                      >
                        <p className="text-base font-bold text-issca-navy flex items-center gap-2">
                          <span
                            aria-hidden="true"
                            className="h-2 w-2 rounded-full bg-issca-red shrink-0"
                          />
                          <span>{formatFrench(role.title)}</span>
                        </p>
                        <p className="mt-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {formatFrench(role.description)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-xs sm:text-sm text-slate-600 bg-white border border-slate-200 rounded-xl px-4 py-3">
          {formatFrench(
            "Note d’orientation : ces intitulés correspondent aux débouchés professionnels visés par le référentiel du Master. L’insertion professionnelle dépend du parcours antérieur, de l’implication dans les projets et stages, ainsi que des opportunités du marché."
          )}
        </p>
      </div>
    </section>
  );
}
