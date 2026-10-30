// Content for the editorial edition of the portfolio.
// Facts here come from Kemi's public profiles (Aston Research Explorer, SOAS,
// Google Scholar, LinkedIn) and the publishers' pages for each paper.

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export interface PathEntry {
  year: string;
  title: string;
  detail: string;
}

/** Structured reference data. Authors are [family name, initials]. */
export interface Citation {
  authors: [string, string][];
  year: string;
  title: string;
  container: string;
  volume?: string;
  issue?: string;
  pages?: string;
  article?: string;
  editors?: string[];
  publisher?: string;
  doi: string;
}

export interface Publication {
  feature?: boolean;
  bg: string;
  venue: string;
  title: string;
  kind: string;
  year: string;
  authors?: string;
  href?: string;
  /** First published online (ISO date), when known. Used to hide old years on the cards. */
  published?: string;
  cite?: Citation;
  body: string[];
}

export interface Story {
  img: string;
  imgPosition?: string;
  title: string;
  place: string;
  href?: string;
  linkText?: string;
  body: string[];
}

export interface Moment {
  img: string;
  title: string;
  place: string;
  story: number;
}

export interface LinkItem {
  label: string;
  href: string;
}

export interface Tile extends LinkItem {
  title: string;
  big?: boolean;
}

export interface Band {
  label: string;
  text: string;
  href?: string;
  linkText?: string;
}

export const ROLES =
  'Professor of Accounting · Chartered Accountant · Fraud Examiner · Editor · Researcher ·';

export interface HeroStat extends Stat {
  /** Filled from OpenAlex at build time and in the browser. */
  live?: 'hIndex';
}

/** Citations come from Google Scholar (no public API), so they are updated by hand. */
export const HERO_STATS: HeroStat[] = [
  { value: 1260, label: 'Citations' },
  { value: 13, label: 'h-index', live: 'hIndex' },
  { value: 23, label: 'Journal articles' },
  { value: 30, suffix: '+', label: 'Years in accounting' },
];

export const OPENALEX_AUTHOR = 'https://api.openalex.org/authors/orcid:0000-0003-2971-8094?select=summary_stats';

export const ABOUT_STATS = [
  { value: '1992', label: 'Chartered with ICAN' },
  { value: '1st', label: 'Professor of Accounting in SOAS history' },
];

export const PATH: PathEntry[] = [
  { year: '1990', title: 'BSc Accounting, Ogun State University', detail: 'SWAN prize for Best Female Accounting Graduate' },
  { year: '1992', title: 'Chartered Accountant, ICAN', detail: 'Trained at KPMG Nigeria' },
  { year: 'Practice', title: 'Deloitte Nigeria, then senior management', detail: 'Private sector finance roles before academia' },
  { year: '2006', title: 'MSc Finance, University of Leicester', detail: 'Dissertation on financial scandals and the credibility of auditors' },
  { year: '2007', title: 'Leicester Business School, De Montfort University', detail: 'Founded the Centre for Research in Accountability, Governance and Sustainability' },
  { year: '2012', title: 'PhD, De Montfort University', detail: 'Thesis on corporate community involvement disclosure' },
  { year: '2015', title: 'Certified Fraud Examiner', detail: 'Association of Certified Fraud Examiners' },
  { year: '2010s', title: 'Associate Professor, Nottingham University Business School', detail: 'Director of Research and Director of Doctoral Studies' },
  { year: '2019', title: 'Professor of Accounting, SOAS University of London', detail: 'The first in the school’s century-long history' },
  { year: 'Now', title: 'Professor of Accounting, Aston Business School', detail: 'Teaching, research and PhD supervision' },
];

const ESM_EDITORS = [
  'S. O. Idowu', 'R. Schmidpeter', 'N. Capaldi', 'L. Zu', 'M. Del Baldo', 'R. Abreu',
];

