export type CaseSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type CaseStudy = {
  slug: string;
  projectId: string;
  name: string;
  subtitle: string;
  /** The page intro; long enough to read, too long for a search snippet. */
  dek: string;
  /** ~150–160 characters for <meta name="description"> and the social cards. */
  metaDescription: string;
  role: string;
  period: string;
  stack: string[];
  links: { label: string; href: string }[];
  facts: { label: string; value: string }[];
  sections: CaseSection[];
};

/**
 * Every claim below is derived from data/nidhi-patel.json: project highlights,
 * stack, themes and links. No metric, employer or result has been invented.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'medbot',
    projectId: 'medbot',
    name: 'MedBot',
    subtitle: 'Containerised RAG application with CI/CD',
    dek: 'A document question-answering service: retrieval over a vector index, a Flask backend, a container image, and a Jenkins pipeline that scans the image before it ships.',
    metaDescription:
      'MedBot: a containerised RAG service over the documents you supply — LangChain, FAISS, Flask, Docker and a Jenkins pipeline that scans the image.',
    role: 'Personal project',
    period: '2026',
    stack: ['LangChain', 'FAISS', 'LLM APIs', 'Flask', 'Docker', 'Jenkins', 'Trivy'],
    links: [],
    facts: [
      { label: 'Type', value: 'Retrieval-augmented generation' },
      { label: 'Surface', value: 'Flask API + HTML/CSS frontend' },
      { label: 'Delivery', value: 'Docker image, Jenkins pipeline' },
      { label: 'Security', value: 'Trivy container scanning' },
    ],
    sections: [
      {
        heading: 'Why a confident answer needs a source',
        paragraphs: [
          'A general-purpose language model answers a question about a document with equal confidence whether or not that document is in its context. For document-based question answering that is the wrong behaviour. The useful output is an answer built from the material the user actually supplied.',
          'The second problem is delivery. A retrieval pipeline that only runs in a notebook is a demonstration, not a service. The application needed a request path, a deployable artefact, and a repeatable way to get from a commit to a running container.',
        ],
      },
      {
        heading: 'What I built',
        paragraphs: [
          'MedBot is a retrieval service rather than a prompt: documents are chunked and embedded into a FAISS index through LangChain, a query is embedded and matched against the index, and the retrieved passages are passed to the language model as grounding context for the answer. The design decision is the boundary between retrieval and generation: what the index returns is what the model is given to answer from.',
        ],
        bullets: [
          'Retrieval layer: LangChain orchestration over a FAISS vector index.',
          'Serving layer: a Flask backend with an HTML/CSS frontend.',
          'Packaging: the full application ships as a Docker image built in the Jenkins pipeline.',
          'Delivery: a Jenkins pipeline automates testing, container builds and the deployment workflow.',
          'Security: Trivy scans the container image for known vulnerabilities inside the pipeline.',
        ],
      },
      {
        heading: 'From commit to running container',
        paragraphs: [
          'The engineering question is what happens next: can the same build be reproduced, does a vulnerable base image block a release, and can the service be redeployed without a manual checklist?',
          'On every build, the Jenkins pipeline runs the tests and builds the Docker image. Trivy then scans that image for known vulnerabilities in its packages.',
        ],
      },
      {
        heading: 'What it demonstrates',
        bullets: [
          'End-to-end retrieval-augmented generation: ingest, index, retrieve, answer.',
          'A service boundary: an HTTP surface, a container image and a repeatable deploy.',
          'Release checks inside the pipeline itself, including a Trivy scan of the image.',
        ],
      },
      {
        heading: 'Limits and next steps',
        paragraphs: [
          'This is a personal project, so there is no production traffic to report and no user study to cite. Chunking strategy drives answer quality, the index has no refresh policy, and no evaluation harness scores answers against a labelled set.',
          'The next build would add a small evaluation set with retrieval and answer-level checks, so a change to chunk size or model can be judged rather than guessed. MedBot has no public repository, so this page is the record of the work rather than a link to it.',
        ],
      },
    ],
  },
  {
    slug: 'ai-financial-analyst',
    projectId: 'ai-financial-analyst-agent',
    name: 'AI Financial Analyst Agent',
    subtitle: 'LLM orchestration, grounding and structured output',
    dek: 'An agent built around one constraint: the figures should come from a tool call or a retrieved document. It takes a natural-language question, chooses which tools to call and returns a structured investment analysis.',
    metaDescription:
      'An LLM agent that answers investment questions only from tool calls and retrieved documents, returning structured JSON rather than prose.',
    role: 'Personal project',
    period: '2026',
    stack: ['LLM orchestration', 'RAG', 'Tool calling', 'Structured outputs', 'APIs'],
    links: [
      {
        label: 'Repository on GitHub',
        href: 'https://github.com/patelnidhi1898/AI-Financial-Analyst-Assistant',
      },
    ],
    facts: [
      { label: 'Type', value: 'LLM agent' },
      { label: 'Grounding', value: 'RAG-style retrieval + live APIs' },
      { label: 'Output', value: 'Structured JSON, generated report' },
      { label: 'Pattern', value: 'Multi-step orchestration' },
    ],
    sections: [
      {
        heading: 'The problem',
        paragraphs: [
          'Ask a language model for an investment analysis and it will produce one. The figures inside it may be invented, stale or attached to the wrong company, and in a financial context a wrong number is the whole problem.',
          'The design goal was therefore narrower than “an AI analyst”: every number in the output should come from a tool call or a retrieved document, and every answer should arrive in a shape the rest of the system can use.',
        ],
      },
      {
        heading: 'What I built',
        paragraphs: [
          'The agent is built on a multi-step orchestration pipeline: it chooses the tools a question needs, runs them against live financial and web data, and passes a structured JSON object from one stage to the next. Model routing and prompt chaining are the plumbing; the report is generated from the JSON fields the pipeline assembles.',
        ],
        bullets: [
          'Tool calling against live financial and web APIs, so figures are fetched rather than recalled.',
          'Grounding: tool calls against live APIs and retrieval from source documents, aimed at reducing hallucination of financial figures.',
          'Model routing: different steps are sent to different models according to the job they are doing.',
          'Prompt chaining across the analysis steps, with structured JSON outputs between them.',
          'Automated report generation from the structured result, rather than free text.',
        ],
      },
      {
        heading: 'Why the output is a schema',
        paragraphs: [
          'A paragraph of analysis is hard to verify and hard to reuse. A JSON object with named fields can be validated, compared across runs, rendered into a report, and checked field by field against the tool output that produced it.',
          'The pipeline ends in a schema because each stage then has an input and an output that can be inspected on its own, so the agent can be tested stage by stage.',
        ],
      },
      {
        heading: 'What it demonstrates',
        bullets: [
          'Agent design: deciding when to call a tool, which tool, and what to do with the result.',
          'Grounding as a deliberate constraint on the model, not a prompt instruction.',
          'Structured outputs as the contract between pipeline stages.',
          'Orchestration across models and steps rather than a single large prompt.',
        ],
      },
      {
        heading: 'Limits and next steps',
        paragraphs: [
          'The agent is only as good as the APIs behind it. Rate limits, missing tickers and stale endpoints all degrade the analysis, and the current design has no formal evaluation of factual accuracy against a reference set.',
          'It is a personal engineering project and not investment advice. The next version would add an evaluation harness that scores the grounded fields against source data, and a caching layer so repeated queries do not re-fetch the same figures.',
        ],
      },
    ],
  },
  {
    slug: 'cash-access-germany',
    projectId: 'contextual-anomaly-detection',
    name: 'Contextual Anomaly Detection in Cash Access',
    subtitle: 'Master’s thesis · TU Dortmund with Barkow Consulting',
    dek: 'A machine-learning framework that scores each German region against what its own context predicts, then attributes each deviation to the regional factors behind it. It joins geospatial, socioeconomic and financial data and finds gaps a national threshold would miss.',
    metaDescription:
      'Contextual anomaly detection across German regions: a model that scores each region against its own context and names the factors behind every gap.',
    role: 'Master’s thesis',
    period: '2025 – 2026',
    stack: ['Python', 'Anomaly detection', 'Explainable AI', 'Statistical analysis', 'Geospatial data'],
    links: [
      {
        label: 'Repository on GitHub',
        href: 'https://github.com/patelnidhi1898/Contextual-Anomaly-Detection-in-Cash-Withdrawal-Resource-Distribution',
      },
      {
        label: 'Thesis report (PDF)',
        href: 'https://github.com/patelnidhi1898/Contextual-Anomaly-Detection-in-Cash-Withdrawal-Resource-Distribution/blob/main/Thesis_report_Contextual%20Anomaly%20Detection.pdf',
      },
    ],
    facts: [
      { label: 'Dataset', value: 'Location-level data' },
      { label: 'Context', value: 'Regional profiles' },
      { label: 'Benchmarks', value: 'Cross-dataset comparison' },
      { label: 'Method', value: 'Context-aware detection + SHAP' },
    ],
    sections: [
      {
        heading: 'Unusual compared to what?',
        paragraphs: [
          'A rural region with few ATMs may be adequately served, while a city with many may not. The count alone does not settle it.',
          'The thesis reframed this into two questions: which regions are unusual compared with socioeconomically similar regions, and which factors most influence how cash-access resources are distributed. There was no ground truth for the first question — no reference dataset marks a region as over-served or under-served.',
        ],
      },
      {
        heading: 'Building the dataset',
        paragraphs: [
          'A complete, centralised view of cash-access locations across Germany did not exist, so the dataset came first. I scraped 75,000+ locations spread across 10+ bank locator websites and cleaned them into one verified source-of-truth database. It is the first consolidated database of Germany’s cash-access network.',
          'Context was defined through eight socioeconomic groups, among them household and sectoral economics, unemployment, taxation, workforce and demographics. Those groups form the comparison: a region is judged against places with a similar profile rather than against the national average.',
        ],
      },
      {
        heading: 'Choosing a method',
        paragraphs: [
          'I researched and implemented several contextual anomaly detection frameworks, comparing them on German data and 16 benchmark datasets.',
          'Interpretability was the deciding criterion: the results had to make sense to business stakeholders, so a framework that flagged a region without saying why was not usable.',
        ],
      },
      {
        heading: 'What the model flags, and why',
        paragraphs: [
          'Raw counts favour big cities. Adjusted for context, the picture moves in both directions: some rural regions are well served, and parts of Thüringen, Brandenburg and Rheinland-Pfalz show possible under-provision.',
          'For each flagged region, the output names the regional characteristics that push it away from its own expected level of access. SHAP values and feature importance rank the contextual factors behind the deviation.',
          'That gave the business an explainable way to prioritise which regions to investigate.',
        ],
      },
      {
        heading: 'Limits and next steps',
        paragraphs: [
          'The analysis is cross-sectional: it describes the structure of access, not how it changes over time. It also depends on the granularity and freshness of the published regional data, which limits how local the conclusions can be.',
          'The database is built from bank locator websites, so its completeness is bounded by what those lists publish.',
          'A natural continuation would add a temporal dimension to track whether gaps widen or close, and test the framework against other definitions of access, such as travel time.',
        ],
      },
    ],
  },
];

export const caseBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
