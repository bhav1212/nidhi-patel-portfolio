import type { Copy } from './en';

/**
 * German copy. Same keys as `en.ts`; the `Copy` type makes a missing or
 * renamed string a build error rather than an English string on a German page.
 */
export const de: Copy = {
  code: 'de',
  htmlLang: 'de',
  ogLocale: 'de_DE',
  other: 'en',

  meta: {
    homeTitle: 'Nidhi Patel — AI Engineer und Data Scientist, Frankfurt am Main',
    homeDescription:
      'AI Engineer und Data Scientist in Frankfurt: LLM-, RAG- und ML-Systeme sowie die Azure-Databricks-Pipelines dahinter. Vier Jahre, vier Organisationen.',
    ogImageAlt: 'Nidhi Patel — AI Engineer und Data Scientist, Frankfurt',
    titleSuffix: 'Nidhi Patel',
  },

  nav: {
    work: 'Projekte',
    experience: 'Erfahrung',
    skills: 'Skills',
    about: 'Über mich',
    contact: 'Kontakt',
    menu: 'Menü umschalten',
    cv: 'CV als PDF herunterladen',
    themeToLight: 'Zum hellen Design wechseln',
    themeToDark: 'Zum dunklen Design wechseln',
    themeGeneric: 'Design wechseln',
    langSwitch: 'Read this page in English',
    langLabel: 'Sprache',
    home: 'Nidhi Patel — Startseite',
    skip: 'Zum Inhalt springen',
    primary: 'Hauptnavigation',
    toTop: 'Nach oben',
  },

  hero: {
    eyebrow: 'Frankfurt · offen für Rollen als AI Engineer, ML Engineer und Data Scientist',
    title1: 'Ich baue',
    words: ['KI-Systeme', 'RAG-Pipelines', 'Prognosemodelle', 'Datenpipelines'],
    // German needs a comma before a relative clause, which reads badly after a
    // line break — so the slogan takes an apposition instead.
    title2: 'für den Betrieb, nicht für die Demo.',
    leadBefore:
      'Vier Jahre als Werkstudentin, in Vollzeit und im Praktikum in Deutschland — an Machine-Learning-, Retrieval- und LLM-Systemen und an den Azure-Databricks-Pipelines hinter Customer Analytics. Aktuell bin ich bei ',
    leadLink: 'Miles & More',
    leadAfter: ', Lufthansa Group.',
    ctaWork: 'Projekte ansehen',
    ctaCv: 'CV herunterladen',
    basedIn: 'Standort',
    basedInValue: 'Frankfurt am Main · umzugsbereit',
    currently: 'Aktuell',
    focus: 'Schwerpunkt',
    focusValue: 'ML · LLM und RAG · Azure Databricks',
    languages: 'Sprachen',
    languagesValue: 'Englisch fließend · Deutsch fortgeschritten',
    strap: 'Nidhi Patel · AI Engineer · Nidhi Patel · AI Engineer',
    idTop: 'Profil-ID',
    cardLabel: 'Nidhi Patel — Profilkarte',
    cardTitle: 'Karte drehen',
    idRole: 'AI Engineer & Data Scientist',
    fieldBasedIn: 'Standort',
    fieldBasedInValue: 'Frankfurt am Main',
    fieldCurrently: 'Aktuell',
    fieldCurrentlyValue: 'Miles & More · Lufthansa Group',
    fieldDegree: 'Abschluss',
    fieldDegreeValue: 'M.Sc. Data Science · voraussichtlich 2026',
    // The card back is proof, not a second pitch: these four lines are the
    // only place the portfolio states them.
    backItems: [
      'Über 75.000 Bargeldstandorte, zu einer geprüften Datenbank bereinigt',
      'Drei Azure-Databricks-Zertifizierungen, jede überprüfbar',
      'Ein RAG-Service in Docker, in der CI gebaut und gescannt',
      'M.Sc. Data Science, TU Dortmund (laufend)',
    ],
    found: 'Wenn gefunden, bitte melden —',
    cardHint: 'Zum Drehen tippen',
    techLabel: 'Technologie-Stack',
    techAria: 'Technologie-Stack, automatisch laufend. Fokus pausiert.',
  },

  work: {
    eyebrow: 'Ausgewählte Projekte',
    heading: 'Die Technik hinter jedem Projekt.',
    intro:
      'Drei Projekte, jedes gebaut, um eine Frage zu beantworten — nicht, um ein Framework vorzuführen.',
    medbotTag: 'Persönliches Projekt · RAG',
    medbotBody:
      'Retrieval-augmentierte Fragenbeantwortung über Dokumente, die Nutzer bereitstellen — mit LangChain und einem FAISS-Index hinter einer Flask-API.',
    medbotStats: [
      ['FAISS', 'Vektorsuche'],
      ['Jenkins', 'Build und Deployment'],
      ['Trivy', 'Image-Scan in der CI'],
    ],
    agentTag: 'Persönliches Projekt · LLM-Agent',
    agentBody:
      'Der Agent nimmt eine Frage entgegen, entscheidet, welche Tools er aufruft, holt Zahlen aus Live-Daten und liefert eine strukturierte Investmentanalyse.',
    agentOutcomeLabel: 'Verankerte Ausgabe',
    agentOutcome:
      ' aus Tool-Aufrufen und abgerufenen Dokumenten, zurückgegeben als strukturiertes JSON.',
    thesisTag: 'Masterarbeit',
    thesisHeading: 'Kontextuelle Anomalieerkennung',
    thesisBody:
      'Ein Anomalie-Modell, das jede deutsche Region daran misst, was ihr eigener Kontext erwarten lässt, und dann die regionalen Faktoren hinter jeder Auffälligkeit benennt.',
    thesisOutcomeBefore: 'Mögliche Unterversorgung in ',
    thesisOutcomeStrong: 'Thüringen, Brandenburg und Rheinland-Pfalz',
    thesisOutcomeAfter: '.',
    credsTag: 'Zertifikate',
    credsHeading: 'Zertifiziert für Azure Databricks',
    credsBody:
      'Die Platform-Architect-Zertifizierung sowie Generative AI Fundamentals und Data Engineering. Jede davon ist überprüfbar.',
    credsLink: 'Zertifikate und IDs ansehen →',
    readCase: 'Fallstudie lesen',
  },

  record: {
    eyebrow: 'Bilanz',
    heading: 'Die Bilanz in Zahlen.',
    stats: [
      { num: 4, suffix: '+', label: 'Jahre in Data Science', sub: 'Analytics, ML und Datenpipelines.' },
      { num: 4, suffix: '', label: 'Deutsche Organisationen', sub: 'Luftfahrt · Beratung · Wohnen · Energie' },
      { num: 3, suffix: '', label: 'Databricks-Zertifizierungen', sub: 'Azure · Data Engineering · GenAI' },
      { num: 60, suffix: '', label: 'Tools und Methoden', sub: 'Von pandas bis Power BI' },
    ],
  },

  experience: {
    eyebrow: 'Berufserfahrung',
    heading: 'Vier Stationen in Analytics und Data Science.',
    intro:
      'Miles & More für Customer Analytics, Barkow Consulting für Datenpipelines und Anomalieerkennung, davor Stationen in Wohnungswirtschaft und Energie.',
    present: 'Heute',
  },

  education: {
    eyebrow: 'Ausbildung',
    heading: 'Die Abschlüsse hinter der Arbeit.',
    intro:
      'Erst Computer Engineering, jetzt Data Science — das Modellieren und das Data Engineering in diesem Portfolio kommen aus beidem.',
    inProgress: 'Laufend',
    completed: 'Abgeschlossen',
  },

  credentials: {
    eyebrow: 'Zertifizierungen',
    heading: 'Bei Databricks verifiziert.',
    intro: 'Jede Zertifizierung verlinkt auf eine Databricks-Verifizierungsseite.',
    credentialId: 'Zertifikats-ID',
    verify: 'Verifizieren →',
  },

  skills: {
    eyebrow: 'Skills',
    heading: 'Sechzig Tools in sechs Bereichen.',
    intro:
      'Gruppiert nach Einsatz: Modellierung, LLM-Arbeit, Deployment, Data Engineering, Programmierung und BI.',
    filterAria: 'Skills nach Bereich filtern',
    gridAria: 'Skill-Elemente',
    all: 'Alle Elemente',
    focusLabel: 'Element im Fokus',
    where: 'Wo es zum Einsatz kommt',
    hint: 'Element überfahren, fokussieren oder antippen',
    elementsOne: 'Element',
    elementsMany: 'Elemente',
  },

  about: {
    eyebrow: 'Über mich',
    heading: 'Wie ich hierher kam und wie ich arbeite.',
    paragraphs: [
      'Ich bin AI Engineer und Data Scientist in Frankfurt am Main. Meine Arbeit beginnt bei Entscheidungen, die jemand treffen muss — Churn und Kundensegmente, regionaler Bargeldzugang, eine Investmentfrage in Alltagssprache — und endet in einem Modell oder einer Pipeline, die sie stützt.',
      'Ich arbeite zwischen einem Team, das eine Frage hat, und Daten, die sie nicht direkt beantworten. Bei **Miles & More** führt der Weg über Vertriebs-, Kunden- und Marktdaten auf Azure Databricks und endet in Tableau-Reports für Marketing und Strategie. Bei **Barkow Consulting** begann er mit dem Python-ETL über Geodaten und Finanzdaten und dann mit den Modellen darauf.',
      'Mich interessiert der Teil nach dem Modell: eine Pipeline, die läuft, Ausgaben, die sich erklären lassen, ein Service, den die nächste Person übernehmen kann. Die Projekte hier enden in Containern, Pipelines und strukturierten Ausgaben.',
    ],
    facts: {
      languages: 'Sprachen',
      elsewhere: 'Links',
    },
  },

  contact: {
    eyebrow: 'Kontakt',
    heading: 'Erzählen Sie mir von der Stelle.',
    body:
      'Ich suche eine Rolle als AI Engineer, Machine Learning Engineer oder Data Scientist — in Frankfurt oder anderswo im DACH-Raum. Wenn Sie einstellen oder über Retrieval, Evaluation oder Databricks sprechen möchten: E-Mail ist am besten.',
    email: 'E-Mail schreiben',
    linkedin: 'Nachricht auf LinkedIn',
    cv: 'CV herunterladen',
    city: 'Frankfurt am Main, Deutschland',
    relocation: 'Umzugsbereit',
  },

  footer: {
    label: 'Fußzeile',
    resume: 'Lebenslauf',
    email: 'E-Mail',
    privacy: 'Datenschutz',
  },

  caseStudy: {
    back: 'Alle Projekte',
    linksHeading: 'Projektlinks',
    moreWork: 'Weitere Projekte',
    notFoundTitle: 'Fallstudie nicht gefunden',
  },

  privacy: {
    metaTitle: 'Datenschutz — Nidhi Patel',
    metaDescription:
      'Wie diese Website mit Daten umgeht: keine Cookies, keine Analyse, keine Anfragen an Dritte, kein Tracking und selbst gehostete Schriften.',
    kicker: 'Datenschutzerklärung',
    title: 'Datenschutz',
    sections: [
      {
        heading: 'Kurz gesagt',
        body:
          'Dies ist eine statische Website. Sie setzt keine Cookies, führt keine Analyse durch und lädt nichts von Dritten. Die Schriften liegen auf demselben Server wie die Seiten. Abgesehen von den unten beschriebenen technischen Server-Logs werden nur die personenbezogenen Daten verarbeitet, die Sie selbst per E-Mail senden.',
      },
      {
        heading: 'Verantwortlich',
        body: 'Nidhi Patel, Frankfurt am Main, Deutschland. Kontakt:',
      },
      {
        heading: 'Server-Logs',
        body:
          'Beim Aufruf einer Seite verarbeitet der Hosting-Anbieter technische Anfragedaten (IP-Adresse, Uhrzeit, angefragte Datei, Browsertyp), um die Seite auszuliefern und den Dienst abzusichern. Das ist für den Betrieb der Website nach Art. 6 Abs. 1 lit. f DSGVO erforderlich. Die Logs werden nur so lange gespeichert, wie der Anbieter sie für die Sicherheit benötigt, und nicht mit anderen Daten zusammengeführt oder zur Identifizierung von Besuchern genutzt.',
      },
      {
        heading: 'Cookies und lokaler Speicher',
        body:
          'Es werden keine Cookies gesetzt. Die Website speichert eine Einstellung im lokalen Speicher Ihres Browsers: das helle oder dunkle Design. Sie verlässt Ihr Gerät nicht und ist mit keiner Kennung verknüpft.',
      },
      {
        heading: 'Externe Links',
        body:
          'Links zu LinkedIn, GitHub und anderen Seiten sind gewöhnliche Links. Von diesen Seiten wird nichts geladen, bis Sie einen davon anklicken; dann gelten deren eigene Datenschutzbestimmungen.',
      },
      {
        heading: 'E-Mail',
        body:
          'Wenn Sie an die oben genannte Adresse schreiben, werden Ihre Nachricht und Ihre Adresse nur verwendet, um Ihnen zu antworten. Sie werden nicht weitergegeben, in keinen Verteiler aufgenommen und für nichts anderes genutzt.',
      },
      {
        heading: 'Ihre Rechte',
        body:
          'Nach der DSGVO können Sie Auskunft, Berichtigung oder Löschung der zu Ihnen gespeicherten personenbezogenen Daten verlangen und der Verarbeitung widersprechen. Schreiben Sie an die oben genannte Adresse. Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, etwa bei der für Frankfurt am Main zuständigen.',
      },
    ],
    updated: 'Stand: November 2026.',
    responsibleSuffix: '.',
  },

  notFound: {
    metaTitle: 'Seite nicht gefunden — Nidhi Patel',
    metaDescription: 'Diese Seite existiert nicht. Zurück zur Startseite des Portfolios.',
    title: 'Diese Seite gibt es nicht.',
    body: 'Der Link ist vielleicht veraltet, oder die Adresse enthält einen Tippfehler.',
    home: 'Zur Startseite',
    work: 'Projekte ansehen',
  },
};