export const PUBLICATIONS: Publication[] = [
  {
    feature: true,
    bg: '#0e1b30',
    venue: 'Abacus · Wiley',
    title: 'Clarity and Conciseness of Financial Narrative Disclosures: Does the Practice Statement Matter?',
    published: '2025-10-29',
    kind: 'Journal article',
    year: '2025',
    authors: 'Ekaete Efretuei and Kemi Yekini',
    href: 'https://doi.org/10.1111/abac.70018',
    cite: {
      authors: [['Efretuei', 'E.'], ['Yekini', 'K. C.']],
      year: '2025',
      title: 'Clarity and conciseness of financial narrative disclosures: Does the practice statement matter?',
      container: 'Abacus',
      volume: '61',
      issue: '4',
      pages: '1110–1144',
      doi: '10.1111/abac.70018',
    },
    body: [
      'The IASB asked, in its 2021 exposure draft on management commentary, whether clarity and conciseness matter in what companies write about their performance. This paper answers that question with evidence.',
      'Using a new measure built specifically for financial disclosures, the authors test whether adopting IFRS made management commentary clearer and more concise. They find the opposite: narratives became less clear and less concise after firms adopted IFRS.',
      'The findings were presented at the IFRS Foundation research forum in November 2024. The paper is open access.',
    ],
  },
  {
    bg: '#3a4658',
    venue: 'Business Ethics, the Environment & Responsibility',
    title: 'Socially Responsible Purchasing (SRP) in the Supply Chain Industry: Meanings and Influences',
    published: '2024-01-05',
    kind: 'Journal article',
    year: '2025',
    authors: 'Titilayo Ogunyemi, Emmanuel Adegbite, Franklin Nakpodia, Kemi Yekini and Angela Ayios',
    href: 'https://doi.org/10.1111/beer.12655',
    cite: {
      authors: [['Ogunyemi', 'T.'], ['Adegbite', 'E.'], ['Nakpodia', 'F.'], ['Yekini', 'K. C.'], ['Ayios', 'A.']],
      year: '2025',
      title: 'Socially responsible purchasing (SRP) in the supply chain industry: Meanings and influences',
      container: 'Business Ethics, the Environment & Responsibility',
      volume: '34',
      issue: '2',
      pages: '362–376',
      doi: '10.1111/beer.12655',
    },
    body: [
      'Companies are under growing pressure to act responsibly across their supply chains, but what does socially responsible purchasing actually mean in practice?',
      'Using stakeholder theory and face-to-face interviews with practitioners at multinational and local organisations in Nigeria, the paper maps the meaning of SRP, its components and boundaries, and the internal and external pressures that shape it.',
      'It offers practical insight for managers, purchasers, suppliers, analysts and policymakers. The paper is open access.',
    ],
  },
  {
    bg: '#24385a',
    venue: 'J. of International Accounting, Auditing & Taxation',
    title: 'Diffusion theory, economic consequences, and adoption of international standards on auditing around the world',
    published: '2024-08-13',
    kind: 'Journal article',
    year: '2024',
    authors: 'Ibrahim Elmghaamez, Collins G. Ntim and Kemi Yekini',
    href: 'https://doi.org/10.1016/j.intaccaudtax.2024.100641',
    cite: {
      authors: [['Elmghaamez', 'I. K.'], ['Ntim', 'C. G.'], ['Yekini', 'K. C.']],
      year: '2024',
      title: 'Diffusion theory, economic consequences, and adoption of international standards on auditing around the world',
      container: 'Journal of International Accounting, Auditing and Taxation',
      volume: '56',
      article: '100641',
      doi: '10.1016/j.intaccaudtax.2024.100641',
    },
    body: [
      'What happens to a country’s economy when it adopts the International Standards on Auditing? Drawing on 160 countries over 20 years, this study looks at that question through diffusion of innovation theory.',
      'Early adoption is linked to stronger foreign direct investment and exchange rates, and late adoption to exports and interest rates. The results also show some negative links, including between early adoption and export growth, so the economic effects are mixed rather than uniformly positive.',
      'The paper is open access.',
    ],
  },
  {
    bg: '#0e1b30',
    venue: 'Business & Society',
    title: 'Making sense of CSR reports the semiotic way',
    kind: 'Article',
    year: '2023',
    body: [
      'How semiotics, the study of signs and meaning, can strengthen corporate social responsibility communication.',
      'By reading the language and symbolism in CSR reports, companies can communicate their values more authentically and build trust with stakeholders, investors and customers.',
    ],
  },
  {
    bg: '#3a4658',
    venue: 'Encyclopedia of Sustainable Management',
    title: 'Making Sense of CSR Reports: A Methodological Perspective from Semiotics',
    kind: 'Encyclopedia entry',
    year: '2023',
    authors: 'Kemi Yekini',
    href: 'https://doi.org/10.1007/978-3-030-02006-4_1159-1',
    cite: {
      authors: [['Yekini', 'K. C.']],
      year: '2023',
      title: 'Making sense of CSR reports: A methodological perspective from semiotics',
      container: 'Encyclopedia of sustainable management',
      editors: ESM_EDITORS,
      publisher: 'Springer',
      doi: '10.1007/978-3-030-02006-4_1159-1',
    },
    body: ['A reference entry on using semiotics to assess CSR reports, showing how language and symbols reveal a company’s transparency and ethical values.'],
  },
  {
    bg: '#24385a',
    venue: 'Encyclopedia of Sustainable Management',
    title: 'Corporate Community Involvement',
    kind: 'Encyclopedia entry',
    year: '2023',
    authors: 'Kemi Yekini',
    href: 'https://doi.org/10.1007/978-3-030-02006-4_346-1',
    cite: {
      authors: [['Yekini', 'K. C.']],
      year: '2023',
      title: 'Corporate community involvement',
      container: 'Encyclopedia of sustainable management',
      editors: ESM_EDITORS,
      publisher: 'Springer',
      doi: '10.1007/978-3-030-02006-4_346-1',
    },
    body: ['A reference entry defining corporate community involvement: how businesses engage in initiatives that meet the needs of the communities they operate in.'],
  },
  {
    bg: '#0e1b30',
    venue: 'Encyclopedia of Sustainable Management',
    title: 'CSR Disclosure, Quality Measurement of',
    kind: 'Encyclopedia entry',
    year: '2023',
    authors: 'Kemi Yekini',
    href: 'https://doi.org/10.1007/978-3-030-02006-4_344-1',
    cite: {
      authors: [['Yekini', 'K. C.']],
      year: '2023',
      title: 'CSR disclosure, quality measurement of',
      container: 'Encyclopedia of sustainable management',
      editors: ESM_EDITORS,
      publisher: 'Springer',
      doi: '10.1007/978-3-030-02006-4_344-1',
    },
    body: ['A reference entry on why measuring the quality of CSR disclosure is hard, and how scholars differ on its definitions and metrics.'],
  },
  {
    bg: '#3a4658',
    venue: 'Business & Society · SAGE',
    title: 'CSR Communication Research: A Theoretical-cum-Methodological Perspective from Semiotics',
    kind: 'Journal article',
    year: '2021',
    authors: 'Kemi Yekini, Kamil Omoteso and Emmanuel Adegbite',
    href: 'https://doi.org/10.1177/0007650319843623',
    cite: {
      authors: [['Yekini', 'K. C.'], ['Omoteso', 'K.'], ['Adegbite', 'E.']],
      year: '2021',
      title: 'CSR communication research: A theoretical-cum-methodological perspective from semiotics',
      container: 'Business & Society',
      volume: '60',
      issue: '4',
      pages: '876–908',
      doi: '10.1177/0007650319843623',
    },
    body: [
      'Research on the quality of CSR communication has long been fragmented, with no shared method for judging it. This article offers one.',
      'Drawing on semiotics, the authors read the sustainability and CSR reports of selected FTSE 100 companies using the Greimas narrative schema and the semiotic square of veridiction, which separates what a report claims from what it shows.',
      'The result is a CSR report quality model that policymakers and firms can use when designing sustainability and CSR reporting standards.',
    ],
  },
];

