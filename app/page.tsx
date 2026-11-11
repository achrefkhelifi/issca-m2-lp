import React from "react";
import { DeadlineBanner } from "@/components/DeadlineBanner";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CandidateProfiles } from "@/components/CandidateProfiles";
import { CareerOpportunities } from "@/components/CareerOpportunities";
import { CompetencyPillars } from "@/components/CompetencyPillars";
import { AcademicJourney } from "@/components/AcademicJourney";
import { LearningByDoing } from "@/components/LearningByDoing";
import { WhyIssca } from "@/components/WhyIssca";
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
        <CandidateProfiles />
        <CareerOpportunities />
        <CompetencyPillars />
        <AcademicJourney />
        <LearningByDoing />
        <WhyIssca />
        <TuitionAndAdmissions />
        <FaqAccordion />
        <FinalCta />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
