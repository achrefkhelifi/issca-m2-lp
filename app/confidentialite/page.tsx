import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ISSCA_INSTITUTION } from "@/content/program";
import { formatFrench } from "@/lib/typography";

export const metadata: Metadata = {
  title: "Politique de confidentialité et protection des données",
  description:
    "Informations relatives au traitement des données personnelles des candidats au sein de la plateforme d’admission d’ISSCA Business School.",
  alternates: {
    canonical: "https://join.issca.tn/confidentialite",
  },
};

export default function ConfidentialitePage() {
  return (
    <>
      <Header minimal />
      <main
        id="main-content"
        className="flex-1 bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8"
      >
        <article className="mx-auto max-w-3xl space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          <h1
            id="main-heading"
            tabIndex={-1}
            className="heading-section font-extrabold text-issca-navy focus:outline-none"
          >
            {formatFrench("Politique de confidentialité & Protection des données")}
          </h1>

          <p>
            La présente politique détaille la manière dont{" "}
            <strong>{ISSCA_INSTITUTION.legalName} ({ISSCA_INSTITUTION.shortName})</strong>,
            située {formatFrench(ISSCA_INSTITUTION.addressLine)}, collecte et traite les
            données personnelles transmises via la plateforme d’admission{" "}
            <code>join.issca.tn</code>.
          </p>

          <section className="space-y-2">
            <h2 className="heading-card font-bold text-issca-navy">
              1. Responsable du traitement et finalités
            </h2>
            <p>
              Les informations recueillies dans le formulaire de pré-candidature (identité,
              coordonnées téléphoniques et électroniques, parcours académique et intentions
              d’admission) sont destinées exclusivement au service des admissions d’ISSCA
              Business School aux fins suivantes&nbsp;:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Étudier votre éligibilité académique au Master Professionnel en Management des Startups et de l’IA.</li>
              <li>Vous contacter par téléphone, WhatsApp ou e-mail pour organiser votre entretien d’admission et le dépôt de vos pièces justificatives.</li>
              <li>Assurer le suivi administratif de votre dossier dans notre système de gestion des admissions (Odoo CRM).</li>
              <li>Si vous y avez expressément consenti, vous informer des actualités et événements d’ISSCA Business School.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="heading-card font-bold text-issca-navy">
              2. Confidentialité et non-cession des données
            </h2>
            <p>
              Vos données personnelles sont strictement confidentielles. Elles ne sont jamais
              vendues, louées ou cédées à des tiers commerciaux. Seules les équipes
              habilitées d’ISSCA Business School et nos sous-traitants techniques sécurisés
              (hébergement Cloudflare, messagerie transactionnelle, gestion CRM) y ont accès
              dans le strict cadre de leur mission.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="heading-card font-bold text-issca-navy">
              3. Mesure d’audience et cookies
            </h2>
            <p>
              Sous réserve de votre accord exprimé via le bandeau de consentement, ce site
              peut utiliser des outils de mesure d’audience et d’attribution (Google
              Analytics 4, Meta Pixel / Conversions API) afin de mesurer l’efficacité de nos
              campagnes d’information. Aucune donnée personnelle sensible n’est exposée dans
              les URL de navigation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="heading-card font-bold text-issca-navy">
              4. Exercice de vos droits (accès, rectification, suppression)
            </h2>
            <p>
              Conformément à la législation tunisienne relative à la protection des données à
              caractère personnel (Loi organique n° 2004-63) et aux standards internationaux
              de protection de la vie privée, vous disposez d’un droit d’accès, de
              rectification, d’opposition et de suppression des données vous concernant.
            </p>
            <p>
              Pour exercer vos droits, adressez votre demande par e-mail à{" "}
              <a
                href={`mailto:${ISSCA_INSTITUTION.emailGeneral}`}
                className="font-bold text-issca-blue underline"
              >
                {ISSCA_INSTITUTION.emailGeneral}
              </a>{" "}
              ou par téléphone au{" "}
              <a
                href={`tel:${ISSCA_INSTITUTION.phonePrimaryTel}`}
                className="font-bold text-issca-blue underline"
              >
                {ISSCA_INSTITUTION.phonePrimaryDisplay}
              </a>
              .
            </p>
          </section>

          <div className="pt-6 border-t border-slate-200">
            <Link href="/" className="btn-secondary-outline text-sm">
              ← Retour à l’accueil
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
