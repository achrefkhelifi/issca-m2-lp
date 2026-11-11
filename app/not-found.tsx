import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header minimal />
      <main
        id="main-content"
        className="flex-1 bg-issca-surface py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
      >
        <div className="max-w-lg text-center bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <p className="text-xs font-extrabold uppercase tracking-wider text-issca-red">
            Erreur 404
          </p>
          <h1
            id="main-heading"
            tabIndex={-1}
            className="mt-2 heading-card font-extrabold text-issca-navy"
          >
            Page introuvable
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            La page que vous recherchez n’existe pas ou a été déplacée.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="btn-secondary-outline text-sm w-full sm:w-auto">
              Découvrir le Master
            </Link>
            <Link href="/candidature" className="btn-primary-red text-sm w-full sm:w-auto">
              Démarrer ma candidature
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
