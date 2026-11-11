# AGENTS.md — ISSCA Join (`join.issca.tn`)

## 1. Mission & Product Identity

- **Institution:** ISSCA Business School — Institut Supérieur Privé des Sciences Commerciales et des Affaires (Route de Ceinture, Zone Industrielle, 4022 Akouda, Sousse, Tunisie)
- **Institutional Authorization:** Agrément du Ministère de l'Enseignement Supérieur et de la Recherche Scientifique n° 01/2018 (describe strictly as institutional authorization/recognition under Agrément n° 01/2018, never as automatic employment or unverified international accreditation).
- **Program:** Master Professionnel en Management des Startups et de l'Intelligence Artificielle (`issca-master-startups-ia`)
- **Level & Duration:** Bac+5 · 2 academic years · 4 semesters (M1: Semestres 1 & 2, M2: Semestres 3 & 4 including 4–6 month final internship and dissertation defense)
- **Target Domain:** `https://join.issca.tn`
- **Primary Business Objective:** Generate qualified candidates who become confirmed enrollments — not raw, low-intent form submissions.
- **Official Registration Deadline:** **November 28, 2026** (`2026-11-28`, evaluated in the `Africa/Tunis` timezone).
- **Website Language:** French (`lang="fr"`) with strict French typographic rules (`\u202F`, `\u00A0`, `’`).
- **Codebase Language:** English.

---

## 2. Phase 1 Technical Audit of Reference Project (`/Users/medachrefkhelifi/Desktop/Cocon`)

### 2.1 Reusable Infrastructure & Patterns (Adopted for ISSCA)
1. **Static Export + Cloudflare Worker Hybrid Architecture:**
   - Next.js 15 (`^15.1.7`), React 19 (`^19.0.0`), TypeScript (`^5.7.3`), Tailwind CSS (`^3.4.17`).
   - `next.config.ts` uses `output: "export"` and `images: { unoptimized: true }` producing `./out`.
   - `wrangler.jsonc` serves `./out` via the `ASSETS` binding (`not_found_handling: "404-page"`) and routes `POST /api/lead` to `worker/index.ts` before falling back to `env.ASSETS.fetch(request)`.
2. **Shared Validation & Anti-Spam:**
   - Shared Zod (`^4.4.3`) schema (`lib/schema.ts`) imported by both the client funnel and `worker/index.ts`.
   - Honeypot protection (`website` field) plus IP extraction (`cf-connecting-ip` / `x-forwarded-for`), payload size validation, and origin/rate-limit guards.
3. **Server-Side Integrations (`worker/index.ts`):**
   - **n8n Webhook (`N8N_WEBHOOK_URL`):** Dispatches structured JSON payload + formatted human-readable summary for Odoo CRM card creation/updating.
   - **Resend Email (`RESEND_API_KEY`):** Sends immediate operational notification email to admissions (`NOTIFICATION_EMAIL`).
   - **Meta Conversions API (`META_CAPI_ACCESS_TOKEN`, `META_PIXEL_ID`):** Server-side Web Crypto SHA-256 hashing (`em`, `ph`, `fn`, `ln`, `ct`) with normalized Tunisian phone numbers (`216XXXXXXXX`).
4. **Conversion UX & Accessibility Patterns:**
   - Top announcement banner (`VacancesTopBanner` pattern -> adapted to `DeadlineBanner` for November 28, 2026).
   - Scroll-activated vertical journey timeline (`Hopscotch` pattern -> adapted to 4-semester academic roadmap with `prefers-reduced-motion` support).
   - Distraction-free multi-step funnel (`/candidature`) with keyboard navigation, step progress bar, inline validation, and WhatsApp fallback on network/server failure.
   - Mobile sticky bottom bar (`MobileBar`) hidden automatically on `/candidature` and `/merci`.
   - French typography helper (`lib/typography.ts` `formatFrench`).

### 2.2 Cocon-Specific Logic Excluded or Upgraded for ISSCA
1. **Excluded Cocon Domain Logic:**
   - Primary school classes (`MS`–`Collège`), sibling `-10%` discounts, multi-child sequential Odoo card dispatch, daycare pricing, and Dino mascot components.
2. **Critical Security & Reliability Upgrades over Cocon:**
   - **No Hardcoded Secrets:** Cocon had fallback tokens in `worker/index.ts`. ISSCA strictly reads `N8N_WEBHOOK_URL`, `RESEND_API_KEY`, and `META_CAPI_ACCESS_TOKEN` from Cloudflare `Env` secrets only — never hardcoded in source control.
   - **Durable Upstream Verification:** Cocon swallowed n8n webhook errors (`try/catch` returning `200 OK` even when n8n failed). ISSCA verifies durable acceptance (or development fallback mode when explicitly configured for local testing) and returns an honest `502/500` with WhatsApp fallback if upstream persistence fails, preventing false confirmations.
   - **Browser/Server Event ID Deduplication:** ISSCA generates a deterministic/unique `eventId` per accepted submission and passes it to both Meta Pixel (`{ eventID }`) and Meta CAPI (`event_id`), preventing double counting and guarding `/merci` against refresh duplicate firing via `sessionStorage`.

---

## 3. Design System & Brand Tokens

