import type { APIRoute } from 'astro';
import { profile, contact, links, experience, education, certifications } from '../data/profile';
import { caseStudies } from '../data/case-studies';
import { caseStudiesDe } from '../data/case-studies.de';

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL('https://nidhipatel.de')).href.replace(/\/$/, '');
  const url = (path: string) => `${base}${path}`;

  const pageLines = caseStudies
    .map((study) => `- [${study.name}](${url(`/work/${study.slug}/`)}): ${study.dek}`)
    .join('\n');

  const workLines = caseStudies
    .map((study) => {
      const repo = study.links.find((link) => link.label.toLowerCase().includes('repository'));
      return [
        `### ${study.name}`,
        '',
        study.dek,
        '',
        `Stack: ${study.stack.join(', ')}.`,
        repo ? `Repository: ${repo.href}` : '',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n\n');

  const body = `# ${profile.fullName}

> ${profile.fullName} is an AI engineer and data scientist based in ${profile.location.city}, Germany. Her work covers retrieval-augmented generation, LLM agents, machine learning and the Python and Azure Databricks pipelines behind them. She is currently a Data Analytics Intern at Miles & More (Lufthansa Group) and is completing an M.Sc. in Data Science at TU Dortmund.

## Pages

- [Home](${url('/')}): profile, selected work, experience, skills, credentials and contact.
${pageLines}
- [Privacy notice](${url('/datenschutz/')}): how this site handles data.
- [CV (PDF)](${url('/Nidhi_Patel_CV.pdf')}): full curriculum vitae.

The site is also published in German:

- [Startseite](${url('/de/')}): dieselben Inhalte auf Deutsch.
${caseStudiesDe.map((study) => `- [${study.name}](${url(`/de/work/${study.slug}/`)}): ${study.dek}`).join('\n')}
- [Datenschutz](${url('/de/datenschutz/')}): Umgang mit Daten.

## Selected work

${workLines}

## Experience

${experience
  .map(
    (job: any) =>
      `- ${job.role} — ${job.company} (${job.durationDisplay}). ${job.portfolioSummary ?? job.summaryForPortfolio ?? ''}`.trim()
  )
  .join('\n')}

## Education and credentials

${education
  .map((entry: any) => `- ${entry.degree}, ${entry.institution} — ${entry.durationDisplay}`.trim())
  .join('\n')}
${certifications.map((cert: any) => `- ${cert.name} — ${cert.issuer}`).join('\n')}

## Contact

- Email: ${contact.email}
- LinkedIn: ${links.linkedin}
- GitHub: ${links.github}

The site is a static portfolio. There is no tracking, no analytics and no advertising.
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