export const RESEARCH_COLUMNS = [
  {
    heading: 'Research areas',
    items: [
      'Sustainability accounting and reporting',
      'CSR communication and semiotics',
      'Transparency of narrative disclosures',
      'Corporate governance',
      'Earnings management and financial statement fraud',
      'NGOs and community participation',
    ],
  },
  {
    heading: 'Editorial',
    items: [
      'Editor-in-chief, ICTACT Journal on Management Studies',
      'Associate Editor, African Accounting and Finance Association',
      'Editorial board, Advances in Environmental Accounting and Management',
      'Reviewer for Accounting, Auditing & Accountability Journal, Critical Perspectives on Accounting and Accounting Forum',
    ],
  },
  {
    heading: 'Credentials',
    items: [
      'Fellow, Institute of Chartered Accountants of Nigeria',
      'Certified Fraud Examiner, ACFE',
      'Fellow, Higher Education Academy',
      'Member, EAA, BAFA and AAFA',
    ],
  },
];

export const BANDS: Band[] = [
  {
    label: 'Leadership',
    text: 'Director of Doctoral Studies at De Montfort, Nottingham and SOAS. Director of Research at De Montfort and Nottingham. Programme Director, BSc Accounting and Finance, SOAS.',
  },
  {
    label: 'Teaching',
    text: 'Financial Accounting and Reporting, Integrated Case Study, and Sustainability and Accountability on the MSc International Accounting and Finance.',
  },
  {
    label: 'PhD supervision',
    text: 'Accepting students in sustainability reporting, corporate governance, and earnings management and financial statement fraud.',
    href: 'https://www.aston.ac.uk/study/courses/phd-aston-business-school/',
    linkText: 'PhD at Aston Business School',
  },
];

