import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { ISSCA_INSTITUTION } from "@/content/program";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F2347",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://join.issca.tn"),
  title: {
    default:
      "Master Management des Startups et de l’IA | ISSCA Business School Sousse",
    template: "%s | ISSCA Business School",
  },
  description:
    "Candidatez au Master Professionnel en Management des Startups et de l’Intelligence Artificielle (Bac+5, 2 ans) à ISSCA Business School Sousse. Année universitaire 2026/2027 — Inscriptions ouvertes jusqu’au 28 novembre.",
  alternates: {
    canonical: "https://join.issca.tn/",
  },
  openGraph: {
    type: "website",
    locale: "fr_TN",
    url: "https://join.issca.tn/",
    siteName: "ISSCA Business School — Admissions",
    title:
      "Master Professionnel en Management des Startups et de l’Intelligence Artificielle — ISSCA Business School",
    description:
      "Développez les compétences pour piloter des projets innovants, manager des startups et intégrer l’IA dans les décisions d’entreprise. Année universitaire 2026/2027 — Inscriptions ouvertes jusqu’au 28 novembre.",
    images: [
      {
        url: "/images/campus/hero-master-ia.jpg",
        width: 819,
        height: 1024,
        alt: "ISSCA Business School Sousse — Master Management des Startups et de l’IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Master Management des Startups et de l’IA | ISSCA Business School",
    description:
      "Formation Bac+5 en 4 semestres à Sousse. Année universitaire 2026/2027 — Inscriptions ouvertes jusqu’au 28 novembre.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollegeOrUniversity",
      "@id": "https://join.issca.tn/#institution",
      name: ISSCA_INSTITUTION.shortName,
      alternateName: ISSCA_INSTITUTION.legalName,
      url: ISSCA_INSTITUTION.websiteOfficial,
      logo: "https://join.issca.tn/issca-logo.svg",
      foundingDate: "2018",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Route de ceinture, Zone Industrielle, 4022 Akouda",
        addressLocality: "Sousse",
        postalCode: "4022",
        addressCountry: "TN",
      },
      telephone: ISSCA_INSTITUTION.phonePrimaryTel,
      email: ISSCA_INSTITUTION.emailGeneral,
    },
    {
      "@type": "Course",
      "@id": "https://join.issca.tn/#course",
      name: "Master Professionnel en Management des Startups et de l'Intelligence Artificielle",
      description:
        "Master Professionnel (Bac+5, 4 semestres) préparant les futurs managers à piloter des startups, conduire des projets d'innovation et intégrer l'intelligence artificielle dans les décisions d'entreprise.",
      provider: {
        "@id": "https://join.issca.tn/#institution",
      },
      educationalCredentialAwarded: "Master Professionnel (Niveau Bac+5)",
      timeRequired: "P2Y",
      inLanguage: "fr",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased">
        <a
          href="#main-heading"
          className="visually-hidden focus:z-50 focus:fixed focus:top-3 focus:left-3 focus:rounded-lg focus:bg-issca-navy focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white focus:shadow-elevated"
        >
          Aller au contenu principal
        </a>
        {children}
        <AnalyticsScripts />
      </body>
    </html>
  );
}
