import React from "react";
import Link from "next/link";
import { buildAdmissionsWhatsAppUrl, FAQ_ITEMS } from "@/content/program";
import { formatFrench } from "@/lib/typography";

export function FaqAccordion() {
  const whatsappUrl = buildAdmissionsWhatsAppUrl();

  return (
    <section
      id="faq"
      aria-labelledby="heading-faq"
      className="py-16 sm:py-24 bg-issca-surface border-b border-slate-200 cv-auto-section"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-issca-blue">
            Questions Fréquentes
          </p>
          <h2 id="heading-faq" className="mt-2 heading-section font-extrabold text-issca-navy">
            {formatFrench("Tout savoir avant de candidater")}
          </h2>
          <p className="mt-3 text-base text-slate-700">
            {formatFrench(
              "Retrouvez les réponses aux questions les plus fréquentes concernant l’éligibilité, le niveau requis en IA, les frais et la date limite du 28 novembre 2026."
            )}
          </p>
        </div>

        {/* Native <details> & <summary> Accordions — No heading elements inside <summary> */}
        <div className="mt-10 space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => (
            <details
              key={item.id}
              className="issca-accordion"
              open={idx === 0}
            >
              <summary>
                <span className="flex-1 text-sm sm:text-base font-bold text-issca-navy">
                  {formatFrench(item.question)}
                </span>
                <span className="hidden sm:inline-flex items-center rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 shrink-0">
                  {item.category}
                </span>
              </summary>
              <div className="p-5 bg-white text-sm sm:text-base text-slate-700 leading-relaxed">
                <p>{formatFrench(item.answer)}</p>
              </div>
            </details>
          ))}
        </div>

        {/* Still Have Questions Prompt */}
        <div className="mt-10 rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <p className="text-base font-bold text-issca-navy">
              {formatFrench("Vous avez une question spécifique à votre situation ?")}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {formatFrench(
                "Échangez directement avec le service des admissions d’ISSCA Business School ou déposez votre pré-candidature."
              )}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-outline text-xs sm:text-sm px-4 py-2.5 flex-1 sm:flex-initial"
            >
              <span>WhatsApp Admissions</span>
            </a>
            <Link
              href="/candidature"
              className="btn-primary-red text-xs sm:text-sm px-5 py-2.5 flex-1 sm:flex-initial"
            >
              <span>Démarrer ma candidature</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
