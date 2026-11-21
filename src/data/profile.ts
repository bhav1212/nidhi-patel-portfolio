import raw from '../../data/nidhi-patel.json';

export const data = raw;
export const profile = raw.profile;
export const contact = raw.contact;
export const skills = raw.skills;
export const experience = raw.experience;
export const education = raw.education;
export const certifications = raw.certifications;
export const projects = raw.projects;
export const languages = raw.languages;
export const links = raw.links;

/** Flat list of the working-stack strip: the most distinctive tools, not all 60. */
export const stackStrip = [
  'Python',
  'SQL',
  'Azure Databricks',
  'Apache Spark',
  'Delta Lake',
  'scikit-learn',
  'PyTorch',
  'LangChain',
  'LangGraph',
  'RAG',
  'FAISS',
  'Docker',
  'Jenkins',
  'MLflow',
  'Tableau',
  'Power BI',
  'FastAPI',
  'Flask',
];

export const cvUrl = '/Nidhi_Patel_CV.pdf';
export const emailHref = contact.email ? `mailto:${contact.email}` : '#contact';
