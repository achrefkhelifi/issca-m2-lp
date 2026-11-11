# ISSCA Join — Plateforme d’Admission Master Management des Startups et de l’IA (`join.issca.tn`)

Plateforme d’admission mobile-first à haute conversion conçue pour le **Master Professionnel en Management des Startups et de l’Intelligence Artificielle** (Bac+5, 4 semestres) de l’**ISSCA Business School** (Sousse, Tunisie).

---

## 1. Architecture Technique

- **Frontend :** Next.js 15 (`output: "export"`, App Router), React 19, TypeScript 5.7, Tailwind CSS 3.4.
- **Runtime Edge :** Cloudflare Workers (`worker/index.ts`) servant à la fois l’export statique (`./out`) via le binding `ASSETS` et l’API transactionnelle `POST /api/lead`.
- **Validation & Sécurité :** Validation Zod partagée client/serveur (`lib/schema.ts`), honeypot anti-spam (`website`), contrôle d’origine (`Origin`), limitation de débit par IP (8 requêtes / 10 min) et clé d’idempotence (`X-Idempotency-Key`).
- **Date limite officielle (`Africa/Tunis`) :** Clôture des inscriptions le **28 novembre 2026** (`2026-11-28`), calculée dynamiquement sur le fuseau horaire `Africa/Tunis` (`lib/deadline.ts`).

---

## 2. Spécification du Payload Webhook CRM (`n8n` → Odoo CRM)

Lorsqu’une pré-candidature valide est soumise à `POST /api/lead`, le Worker envoie une requête HTTP `POST` vers `N8N_WEBHOOK_URL` avec les en-têtes :
- `Content-Type: application/json`
- `X-Idempotency-Key: <idempotencyKey>`
- `X-Webhook-Secret: <N8N_WEBHOOK_SECRET>` (si défini)

### Exemple de Payload JSON envoyé à n8n

```json
{
  "submissionId": "ISSCA-20261111-9F4A2C",
  "idempotencyKey": "idem_7d4f8a22-910b-4f1b-9c31-62c01f9f4a2c",
  "eventId": "lead_3b1e9c80-52a1-4c9a-8812-1049f8a12b40",
  "timestamp": "2026-11-11T22:45:00.000Z",
  "formVersion": "2026.11-v1",
  "program": {
    "id": "issca-master-startups-ia",
    "name": "Master Professionnel en Management des Startups et de l'Intelligence Artificielle",
    "institution": "ISSCA Business School",
    "campus": "Sousse",
    "registrationDeadline": "2026-11-28",
    "deadlineExpiredAtSubmission": false,
    "daysRemainingAtSubmission": 17
  },
  "odoo": {
    "opportunityTitle": "Yasmine Ben Ali — Master Startups & IA — Licence (Bac+3)",
    "priority": "high_before_28_nov",
    "priorityStarCount": "3",
    "tags": [
      "Master Startups & IA",
      "join.issca.tn",
      "Licence / Bac+3",
      "Prioritaire 28 Nov"
    ],
    "internalNote": "=== PRÉ-CANDIDATURE · ISSCA BUSINESS SCHOOL ===\nRéférence : ISSCA-20261111-9F4A2C..."
  },
  "candidate": {
    "firstName": "Yasmine",
    "lastName": "Ben Ali",
    "fullName": "Yasmine Ben Ali",
    "phoneRaw": "20 390 039",
    "phoneNormalized": "+21620390039",
    "email": "yasmine.benali@example.com",
    "city": "Sousse"
  },
  "academic": {
    "degreeLevel": "licence_bac3",
    "degreeLabel": "Licence / Bac+3",
    "specialization": "Informatique de gestion",
    "institution": "IHEC Sousse",
    "graduationYear": "2026 (en cours d’obtention)"
  },
  "intentions": {
    "desiredIntake": "session_nov_2026",
    "desiredIntakeLabel": "Session actuelle (clôture le 28 novembre 2026)",
    "currentSituation": "etudiant_jeune_diplome",
    "currentSituationLabel": "Étudiant(e) ou jeune diplômé(e)",
    "readiness": "pret_avant_28_nov",
    "readinessLabel": "Prêt(e) à finaliser mon inscription avant le 28 novembre 2026",
    "readyBeforeNov28": true,
    "motivation": "Devenir Product Manager IA en startup",
    "comments": ""
  },
  "consent": {
    "privacyConsent": true,
    "marketingConsent": true,
    "analyticsConsent": true
  },
  "attribution": {
    "submittedFrom": "/candidature",
    "utmSource": "facebook",
    "utmMedium": "paid_social",
    "utmCampaign": "master_startups_ia_nov2026",
    "utmContent": "carousel_hero",
    "utmTerm": "",
    "fbclid": "IwAR123...",
    "gclid": "",
    "fbp": "fb.1.1731360000.123456",
    "fbc": "fb.1.1731360000.IwAR123...",
    "ipCountry": "TN",
    "userAgent": "Mozilla/5.0..."
  }
}
```

### Mapping recommandé dans Odoo CRM (`crm.lead` / `type = 'opportunity'`)

