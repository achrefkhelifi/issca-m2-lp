import React from "react";
import { formatFrench } from "@/lib/typography";

const COMMITMENTS = [
  {
    number: "01",
    title: "Chercheurs & praticiens",
    description:
      "Des cours assurés à la fois par des universitaires et par des professionnels du numérique en activité.",
  },
  {
    number: "02",
    title: "Apprendre par la pratique",
    description:
      "Projets IA concrets, ateliers Lean Startup, études de cas réels et préparation au Scrum Management.",
  },
  {
    number: "03",
    title: "Immersion en entreprise",
    description:
      "Stage obligatoire de 4 à 6 mois en Master 2, avec accompagnement vers notre réseau d’entreprises partenaires.",
  },
  {
    number: "04",
    title: "Établissement agréé par l’État",
    description:
      "ISSCA Business School est autorisé par le Ministère de l’Enseignement Supérieur sous l’Agrément n° 01/2018.",
  },
  {
    number: "05",
    title: "Campus à taille humaine à Sousse",
    description:
      "Un environnement moderne à Akouda (Sousse) où chaque étudiant bénéficie d’un suivi personnalisé.",
  },
  {
    number: "06",
    title: "Ouvert dès Bac+3, sans code",
    description:
      "Accessible après une Licence ou un diplôme d’ingénieur, avec remise à niveau algorithmique dès le Semestre 1.",
  },
] as const;

export function Commitments() {
  return (
    <section
      id="engagements"
      aria-labelledby="heading-engagements"
      className="py-20 sm:py-28 bg-issca-surface border-y border-slate-200/80 cv-auto-section"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="max-w-xl">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-issca-blue mb-2">
            {formatFrench("Pourquoi ISSCA Business School")}
          </p>
          <h2
            id="heading-engagements"
            className="heading-section font-extrabold text-issca-navy"
          >
            {formatFrench("Ce sur quoi vous pouvez compter")}
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 lg:gap-11">
          {COMMITMENTS.map((item) => (
            <div key={item.number} className="flex gap-4 items-start">
              <div className="font-extrabold text-base text-issca-red flex-none w-8 border-t-2 border-issca-red pt-2">
                {item.number}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-issca-navy mb-1.5 leading-snug">
                  {formatFrench(item.title)}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {formatFrench(item.description)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
