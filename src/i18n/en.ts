/**
 * Every user-facing string on the site, in English. `de.ts` mirrors this shape
 * key for key, so a missing translation fails the type check instead of
 * silently rendering English on the German pages.
 */
export const en = {
  code: 'en',
  htmlLang: 'en',
  ogLocale: 'en_GB',
  other: 'de',

  meta: {
    homeTitle: 'Nidhi Patel — AI Engineer and Data Scientist, Frankfurt am Main',
    homeDescription:
      'AI Engineer and Data Scientist in Frankfurt: LLM, RAG and ML systems, plus the Azure Databricks pipelines behind them. Four years, four organisations.',
    ogImageAlt: 'Nidhi Patel — AI Engineer and Data Scientist, Frankfurt',
    titleSuffix: 'Nidhi Patel',
  },

  nav: {
    work: 'Work',
    experience: 'Experience',
    skills: 'Skills',
    about: 'About',
    contact: 'Get in touch',
    menu: 'Toggle menu',
    cv: 'Download CV as PDF',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
    themeGeneric: 'Switch theme',
    langSwitch: 'Diese Seite auf Deutsch lesen',
    langLabel: 'Language',
    home: 'Nidhi Patel — home',
    skip: 'Skip to content',
    primary: 'Primary',
    toTop: 'Back to top',
  },

  hero: {
    eyebrow: 'Frankfurt · open to AI Engineer, ML Engineer and Data Scientist roles',
    title1: 'I build',
    words: ['AI systems', 'RAG pipelines', 'forecast models', 'data pipelines'],
    title2: 'that outlast the demo.',
    leadBefore:
      'Four years across working-student, full-time and internship roles in Germany, on machine learning, retrieval and LLM systems, and the Azure Databricks pipelines behind customer analytics. I am currently at ',
    leadLink: 'Miles & More',
    leadAfter: ', Lufthansa Group.',
    ctaWork: 'See the work',
    ctaCv: 'Download CV',
    basedIn: 'Based in',
    basedInValue: 'Frankfurt am Main · open to relocation',
    currently: 'Currently',
    focus: 'Focus',
    focusValue: 'ML · LLM and RAG · Azure Databricks',
    languages: 'Languages',
    languagesValue: 'English fluent · German intermediate',
    strap: 'Nidhi Patel · AI Engineer · Nidhi Patel · AI Engineer',
    idTop: 'Profile ID',
    cardLabel: 'Nidhi Patel — profile card',
    cardTitle: 'Turn the card',
    idRole: 'AI Engineer & Data Scientist',
    fieldBasedIn: 'Based in',
    fieldBasedInValue: 'Frankfurt am Main',
    fieldCurrently: 'Currently',
    fieldCurrentlyValue: 'Miles & More · Lufthansa Group',
    fieldDegree: 'Degree',
    fieldDegreeValue: 'M.Sc. Data Science · expected 2026',
    // The card back is proof, not a second pitch: these four lines are the
    // only place the portfolio states them.
    backItems: [
      '75,000+ cash-access locations, scraped into one verified database',
      'Three Azure Databricks accreditations, each verifiable',
      'A RAG service in Docker, built and scanned in CI',
      'M.Sc. Data Science, TU Dortmund (in progress)',
    ],
    found: 'If found, say hello —',
    cardHint: 'Tap to turn the card',
    techLabel: 'Working stack',
    techAria: 'Working stack, auto-scrolling. Focus to pause.',
  },

  work: {
    eyebrow: 'Selected work',
    heading: 'The engineering behind each project.',
    intro:
      'Three projects, each built to answer a question rather than to demonstrate a framework.',
    medbotTag: 'Personal project · RAG',
    medbotBody:
      'Retrieval-augmented question answering over documents the user supplies, with LangChain and a FAISS index behind a Flask API.',
    medbotStats: [
      ['FAISS', 'Vector retrieval'],
      ['Jenkins', 'Build and deploy'],
      ['Trivy', 'Image scanning in CI'],
    ],
    agentTag: 'Personal project · LLM agent',
    agentBody:
      'It takes a question, decides which tools to call, fetches figures from live data and returns a structured investment analysis.',
    agentOutcomeLabel: 'Grounded output',
    agentOutcome:
      ' built from tool calls and retrieved documents, returned as structured JSON.',
    thesisTag: 'Master’s thesis',
    thesisHeading: 'Contextual anomaly detection',
    thesisBody:
      'An anomaly model that scores each German region against what its own context predicts, then names the regional factors behind every flag.',
    thesisOutcomeBefore: 'Possible under-provision in ',
    thesisOutcomeStrong: 'Thüringen, Brandenburg and Rheinland-Pfalz',
    thesisOutcomeAfter: '.',
    credsTag: 'Credentials',
    credsHeading: 'Certified on Azure Databricks',
    credsBody:
      'The Platform Architect accreditation, plus Generative AI Fundamentals and Data Engineering. Each one is verifiable.',
    credsLink: 'See credentials and IDs →',
    readCase: 'Read the case study',
  },

  record: {
    eyebrow: 'Track record',
    heading: 'The record in numbers.',
    stats: [
      { num: 4, suffix: '+', label: 'Years in data science', sub: 'Analytics, ML and data pipelines.' },
      { num: 4, suffix: '', label: 'German organisations', sub: 'Aviation · consulting · housing · energy' },
      { num: 3, suffix: '', label: 'Databricks accreditations', sub: 'Azure · data engineering · GenAI' },
      { num: 60, suffix: '', label: 'Tools and methods', sub: 'From pandas to Power BI' },
    ],
  },

  experience: {
    eyebrow: 'Experience',
    heading: 'Four roles in analytics and data science.',
    intro:
      'Miles & More for customer analytics, Barkow Consulting for data pipelines and anomaly detection, and earlier roles in housing and energy.',
    present: 'Present',
  },

  education: {
    eyebrow: 'Education',
    heading: 'The degrees behind the work.',
    intro:
      'Computer engineering first, data science now — the modelling and the data engineering in this portfolio come from both.',
    inProgress: 'In progress',
    completed: 'Completed',
  },

  credentials: {
    eyebrow: 'Certifications',
    heading: 'Verified on Databricks.',
    intro: 'Each accreditation links to a Databricks verification page.',
    credentialId: 'Credential ID',
    verify: 'Verify →',
  },

  skills: {
    eyebrow: 'Skills',
    heading: 'Sixty tools across six areas.',
    intro:
      'Grouped by how I use them: modelling, LLM work, deployment, data engineering, programming and BI.',
    filterAria: 'Filter skills by family',
    gridAria: 'Skill elements',
    all: 'All elements',
    focusLabel: 'Element in focus',
    where: 'Where it shows up',
    hint: 'Hover, focus or tap an element',
    elementsOne: 'element',
    elementsMany: 'elements',
  },

  about: {
    eyebrow: 'About',
    heading: 'How I got here, and how I work.',
    paragraphs: [
      'I am an AI engineer and data scientist in Frankfurt am Main. My work starts from decisions someone has to make — churn and customer segments, regional cash access, an investment question typed in plain language — and ends in a model or a pipeline that supports them.',
      'I work between a team that has a question and data that does not answer it directly. At **Miles & More** the route runs through sales, customer and market data on Azure Databricks and ends in Tableau reports for marketing and strategy. At **Barkow Consulting** it began with the Python ETL over geospatial and financial data, then the models on top.',
      'I care about the part after the model works: a pipeline that runs, output that can be explained, a service the next person can pick up. The projects here end in containers, pipelines and structured outputs.',
    ],
    facts: {
      languages: 'Languages',
      elsewhere: 'Elsewhere',
    },
  },

  contact: {
    eyebrow: 'Get in touch',
    heading: 'Tell me about the role.',
    body:
      'I am looking for an AI Engineer, Machine Learning Engineer or Data Scientist role, in Frankfurt or elsewhere in DACH. If you are hiring, or want to talk about retrieval, evaluation or Databricks, email is best.',
    email: 'Email me',
    linkedin: 'Message me on LinkedIn',
    cv: 'Download CV',
    city: 'Frankfurt am Main, Germany',
    relocation: 'Open to relocation',
  },

  footer: {
    label: 'Footer',
    resume: 'Résumé',
    email: 'Email',
    privacy: 'Privacy',
  },

  caseStudy: {
    back: 'All work',
    linksHeading: 'Project links',
    moreWork: 'More work',
    notFoundTitle: 'Case study not found',
  },

  privacy: {
    metaTitle: 'Privacy — Nidhi Patel',
    metaDescription:
      'How this website handles data: no cookies, no analytics, no third-party requests, no tracking pixels, and fonts hosted on its own server.',
    kicker: 'Privacy notice',
    title: 'Privacy',
    sections: [
      {
        heading: 'In short',
        body:
          'This is a static website. It sets no cookies, runs no analytics, and loads nothing from third parties. Fonts are hosted on the same server as the pages. Apart from the technical server logs described below, the only personal data processed is what you choose to send by email.',
      },
      {
        heading: 'Who is responsible',
        body: 'Nidhi Patel, Frankfurt am Main, Germany. Contact:',
      },
      {
        heading: 'Server logs',
        body:
          'When you open a page, the hosting provider processes technical request data (IP address, time, requested file, browser type) to deliver the page and keep the service secure. This is necessary for the operation of the site under Art. 6(1)(f) GDPR. Logs are kept only as long as the provider needs them for security and are not combined with other data or used to identify visitors.',
      },
      {
        heading: 'Cookies and local storage',
        body:
          'No cookies are set. The site stores one preference in your browser’s local storage: whether you chose the light or dark theme. It never leaves your device and is not linked to any identifier.',
      },
      {
        heading: 'External links',
        body:
          'Links to LinkedIn, GitHub and other sites are ordinary links. Nothing is loaded from those sites until you click one, at which point their own privacy policies apply.',
      },
      {
        heading: 'Email',
        body:
          'If you write to the address above, your message and address are used only to answer you. They are not shared, added to a mailing list, or used for anything else.',
      },
      {
        heading: 'Your rights',
        body:
          'Under the GDPR you may request access to, correction of, or deletion of any personal data held about you, and you may object to its processing. Write to the address above. You also have the right to complain to a data protection supervisory authority, for example the one responsible for Frankfurt am Main.',
      },
    ],
    updated: 'Last updated: November 2026.',
    responsibleSuffix: '.',
  },

  notFound: {
    metaTitle: 'Page not found — Nidhi Patel',
    metaDescription: 'That page does not exist. Head back to the portfolio home page.',
    title: 'That page isn’t here.',
    body: 'The link may be old, or the address may have a typo.',
    home: 'Back to the home page',
    work: 'See the work',
  },
};

export type Copy = typeof en;
