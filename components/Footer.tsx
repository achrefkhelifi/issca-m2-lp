import React from "react";
import Link from "next/link";
import { ISSCA_INSTITUTION } from "@/content/program";
import { formatFrench } from "@/lib/typography";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pb-24 lg:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-slate-800">
          {/* Col 1: Logo & Institutional Identity */}
          <div className="lg:col-span-5 space-y-4">
            <img
              src="/issca-logo-white.svg"
              alt="Logo ISSCA Business School"
              width={150}
              height={50}
              loading="lazy"
              decoding="async"
              className="h-11 w-auto object-contain"
            />
            <p className="text-sm font-bold text-white">
              {ISSCA_INSTITUTION.legalName} ({ISSCA_INSTITUTION.shortName})
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              {formatFrench(ISSCA_INSTITUTION.ministryAuthorizationText)}
            </p>
          </div>

          {/* Col 2: Navigation & Programme */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">
              Programme &amp; Admission
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/#profils" className="hover:text-white transition-colors">
                  Conditions d’accès &amp; Profils
                </Link>
              </li>
              <li>
                <Link href="/#debouches" className="hover:text-white transition-colors">
                  Métiers &amp; Débouchés visés
                </Link>
              </li>
              <li>
                <Link href="/#programme" className="hover:text-white transition-colors">
                  Programme sur 4 semestres
                </Link>
              </li>
              <li>
                <Link href="/#frais-admission" className="hover:text-white transition-colors">
                  Frais d’études &amp; Modalités
                </Link>
              </li>
              <li>
                <Link href="/candidature" className="font-bold text-red-400 hover:text-red-300">
                  Déposer ma pré-candidature →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Coordonnées du Campus */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">
              Campus Sousse (Akouda)
            </h2>
            <address className="not-italic text-xs sm:text-sm space-y-2 text-slate-300">
              <p>{formatFrench(ISSCA_INSTITUTION.addressLine)}</p>
              <p>
                Tél. standard&nbsp;:{" "}
                <a
                  href={`tel:${ISSCA_INSTITUTION.phonePrimaryTel}`}
                  className="text-white font-semibold hover:underline"
                >
                  {ISSCA_INSTITUTION.phonePrimaryDisplay}
                </a>
              </p>
              <p>
                Tél. admissions&nbsp;:{" "}
                <a
                  href={`tel:${ISSCA_INSTITUTION.phoneAdmissionsTel}`}
                  className="text-white font-semibold hover:underline"
                >
                  {ISSCA_INSTITUTION.phoneAdmissionsDisplay}
                </a>
              </p>
              <p>
                E-mail&nbsp;:{" "}
                <a
                  href={`mailto:${ISSCA_INSTITUTION.emailGeneral}`}
                  className="text-white hover:underline"
                >
                  {ISSCA_INSTITUTION.emailGeneral}
                </a>
              </p>
            </address>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <a
                href={ISSCA_INSTITUTION.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white underline underline-offset-4"
              >
                Facebook
              </a>
              <a
                href={ISSCA_INSTITUTION.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white underline underline-offset-4"
              >
                Instagram
              </a>
              <a
                href={ISSCA_INSTITUTION.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white underline underline-offset-4"
              >
                LinkedIn
              </a>
              <a
                href={ISSCA_INSTITUTION.websiteOfficial}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white underline underline-offset-4"
              >
                Site officiel issca.tn ↗
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {ISSCA_INSTITUTION.shortName}. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/confidentialite" className="hover:text-white underline underline-offset-4">
              Politique de confidentialité &amp; Protection des données
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
