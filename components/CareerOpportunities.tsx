import React from "react";
import Link from "next/link";
import { formatFrench } from "@/lib/typography";

const CAREER_PILLS = [
  { label: "Product Manager", tag: "Startups" },
  { label: "Consultant IA", tag: "IA & Data" },
  { label: "Business Manager IA & Data Science", tag: "IA & Data" },
  { label: "Team Leader en startup", tag: "Startups" },
  { label: "Référent Manager IA", tag: "IA & Data" },
  { label: "Business Developer", tag: "Startups" },
  { label: "Account Manager", tag: "Leadership" },
  { label: "Responsable RH en startup", tag: "Leadership" },
  { label: "Talent Acquisition Manager", tag: "Leadership" },
] as const;

export function CareerOpportunities() {
  return (
    <section
      id="debouches"
      aria-labelledby="heading-debouches"
      className="py-20 sm:py-28 bg-white cv-auto-section"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="max-w-xl">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-issca-blue mb-2">
            {formatFrench("Après le Master")}
          </p>
          <h2
            id="heading-debouches"
            className="heading-section font-extrabold text-issca-navy"
          >
            {formatFrench("Les métiers qui s’ouvrent à vous")}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            {formatFrench(
              "Entrepreneuriat, pilotage de l’IA ou direction d’équipes : vous êtes formé(e) pour les fonctions qui font le pont entre la technologie et la décision."
            )}
          </p>
        </div>

        {/* Cocon-style Pill Cloud */}
        <div className="mt-10 flex flex-wrap gap-3">
          {CAREER_PILLS.map((role) => (
            <Link
              key={role.label}
              href={`/candidature?objectif=${encodeURIComponent(role.label)}`}
              className="inline-flex items-center gap-2.5 rounded-full bg-issca-surface border border-slate-200/90 py-2.5 pl-3.5 pr-5 text-sm sm:text-base font-bold text-issca-navy hover:border-issca-red hover:-translate-y-0.5 transition-all shadow-2xs"
            >
              <span className="inline-flex items-center rounded-full bg-white border border-slate-200 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-issca-blue">
                {role.tag}
              </span>
              <span>{formatFrench(role.label)}</span>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-sm sm:text-base">
          <Link
            href="/candidature"
            className="inline-flex items-center gap-1.5 font-bold text-issca-red hover:underline"
          >
            <span>{formatFrench("Vérifier mon adéquation avec le programme")}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
