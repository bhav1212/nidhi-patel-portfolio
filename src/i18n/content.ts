import { en, type Copy } from './en';
import { de } from './de';
import { experience, education, languages } from '../data/profile';
import { elements, families } from '../data/elements';
import { caseStudies, type CaseStudy } from '../data/case-studies';
import { caseStudiesDe } from '../data/case-studies.de';
import { experienceDe, educationDe, languagesDe, skillNamesDe, familiesDe } from '../data/profile.de';

export type Lang = 'en' | 'de';

export const copy: Record<Lang, Copy> = { en, de };

/** Root of the locale's site, with trailing slash. */
export const homeHref = (lang: Lang) => (lang === 'de' ? '/de/' : '/');

/** Prefix an English path such as `/work/medbot/` for the given locale. */
export const localePath = (lang: Lang, path: string) => (lang === 'de' ? `/de${path}` : path);

/** The same page in the other language, used by the header toggle. */
export function alternatePath(lang: Lang, pathname: string): string {
  const other: Lang = lang === 'en' ? 'de' : 'en';
  const stripped = pathname.startsWith('/de/') ? pathname.slice(3) : pathname;
  if (other === 'en') return stripped || '/';
  return `/de${stripped === '/' ? '/' : stripped}`;
}

export function experienceFor(lang: Lang) {
  if (lang === 'en') return experience;
  return experience.map((job: any) => ({
    ...job,
    ...(experienceDe[job.id] ?? {}),
    // The chips are concept names, not products, so they take the same German
    // labels as the skills grid (product names are absent from the map and stay).
    stack: job.stack?.map((s: string) => skillNamesDe[s] ?? s) ?? job.stack,
    // Dates stay as they are; only the word for "still in the role" changes.
    durationDisplay: String(job.durationDisplay).replace(/\bPresent\b/, copy.de.experience.present),
  }));
}

export function educationFor(lang: Lang) {
  if (lang === 'en') return education;
  return education.map((entry: any) => ({ ...entry, ...(educationDe[entry.id] ?? {}) }));
}

export function languagesFor(lang: Lang) {
  if (lang === 'en') return languages;
  return languages.map((entry: any) => ({ ...entry, ...(languagesDe[entry.language] ?? {}) }));
}

export function studiesFor(lang: Lang): CaseStudy[] {
  return lang === 'de' ? caseStudiesDe : caseStudies;
}

export function studyFor(lang: Lang, slug: string): CaseStudy | undefined {
  return studiesFor(lang).find((study) => study.slug === slug);
}

/** Localise a skill's label, family name and the links in the inspector. */
export function elementsFor(lang: Lang) {
  return elements.map((element) => {
    const uses = element.uses.map((use) => {
      const slug = use.href.startsWith('/work/') ? use.href.split('/')[2] : null;
      const study = slug ? caseStudiesDe.find((c) => c.slug === slug) : null;
      return {
        label: lang === 'de' && study ? study.name : use.label,
        href: localePath(lang, use.href),
      };
    });
    return {
      ...element,
      name: lang === 'de' ? skillNamesDe[element.name] ?? element.name : element.name,
      family: lang === 'de' ? familiesDe[element.familyIndex]?.name ?? element.family : element.family,
      uses,
    };
  });
}

export function familiesFor(lang: Lang) {
  if (lang === 'en') return families;
  return families.map((family, i) => ({ ...family, ...(familiesDe[i] ?? {}) }));
}
