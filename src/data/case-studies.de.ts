import type { CaseStudy } from './case-studies';

/**
 * German case studies. Same slugs and section order as `case-studies.ts`;
 * every sentence is a translation of the approved English copy — nothing is
 * added, dropped or re-scoped.
 */
export const caseStudiesDe: CaseStudy[] = [
  {
    slug: 'medbot',
    projectId: 'medbot',
    name: 'MedBot',
    subtitle: 'Containerisierte RAG-Anwendung mit CI/CD',
    dek: 'Ein Frage-Antwort-Service für Dokumente: Retrieval über einen Vektorindex, ein Flask-Backend, ein Container-Image und eine Jenkins-Pipeline, die das Image vor der Auslieferung prüft.',
    metaDescription:
      'MedBot: ein containerisierter RAG-Service über eigene Dokumente — LangChain, FAISS, Flask, Docker und eine Jenkins-Pipeline, die das Image prüft.',
    role: 'Persönliches Projekt',
    period: '2026',
    stack: ['LangChain', 'FAISS', 'LLM APIs', 'Flask', 'Docker', 'Jenkins', 'Trivy'],
    links: [],
    facts: [
      { label: 'Typ', value: 'Retrieval-augmentierte Generierung' },
      { label: 'Oberfläche', value: 'Flask-API + HTML/CSS-Frontend' },
      { label: 'Auslieferung', value: 'Docker-Image, Jenkins-Pipeline' },
      { label: 'Sicherheit', value: 'Trivy-Container-Scan' },
    ],
    sections: [
      {
        heading: 'Warum eine überzeugende Antwort eine Quelle braucht',
        paragraphs: [
          'Ein Allzweck-Sprachmodell beantwortet eine Frage zu einem Dokument mit derselben Sicherheit, egal ob das Dokument im Kontext liegt oder nicht. Bei dokumentbasierten Fragen ist dieses Verhalten falsch. Nützlich ist eine Antwort, die aus dem Material gebaut ist, das der Nutzer tatsächlich bereitgestellt hat.',
          'Das zweite Problem ist die Auslieferung. Eine Retrieval-Pipeline, die nur im Notebook läuft, ist eine Demonstration, kein Service. Die Anwendung brauchte einen Request-Pfad, ein deploybares Artefakt und einen wiederholbaren Weg vom Commit zum laufenden Container.',
        ],
      },
      {
        heading: 'Was ich gebaut habe',
        paragraphs: [
          'MedBot ist ein Retrieval-Service und kein Prompt: Dokumente werden zerlegt und über LangChain in einen FAISS-Index eingebettet, eine Anfrage wird eingebettet und gegen den Index abgeglichen, und die gefundenen Passagen gehen als Belegkontext an das Sprachmodell. Die Designentscheidung liegt an der Grenze zwischen Retrieval und Generierung: Was der Index zurückgibt, ist das, woraus das Modell antwortet.',
        ],
        bullets: [
          'Retrieval-Schicht: LangChain-Orchestrierung über einen FAISS-Vektorindex.',
          'Service-Schicht: ein Flask-Backend mit HTML/CSS-Frontend.',
          'Packaging: Die gesamte Anwendung wird als Docker-Image ausgeliefert, gebaut in der Jenkins-Pipeline.',
          'Auslieferung: Eine Jenkins-Pipeline automatisiert Tests, Container-Builds und den Deployment-Workflow.',
          'Sicherheit: Trivy scannt das Container-Image innerhalb der Pipeline auf bekannte Schwachstellen.',
        ],
      },
      {
        heading: 'Vom Commit zum laufenden Container',
        paragraphs: [
          'Die technische Frage ist, was danach passiert: Lässt sich derselbe Build reproduzieren, blockiert ein Basis-Image mit Schwachstellen ein Release, und lässt sich der Service ohne manuelle Checkliste neu deployen?',
          'Bei jedem Build führt die Jenkins-Pipeline die Tests aus und baut das Docker-Image. Trivy scannt dieses Image anschließend auf bekannte Schwachstellen in seinen Paketen.',
        ],
      },
      {
        heading: 'Was es zeigt',
        bullets: [
          'Retrieval-augmentierte Generierung von Ende zu Ende: einlesen, indexieren, abrufen, antworten.',
          'Eine Service-Grenze: eine HTTP-Oberfläche, ein Container-Image und ein wiederholbares Deployment.',
          'Release-Prüfungen in der Pipeline selbst, inklusive Trivy-Scan des Images.',
        ],
      },
      {
        heading: 'Grenzen und nächste Schritte',
        paragraphs: [
          'Das ist ein persönliches Projekt, es gibt also keinen Produktionsverkehr und keine Nutzerstudie. Die Chunking-Strategie bestimmt die Antwortqualität, der Index hat keine Aktualisierungsstrategie, und es gibt keine Evaluationsumgebung, die Antworten gegen einen gelabelten Datensatz prüft.',
          'Der nächste Ausbau würde ein kleines Evaluationsset mit Prüfungen auf Retrieval- und Antwort-Ebene ergänzen, sodass eine Änderung an Chunk-Größe oder Modell beurteilt statt geraten werden kann. MedBot hat kein öffentliches Repository; diese Seite ist daher die Dokumentation der Arbeit statt eines Links darauf.',
        ],
      },
    ],
  },
  {
    slug: 'ai-financial-analyst',
    projectId: 'ai-financial-analyst-agent',
    name: 'KI-Finanzanalyst-Agent',
    subtitle: 'LLM-Orchestrierung, Verankerung und strukturierte Ausgabe',
    dek: 'Ein Agent, um eine einzige Vorgabe herum gebaut: Die Zahlen sollen aus einem Tool-Aufruf oder einem abgerufenen Dokument stammen. Er nimmt eine Frage in natürlicher Sprache, wählt die nötigen Tools und liefert eine strukturierte Investmentanalyse.',
    metaDescription:
      'Ein LLM-Agent, der Investmentfragen nur aus Tool-Aufrufen und abgerufenen Dokumenten beantwortet und strukturiertes JSON statt Prosa liefert.',
    role: 'Persönliches Projekt',
    period: '2026',
    stack: ['LLM-Orchestrierung', 'RAG', 'Tool Calling', 'Strukturierte Ausgaben', 'APIs'],
    links: [
      {
        label: 'Repository auf GitHub',
        href: 'https://github.com/patelnidhi1898/AI-Financial-Analyst-Assistant',
      },
    ],
    facts: [
      { label: 'Typ', value: 'LLM-Agent' },
      { label: 'Verankerung', value: 'RAG-Retrieval + Live-APIs' },
      { label: 'Ausgabe', value: 'Strukturiertes JSON, generierter Report' },
      { label: 'Muster', value: 'Mehrstufige Orchestrierung' },
    ],
    sections: [
      {
        heading: 'Das Problem',
        paragraphs: [
          'Fragt man ein Sprachmodell nach einer Investmentanalyse, liefert es eine. Die Zahlen darin können erfunden, veraltet oder dem falschen Unternehmen zugeordnet sein — und im Finanzkontext ist eine falsche Zahl das ganze Problem.',
          'Das Designziel war deshalb enger als „ein KI-Analyst“: Jede Zahl in der Ausgabe sollte aus einem Tool-Aufruf oder einem abgerufenen Dokument stammen, und jede Antwort sollte in einer Form ankommen, die der Rest des Systems nutzen kann.',
        ],
      },
      {
        heading: 'Was ich gebaut habe',
        paragraphs: [
          'Der Agent basiert auf einer mehrstufigen Orchestrierungs-Pipeline: Er wählt die Tools, die eine Frage braucht, führt sie gegen Live-Finanz- und Webdaten aus und reicht ein strukturiertes JSON-Objekt von Stufe zu Stufe weiter. Modell-Routing und Prompt-Chaining sind die Infrastruktur; der Report entsteht aus den JSON-Feldern, die die Pipeline zusammenstellt.',
        ],
        bullets: [
          'Tool-Aufrufe gegen Live-Finanz- und Web-APIs, damit Zahlen abgerufen statt erinnert werden.',
          'Verankerung: Tool-Aufrufe gegen Live-APIs und Retrieval aus Quelldokumenten, um halluzinierte Finanzzahlen zu reduzieren.',
          'Modell-Routing: Unterschiedliche Schritte gehen je nach Aufgabe an unterschiedliche Modelle.',
          'Prompt-Chaining über die Analyseschritte, mit strukturierten JSON-Ausgaben dazwischen.',
          'Automatische Reporterstellung aus dem strukturierten Ergebnis statt aus Freitext.',
        ],
      },
      {
        heading: 'Warum die Ausgabe ein Schema ist',
        paragraphs: [
          'Ein Absatz Analyse ist schwer zu prüfen und schwer wiederzuverwenden. Ein JSON-Objekt mit benannten Feldern lässt sich validieren, zwischen Läufen vergleichen, in einen Report rendern und Feld für Feld gegen die Tool-Ausgabe prüfen, aus der es entstanden ist.',
          'Die Pipeline endet in einem Schema, weil jede Stufe dann eine eigene Ein- und Ausgabe hat, die sich einzeln prüfen lässt — so lässt sich der Agent Stufe für Stufe testen.',
        ],
      },
      {
        heading: 'Was es zeigt',
        bullets: [
          'Agent-Design: entscheiden, wann ein Tool aufgerufen wird, welches, und was mit dem Ergebnis passiert.',
          'Verankerung als bewusste Vorgabe an das Modell, nicht als Prompt-Anweisung.',
          'Strukturierte Ausgaben als Vertrag zwischen den Pipeline-Stufen.',
          'Orchestrierung über Modelle und Schritte statt eines einzigen großen Prompts.',
        ],
      },
      {
        heading: 'Grenzen und nächste Schritte',
        paragraphs: [
          'Der Agent ist nur so gut wie die APIs dahinter. Rate-Limits, fehlende Ticker und veraltete Endpunkte verschlechtern die Analyse, und das aktuelle Design hat keine formale Evaluation der faktischen Genauigkeit gegen einen Referenzdatensatz.',
          'Es ist ein persönliches Engineering-Projekt und keine Anlageberatung. Die nächste Version würde eine Evaluationsumgebung ergänzen, die die verankerten Felder gegen Quelldaten prüft, sowie einen Cache, damit wiederholte Anfragen dieselben Zahlen nicht erneut abrufen.',
        ],
      },
    ],
  },
  {
    slug: 'cash-access-germany',
    projectId: 'contextual-anomaly-detection',
    name: 'Kontextuelle Anomalieerkennung im Bargeldzugang',
    subtitle: 'Masterarbeit · TU Dortmund mit Barkow Consulting',
    dek: 'Ein Machine-Learning-Framework, das jede deutsche Region daran misst, was ihr eigener Kontext vorhersagt, und jede Abweichung den regionalen Faktoren dahinter zuordnet. Es verbindet Geodaten, sozioökonomische und finanzielle Daten und findet Lücken, die ein nationaler Schwellenwert übersehen würde.',
    metaDescription:
      'Kontextuelle Anomalieerkennung für deutsche Regionen: ein Modell, das jede Region an ihrem eigenen Kontext misst und die Faktoren hinter jeder Lücke nennt.',
    role: 'Masterarbeit',
    period: '2025 – 2026',
    stack: ['Python', 'Anomalieerkennung', 'Explainable AI', 'Statistische Analyse', 'Geodaten'],
    links: [
      {
        label: 'Repository auf GitHub',
        href: 'https://github.com/patelnidhi1898/Contextual-Anomaly-Detection-in-Cash-Withdrawal-Resource-Distribution',
      },
      {
        label: 'Thesis-Report (PDF)',
        href: 'https://github.com/patelnidhi1898/Contextual-Anomaly-Detection-in-Cash-Withdrawal-Resource-Distribution/blob/main/Thesis_report_Contextual%20Anomaly%20Detection.pdf',
      },
    ],
    facts: [
      { label: 'Datensatz', value: 'Daten auf Standortebene' },
      { label: 'Kontext', value: 'Regionale Profile' },
      { label: 'Benchmarks', value: 'Vergleich über Datensätze' },
      { label: 'Methode', value: 'Kontextbewusste Erkennung + SHAP' },
    ],
    sections: [
      {
        heading: 'Ungewöhnlich im Vergleich wozu?',
        paragraphs: [
          'Eine ländliche Region mit wenigen Geldautomaten kann angemessen versorgt sein, eine Stadt mit vielen nicht. Die reine Zahl entscheidet es nicht.',
          'Die Arbeit hat das in zwei Fragen übersetzt: Welche Regionen sind ungewöhnlich im Vergleich zu sozioökonomisch ähnlichen Regionen, und welche Faktoren beeinflussen die Verteilung der Bargeldzugangsressourcen am stärksten? Für die erste Frage gab es keine Ground Truth — kein Referenzdatensatz markiert eine Region als über- oder unterversorgt.',
        ],
      },
      {
        heading: 'Den Datensatz aufbauen',
        paragraphs: [
          'Eine vollständige, zentrale Übersicht der Bargeldzugangsstandorte in ganz Deutschland gab es nicht, deshalb kam der Datensatz zuerst. Ich habe über 75.000 Standorte von mehr als 10 Standortverzeichnissen der Banken erfasst und zu einer geprüften, verlässlichen Datenbank bereinigt. Sie ist die erste konsolidierte Datenbank des deutschen Bargeldzugangsnetzes.',
          'Kontext wurde über acht sozioökonomische Gruppen definiert, darunter Haushalts- und Sektorenökonomie, Arbeitslosigkeit, Steuern, Erwerbsbevölkerung und Demografie. Diese Gruppen bilden den Vergleich: Eine Region wird an Orten mit ähnlichem Profil gemessen, nicht am nationalen Durchschnitt.',
        ],
      },
      {
        heading: 'Eine Methode wählen',
        paragraphs: [
          'Ich habe mehrere kontextuelle Anomalieerkennungs-Frameworks recherchiert und umgesetzt und sie auf deutschen Daten sowie auf 16 Benchmark-Datensätzen verglichen.',
          'Interpretierbarkeit war das entscheidende Kriterium: Die Ergebnisse mussten für geschäftliche Stakeholder nachvollziehbar sein; ein Framework, das eine Region markiert, ohne zu sagen warum, war nicht nutzbar.',
        ],
      },
      {
        heading: 'Was das Modell markiert — und warum',
        paragraphs: [
          'Reine Zahlen begünstigen Großstädte. Kontextbereinigt bewegt sich das Bild in beide Richtungen: Manche ländlichen Regionen sind gut versorgt, in Teilen von Thüringen, Brandenburg und Rheinland-Pfalz zeigt sich eine mögliche Unterversorgung.',
          'Für jede markierte Region nennt die Ausgabe die regionalen Merkmale, die sie von ihrem eigenen erwarteten Zugangsniveau wegbewegen. SHAP-Werte und Feature Importance ordnen die kontextuellen Faktoren hinter der Abweichung.',
          'Genau das gab dem Geschäftsbereich eine erklärbare Grundlage, um zu priorisieren, welche Regionen zu untersuchen sind.',
        ],
      },
      {
        heading: 'Grenzen und nächste Schritte',
        paragraphs: [
          'Die Analyse ist querschnittlich: Sie beschreibt die Struktur des Zugangs, nicht seine Veränderung über die Zeit. Sie hängt außerdem von der Granularität und Aktualität der veröffentlichten Regionaldaten ab, was begrenzt, wie lokal die Schlussfolgerungen sein können.',
          'Die Datenbank stammt von den Standortverzeichnissen der Banken, ihre Vollständigkeit ist also durch das begrenzt, was diese Listen veröffentlichen.',
          'Eine naheliegende Fortsetzung wäre eine zeitliche Dimension, um zu verfolgen, ob Lücken größer oder kleiner werden, und ein Test des Frameworks gegen andere Definitionen von Zugang, etwa Fahrzeit.',
        ],
      },
    ],
  },
];

export const caseDeBySlug = (slug: string) => caseStudiesDe.find((c) => c.slug === slug);
