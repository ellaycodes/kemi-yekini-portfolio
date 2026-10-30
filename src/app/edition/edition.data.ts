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

export interface Publication {
  feature?: boolean;
  bg: string;
  venue: string;
  title: string;
  kind: string;
  year: string;
  authors?: string;
  href?: string;
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

export const HERO_STATS: Stat[] = [
  { value: 1260, label: 'Citations' },
  { value: 37, label: 'Research outputs' },
  { value: 23, label: 'Journal articles' },
  { value: 30, suffix: '+', label: 'Years in accounting' },
];

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

export const PUBLICATIONS: Publication[] = [
  {
    feature: true,
    bg: '#0e1b30',
    venue: 'Abacus · Wiley',
    title: 'Clarity and Conciseness of Financial Narrative Disclosures: Does the Practice Statement Matter?',
    kind: 'Journal article',
    year: '2025',
    authors: 'Ekaete Efretuei and Kemi Yekini',
    href: 'https://doi.org/10.1111/abac.70018',
    body: [
      'The IASB asked, in its 2021 exposure draft on management commentary, whether clarity and conciseness matter in what companies write about their performance. This paper answers that question with evidence.',
      'Using a new measure built specifically for financial disclosures, the authors test whether adopting IFRS made management commentary clearer and more concise. They find the opposite: narratives became less clear and less concise after firms adopted IFRS.',
      'The findings were presented at the IFRS Foundation research forum in November 2024. The paper is open access.',
    ],
  },
  {
    bg: '#24385a',
    venue: 'J. of International Accounting, Auditing & Taxation',
    title: 'Diffusion theory, economic consequences, and adoption of international standards on auditing around the world',
    kind: 'Journal article',
    year: '2024',
    authors: 'Ibrahim Elmghaamez, Collins G. Ntim and Kemi Yekini',
    href: 'https://doi.org/10.1016/j.intaccaudtax.2024.100641',
    body: [
      'What happens to a country’s economy when it adopts the International Standards on Auditing? Drawing on 160 countries over 20 years, this study looks at that question through diffusion of innovation theory.',
      'Early adoption is linked to stronger foreign direct investment and exchange rates, and late adoption to exports and interest rates. The results also show some negative links, including between early adoption and export growth, so the economic effects are mixed rather than uniformly positive.',
      'The paper is open access.',
    ],
  },
  {
    bg: '#3a4658',
    venue: 'Business Ethics, the Environment & Responsibility',
    title: 'Socially Responsible Purchasing (SRP) in the Supply Chain Industry: Meanings and Influences',
    kind: 'Journal article',
    year: '2024',
    authors: 'Titilayo Ogunyemi, Emmanuel Adegbite, Franklin Nakpodia, Kemi Yekini and Angela Ayios',
    href: 'https://doi.org/10.1111/beer.12655',
    body: [
      'Companies are under growing pressure to act responsibly across their supply chains, but what does socially responsible purchasing actually mean in practice?',
      'Using stakeholder theory and face-to-face interviews with practitioners at multinational and local organisations in Nigeria, the paper maps the meaning of SRP, its components and boundaries, and the internal and external pressures that shape it.',
      'It offers practical insight for managers, purchasers, suppliers, analysts and policymakers. The paper is open access.',
    ],
  },
  {
    bg: '#0e1b30',
    venue: 'Business & Society',
    title: 'Making sense of CSR reports the semiotic way',
    kind: 'Journal article',
    year: '2023',
    body: [
      'How semiotics, the study of signs and meaning, can strengthen corporate social responsibility communication.',
      'By reading the language and symbolism in CSR reports, companies can communicate their values more authentically and build trust with stakeholders, investors and customers.',
    ],
  },
  {
    bg: '#24385a',
    venue: 'Business & Society · SAGE',
    title: 'A theoretical model for measuring CSR/sustainability reports quality',
    kind: 'Journal article',
    year: '2019',
    href: 'https://doi.org/10.1177/0007650319843623',
    body: [
      'This article presents a semiotics-based model for judging the quality of CSR and sustainability reports through the language they use.',
      'The model gives researchers and practitioners both qualitative and quantitative tools to assess how transparent and accurate a company’s sustainability communication really is.',
    ],
  },
  {
    bg: '#3a4658',
    venue: 'Encyclopedia of Sustainable Management',
    title: 'Making Sense of CSR Reports: A Methodological Perspective from Semiotics',
    kind: 'Encyclopedia entry',
    year: 'Springer',
    href: 'https://doi.org/10.1007/978-3-030-02006-4_1159-1',
    body: ['A reference entry on using semiotics to assess CSR reports, showing how language and symbols reveal a company’s transparency and ethical values.'],
  },
  {
    bg: '#0e1b30',
    venue: 'Encyclopedia of Sustainable Management',
    title: 'Corporate Community Involvement',
    kind: 'Encyclopedia entry',
    year: 'Springer',
    href: 'https://doi.org/10.1007/978-3-030-02006-4_346-1',
    body: ['A reference entry defining corporate community involvement: how businesses engage in initiatives that meet the needs of the communities they operate in.'],
  },
  {
    bg: '#24385a',
    venue: 'Encyclopedia of Sustainable Management',
    title: 'CSR Disclosure, Quality Measurement of',
    kind: 'Encyclopedia entry',
    year: 'Springer',
    href: 'https://doi.org/10.1007/978-3-030-02006-4_344-1',
    body: ['A reference entry on why measuring the quality of CSR disclosure is hard, and how scholars differ on its definitions and metrics.'],
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
