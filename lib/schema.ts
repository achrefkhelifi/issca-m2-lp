import { z } from "zod";

export const PROGRAM_ID = "issca-master-startups-ia" as const;
export const PROGRAM_NAME =
  "Master Professionnel en Management des Startups et de l'Intelligence Artificielle" as const;
export const INSTITUTION_NAME = "ISSCA Business School" as const;
export const CAMPUS_NAME = "Sousse" as const;
export const FORM_VERSION = "2026.11-v1" as const;

export const DEGREE_LEVEL_OPTIONS = [
  {
    value: "licence_bac3",
    label: "Licence / Bac+3",
    shortLabel: "Licence (Bac+3)",
    description: "Diplôme de Licence fondamentale ou appliquée (LMD) ou équivalent Bac+3.",
  },
  {
    value: "master_m1",
    label: "Master 1 / Bac+4",
    shortLabel: "Master 1 / Bac+4",
    description: "Première année de Master validée ou maîtrise (Bac+4).",
  },
  {
    value: "ingenieur",
    label: "Diplôme d’ingénieur / Bac+5",
    shortLabel: "Ingénieur / Bac+5",
    description: "Ingénieur ou diplômé(e) Bac+5 souhaitant acquérir une double compétence Management & IA.",
  },
  {
    value: "autre",
    label: "Autre diplôme (équivalence à étudier)",
    shortLabel: "Autre diplôme",
    description: "Parcours spécifique soumis à l’appréciation de la commission d’admission d’ISSCA.",
  },
] as const;

export const GRADUATION_YEAR_OPTIONS = [
  "2026 (en cours d’obtention)",
  "2025",
  "2024",
  "2023",
  "2022 ou antérieur",
] as const;

export const DESIRED_INTAKE_OPTIONS = [
  {
    value: "session_nov_2026",
    label: "Session actuelle (clôture le 28 novembre 2026)",
    description: "Intégrer la promotion en cours avant la date limite officielle du 28 novembre 2026.",
  },
  {
    value: "prochaine_rentree",
    label: "Prochaine rentrée universitaire",
    description: "Préparer mon dossier en avance pour la session suivante.",
  },
  {
    value: "besoin_conseil",
    label: "Je souhaite d’abord échanger avec les admissions",
    description: "Obtenir des précisions sur le programme, l’éligibilité ou les modalités avant de confirmer.",
  },
] as const;

export const CURRENT_SITUATION_OPTIONS = [
  {
    value: "etudiant_jeune_diplome",
    label: "Étudiant(e) ou jeune diplômé(e)",
  },
  {
    value: "salarie_en_poste",
    label: "Salarié(e) ou professionnel(le) en activité",
  },
  {
    value: "porteur_projet_startup",
    label: "Entrepreneur / Porteur de projet startup",
  },
  {
    value: "en_transition",
    label: "En recherche d’opportunités ou reconversion",
  },
] as const;

export const READINESS_OPTIONS = [
  {
    value: "pret_avant_28_nov",
    label: "Prêt(e) à finaliser mon inscription avant le 28 novembre 2026",
    badge: "Traitement prioritaire",
  },
  {
    value: "besoin_informations_frais_programme",
    label: "Intéressé(e), j’ai besoin de précisions (programme, frais ou pièces du dossier)",
    badge: "Accompagnement conseiller",
  },
  {
    value: "comparaison_orientation",
    label: "En phase de réflexion et d’orientation académique",
    badge: "Entretien d’orientation",
  },
] as const;

export type DegreeLevelValue = (typeof DEGREE_LEVEL_OPTIONS)[number]["value"];
export type DesiredIntakeValue = (typeof DESIRED_INTAKE_OPTIONS)[number]["value"];
export type CurrentSituationValue = (typeof CURRENT_SITUATION_OPTIONS)[number]["value"];
export type ReadinessValue = (typeof READINESS_OPTIONS)[number]["value"];

/**
 * Normalizes a Tunisian or international phone number while preserving readability.
 * Accepts 8-digit local Tunisian numbers (e.g. "20 390 039" -> "+21620390039")
 * or international numbers starting with + or 00.
 */
