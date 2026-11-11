/**
 * Centralized, strictly typed content dictionary for ISSCA Join (`https://join.issca.tn`).
 * Every institutional fact, module name, career opportunity, admission condition, and contact
 * coordinate is sourced from official ISSCA Business School documentation (`issca.tn` & flyer).
 *
 * No fabricated claims, unverified rankings, or guaranteed placement promises are permitted.
 */

export interface CandidateProfileItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  backgroundNote: string;
}

export interface CareerRoleItem {
  title: string;
  description: string;
}

export interface CareerClusterItem {
  id: string;
  title: string;
  subtitle: string;
  accentColor: "red" | "blue" | "navy";
  roles: CareerRoleItem[];
}

export interface CompetencyPillarItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

export interface SemesterCurriculumItem {
  id: string;
  semesterNumber: 1 | 2 | 3 | 4;
  yearLabel: "Master 1" | "Master 2";
  title: string;
  subtitle: string;
  summary: string;
  keyHighlights: string[];
  officialModules: string[];
  footnote?: string;
}

export interface PedagogyFeatureItem {
  id: string;
  title: string;
  description: string;
  proofLabel: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  contextNote: string;
}

export interface FaqItem {
  id: string;
  category: "Éligibilité" | "Programme & IA" | "Admission & Délais" | "Frais & Modalités";
  question: string;
  answer: string;
}

export const ISSCA_INSTITUTION = {
  shortName: "ISSCA Business School",
  legalName: "Institut Supérieur Privé des Sciences Commerciales et des Affaires",
  corporatePayeeName: 'EC.SUP.PRIVEE SCES COML.& ADM. "ISSCA-SA"',
  foundedYear: 2018,
  ministryAuthorizationNumber: "01/2018",
  ministryAuthorizationText:
    "Établissement privé d’enseignement supérieur agréé par le Ministère de l’Enseignement Supérieur et de la Recherche Scientifique Tunisien sous le n° 01/2018.",
  ministryDisclaimer:
    "L’agrément ministériel n° 01/2018 constitue l’autorisation institutionnelle officielle de l’établissement délivrée par le Ministère de l’Enseignement Supérieur et de la Recherche Scientifique.",
  campusCity: "Sousse",
  campusLocality: "Akouda, Sousse",
  addressLine: "Route de ceinture, Zone Industrielle, 4022 Akouda, Sousse, Tunisie",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=35.871488,10.581850",
  coordinates: {
    lat: 35.871488,
    lng: 10.58185,
  },
  phonePrimaryDisplay: "(+216) 70 130 190",
  phonePrimaryTel: "+21670130190",
  phoneAdmissionsDisplay: "(+216) 20 390 039",
  phoneAdmissionsTel: "+21620390039",
  whatsappNumberE164: "21620390039",
  faxDisplay: "(+216) 70 130 191",
  emailGeneral: "contact@issca.tn",
  emailAdmissions: "marketing@issca.tn",
  websiteOfficial: "https://issca.tn",
  programOfficialUrl:
    "https://issca.tn/master-professionnel/master-management-des-startups-et-de-lia",
  socialLinks: {
    facebook: "https://www.facebook.com/issca.business.school",
    instagram: "https://www.instagram.com/issca.business.school/",
    linkedin: "https://www.linkedin.com/company/essca-tunisie",
    youtube: "https://www.youtube.com/channel/UCDKIm8abyJRo9dYefUOqiWg",
  },
} as const;

