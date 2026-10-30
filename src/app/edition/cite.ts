import { Citation } from './edition.data';

export type CiteStyle = 'apa' | 'harvard';

export interface FormattedCitation {
  text: string;
  html: string;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Builds a citation from parts; italic parts are wrapped in <i> for the HTML copy. */
function build(parts: Array<string | { i: string }>): FormattedCitation {
  let text = '';
  let html = '';
  for (const p of parts) {
    if (typeof p === 'string') {
      text += p;
      html += esc(p);
    } else {
      text += p.i;
      html += `<i>${esc(p.i)}</i>`;
    }
  }
  return { text, html };
}

/** "Title." but not "Title?." */
const endTitle = (t: string) => (/[?!.]$/.test(t) ? t : t + '.');

function apaAuthors(a: [string, string][]): string {
  const names = a.map(([family, initials]) => `${family}, ${initials}`);
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(', ')}, & ${names[names.length - 1]}`;
}

function harvardAuthors(a: [string, string][]): string {
  const names = a.map(([family, initials]) => `${family}, ${initials.replace(/\s+/g, '')}`);
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

/** "S. O. Idowu" → "Idowu, S.O." */
const harvardEditor = (e: string) => {
  const bits = e.split(' ');
  const family = bits.slice(bits.findIndex((b) => !b.endsWith('.'))).join(' ');
  const initials = bits.filter((b) => b.endsWith('.')).join('');
  return `${family}, ${initials}`;
};

export function formatCitation(c: Citation, style: CiteStyle): FormattedCitation {
  const doi = `https://doi.org/${c.doi}`;

  if (style === 'apa') {
    if (c.editors) {
      const eds = c.editors.length === 1 ? c.editors[0] : `${c.editors.slice(0, -1).join(', ')}, & ${c.editors[c.editors.length - 1]}`;
      return build([
        `${apaAuthors(c.authors)} (${c.year}). ${endTitle(c.title)} In ${eds} (Eds.), `,
        { i: c.container },
        `. ${c.publisher}. ${doi}`,
      ]);
    }
    const parts: Array<string | { i: string }> = [`${apaAuthors(c.authors)} (${c.year}). ${endTitle(c.title)} `, { i: c.container }];
    if (c.volume) parts.push(', ', { i: c.volume });
    if (c.issue) parts.push(`(${c.issue})`);
    if (c.pages) parts.push(`, ${c.pages}`);
    if (c.article) parts.push(`, Article ${c.article}`);
    parts.push(`. ${doi}`);
    return build(parts);
  }

  if (c.editors) {
    return build([
      `${harvardAuthors(c.authors)} (${c.year}) ‘${c.title}’, in ${harvardEditor(c.editors[0])} et al. (eds) `,
      { i: c.container },
      `. Cham: ${c.publisher}. Available at: ${doi}.`,
    ]);
  }
  const parts: Array<string | { i: string }> = [`${harvardAuthors(c.authors)} (${c.year}) ‘${c.title}’, `, { i: c.container }];
  if (c.volume) parts.push(`, ${c.volume}${c.issue ? `(${c.issue})` : ''}`);
  if (c.pages) parts.push(`, pp. ${c.pages}`);
  if (c.article) parts.push(`, ${c.article}`);
  parts.push(`. Available at: ${doi}.`);
  return build(parts);
}
