import React from "react";
import { formatFrench } from "@/lib/typography";

const ESSENTIAL_FAQS = [
  {
    id: "diplome-requis",
    question: "Quels diplômes permettent de candidater ?",
    answer:
      "Une Licence (Bac+3 ou équivalent) ou un diplôme d’ingénieur. Une admission en 2ème année (M2) est également étudiée pour les titulaires d’un M1 compatible.",
  },
  {
    id: "niveau-code",
    question: "Faut-il déjà savoir coder ?",
    answer:
      "Non. Ce Master forme des managers et entrepreneurs capables de piloter l’IA et la Data. Les bases algorithmiques sont reprises dès le Semestre 1.",
  },
  {
    id: "pieces-maintenant",
    question: "Dois-je fournir mes diplômes aujourd’hui pour candidater ?",
    answer:
      "Non. La pré-candidature en ligne prend 2 minutes sans aucun fichier à joindre. Le conseiller vous indiquera les pièces à préparer pour votre entretien.",
  },
  {
    id: "date-limite",
    question: "Jusqu’à quand les inscriptions sont-elles ouvertes ?",
    answer:
      "La clôture des inscriptions est fixée au 28 novembre 2026. Déposez votre pré-candidature dès maintenant pour planifier votre entretien à temps.",
  },
] as const;

export function FaqAccordion() {
  return (
    <section
      id="faq"
      aria-labelledby="heading-faq"
      className="py-16 sm:py-24 bg-issca-surface border-t border-slate-200/80 cv-auto-section"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="mb-10">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-issca-blue mb-2">
            {formatFrench("Questions fréquentes")}
          </p>
          <h2 id="heading-faq" className="heading-section font-extrabold text-issca-navy">
            {formatFrench("En bref")}
          </h2>
        </div>

        <div className="space-y-3">
          {ESSENTIAL_FAQS.map((item) => (
            <details key={item.id} className="issca-accordion">
              <summary>
                <span className="flex-1 text-sm sm:text-base font-bold text-issca-navy">
                  {formatFrench(item.question)}
                </span>
              </summary>
              <div className="p-5 bg-white text-sm sm:text-base text-slate-600 leading-relaxed">
                <p>{formatFrench(item.answer)}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