export function buildAdmissionsWhatsAppUrl(customMessage?: string): string {
  const defaultMsg =
    "Bonjour ISSCA Business School, je souhaite obtenir des informations concernant le Master Professionnel en Management des Startups et de l'Intelligence Artificielle (session clôture 28 novembre 2026).";
  const text = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/${ISSCA_INSTITUTION.whatsappNumberE164}?text=${text}`;
}

export const HERO_CONTENT = {
  eyebrow: "MASTER PROFESSIONNEL · BAC+5 · ISSCA BUSINESS SCHOOL",
  headline:
    "L’intelligence artificielle transforme les entreprises. Préparez-vous à les manager.",
  programTitle: "Master Management des Startups et de l’Intelligence Artificielle",
  supportingCopy:
    "Développez les compétences pour piloter des projets innovants, manager des startups et intégrer l’intelligence artificielle dans les décisions d’entreprise.",
  primaryCta: "Démarrer ma candidature",
  secondaryCta: "Découvrir le programme",
  keyFacts: [
    { label: "Durée", value: "2 ans (4 semestres)" },
    { label: "Niveau visé", value: "Bac+5 · Master Professionnel" },
    { label: "Campus", value: "Sousse (Akouda)" },
    { label: "Immersion", value: "Stage & Projet de fin d’études" },
  ],
} as const;

export const CANDIDATE_PROFILES: CandidateProfileItem[] = [
  {
    id: "jeunes-diplomes",
    badge: "Profil 01 · Jeunes diplômés",
    title: "Diplômé(e)s de Licence ou d’Ingénierie",
    description:
      "Vous êtes titulaire d’une Licence (Bac+3 ou équivalent) en gestion, économie, informatique, sciences ou d’un diplôme d’ingénieur, et souhaitez acquérir une spécialisation professionnalisante à forte valeur ajoutée sur le marché.",
    backgroundNote:
      "Idéal pour structurer une double compétence entre management stratégique et technologies numériques.",
  },
  {
    id: "futurs-entrepreneurs",
    badge: "Profil 02 · Entrepreneuriat & Startups",
    title: "Futurs entrepreneurs et intrapreneurs",
    description:
      "Vous souhaitez créer votre propre startup, rejoindre une jeune entreprise technologique en forte croissance ou lancer de nouvelles offres innovantes au sein d’une organisation existante.",
    backgroundNote:
      "Vous maîtriserez le Lean Startup, le financement de l’innovation, le droit et la fiscalité des startups.",
  },
  {
    id: "managers-innovation-ia",
    badge: "Profil 03 · Pilotage IA & Transformation",
    title: "Futurs chefs de projet et managers IA",
    description:
      "Vous voulez comprendre le potentiel concret de la Data Science, du Machine Learning et de l’IA pour piloter des équipes pluridisciplinaires et éclairer la prise de décision stratégique.",
    backgroundNote:
      "Conçu pour former des décideurs capables de dialoguer avec les équipes techniques sans être un cursus purement ingénieur.",
  },
];

export const ELIGIBILITY_CONDITIONS = {
  title: "Conditions d’accès académiques documentées",
  summary:
    "L’accès au Master Professionnel en Management des Startups et de l’Intelligence Artificielle s’adresse aux titulaires d’une Licence (Bac+3) ou d’un diplôme équivalent, ainsi qu’aux titulaires d’un diplôme d’ingénieur manifestant un intérêt marqué pour l’entrepreneuriat, les startups et l’intelligence artificielle.",
  m2DirectNote:
    "Une demande d’intégration en 2ème année (M2) peut être étudiée pour les titulaires d’une première année de Master (M1) ou Bac+4 compatible.",
  disclaimer:
    "Important : le dépôt d’une pré-candidature ne vaut pas admission automatique. L’éligibilité finale est déterminée par la commission d’admission d’ISSCA Business School après étude académique du dossier et entretien individuel.",
} as const;

export const CAREER_CLUSTERS: CareerClusterItem[] = [
  {
    id: "entrepreneuriat-startups",
    title: "Entrepreneuriat et Startups",
    subtitle: "Structurer, lancer et développer des produits et jeunes entreprises innovantes",
    accentColor: "red",
    roles: [
      {
        title: "Product Manager",
        description:
          "Définit la vision produit, priorise la feuille de route fonctionnelle et coordonne les équipes techniques, design et métiers autour des besoins utilisateurs.",
      },
      {
        title: "Team Leader en startup",
        description:
          "Encadre des équipes agiles pluridisciplinaires, structure les opérations quotidiennes et accompagne la montée en échelle (scaling) de la jeune entreprise.",
      },
      {
        title: "Business Developer",
        description:
          "Identifie les opportunités de croissance, construit les partenariats stratégiques et pilote la conquête de nouveaux marchés B2B ou B2C.",
      },
    ],
  },
  {
    id: "management-ia",
    title: "Management et Intelligence Artificielle",
    subtitle: "Traduire les capacités de la donnée et de l’IA en leviers de performance",
    accentColor: "blue",
    roles: [
      {
        title: "Consultant IA",
        description:
          "Accompagne les entreprises dans le diagnostic d’opportunités IA, le cadrage des cas d’usage, l’éthique des données et la conduite du changement.",
      },
      {
        title: "Business Manager IA et Data Science",
        description:
          "Fait le pont entre la direction générale et les équipes Data/IA pour aligner les modèles analytiques sur les objectifs de rentabilité et d’impact métier.",
      },
      {
        title: "Référent Manager IA",
        description:
          "Pilote l’adoption responsable des outils d’intelligence artificielle et des systèmes d’aide à la décision au sein des départements opérationnels.",
      },
    ],
  },
  {
    id: "business-leadership",
    title: "Business et Leadership",
    subtitle: "Développer les comptes clés et attirer les talents de l’économie numérique",
    accentColor: "navy",
    roles: [
      {
        title: "Account Manager",
        description:
          "Gère et développe un portefeuille de clients stratégiques dans le secteur technologique et digital en veillant à la création de valeur sur le long terme.",
      },
      {
        title: "Responsable RH en startup",
        description:
          "Structure la culture d’entreprise, accompagne l’organisation agile et déploie les pratiques RH adaptées aux environnements technologiques.",
      },
      {
        title: "Talent Acquisition Manager",
        description:
          "Pilote la stratégie d’attraction, d’évaluation et d’intégration des profils techniques, produits et managériaux recherchés par les entreprises innovantes.",
      },
    ],
  },
];

export const COMPETENCY_PILLARS: CompetencyPillarItem[] = [
  {
    id: "creer-developper",
    number: "01",
    title: "Créer et développer",
    subtitle: "De l’opportunité d’innovation à la croissance de la startup",
    description:
      "Maîtriser les méthodologies entrepreneuriales modernes pour concevoir une offre viable, sécuriser son cadre juridique et financier, et accélérer son déploiement commercial.",
    highlights: [
      "Management de l’innovation et approche Lean Startup",
      "Financement de l’innovation, droit et fiscalité des startups",
      "Marketing des startups, création et stratégies de croissance",
    ],
  },
  {
    id: "comprendre-exploiter-ia",
    number: "02",
    title: "Comprendre et exploiter l’IA",
    subtitle: "Des fondamentaux algorithmiques aux projets Data & IA",
    description:
      "Acquérir un socle méthodologique et technologique solide pour évaluer, cadrer et superviser des projets d’intelligence artificielle et d’analyse de données en entreprise.",
    highlights: [
      "Programmation, algorithmes et bases de données avancées",
      "Data Science, Machine Learning, Deep Learning et Projet IA",
      "Systèmes interactifs d’aide à la décision, cybersécurité et éthique de l’IA",
    ],
  },
  {
    id: "manager-decider",
    number: "03",
    title: "Manager et décider",
    subtitle: "Leadership stratégique, agilité et ouverture internationale",
    description:
      "Développer la posture de dirigeant capable de négocier, d’accompagner les transformations organisationnelles et d’évoluer dans un contexte d’affaires international.",
    highlights: [
      "Prise de décision stratégique et International Strategic Management",
      "Conduite du changement, GRH & nouvelles technologies, négociation",
      "Scrum Management (préparation à la certification) et communication internationale",
    ],
  },
];

export const ACADEMIC_JOURNEY: SemesterCurriculumItem[] = [
  {
    id: "semestre-1",
    semesterNumber: 1,
    yearLabel: "Master 1",
    title: "Semestre 1 — Fondamentaux du Management, de l’Innovation et du Numérique",
    subtitle: "Poser les bases stratégiques, économiques et algorithmiques",
    summary:
      "Ce premier semestre construit le socle commun indispensable : comprendre la dynamique des startups, maîtriser les principes de prise de décision stratégique, appréhender les systèmes d’information et s’initier à la logique algorithmique ainsi qu’aux enjeux de l’IA.",
    keyHighlights: [
      "Management de l’innovation, financement et économie numérique",
      "Programmation, algorithmes et histoire/enjeux de l’IA",
      "Décision stratégique, systèmes d’information et négociation",
    ],
    officialModules: [
      "Management de l’innovation et des startups",
      "Programmation et algorithmes",
      "Financement de l’innovation",
      "Histoire et enjeux de l’IA",
      "Introduction à l’économie numérique",
      "Management et prise de décision stratégique",
      "Management des SI",
      "Français des affaires",
      "Business english",
      "Techniques de négociation",
    ],
  },
  {
    id: "semestre-2",
    semesterNumber: 2,
    yearLabel: "Master 1",
    title: "Semestre 2 — Applications Managériales de l’IA et Méthodes Lean Startup",
    subtitle: "Déployer l’IA dans la gestion et sécuriser l’environnement numérique",
    summary:
      "Le second semestre approfondit l’application concrète de l’intelligence artificielle au management et l’approche Lean Startup. Il intègre la gouvernance des données (bases de données avancées, cybersécurité, droit et éthique de l’IA) ainsi que les systèmes interactifs d’aide à la décision.",
    keyHighlights: [
      "IA appliquée au management et systèmes d’aide à la décision",
      "Lean Startups, séminaires pratiques et stratégie internationale",
      "Cybersécurité, droit des startups/IA, responsabilité et éthique",
    ],
    officialModules: [
      "L’IA appliquée au management",
      "International strategic management",
      "Lean startups",
      "Séminaires startup et IA",
      "Droit des startups et de l’intelligence artificielle",
      "Cyber sécurité et protection des données",
      "IA : responsabilité et éthique",
      "Personal branding",
      "Anglais du numérique",
      "Base de données avancées",
      "Systèmes interactifs d’aide à la décision",
    ],
  },
  {
    id: "semestre-3",
    semesterNumber: 3,
    yearLabel: "Master 2",
    title: "Semestre 3 — Applications Avancées, Croissance et Pilotage Agile",
    subtitle: "Piloter la croissance, les projets Data/IA et la transformation",
    summary:
      "En deuxième année, l’accent est mis sur le passage à l’échelle des startups (création, marketing, fiscalité, GRH technologique) et la maîtrise des projets avancés en Data Science, Machine Learning et Deep Learning, complétés par la conduite du changement et le Scrum Management.",
    keyHighlights: [
      "Data Science, Machine Learning / Deep Learning et Projet IA",
      "Création, croissance, marketing et fiscalité des startups",
      "Conduite du changement et préparation au Scrum Management",
    ],
    officialModules: [
      "Création et croissance des startups",
      "GRH et nouvelles technologies",
      "Le marketing des startups",
      "Projet IA",
      "Conduite du changement",
      "Machine Learning / Deep Learning",
      "Data Science",
      "Scrum Management : Préparation à la certification",
      "Business communication in an international environment",
      "Fiscalité des startups",
      "Méthodologie de recherche et de rédaction du mémoire de fin d’études",
    ],
    footnote:
      "Note académique : le module « Scrum Management : Préparation à la certification » prépare méthodologiquement les étudiants aux référentiels agiles Scrum ; l’obtention d’une certification externe reste soumise au passage de l’examen officiel correspondant.",
  },
  {
    id: "semestre-4",
    semesterNumber: 4,
    yearLabel: "Master 2",
    title: "Semestre 4 — Immersion Professionnelle et Projet de Fin d’Études",
    subtitle: "Confronter ses compétences aux réalités du terrain en entreprise ou startup",
    summary:
      "Le dernier semestre est intégralement consacré à l’immersion professionnelle à travers un stage obligatoire de 4 à 6 mois et la réalisation du Projet de Fin d’Études (PFE), donnant lieu à la rédaction d’un mémoire appliqué et à une soutenance devant jury.",
    keyHighlights: [
      "Stage obligatoire en entreprise ou startup (4 à 6 mois)",
      "Résolution d’une problématique concrète de management, d’innovation ou d’IA",
      "Rédaction du mémoire de Master et soutenance devant jury académique et professionnel",
    ],
    officialModules: [
      "Stage et Projet de fin d’études (immersion de 4 à 6 mois)",
      "Rédaction et soutenance du mémoire de fin d’études",
    ],
  },
];

export const PEDAGOGY_FEATURES: PedagogyFeatureItem[] = [
  {
    id: "enseignants-experts",
    title: "Chercheurs universitaires et experts métiers",
    description:
      "Les enseignements associent la rigueur méthodologique d’enseignants-chercheurs permanents à l’expérience opérationnelle de professionnels, dirigeants et praticiens du numérique.",
    proofLabel: "Corps professoral mixte",
  },
  {
    id: "learning-by-doing",
    title: "Apprentissage par la pratique (« Learning by doing »)",
    description:
      "Ateliers de création de startup, projets IA appliqués, études de cas réels, classe inversée, visites de terrain et séminaires dédiés à l’innovation.",
    proofLabel: "Projets transversaux",
  },
  {
    id: "stages-immersion",
    title: "Stages en entreprise et Projet de Fin d’Études",
    description:
      "Un stage facultatif est encouragé dès la 1ère année (M1) pour affiner votre projet, suivi d’un stage obligatoire de 4 à 6 mois en 2ème année (M2) pour valider le diplôme.",
    proofLabel: "4 à 6 mois d’immersion M2",
  },
  {
    id: "reseau-partenaires",
    title: "Passerelles avec l’écosystème et les entreprises",
    description:
      "ISSCA accompagne les étudiants dans leur recherche de stage et facilite la mise en relation avec ses entreprises partenaires, pouvant ouvrir la voie à des opportunités de stage ou d’alternance selon les profils et les besoins des entreprises.",
    proofLabel: "Accompagnement carrière",
  },
];

export const VERIFIED_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "olfa-aloulou",
    quote:
      "À l’ISSCA Business School, nous plaçons l’étudiant au cœur d’une pédagogie active qui conjugue exigence académique, proximité humaine et ouverture directe sur les transformations du monde de l’entreprise.",
    author: "Dr Olfa Aloulou",
    role: "Docteur en Management · Enseignante permanente à ISSCA Business School",
    contextNote: "Témoignage institutionnel publié par ISSCA Business School",
  },
  {
    id: "zeineb-daly",
    quote:
      "Mon parcours en Master à l’ISSCA m’a permis de développer une vision concrète du terrain grâce à l’implication des enseignants, aux projets pratiques et à la qualité de l’encadrement tout au long de l’année.",
    author: "Zeineb Daly",
    role: "Étudiante en Master Professionnel à ISSCA Business School",
    contextNote: "Témoignage étudiant publié sur issca.tn",
  },
  {
    id: "mehdi-ben-zineb",
    quote:
      "L’accompagnement personnalisé et la dynamique du campus à Sousse créent un environnement motivant qui encourage l’initiative, le travail en équipe et la préparation concrète à la vie professionnelle.",
    author: "Mehdi Ben Zineb",
    role: "Étudiant à ISSCA Business School",
    contextNote: "Témoignage étudiant publié sur issca.tn",
  },
];

/**
 * Configurable financial and admission parameters.
 * Values reflect the official `/frais-detudes` schedule on `issca.tn` while explicitly
 * indicating that current-session program fees are confirmed by the admissions office.
 */
export const TUITION_AND_ADMISSIONS_CONFIG = {
  showIndicativePublishedRate: true,
  indicativeAnnualMasterFeeTnd: "7 100 DT / an",
  indicativeRegistrationFeeResidentTnd: "250 DT",
  indicativeRegistrationFeeInternationalEuros: "600 DT",
  feeVerificationDisclaimer:
    "Les montants ci-dessus correspondent au barème général des Masters publié par l’établissement à titre indicatif. Le tarif exact applicable à votre profil et à la session en cours vous est confirmé par écrit par le service des admissions lors de l’étude de votre dossier.",
  installmentPlan: [
    {
      tranche: "1ère tranche",
      timing: "À l’inscription définitive (après acceptation du dossier)",
    },
    {
      tranche: "2ème tranche",
      timing: "Au plus tard le 1er décembre",
    },
    {
      tranche: "3ème tranche",
      timing: "Au plus tard le 1er mars",
    },
  ],
  paymentAdvantages: [
    "Réduction de 6 % accordée en cas de paiement annuel au comptant lors de l’inscription.",
    "Possibilité d’étudier un échéancier mensuel selon les modalités administratives de l’établissement.",
    "Les frais d’inscription ne sont exigibles qu’une fois la candidature officiellement acceptée.",
  ],
  acceptedPaymentMethods: [
    "Espèces auprès du service financier du campus",
    'Chèque bancaire libellé à l’ordre de : EC.SUP.PRIVEE SCES COML.& ADM. "ISSCA-SA"',
    "Virement bancaire (Banque de Tunisie — Agence Akouda)",
  ],
  admissionSteps: [
    {
      stepNumber: "01",
      title: "Pré-candidature en ligne",
      description:
        "Complétez le formulaire de pré-candidature sur cette plateforme en 2 minutes. Aucun document PDF ni paiement n’est requis à cette étape.",
    },
    {
      stepNumber: "02",
      title: "Étude académique du dossier",
      description:
        "Un conseiller aux admissions vous contacte pour vérifier votre éligibilité et réunir les pièces justificatives de votre dossier.",
    },
    {
      stepNumber: "03",
      title: "Entretien et confirmation d’inscription",
      description:
        "Après validation par la commission et entretien de motivation, vous recevez votre décision d’admission pour finaliser votre inscription avant le 28 novembre 2026.",
    },
  ],
  requiredDossierDocuments: [
    "Copie du diplôme du Baccalauréat",
    "Copie du relevé de notes du Baccalauréat",
    "Copie du diplôme de Licence (Bac+3), d’Ingénieur ou diplôme équivalent",
    "Copie des relevés de notes des trois dernières années d’études supérieures",
    "Copie de la Carte d’Identité Nationale (CIN) ou du Passeport",
    "1 photo d’identité récente",
  ],
} as const;

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "eligibilite-diplomes",
    category: "Éligibilité",
    question: "Quels sont les diplômes requis pour candidater à ce Master ?",
    answer:
      "Le Master est ouvert aux titulaires d’une Licence (Bac+3) ou d’un diplôme reconnu équivalent (en gestion, management, économie, informatique, sciences ou disciplines connexes) ainsi qu’aux titulaires d’un diplôme d’ingénieur souhaitant développer une compétence managériale en startups et intelligence artificielle. Une admission en 2ème année (M2) peut être étudiée pour les titulaires d’un M1 compatible. Chaque candidature fait l’objet d’une étude de dossier et d’un entretien par la commission d’admission d’ISSCA.",
  },
  {
    id: "prerequis-programmation-ia",
    category: "Programme & IA",
    question: "Faut-il déjà savoir programmer ou être ingénieur en IA pour suivre la formation ?",
    answer:
      "Non. Ce diplôme est un Master Professionnel orienté management, stratégie d’entreprise et pilotage de l’innovation, et non un cursus purement technique d’ingénierie logicielle. Le Semestre 1 inclut un module de remise à niveau et de structuration (« Programmation et algorithmes », « Histoire et enjeux de l’IA ») afin de permettre à tous les étudiants — qu’ils viennent d’une filière gestion ou scientifique — de comprendre et piloter efficacement les projets Data Science et Machine Learning.",
  },
  {
    id: "date-limite-28-novembre",
    category: "Admission & Délais",
    question: "Quelle est la date limite d’inscription pour la session actuelle ?",
    answer:
      "La clôture officielle des inscriptions est fixée au 28 novembre 2026 (heure de Tunis). Comme l’admission définitive nécessite l’étude de vos pièces académiques et un entretien individuel avant cette échéance, il est vivement recommandé d’envoyer votre pré-candidature en ligne dès maintenant pour permettre au service des admissions de traiter votre dossier à temps.",
  },
  {
    id: "reconnaissance-agrement",
    category: "Éligibilité",
    question: "Quel est le statut institutionnel d’ISSCA Business School ?",
    answer:
      "ISSCA Business School (Institut Supérieur Privé des Sciences Commerciales et des Affaires), fondé en 2018 à Sousse, est un établissement privé d’enseignement supérieur officiellement autorisé par le Ministère de l’Enseignement Supérieur et de la Recherche Scientifique Tunisien sous le numéro d’agrément n° 01/2018. Le service des admissions se tient à votre disposition pour vous présenter en détail le cadre réglementaire du diplôme.",
  },
  {
    id: "stage-et-alternance",
    category: "Programme & IA",
    question: "Comment s’organisent les stages et l’insertion en entreprise ?",
    answer:
      "La pédagogie repose sur l’apprentissage par l’action (« Learning by doing »). En 1ère année (M1), un stage d’immersion est recommandé. En 2ème année (M2), le Semestre 4 est entièrement dédié à un stage obligatoire de 4 à 6 mois en entreprise ou en startup, donnant lieu à la rédaction et à la soutenance d’un Projet de Fin d’Études (PFE). ISSCA mobilise son réseau d’entreprises partenaires pour accompagner les étudiants vers des opportunités de stage ou d’alternance, selon les profils et les besoins des entreprises d’accueil.",
  },
  {
    id: "certification-scrum",
    category: "Programme & IA",
    question: "La certification Scrum est-elle incluse dans le programme ?",
    answer:
      "Le Semestre 3 (Master 2) intègre le module officiel « Scrum Management : Préparation à la certification ». Ce cours vous forme de manière approfondie aux méthodes agiles et vous prépare méthodologiquement aux examens Scrum. La délivrance d’un titre de certification externe reste conditionnée à la réussite de l’examen auprès de l’organisme certificateur.",
  },
  {
    id: "frais-et-facilités-paiement",
    category: "Frais & Modalités",
    question: "Quels sont les frais d’études et les modalités de règlement ?",
    answer:
      "Sur la base du barème général des Masters publié par l’ISSCA, les frais annuels s’élèvent à titre indicatif à 7 100 DT / an (plus 250 DT de frais d’inscription pour les résidents, exigibles uniquement après acceptation du dossier). Le règlement peut s’effectuer en 3 tranches (à l’inscription, au 1er décembre et au 1er mars), avec une remise de 6 % pour un paiement annuel au comptant, ou selon un échéancier mensuel à étudier avec l’administration. Le conseiller aux admissions vous confirmera le barème exact applicable à votre dossier.",
  },
  {
    id: "rythme-et-emploi-du-temps",
    category: "Programme & IA",
    question: "Quel est le rythme des cours sur le campus de Sousse ?",
    answer:
      "Les cours se déroulent en présentiel sur le campus d’ISSCA Business School à Akouda (Sousse), répartis sur 4 semestres (2 années universitaires). Ils combinent cours magistraux interactifs, séminaires Startups & IA, travaux dirigés en petits groupes et projets pratiques. Si vous êtes salarié(e) ou entrepreneur en activité, précisez-le dans votre pré-candidature afin que le conseiller vous détaille l’organisation hebdomadaire des enseignements.",
  },
  {
    id: "documents-pre-candidature",
    category: "Admission & Délais",
    question: "Dois-je scanner tous mes diplômes dès aujourd’hui pour remplir le formulaire ?",
    answer:
      "Non. La pré-candidature sur join.issca.tn est conçue pour être complétée en 2 minutes sans téléversement de fichiers. Une fois votre pré-candidature reçue, un conseiller vous contactera pour planifier votre entretien et vous indiquer comment transmettre vos pièces justificatives (diplômes, relevés de notes, CIN/passeport, photo).",
  },
];