export const STORIES: Story[] = [
  {
    img: '/assets/ican-uk-conference-2023.jpg',
    imgPosition: '30% 25%',
    title: 'Speaking at the ICAN UK conference',
    place: 'London · March 2023',
    body: [
      'Kemi spoke at the 10th UK International Accountants Conference of the Institute of Chartered Accountants of Nigeria’s UK District, held from 1 to 5 March 2023 at the DoubleTree by Hilton London Docklands Riverside.',
      'The UK District was the institute’s first society outside the African continent. Its conference brings together Nigerian accountants, business leaders and finance professionals from across the UK and Europe.',
    ],
  },
  {
    img: '/assets/contact.jpeg',
    imgPosition: '50% 40%',
    title: 'UN expert, Economic Report on Africa 2020',
    place: 'Sandton, Johannesburg · January 2020',
    href: 'https://www.un-ilibrary.org/content/books/9789210051248',
    linkText: 'See the report',
    body: [
      'On 16 and 17 January 2020 the UN Economic Commission for Africa brought experts together in Sandton, Johannesburg, to review its flagship Economic Report on Africa 2020. Kemi took part as one of the reviewing experts.',
      'The report, Innovative Finance for Private Sector Development in Africa, looks at how new sources of finance, including financial technology, can fund business growth across the continent and support the Sustainable Development Goals.',
    ],
  },
];

export const MOMENTS: Moment[] = [
  { img: '/assets/contact.jpeg', title: 'On the review panel', place: 'UN Economic Report on Africa 2020', story: 1 },
  { img: '/assets/group_photo.jpeg', title: 'The expert group', place: 'Sandton, Johannesburg · January 2020', story: 1 },
  { img: '/assets/group_photo2.jpeg', title: 'An evening in Sandton', place: 'Johannesburg · January 2020', story: 1 },
];

export interface Quote {
  text: string;
  name: string;
  role: string;
}

/** Testimonials, lightly edited for grammar. The first one shows as the large lead quote. */
export const QUOTES: Quote[] = [
  {
    text: 'I was fortunate to be Kemi’s PhD supervisor. Her work was always of the highest quality. She showed great academic ability, studied independently, and brought real insight to everything she did. She is a model academic!',
    name: 'Dr Kumba Jallow',
    role: 'Lecturer, De Montfort University',
  },
  {
    text: 'Kemi was a very dutiful member of staff who was always keen to give her best to every audit assignment, and she consistently delivered very good work. She is also deeply committed to the firm’s long-term goals. I highly recommend her.',
    name: 'Ebenezer',
    role: 'CEO, KOO Partners, Lagos',
  },
  {
    text: 'Kemi is a highly skilled professional with a pragmatic, can-do approach. I really enjoyed working with her and found her supportive as well as fun to be around.',
    name: 'Jan Meredith',
    role: 'Development Manager, South Leicestershire College',
  },
];

export interface Award {
  title: string;
  detail: string;
}

/** Shown if the awards from Contentful can't be loaded at build time. */
export const FALLBACK_AWARDS: Award[] = [
  { title: 'Best Female Accounting Graduate', detail: 'Society of Women Accountants of Nigeria (SWAN), 1990' },
];

export interface Talk {
  when: string;
  event: string;
  place: string;
  role: string;
}

export const TALKS: Talk[] = [
  { when: 'March 2023', event: 'UK International Accountants Conference, ICAN UK District', place: 'London', role: 'Speaker' },
  { when: 'February 2023', event: '8th International Academic Conference on Accounting and Finance, ICAN', place: 'Godfrey Okoye University, Enugu', role: 'Guest speaker' },
  { when: 'January 2020', event: 'UN ECA Expert Group Meeting, Economic Report on Africa 2020', place: 'Sandton, Johannesburg', role: 'Expert reviewer' },
  { when: 'August 2019', event: 'Academy of Management Annual Meeting', place: 'Boston', role: 'Presenter, CSR communication and semiotics' },
];

export interface Place {
  name: string;
  /** Position on assets/world-dots.svg (viewBox 0 0 1000 372, equirectangular, lat 78 to -56). */
  x: number;
  y: number;
}

