/**
 * French typographic micro-rules utility.
 * Replaces straight apostrophes with curly apostrophes, inserts narrow non-breaking spaces
 * (\u202F) before high punctuation (; : ! ?) and inside guillemets (« »), and inserts
 * non-breaking spaces (\u00A0) before common units (DT, ans, mois, semestres, %, n°).
 */
export function formatFrench(text: string): string {
  if (!text) return "";

  return text
    .replace(/(\w)'(\w)/g, "$1’$2")
    .replace(/\s+([;:!?])/g, "\u202F$1")
    .replace(/«\s+/g, "«\u202F")
    .replace(/\s+»/g, "\u202F»")
    .replace(/(\d)\s+(DT|TND|ans|an|mois|semestres|h|%)/g, "$1\u00A0$2")
    .replace(/\b(n°)\s+(\d)/gi, "$1\u00A0$2");
}
