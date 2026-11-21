import { skills, projects, experience } from './profile';

/**
 * The skills section is laid out as a periodic table. Each skill gets a
 * two-letter symbol, a family colour and, where a real brand mark exists in the
 * vendored icon set, a logo. Nothing here adds a skill: the list is exactly
 * data/nidhi-patel.json's skills array.
 */

export type SkillElement = {
  number: number;
  symbol: string;
  name: string;
  family: string;
  familyIndex: number;
  icon?: string;
  uses: { label: string; href: string }[];
};

export type Family = {
  name: string;
  short: string;
  glyph: 'chart' | 'spark' | 'cube' | 'cloud' | 'code' | 'bars';
};

export const families: Family[] = [
  { name: 'Data Science & ML', short: 'Data & ML', glyph: 'chart' },
  { name: 'Generative AI & LLM Engineering', short: 'GenAI & LLM', glyph: 'spark' },
  { name: 'MLOps & Deployment', short: 'MLOps', glyph: 'cube' },
  { name: 'Cloud & Data Engineering', short: 'Cloud & Data', glyph: 'cloud' },
  { name: 'Programming & Databases', short: 'Programming', glyph: 'code' },
  { name: 'BI & Visualisation', short: 'BI & Visual', glyph: 'bars' },
];

const SYMBOLS: Record<string, string> = {
  'Predictive Modelling': 'Pm',
  'Anomaly Detection': 'Ad',
  'Time-Series Forecasting': 'Ts',
  'Feature Engineering': 'Fe',
  'A/B Testing': 'Ab',
  'Hypothesis Testing': 'Ht',
  'Explainable AI (SHAP)': 'Xa',
  'scikit-learn': 'Sk',
  XGBoost: 'Xg',
  PyTorch: 'Pt',
  TensorFlow: 'Tf',
  statsmodels: 'Sm',

  LLMs: 'Ll',
  RAG: 'Rg',
  LangChain: 'Lc',
  LangGraph: 'Lg',
  'Multi-Agent Systems': 'Ma',
  'Tool Calling': 'Tc',
  'Prompt Engineering': 'Pe',
  Embeddings: 'Em',
  'Vector Databases (FAISS)': 'Vd',
  'Hugging Face': 'Hf',
  Guardrails: 'Gr',
  'Input/Output Validation': 'Iv',
  'Human-in-the-Loop Workflows': 'Hl',
  'LLM Monitoring & Observability': 'Lo',

  Docker: 'Dk',
  Jenkins: 'Jk',
  'CI/CD': 'Ci',
  Trivy: 'Tv',
  MLflow: 'Ml',
  'Model Deployment': 'Md',
  'Workflow Automation': 'Wa',
  Flask: 'Fl',
  FastAPI: 'Fa',
  Streamlit: 'St',
  Git: 'Gt',

  'Azure Databricks': 'Db',
  'Apache Spark': 'Sp',
  'Delta Lake': 'Dl',
  'Medallion Architecture': 'Me',
  'Azure Storage': 'Az',
  'ETL Pipelines': 'Et',
  'Data Modelling': 'Dm',
  'Data Validation': 'Dv',
  'Data Quality': 'Dq',

  'Python (pandas, NumPy)': 'Py',
  SQL: 'Sq',
  R: 'R',
  PostgreSQL: 'Pg',
  MySQL: 'My',
  'SQL Server': 'Ss',
  SQLite: 'Sl',
  MongoDB: 'Mo',

  Tableau: 'Tb',
  'Power BI': 'Pb',
  Excel: 'Xl',
  Plotly: 'Pl',
  Matplotlib: 'Mp',
  Seaborn: 'Sb',
};

/** Only marks that exist in public/icons (simple-icons, vendored). */
const ICONS: Record<string, string> = {
  'scikit-learn': 'scikitlearn',
  PyTorch: 'pytorch',
  TensorFlow: 'tensorflow',
  LangChain: 'langchain',
  LangGraph: 'langgraph',
  'Hugging Face': 'huggingface',
  Docker: 'docker',
  Jenkins: 'jenkins',
  Trivy: 'trivy',
  MLflow: 'mlflow',
  Flask: 'flask',
  FastAPI: 'fastapi',
  Streamlit: 'streamlit',
  Git: 'git',
  'Azure Databricks': 'databricks',
  'Apache Spark': 'apachespark',
  'Azure Storage': 'microsoftazure',
  'Python (pandas, NumPy)': 'python',
  R: 'r',
  PostgreSQL: 'postgresql',
  MySQL: 'mysql',
  'SQL Server': 'microsoftsqlserver',
  SQLite: 'sqlite',
  MongoDB: 'mongodb',
  Tableau: 'tableau',
  'Power BI': 'powerbi',
  Excel: 'microsoftexcel',
  Plotly: 'plotly',
};

const PROJECT_SLUG: Record<string, string> = {
  medbot: 'medbot',
  'ai-financial-analyst-agent': 'ai-financial-analyst',
  'contextual-anomaly-detection': 'cash-access-germany',
};

const PROJECT_LABEL: Record<string, string> = {
  medbot: 'MedBot',
  'ai-financial-analyst-agent': 'AI Financial Analyst',
  'contextual-anomaly-detection': 'Cash-access thesis',
};

/** Parentheticals are search hints, not part of the stack name. */
const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/\(.*?\)/g, ' ')
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

/** A skill may be named differently from the stack entry it powers. */
const ALIASES: Record<string, string[]> = {
  'vector databases': ['faiss'],
  'explainable ai': ['explainable ai xai'],
  'python': ['python'],
};

const matches = (name: string, stack: string[]) => {
  const keys = new Set([norm(name), ...(ALIASES[norm(name)] ?? [])]);
  return stack.some((s) => keys.has(norm(s)));
};

const usesFor = (name: string) => {
  const uses: { label: string; href: string }[] = [];
  for (const project of projects as any[]) {
    if (matches(name, project.stack ?? [])) {
      uses.push({ label: PROJECT_LABEL[project.id] ?? project.name, href: `/work/${PROJECT_SLUG[project.id]}/` });
    }
  }
  for (const job of experience as any[]) {
    if (matches(name, job.stack ?? [])) {
      uses.push({ label: job.companyShort, href: '/#experience' });
    }
  }
  return uses.slice(0, 3);
};

let n = 0;
export const elements: SkillElement[] = (skills as any[]).flatMap((group, familyIndex) =>
  group.items.map((name: string) => {
    n += 1;
    return {
      number: n,
      symbol: SYMBOLS[name] ?? name.slice(0, 2),
      name,
      family: families[familyIndex]?.name ?? group.category,
      familyIndex,
      icon: ICONS[name],
      uses: usesFor(name),
    };
  }),
);
