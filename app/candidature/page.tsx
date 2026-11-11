import React from "react";
import type { Metadata } from "next";
import { DeadlineBanner } from "@/components/DeadlineBanner";
import { Header } from "@/components/Header";
import { CandidatureFunnel } from "@/components/CandidatureFunnel";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Déposer ma pré-candidature — Master Management des Startups et de l’IA",
  description:
    "Formulaire officiel de pré-candidature au Master Professionnel en Management des Startups et de l’Intelligence Artificielle à ISSCA Business School Sousse. Clôture : 28 novembre 2026.",
  alternates: {
    canonical: "https://join.issca.tn/candidature",
  },
};

export default function CandidaturePage() {
  return (
    <>
      <DeadlineBanner />
      <Header minimal />
      <main
        id="main-content"
        className="flex-1 bg-issca-surface py-8 sm:py-12 px-4 sm:px-6 lg:px-8"
      >
        <CandidatureFunnel />
      </main>
      <Footer />
    </>
  );
}