export function normalizePhone(raw: string): string {
  const trimmed = raw.trim();
  const digitsAndPlus = trimmed.replace(/[\s.\-()]/g, "");
  const normalizedPrefix = digitsAndPlus.startsWith("00")
    ? `+${digitsAndPlus.slice(2)}`
    : digitsAndPlus;

  if (/^\d{8}$/.test(normalizedPrefix)) {
    return `+216${normalizedPrefix}`;
  }
  if (/^216\d{8}$/.test(normalizedPrefix)) {
    return `+${normalizedPrefix}`;
  }
  return normalizedPrefix;
}

export function isValidPhone(raw: string): boolean {
  const normalized = normalizePhone(raw);
  // Tunisian +216 followed by 8 digits (starting with 2, 3, 4, 5, 7, 9) or valid E.164 international (8 to 15 digits)
  return /^\+216[234579]\d{7}$/.test(normalized) || /^\+[1-9]\d{7,14}$/.test(normalized);
}

export const step1Schema = z.object({
  degreeLevel: z.enum(["licence_bac3", "master_m1", "ingenieur", "autre"], {
    message: "Veuillez sélectionner votre niveau d’études actuel.",
  }),
  specialization: z
    .string()
    .trim()
    .min(2, "Veuillez indiquer votre spécialité ou filière d’études (au moins 2 caractères).")
    .max(120, "Ce champ ne peut pas dépasser 120 caractères."),
  institution: z
    .string()
    .trim()
    .min(2, "Veuillez indiquer votre établissement d’origine (université, école ou institut).")
    .max(140, "Ce champ ne peut pas dépasser 140 caractères."),
  graduationYear: z
    .string()
    .trim()
    .min(4, "Veuillez sélectionner l’année d’obtention (ou prévue) de votre diplôme.")
    .max(40),
});

export const step2Schema = z.object({
  desiredIntake: z.enum(["session_nov_2026", "prochaine_rentree", "besoin_conseil"], {
    message: "Veuillez indiquer la session souhaitée.",
  }),
  currentSituation: z.enum(
    ["etudiant_jeune_diplome", "salarie_en_poste", "porteur_projet_startup", "en_transition"],
    {
      message: "Veuillez sélectionner votre situation actuelle.",
    }
  ),
  readiness: z.enum(
    [
      "pret_avant_28_nov",
      "besoin_informations_frais_programme",
      "comparaison_orientation",
    ],
    {
      message: "Veuillez préciser votre disponibilité pour finaliser le dossier.",
    }
  ),
  motivation: z
    .string()
    .trim()
    .max(600, "Votre message ne peut pas dépasser 600 caractères.")
    .optional()
    .default(""),
});

export const step3Schema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "Veuillez saisir votre prénom (au moins 2 caractères).")
    .max(80, "Le prénom ne peut pas dépasser 80 caractères."),
  lastName: z
    .string()
    .trim()
    .min(2, "Veuillez saisir votre nom de famille (au moins 2 caractères).")
    .max(80, "Le nom ne peut pas dépasser 80 caractères."),
  phone: z
    .string()
    .trim()
    .refine(isValidPhone, {
      message:
        "Veuillez saisir un numéro de téléphone valide (ex. : 20 390 039 ou +216 20 390 039).",
    }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Veuillez saisir une adresse e-mail valide (ex. : prenom.nom@email.com).")
    .max(160),
  city: z
    .string()
    .trim()
    .min(2, "Veuillez indiquer votre ville de résidence (ex. : Sousse, Tunis, Monastir...).")
    .max(80, "La ville ne peut pas dépasser 80 caractères."),
  comments: z
    .string()
    .trim()
    .max(800, "Vos questions ou remarques ne peuvent pas dépasser 800 caractères.")
    .optional()
    .default(""),
  privacyConsent: z.literal(true, {
    message:
      "Vous devez accepter le traitement de vos données par le service des admissions d’ISSCA pour envoyer votre pré-candidature.",
  }),
  marketingConsent: z.boolean().optional().default(false),
});

