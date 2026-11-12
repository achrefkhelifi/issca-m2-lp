import React from "react";
import { DeadlineBanner } from "@/components/DeadlineBanner";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AcademicJourney } from "@/components/AcademicJourney";
import { CareerOpportunities } from "@/components/CareerOpportunities";
import { Commitments } from "@/components/Commitments";
import { TuitionAndAdmissions } from "@/components/TuitionAndAdmissions";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";

export default function HomePage() {
  return (
    <>
      <DeadlineBanner />
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <AcademicJourney />
        <CareerOpportunities />
        <Commitments />
        <TuitionAndAdmissions />
        <FaqAccordion />
        <FinalCta />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
