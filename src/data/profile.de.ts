/**
 * German versions of the CV fields that appear on the site. Keyed by the same
 * ids as data/nidhi-patel.json so a missing override is visible in review;
 * names, companies and dates are never translated.
 */
export const experienceDe: Record<
  string,
  {
    role: string;
    location: string;
    employmentType: string;
    domain: string;
    summaryForPortfolio: string;
    highlights: string[];
    portfolioSummary: string;
    portfolioHighlights: string[];
  }
> = {
  'miles-and-more': {
    role: 'Praktikum Data Analytics – Marketing, Strategie & Customer Insights',
    location: 'Frankfurt am Main, Deutschland',
    employmentType: 'Praktikum',
    domain: 'Loyalty / Luftfahrt / Customer Analytics',
    summaryForPortfolio:
      'Kundenlebenszyklus, Segmentierung, Churn- und Preisanalysen auf Azure Databricks, mit Tableau-KPI-Reporting für Marketing- und Strategie-Stakeholder.',
    highlights: [
      'Vertriebs-, Kunden- und Marktdaten analysieren, um Kundenmuster, Geschäftschancen und Performance-Treiber zu erkennen.',
      'Customer-Journey- und Lifecycle-Analysen durchführen, um Engagement-, Bindungs- und Churn-Muster über Kundensegmente hinweg zu verstehen.',
      'Kundensegmentierung, Churn-Analyse, Preisanalysen und A/B-Tests anwenden und Befunde in Optimierungspotenziale übersetzen.',
    ],
    portfolioSummary:
      'Ein Praktikum im Marketing-, Strategie- und Customer-Insights-Team eines Loyalty-Programms, in dem die Analysen Kunden- und Geschäftsentscheidungen stützen.',
    portfolioHighlights: [
      'Segmentierungs-, Churn- und Preisanalysen sowie A/B-Tests durchführen und die Befunde in Optimierungspotenziale übersetzen.',
      'Tableau-KPI-Dashboards und Analysereports für operative und strategische Entscheidungen entwickeln.',
      'Die Omnichannel-Pipelines betreuen, über die Angebote zu Kunden gelangen, und modellfähige Daten auf Azure Databricks aufbereiten.',
    ],
  },
  'barkow-consulting': {
    role: 'Junior Research Analyst / Data Scientist',
    location: 'Düsseldorf, Deutschland',
    employmentType: 'Werkstudent, später Vollzeit',
    domain: 'Beratung / Geodaten & Finanzdaten',
    summaryForPortfolio:
      'Python-ETL-Pipelines und wiederverwendbare Datenmodelle über große Geodaten- und Finanzdatensätze, dazu ML-Frameworks für die regionale Anomalieerkennung im Bargeldzugang.',
    highlights: [
      'Python-basierte ETL-Pipelines aufbauen und pflegen, um große Geodaten- und Finanzdaten aus mehreren Quellen zu sammeln, zu bereinigen, zu transformieren und zu integrieren.',
      'Automatisierte Datenverarbeitungs-Workflows und wiederverwendbare Datenmodelle entwerfen, die Datenqualität, Konsistenz und Analysebereitschaft verbessern.',
      'Machine-Learning-Frameworks für die regionale Anomalieerkennung im Bargeldzugang entwerfen und anwenden und Modellausgaben in umsetzbare Geschäftsempfehlungen übersetzen.',
    ],
    portfolioSummary:
      'Eine Werkstudentenstelle, die in eine Vollzeitstelle überging, mit dem Aufbau der Datenbasis eines Beratungs- und Forschungsteams.',
    portfolioHighlights: [
      'Python-ETL-Pipelines gebaut, die große Geodaten- und Finanzdatensätze aus mehreren Quellen integriert haben.',
      'Automatisierte Datenverarbeitungs-Workflows und wiederverwendbare Datenmodelle entworfen, die Datenqualität, Konsistenz und Analysebereitschaft verbessert haben.',
      'Machine-Learning-Frameworks auf regionale Bargeldzugangs-Anomalien angewendet und die Ergebnisse in Geschäftsempfehlungen übersetzt.',
    ],
  },
  vonovia: {
    role: 'Data Scientist / Data Analyst',
    location: 'Bochum, Deutschland',
    employmentType: 'Werkstudent',
    domain: 'Immobilienwirtschaft',
    summaryForPortfolio:
      'Kunden- und Marktanalysen in Python/SQL sowie Tableau-, Power-BI- und Python-Dashboards zur Performance-Überwachung und für Wachstumschancen.',
    highlights: [
      'Kunden-, Markt- und Geschäftsanalysen mit Python und SQL durchführen, um Geschäftsentscheidungen zu stützen.',
      'Tableau-, Power-BI- und Python-Dashboards entwickeln, um Performance zu überwachen und Wachstumschancen zu erkennen.',
      'Große Datensätze aufbereiten und transformieren, um Datenqualität und analytische Effizienz zu verbessern.',
    ],
    portfolioSummary: 'Ein Jahr als Werkstudentin im Analytics-Team eines Wohnungsunternehmens.',
    portfolioHighlights: [
      'Tableau-, Power-BI- und Python-Dashboards entwickelt, die Performance verfolgt und Wachstumschancen aufgezeigt haben.',
      'Große Datensätze aufbereitet und transformiert, um Datenqualität und Analyseeffizienz zu verbessern.',
      'Python- und SQL-Analysen von Kunden und Märkten durchgeführt, um Geschäftsentscheidungen zu stützen.',
    ],
  },
  amprion: {
    role: 'Data Science / Datenanalyse',
    location: 'Dortmund, Deutschland',
    employmentType: 'Werkstudent',
    domain: 'Energie / Handel',
    summaryForPortfolio:
      'Zeitreihenprognosen europäischer Kraftstoffpreise für Handelsanwendungen und eine eigene Power-BI-Kartenvisualisierung für Marktdaten.',
    highlights: [
      'Zeitreihenprognosen europäischer Kraftstoffpreise für Handelsanwendungen mit statistischen, Machine-Learning- und Deep-Learning-Modellen durchführen.',
      'Modellausgaben in entscheidungsunterstützende Erkenntnisse übersetzen; eine angepasste Power-BI-Kartenvisualisierung für Marktdaten entwickeln.',
    ],
    portfolioSummary:
      'Ein sechsmonatiges Werkstudentenpraktikum im Datenteam eines Energieunternehmens, dessen Prognosen in Handelsanwendungen einflossen.',
    portfolioHighlights: [
      'Europäische Kraftstoffpreise mit statistischen, Machine-Learning- und Deep-Learning-Methoden als Zeitreihen modelliert.',
      'Modellausgaben in entscheidungsunterstützende Erkenntnisse übersetzt statt als Rohwerte belassen.',
      'Eine angepasste Power-BI-Kartenvisualisierung für Marktdaten erstellt.',
    ],
  },
};