| Champ Odoo (`crm.lead`) | Champ du Payload JSON |
|---|---|
| `name` (Titre de l’opportunité) | `odoo.opportunityTitle` (`"[Prénom Nom] — Master Startups & IA — [Diplôme]"`) |
| `contact_name` | `candidate.fullName` |
| `email_from` | `candidate.email` |
| `phone` / `mobile` | `candidate.phoneNormalized` |
| `city` | `candidate.city` |
| `priority` | `odoo.priorityStarCount` (`"3"` si prêt avant le 28 nov. 2026, `"1"` sinon) |
| `description` (Notes internes) | `odoo.internalNote` |

---

## 3. Mapping des Événements Analytics & Déduplication Meta CAPI

Aucun événement `Lead` n’est déclenché au chargement ou à l’ouverture du formulaire. Les traceurs tiers (GA4, GTM, Meta Pixel) ne sont chargés qu’après consentement (`issca_join_cookie_consent_v1 = "granted"`).

| Étape du parcours | Événement GA4 / GTM (`dataLayer`) | Événement Meta Pixel | Événement Meta CAPI (Serveur) | Déduplication |
|---|---|---|---|---|
| Visite du programme (`/`) | `view_item` (`program_id: "issca-master-startups-ia"`) | `ViewContent` | — | Guard `sessionStorage` par page |
| Clic sur un bouton CTA | `select_promotion` | — | — | — |
| 1ère saisie sur `/candidature` | `form_start` | — | — | 1 seule fois par session |
| Validation des étapes 1, 2, 3 | `form_step_complete` (`step_number: 1\|2\|3`) | — | — | 1 seule fois par étape |
| Réponse `200 OK` de `POST /api/lead` | `generate_lead` (`event_id`, `submission_id`) | `Lead` avec `{ eventID: eventId }` | `Lead` avec `event_id: eventId` + hachage SHA-256 (`em`, `ph`, `fn`, `ln`, `ct`, `country`) | Clé `eventId` partagée + protection anti-rafraîchissement sur `/merci` |

---

## 4. Instructions de Test Local

### Prérequis
- Node.js 20+ et npm

### Commandes de vérification

```bash
# 1. Vérification du typage TypeScript (Next.js + Cloudflare Worker)
npm run typecheck

# 2. Linting ESLint
npm run lint

# 3. Génération de l'export statique Next.js dans ./out
npm run build

# 4. Lancement du serveur de développement Next.js
npm run dev
```

Pour tester le Worker Cloudflare en local (avec `wrangler`) :
```bash
cp .env.example .dev.vars
npx wrangler dev
```
En l’absence de `N8N_WEBHOOK_URL` et `RESEND_API_KEY` en environnement local, `POST /api/lead` fonctionne en mode `development_dry_run` et valide l’intégralité du schéma Zod et du flux `/candidature` → `/merci`.

---

## 5. Instructions de Déploiement Cloudflare Workers & DNS (`join.issca.tn`)

> **Important :** Ne déployez en production et ne modifiez la zone DNS `issca.tn` qu’après validation explicite des secrets et de l’équipe ISSCA.

### Étape 1 — Configurer les secrets Cloudflare Worker
```bash
npx wrangler secret put N8N_WEBHOOK_URL
npx wrangler secret put N8N_WEBHOOK_SECRET
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put ADMISSIONS_NOTIFICATION_EMAIL
npx wrangler secret put META_PIXEL_ID
npx wrangler secret put META_CAPI_ACCESS_TOKEN
```

### Étape 2 — Construire et déployer le Worker
```bash
npm run build
npx wrangler deploy
```

### Étape 3 — Rattacher le sous-domaine `join.issca.tn`
Dans le tableau de bord Cloudflare du domaine `issca.tn` :
1. Ouvrez **Workers & Pages** → **`issca-join`** → **Settings** → **Domains & Routes**.
2. Cliquez sur **Add** → **Custom Domain** et saisissez `join.issca.tn`.
3. Cloudflare créera automatiquement l’enregistrement DNS proxifié et le certificat SSL/TLS.

---

## 6. Liste des Éléments à Confirmer ou Fournir par l’Équipe ISSCA

1. **Confirmation du barème tarifaire spécifique 2026/2027 :**
   - Le site affiche à titre indicatif le barème Master publié sur `issca.tn/frais-detudes` (`7 100 DT / an` + `250 DT` de frais d’inscription, payable en 3 tranches avec `-6 %` au comptant) tout en précisant que le tarif applicable est confirmé par le conseiller aux admissions. Ce montant est centralisé et modifiable en une ligne dans `content/program.ts` (`TUITION_AND_ADMISSIONS_CONFIG`).
2. **Photographies haute résolution du campus (optionnel) :**
   - Le projet intègre des visuels vectoriels architecturaux et pédagogiques ultra-rapides sans décalage de mise en page (`public/images/campus/hero-campus.svg`, `pedagogie-immersion.svg`, `campus-sousse.svg`). Si l’équipe marketing d’ISSCA souhaite les remplacer par des photographies `.webp` ou `.jpg` du campus d’Akouda et des salles de cours, il suffit de les déposer dans `public/images/campus/` et de mettre à jour les chemins dans `components/Hero.tsx`, `components/LearningByDoing.tsx` et `components/WhyIssca.tsx`.
3. **Identifiants de production Analytics & CRM :**
   - URL finale du webhook `N8N_WEBHOOK_URL` relié à Odoo CRM.
   - Clé API `RESEND_API_KEY` et adresse expéditrice vérifiée sur le domaine `issca.tn`.
   - `META_PIXEL_ID` et `META_CAPI_ACCESS_TOKEN` du Business Manager Meta d’ISSCA.