- **ISSCA Red (Primary Conversion Accent):** `#D11623` (hover `#B5111D`, subtle tint `#FDF2F3`)
- **ISSCA Blue (Institutional Brand Blue):** `#1C4E9E` (hover `#153B7A`, subtle tint `#EEF4FC`)
- **ISSCA Deep Navy (Headings & Institutional Anchors):** `#0F2347` / `#1E264D`
- **Backgrounds:** Pure White `#FFFFFF`, Light Neutral `#F7F8FB`, Subtle Border `#E2E8F0`
- **Typography:** Clean, authoritative editorial sans-serif (`Plus Jakarta Sans` / `Inter` system stack with `font-size-adjust: from-font`, unitless `line-height`, `text-wrap: balance` on headings, `text-wrap: pretty` on body copy).
- **Visual Restraint:** No gold university clichés, no purple gradients, no robot stock photos, no auto-playing background videos.
- **Browser Support Policy:** Allow Newly Available web platform features (`<details name="...">`, `::details-content`, `<progress>`, `Temporal`, `font-size-adjust: from-font`), using native progressive enhancement and lightweight zero-dependency fallbacks (`<= 20` lines) where needed rather than bundling heavy third-party polyfills.

---

## 4. Editorial & Academic Accuracy Rules

1. **Positioning:** A professional Master's degree (Bac+5) training agile managers and entrepreneurs capable of leading AI integration, digital transformation, and startup growth — not a purely technical software engineering degree.
2. **Traceable Curriculum (Official ISSCA Source):**
   - **Semestre 1 (M1):** Management de l'innovation et des startups, Programmation et algorithmes, Financement de l'innovation, Histoire et enjeux de l'IA, Introduction à l'économie numérique, Management et prise de décision stratégique, Management des SI, Français des affaires, Business English, Techniques de négociation.
   - **Semestre 2 (M1):** L'IA appliquée au management, International strategic management, Lean startups, Séminaires startup et IA, Droit des startups et de l'intelligence artificielle, Cybersécurité et protection des données, IA : responsabilité et éthique, Personal branding, Anglais du numérique, Base de données avancées, Systèmes interactifs d'aide à la décision.
   - **Semestre 3 (M2):** Création et croissance des startups, GRH et nouvelles technologies, Le marketing des startups, Projet IA, Conduite du changement, Machine Learning / Deep Learning, Data Science, Scrum Management : Préparation à la certification, Business communication in an international environment, Fiscalité des startups, Méthodologie de recherche et de rédaction du mémoire de fin d'études.
   - **Semestre 4 (M2):** Stage et Projet de fin d'études (4 à 6 mois), Rédaction et soutenance du mémoire.
3. **Eligibility & Admissions Honesty:**
   - Open to holders of a Licence (Bac+3) or equivalent, or engineering degree, with strong interest in startups, management, and AI.
   - Final eligibility and admission are always subject to dossier review and interview by ISSCA's admissions committee.
   - Do not offer unapproved pathways (direct M2 entry, weekend-only executive tracks, guaranteed alternance placement, or automatic Scrum certification award).
4. **Tuition & Payment Transparency:**
   - Keep tuition amounts configurable in `content/program.ts` (`7 100 DT / an` indicatif sur le site institutionnel ISSCA + `250 DT` frais d'inscription après acceptation du dossier, payable en 3 tranches : inscription, 1er décembre, 1er mars, remise de 6 % au comptant, paiement mensuel envisageable) while explicitly stating that exact program fees for the current academic intake are confirmed by the admissions office upon dossier review.
5. **Deadline Management (`2026-11-28`, `Africa/Tunis`):**
   - Display dynamic days remaining in `Africa/Tunis` timezone.
   - Only display days (no hours/minutes countdown unless exact closing hour is officially confirmed).
   - Automatically switch CTAs and messaging if the current date in `Africa/Tunis` is past `2026-11-28`.

---

## 5. Funnel, Odoo CRM & Analytics Architecture

### 5.1 Pre-Application Funnel (`/candidature`)
- **Step 1 — Academic Eligibility:** Highest degree (`degreeLevel`), specialization (`specialization`), institution (`institution`), graduation year (`graduationYear`).
- **Step 2 — Admission Intentions:** Desired intake (`desiredIntake`), current situation (`currentSituation`), readiness (`readiness`: ready before Nov 28 vs. needs clarification), optional motivation/question (`motivation`).
- **Step 3 — Personal Details:** `firstName`, `lastName`, `phone` (Telephone/WhatsApp), `email`, `city`, optional message (`comments`), required privacy acknowledgment (`privacyConsent`), separate optional marketing consent (`marketingConsent`).
- **Step 4 — Review & Confirmation:** Full editable recap + primary submit button `"Envoyer ma pré-candidature"`.

### 5.2 `/api/lead` Worker & Odoo CRM Payload
- Validates payload with Zod (`lib/schema.ts`), checks honeypot (`website`), enforces payload size and origin checks.
- Generates `submissionId`, `idempotencyKey`, `eventId`, and Opportunity title:
  `[Prénom Nom] — Master Startups & IA — [Diplôme]`
- Dispatches structured payload + readable internal note summary to `N8N_WEBHOOK_URL` and operational alert to `RESEND_API_KEY`.
- Returns `200 OK` with `{ success: true, submissionId, eventId }` only when accepted.

### 5.3 Analytics & Meta CAPI Deduplication
- **Consent-aware:** Respects user cookie/marketing consent state (`issca_consent`).
- **Events:**
  - `page_view` / Meta `ViewContent` on program landing page
  - `form_start` on first funnel interaction
  - `form_step` on step progression
  - `generate_lead` / Meta `Lead` (with shared `eventID` matching CAPI `event_id`) strictly once upon confirmed `200 OK` from `/api/lead`.
- **Confirmation Page (`/merci`):** `noindex, nofollow`, displays 4-stage admissions status tracker (1. Pré-candidature reçue -> 2. Étude du dossier & entretien -> 3. Décision d'admission -> 4. Inscription définitive), WhatsApp contact without PII in URL, and `sessionStorage` guard against refresh duplication.