export const PLACE_XY: Record<string, [number, number]> = {
  Birmingham: [494.7, 70.8], London: [499.6, 73.5], Leicester: [496.9, 70.4], Nottingham: [496.8, 69.5],
  Liverpool: [491.7, 68.3], Coventry: [495.8, 71], Southampton: [496.1, 75.2], Durham: [495.6, 64.5],
  Oxford: [496.5, 72.9], Nigeria: [510.9, 197.2], Enugu: [520.9, 198.6], Johannesburg: [577.9, 289],
  Boston: [302.6, 98.9], Sydney: [920, 310.6], Townsville: [907.8, 270],
};

/** Grouped for the legend. Every place here is drawn on the map. */
export const ATLAS_GROUPS = [
  { label: 'Career', places: ['Nigeria', 'Leicester', 'Nottingham', 'London', 'Birmingham'], note: 'From her BSc, KPMG and Deloitte in Nigeria to De Montfort, Nottingham, SOAS and Aston.' },
  { label: 'Talks & reviews', places: ['London', 'Enugu', 'Johannesburg', 'Boston'], note: 'ICAN conferences, the UN Economic Report on Africa review and the Academy of Management.' },
  { label: 'Co-authors & journals', places: ['Liverpool', 'Coventry', 'Southampton', 'Durham', 'Oxford', 'Sydney', 'Townsville'], note: 'Where her collaborators work, and Abacus at the University of Sydney.' },
];

/** Routes drawn on the map: from home to each place abroad, plus a few links between them. */
export const ROUTES: [string, string][] = [
  ['Birmingham', 'Boston'], ['Birmingham', 'Nigeria'], ['Birmingham', 'Enugu'], ['Birmingham', 'Johannesburg'],
  ['Birmingham', 'Sydney'], ['Birmingham', 'Townsville'], ['London', 'Boston'], ['London', 'Johannesburg'],
  ['Nigeria', 'Johannesburg'], ['Enugu', 'London'], ['London', 'Sydney'], ['Liverpool', 'Boston'],
];