export const educationDe: Record<
  string,
  { institution: string; location: string; durationDisplay: string; details: string[] }
> = {
  'msc-data-science': {
    institution: 'Technische Universität Dortmund',
    location: 'Dortmund, Deutschland',
    durationDisplay: '10/2020 – 12/2026 (voraussichtlich)',
    details: ['Alle Studienleistungen abgeschlossen; die Verleihung des Grades steht nach der abschließenden Credit-Anmeldung aus.'],
  },
  'be-computer-engineering': {
    institution: 'Gujarat Technological University',
    location: 'Ahmedabad, Indien',
    durationDisplay: '07/2015 – 05/2019',
    details: [],
  },
};

/**
 * Levels are the words that appear in the parenthetical, so German keeps its
 * own casing: adjectives lowercase, "Muttersprache" as a noun.
 */
export const languagesDe: Record<string, { language: string; level: string }> = {
  English: { language: 'Englisch', level: 'verhandlungssicher' },
  German: { language: 'Deutsch', level: 'fortgeschritten' },
  Gujarati: { language: 'Gujarati', level: 'Muttersprache' },
  Hindi: { language: 'Hindi', level: 'Muttersprache' },
};

/** Skill names that are concepts rather than product names. */
export const skillNamesDe: Record<string, string> = {
  'Predictive Modelling': 'Prädiktive Modellierung',
  'Anomaly Detection': 'Anomalieerkennung',
  'Time-Series Forecasting': 'Zeitreihenprognose',
  'Statistical Modelling': 'Statistische Modellierung',
  'Geospatial Data': 'Geodaten',
  'Feature Engineering': 'Feature Engineering',
  'A/B Testing': 'A/B-Testing',
  'Hypothesis Testing': 'Hypothesentests',
  'Explainable AI (SHAP)': 'Explainable AI (SHAP)',
  'Multi-Agent Systems': 'Multi-Agenten-Systeme',
  'Tool Calling': 'Tool Calling',
  'Prompt Engineering': 'Prompt Engineering',
  'Vector Databases (FAISS)': 'Vektordatenbanken (FAISS)',
  'Input/Output Validation': 'Ein-/Ausgabe-Validierung',
  'Human-in-the-Loop Workflows': 'Human-in-the-Loop-Workflows',
  'LLM Monitoring & Observability': 'LLM-Monitoring & Observability',
  'Model Deployment': 'Modell-Deployment',
  'Workflow Automation': 'Workflow-Automatisierung',
  'Medallion Architecture': 'Medallion-Architektur',
  'ETL Pipelines': 'ETL-Pipelines',
  'Data Modelling': 'Datenmodellierung',
  'Data Validation': 'Datenvalidierung',
  'Data Quality': 'Datenqualität',
  'Python (pandas, NumPy)': 'Python (pandas, NumPy)',
  'Power BI': 'Power BI',
};

export const familiesDe: { name: string; short: string }[] = [
  { name: 'Data Science & ML', short: 'Data & ML' },
  { name: 'Generative AI & LLM Engineering', short: 'GenAI & LLM' },
  { name: 'MLOps & Deployment', short: 'MLOps' },
  { name: 'Cloud & Data Engineering', short: 'Cloud & Data' },
  { name: 'Programmierung & Datenbanken', short: 'Programmierung' },
  { name: 'BI & Visualisierung', short: 'BI & Visual' },
];