export const candidatureSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
  // Anti-spam honeypot (must stay empty)
  website: z.string().max(0, "Spam détecté.").optional().default(""),
  // Tracking & attribution metadata
  eventId: z.string().trim().min(8).max(128),
  idempotencyKey: z.string().trim().min(8).max(128),
  submittedFrom: z.string().trim().max(200).optional().default("/candidature"),
  utmSource: z.string().trim().max(120).optional().default(""),
  utmMedium: z.string().trim().max(120).optional().default(""),
  utmCampaign: z.string().trim().max(160).optional().default(""),
  utmContent: z.string().trim().max(160).optional().default(""),
  utmTerm: z.string().trim().max(160).optional().default(""),
  fbclid: z.string().trim().max(255).optional().default(""),
  gclid: z.string().trim().max(255).optional().default(""),
  fbp: z.string().trim().max(255).optional().default(""),
  fbc: z.string().trim().max(255).optional().default(""),
  analyticsConsent: z.boolean().optional().default(false),
});

export type CandidatureInput = z.input<typeof candidatureSchema>;
export type CandidaturePayload = z.output<typeof candidatureSchema>;

export function getDegreeLabel(value: DegreeLevelValue): string {
  return DEGREE_LEVEL_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function getDegreeShortLabel(value: DegreeLevelValue): string {
  return DEGREE_LEVEL_OPTIONS.find((o) => o.value === value)?.shortLabel ?? value;
}

export function getDesiredIntakeLabel(value: DesiredIntakeValue): string {
  return DESIRED_INTAKE_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function getCurrentSituationLabel(value: CurrentSituationValue): string {
  return CURRENT_SITUATION_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function getReadinessLabel(value: ReadinessValue): string {
  return READINESS_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

/**
 * Formats the Odoo CRM Opportunity title as required:
 * "[Full Name] — Master Startups & IA — [Degree Level]"
 */
export function buildOdooOpportunityTitle(data: {
  firstName: string;
  lastName: string;
  degreeLevel: DegreeLevelValue;
}): string {
  const fullName = `${data.firstName.trim()} ${data.lastName.trim()}`;
  const degreeShort = getDegreeShortLabel(data.degreeLevel);
  return `${fullName} — Master Startups & IA — ${degreeShort}`;
}

/**
 * Generates a structured, human-readable French admissions summary suitable for
 * Odoo CRM internal notes (description) and Resend email notifications.
 */
export function buildAdmissionsSummary(data: CandidaturePayload, submissionId: string): string {
  const isPriority = data.readiness === "pret_avant_28_nov";
  const lines = [
    `=== PRÉ-CANDIDATURE · ISSCA BUSINESS SCHOOL ===`,
    `Référence : ${submissionId}`,
    `Programme : ${PROGRAM_NAME} (${PROGRAM_ID})`,
    `Campus : ${CAMPUS_NAME}`,
    `Priorité Clôture 28 nov. 2026 : ${
      isPriority ? "OUI — Prêt(e) à s'inscrire avant le 28/11/2026" : "Standard — Accompagnement requis"
    }`,
    ``,
    `--- CANDIDAT(E) ---`,
    `Nom complet : ${data.firstName} ${data.lastName}`,
    `Téléphone : ${normalizePhone(data.phone)} (saisi : ${data.phone})`,
    `E-mail : ${data.email}`,
    `Ville : ${data.city}`,
    ``,
    `--- PARCOURS ACADÉMIQUE ---`,
    `Niveau d'études : ${getDegreeLabel(data.degreeLevel)}`,
    `Spécialité / Filière : ${data.specialization}`,
    `Établissement d'origine : ${data.institution}`,
    `Année d'obtention : ${data.graduationYear}`,
    ``,
    `--- PROJET & INTENTIONS D'ADMISSION ---`,
    `Session souhaitée : ${getDesiredIntakeLabel(data.desiredIntake)}`,
    `Situation actuelle : ${getCurrentSituationLabel(data.currentSituation)}`,
    `Disponibilité : ${getReadinessLabel(data.readiness)}`,
    `Objectif / Motivation : ${data.motivation ? data.motivation : "Non renseigné"}`,
    `Questions / Commentaires : ${data.comments ? data.comments : "Aucun"}`,
    ``,
    `--- CONSENTEMENTS & ATTRIBUTION ---`,
    `Consentement traitement admission : Oui`,
    `Consentement communications : ${data.marketingConsent ? "Oui" : "Non"}`,
    `Source UTM : ${data.utmSource || "direct"} / ${data.utmMedium || "none"} / ${
      data.utmCampaign || "none"
    }`,
  ];

  return lines.join("\n");
}