/** Soft lights that twinkle across the land, sampled once from the dot grid. d = delay, t = duration (s). */
export const TWINKLES: { x: number; y: number; d: number; t: number }[] = [{"x":169.4,"y":2.8,"d":4.54,"t":7.44},{"x":313.9,"y":280.4,"d":8.46,"t":5.98},{"x":491.7,"y":63.9,"d":6.37,"t":5.26},{"x":591.7,"y":47.2,"d":5.28,"t":5.75},{"x":719.4,"y":180.4,"d":2.98,"t":5.96},{"x":247.2,"y":119.4,"d":7.15,"t":8.39},{"x":786.1,"y":69.4,"d":1,"t":8.1},{"x":602.8,"y":191.6,"d":0.7,"t":6.03},{"x":297.2,"y":197.1,"d":1.38,"t":4.39},{"x":713.9,"y":119.4,"d":8.97,"t":5.1},{"x":508.3,"y":163.8,"d":5.69,"t":4.72},{"x":563.9,"y":147.1,"d":4.11,"t":6.96},{"x":586.1,"y":224.9,"d":1.24,"t":8.61},{"x":647.2,"y":52.7,"d":7.96,"t":8.45},{"x":541.7,"y":80.5,"d":7.97,"t":8.54},{"x":836.1,"y":169.3,"d":6.85,"t":5.38},{"x":497.2,"y":169.3,"d":0.09,"t":5.24},{"x":830.6,"y":19.4,"d":0.68,"t":4.01},{"x":497.2,"y":163.8,"d":5.55,"t":5.16},{"x":208.3,"y":102.7,"d":6.67,"t":6.45},{"x":347.2,"y":280.4,"d":6.19,"t":5.19},{"x":813.9,"y":219.3,"d":7.94,"t":5.18},{"x":930.6,"y":30.5,"d":3.37,"t":8.47},{"x":269.4,"y":113.8,"d":1.07,"t":6.45},{"x":363.9,"y":280.4,"d":0.03,"t":8.56},{"x":591.7,"y":163.8,"d":5.73,"t":8.61},{"x":780.6,"y":147.1,"d":0.19,"t":8.5},{"x":547.2,"y":130.5,"d":1.69,"t":8.84},{"x":386.1,"y":274.8,"d":5.09,"t":7.4},{"x":308.3,"y":274.8,"d":2.4,"t":5.11},{"x":502.8,"y":80.5,"d":1.88,"t":6.82},{"x":158.3,"y":75,"d":0.47,"t":7.85},{"x":386.1,"y":236,"d":6.31,"t":7.57},{"x":847.2,"y":69.4,"d":4.48,"t":4.16},{"x":791.7,"y":36.1,"d":0.99,"t":8.6},{"x":730.6,"y":63.9,"d":1.18,"t":7.44},{"x":563.9,"y":91.6,"d":8.04,"t":4.19},{"x":669.4,"y":63.9,"d":7.95,"t":8.31},{"x":586.1,"y":285.9,"d":8.93,"t":8.77},{"x":525,"y":124.9,"d":6.88,"t":6.1},{"x":713.9,"y":180.4,"d":2.23,"t":7.64},{"x":363.9,"y":258.2,"d":7.94,"t":5.99},{"x":997.2,"y":19.4,"d":2.11,"t":6.02},{"x":780.6,"y":58.3,"d":7.98,"t":6.79},{"x":663.9,"y":124.9,"d":3.16,"t":7.11},{"x":180.6,"y":113.8,"d":6.61,"t":5.68},{"x":241.7,"y":91.6,"d":6.53,"t":6.11},{"x":925,"y":41.6,"d":1.79,"t":5.56},{"x":325,"y":274.8,"d":8.87,"t":8.97},{"x":852.8,"y":19.4,"d":5.69,"t":8.36},{"x":197.2,"y":80.5,"d":8.26,"t":5},{"x":341.7,"y":75,"d":5.81,"t":4.68},{"x":208.3,"y":158.2,"d":4.48,"t":6.79},{"x":552.8,"y":280.4,"d":6.94,"t":8.73},{"x":525,"y":113.8,"d":4.34,"t":4.94},{"x":108.3,"y":41.6,"d":4.02,"t":4.83},{"x":636.1,"y":86.1,"d":5.96,"t":6.61},{"x":225,"y":63.9,"d":5.05,"t":6.53},{"x":175,"y":80.5,"d":6.81,"t":5.81},{"x":291.7,"y":91.6,"d":6.76,"t":4.13},{"x":852.8,"y":69.4,"d":2.69,"t":6.71},{"x":225,"y":119.4,"d":1.82,"t":7.61},{"x":497.2,"y":141.6,"d":2.62,"t":5.18},{"x":197.2,"y":52.7,"d":5.94,"t":6.15},{"x":875,"y":269.3,"d":0.68,"t":7.86},{"x":725,"y":97.2,"d":7.41,"t":8.58},{"x":586.1,"y":247.1,"d":8.19,"t":7.4},{"x":547.2,"y":147.1,"d":8.63,"t":4.13},{"x":530.6,"y":147.1,"d":6.86,"t":7.01},{"x":586.1,"y":113.8,"d":6.52,"t":8.49}];

/** Items for the slow wire strip under the masthead. The h-index line is filled in live. */
export const WIRE_ITEMS = [
  'Latest paper, in Abacus: “Clarity and Conciseness of Financial Narrative Disclosures”',
  '{hIndex}',
  '1,260 citations on Google Scholar',
  'Latest talk: ICAN UK conference, London',
  'Now accepting PhD students',
  'Teaching Sustainability and Accountability, MSc International Accounting and Finance',
];

export const PROFILE_LINKS: LinkItem[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/profkemiyekini/' },
  { label: 'Aston profile', href: 'https://research.aston.ac.uk/en/persons/cecilia-olukemi-yekini' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=7CyfrNsAAAAJ' },
  { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Kemi-Yekini' },
  { label: 'ORCID', href: 'https://orcid.org/0000-0003-2971-8094' },
];

export const TILES: Tile[] = [
  { big: true, label: 'Google Scholar', title: 'Every paper and citation', href: 'https://scholar.google.com/citations?user=7CyfrNsAAAAJ' },
  { label: 'Aston Research Explorer', title: 'Full university profile', href: 'https://research.aston.ac.uk/en/persons/cecilia-olukemi-yekini' },
  { label: 'ResearchGate', title: 'Full texts and updates', href: 'https://www.researchgate.net/profile/Kemi-Yekini' },
  { label: 'ORCID', title: 'Verified publication record', href: 'https://orcid.org/0000-0003-2971-8094' },
  { label: 'LinkedIn', title: 'Connect with Kemi', href: 'https://www.linkedin.com/in/profkemiyekini/' },
];
