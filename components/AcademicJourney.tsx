"use client";

import React, { useEffect, useRef, useState } from "react";
import { ACADEMIC_JOURNEY } from "@/content/program";
import { formatFrench } from "@/lib/typography";

const SIMPLE_SEMESTERS = [
  {
    code: "S1",
    tag: "Master 1 · Semestre 1",
    title: "Poser les bases",
    description:
      "Management de l’innovation, stratégie d’entreprise, économie numérique, algorithmique et négociation.",
  },
  {
    code: "S2",
    tag: "Master 1 · Semestre 2",
    title: "Appliquer l’IA au management",
    description:
      "IA appliquée à la décision, Lean Startup, bases de données, cybersécurité, droit et éthique de l’IA.",
  },
  {
    code: "S3",
    tag: "Master 2 · Semestre 3",
    title: "Piloter la croissance & la Data",
    description:
      "Création et marketing de startups, Data Science, Machine Learning, conduite du changement et préparation Scrum.",
  },
  {
    code: "S4",
    tag: "Master 2 · Semestre 4",
    title: "4 à 6 mois en entreprise",
    description:
      "Stage de fin d’études obligatoire en startup ou entreprise, projet appliqué et soutenance du mémoire.",
  },
] as const;

export function AcademicJourney() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeSteps, setActiveSteps] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true,
  });

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isReducedMotion) return;

    const updateProgress = () => {
      const container = timelineRef.current;
      const bar = progressRef.current;
      if (!container || !bar) return;

      const rect = container.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6;
      const ratio = Math.max(0, Math.min(1, (anchor - rect.top) / rect.height));
      bar.style.height = `${ratio * rect.height}px`;
    };

    const stepNodes = Array.from(document.querySelectorAll("[data-semester-step]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-semester-step"));
            setActiveSteps((prev) => ({ ...prev, [idx]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    stepNodes.forEach((n) => observer.observe(n));
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <section
      id="parcours"
      aria-labelledby="heading-parcours"
      className="bg-issca-surface border-y border-slate-200/80 py-20 sm:py-28 overflow-hidden cv-auto-section"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="max-w-xl mb-14 sm:mb-20">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-issca-blue mb-2">
            {formatFrench("Votre parcours sur 2 ans")}
          </p>
          <h2
            id="heading-parcours"
            className="heading-section font-extrabold text-issca-navy"
          >
            {formatFrench("Quatre semestres, de la vision au terrain")}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            {formatFrench(
              "Une progression claire qui part du management stratégique pour aller jusqu’aux projets IA et au stage en entreprise."
            )}
          </p>
        </div>

        {/* Cocon-style Hopscotch Alternating Timeline */}
        <div ref={timelineRef} className="relative max-w-[940px] mx-auto">
          {/* Dashed center line */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 w-[3px] bg-[repeating-linear-gradient(to_bottom,rgba(28,78,158,0.28)_0_8px,transparent_8px_18px)] left-[34px] md:left-1/2 md:-translate-x-1/2"
          />
          {/* Animated scroll progress line */}
          <div
            ref={progressRef}
            aria-hidden="true"
            className="absolute top-0 w-[3px] bg-issca-red rounded-full transition-[height] duration-200 ease-linear left-[34px] md:left-1/2 md:-translate-x-1/2 h-0"
          />

          <div className="flex flex-col gap-7 md:gap-9">
            {SIMPLE_SEMESTERS.map((step, index) => {
              const isOdd = index % 2 === 0;
              const isActive = !!activeSteps[index];

              return (
                <div
                  key={step.code}
                  data-semester-step={index}
                  className="relative grid grid-cols-[68px_1fr] md:grid-cols-[1fr_96px_1fr] items-center gap-4 md:gap-0"
                >
                  {/* Diamond Tile */}
                  <div
                    className={`col-start-1 md:col-start-2 justify-self-center w-[62px] h-[62px] md:w-[72px] md:h-[72px] grid place-items-center rounded-2xl rotate-[-45deg] border-2 transition-all duration-300 z-10 ${
                      isActive
                        ? "bg-white border-issca-red shadow-md scale-105"
                        : "bg-white border-slate-300"
                    }`}
                  >
                    <span className="rotate-[45deg] font-extrabold text-sm md:text-base text-issca-navy">
                      {step.code}
                    </span>
                  </div>

                  {/* Clean Step Card */}
                  <div
                    className={`col-start-2 md:col-auto ${
                      isOdd
                        ? "md:col-start-1 md:mr-5"
                        : "md:col-start-3 md:ml-5"
                    } rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-sm`}
                  >
                    <span className="inline-block text-xs font-bold uppercase tracking-wider text-issca-blue mb-1.5">
                      {formatFrench(step.tag)}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-issca-navy">
                      {formatFrench(step.title)}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                      {formatFrench(step.description)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Optional Single Expandable Curriculum Drawer (Closed by Default) */}
        <div className="mt-14 max-w-[940px] mx-auto">
          <details className="issca-accordion">
            <summary>
              <span className="text-sm sm:text-base font-bold text-issca-navy">
                {formatFrench("Consulter le détail des matières par semestre (S1 à S4)")}
              </span>
            </summary>
            <div className="p-6 bg-white grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700">
              {ACADEMIC_JOURNEY.map((sem) => (
                <div key={sem.id}>
                  <p className="font-extrabold text-issca-navy mb-2">
                    Semestre {sem.semesterNumber} ({sem.yearLabel})
                  </p>
                  <ul className="space-y-1 text-slate-600 list-disc pl-4">
                    {sem.officialModules.map((mod) => (
                      <li key={mod}>{formatFrench(mod)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
