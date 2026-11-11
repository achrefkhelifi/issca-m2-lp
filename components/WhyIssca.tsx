import React from "react";
import { ISSCA_INSTITUTION, VERIFIED_TESTIMONIALS } from "@/content/program";
import { formatFrench } from "@/lib/typography";

export function WhyIssca() {
  return (
    <section
      id="pourquoi-issca"
      aria-labelledby="heading-pourquoi-issca"
      className="py-16 sm:py-24 bg-issca-surface border-b border-slate-200 cv-auto-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Institutional Identity & Verified Authorization */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-issca-blue">
                Cadre Institutionnel · Sousse
              </p>
              <h2
                id="heading-pourquoi-issca"
                className="mt-2 heading-section font-extrabold text-issca-navy"
              >
                {formatFrench("Pourquoi ISSCA Business School ?")}
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
                {formatFrench(
                  "Fondé en 2018 à Sousse (Akouda), l’Institut Supérieur Privé des Sciences Commerciales et des Affaires (ISSCA Business School) forme une nouvelle génération de managers et d’entrepreneurs capables de relever les défis économiques et technologiques."
                )}
              </p>
            </div>

            {/* Key Institutional Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white border border-slate-200 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-issca-red">
                  Autorisation Ministérielle
                </p>
                <p className="mt-1.5 text-lg font-extrabold text-issca-navy">
                  Agrément n°&nbsp;{ISSCA_INSTITUTION.ministryAuthorizationNumber}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {formatFrench(ISSCA_INSTITUTION.ministryDisclaimer)}
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-slate-200 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-issca-blue">
                  Campus Universitaire
                </p>
                <p className="mt-1.5 text-lg font-extrabold text-issca-navy">
                  Akouda · Sousse
                </p>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {formatFrench(ISSCA_INSTITUTION.addressLine)}
                </p>
                <a
                  href={ISSCA_INSTITUTION.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-issca-blue hover:underline"
                >
                  <span>Voir l’emplacement sur Google Maps</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            {/* Campus Sousse Visual Card */}
            <div className="rounded-2xl bg-white border border-slate-200 p-3 shadow-sm">
              <img
                src="/images/campus/campus-sousse.svg"
                alt="Plan et coordonnées du campus ISSCA Business School à Akouda, Sousse"
                width={720}
                height={480}
                loading="lazy"
                decoding="async"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>

          {/* Right Column: Authentic Student & Faculty Voices from issca.tn */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-issca-blue">
                Paroles d’Enseignants &amp; d’Étudiants
              </p>
              <h3 className="mt-2 heading-card font-extrabold text-issca-navy">
                {formatFrench("L’expérience ISSCA au quotidien")}
              </h3>

              <div className="mt-6 space-y-5">
                {VERIFIED_TESTIMONIALS.map((item) => (
                  <blockquote
                    key={item.id}
                    className="rounded-xl bg-issca-surface border border-slate-200/80 p-5"
                  >
                    <p className="text-sm sm:text-base text-slate-800 italic leading-relaxed">
                      «&nbsp;{formatFrench(item.quote)}&nbsp;»
                    </p>
                    <footer className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-t border-slate-200/80 pt-3">
                      <div>
                        <cite className="not-italic text-sm font-bold text-issca-navy">
                          {item.author}
                        </cite>
                        <p className="text-xs text-slate-600">{formatFrench(item.role)}</p>
                      </div>
                      <span className="text-[11px] font-medium text-slate-500">
                        {item.contextNote}
                      </span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>

            {/* Direct Contact & Campus Visit Card */}
            <div className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-issca-navy">
                  {formatFrench("Vous souhaitez visiter le campus à Sousse ou rencontrer l’équipe ?")}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Tél.&nbsp;:{" "}
                  <a
                    href={`tel:${ISSCA_INSTITUTION.phonePrimaryTel}`}
                    className="font-semibold text-issca-blue hover:underline"
                  >
                    {ISSCA_INSTITUTION.phonePrimaryDisplay}
                  </a>{" "}
                  /{" "}
                  <a
                    href={`tel:${ISSCA_INSTITUTION.phoneAdmissionsTel}`}
                    className="font-semibold text-issca-blue hover:underline"
                  >
                    {ISSCA_INSTITUTION.phoneAdmissionsDisplay}
                  </a>
                </p>
              </div>
              <a
                href={`mailto:${ISSCA_INSTITUTION.emailGeneral}`}
                className="btn-secondary-outline text-xs sm:text-sm px-4 py-2.5 shrink-0"
              >
                {ISSCA_INSTITUTION.emailGeneral}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
