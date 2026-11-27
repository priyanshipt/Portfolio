// Single source of truth for portfolio content.
// Everything here comes from Priyanshi's resume or her public GitHub profile.
// To update the site, edit this file only.

export const site = {
  name: 'Priyanshi Pareshbhai Trivedi',
  shortName: 'Priyanshi Trivedi',
  initials: 'PT',
  role: 'Aspiring Software Engineer',
  email: 'priyanshitrivedi51@gmail.com',
  github: 'https://github.com/priyanshipt',
  githubUsername: 'priyanshipt',
  linkedin: 'https://linkedin.com/in/gecr-comp240203107024',
  // Opens in a new tab in Google Drive's built-in viewer.
  resume: 'https://drive.google.com/file/d/1j2HBJI8kbzHBvD73Ug_0DpRG18Tvzboc/view?usp=drivesdk',
};

export const hireMeLink = `mailto:${site.email}?subject=${encodeURIComponent(
  'Opportunity for Priyanshi Trivedi'
)}&body=${encodeURIComponent('Hi Priyanshi,\n\nI came across your portfolio and would like to talk about ')}`;

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const about = {
  paragraphs: [
    'I started in a diploma program in Computer Engineering at A.V. Parekh Technical Institute, then moved into the B.E. program at Government Engineering College, Rajkot. That path gave me a strong base in programming and databases, and I learn fastest by building things.',
    'My projects cover three areas: web development (a food delivery site with Java and MongoDB, and a personal blog), data analysis (cleaning and visualizing bank marketing data with Pandas and Seaborn) and AI (a RAG chatbot that answers from uploaded documents and cites the page it used).',
    'I have also done short internship training at TatvaSoft (ASP.NET, AngularJS, PostgreSQL) and took part in the Codeversity Hackathon at IIT Gandhinagar. Right now I am exploring Generative AI, along with Docker and cloud tools, and looking for an entry-level software role where I can keep growing.',
  ],
  facts: [
    { label: 'Studying', value: 'B.E. Computer Engineering, GEC Rajkot (2024 to 2027)' },
    { label: 'Focus', value: 'Web development, data analysis, applied AI' },
    { label: 'Looking for', value: 'Entry-level software engineering role' },
  ],
};

export const skillGroups = [
  { title: 'Languages', items: ['Python', 'Java', 'JavaScript'] },
  { title: 'Frontend', items: ['React.js', 'HTML5', 'CSS3'] },
  { title: 'Backend and databases', items: ['REST APIs', 'MySQL', 'MongoDB'] },
  { title: 'Data science', items: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn'] },
  { title: 'AI and ML', items: ['Machine Learning', 'LangChain', 'Generative AI (learning)'] },
  { title: 'Tools and platforms', items: ['Git', 'GitHub', 'VS Code', 'Vercel'] },
];

// image: optional path in /public (for example '/projects/rag-chatbot.png'). Without it, a styled placeholder is shown.
// repos / demo: only include a link when it is verified. Missing links hide the button.
export const projects = [
  {
    id: 'rag-chatbot',
    featured: true,
    icon: 'bot',
    title: 'RAG ChatBot',
    summary:
      'A Retrieval-Augmented Generation chatbot that answers questions from uploaded PDF and TXT documents and cites the source page for every answer.',
    features: [
      'Switchable retrieval: semantic search or keyword-based search',
      'LangChain generates context-aware answers from the retrieved chunks',
      'Shows each retrieved chunk with its source, page number and similarity score',
      'Interactive Streamlit chat interface with chat history and Markdown export',
    ],
    tech: ['Python', 'Streamlit', 'LangChain', 'FAISS', 'Groq API'],
    repos: [{ label: 'Source code', href: 'https://github.com/priyanshipt/RAG-ChatBot' }],
    demo: null,
  },
  {
    id: 'bank-analysis',
    icon: 'chart',
    title: 'Bank Marketing and Term Deposit Analysis',
    summary:
      'Exploratory data analysis of a bank marketing campaign to find patterns in customer behavior and term deposit subscriptions.',
    features: [
      'Cleaned and explored campaign data with Pandas',
      'Visualized subscription trends with Seaborn in Jupyter notebooks',
    ],
    tech: ['Python', 'Pandas', 'Seaborn', 'Jupyter'],
    repos: [
      {
        label: 'Advanced analysis',
        href: 'https://github.com/priyanshipt/Advanced-Bank-Term-Deposit-Analysis',
      },
      {
        label: 'Initial analysis',
        href: 'https://github.com/priyanshipt/Bank-Marketing-Data-Analysis',
      },
    ],
    demo: null,
  },
  {
    id: 'food-delivery',
    icon: 'food',
    title: 'Food Delivery Website',
    summary: 'A site where users browse food items and place orders.',
    features: [
      'Order logic written in Java',
      'Food and order data stored in MongoDB',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Java', 'MongoDB'],
    repos: [], // Add { label: 'Source code', href: '...' } once the repository link is confirmed.
    demo: null,
  },
  {
    id: 'inked-blog',
    icon: 'pen',
    title: 'Inked by Priyanshi',
    summary: 'A personal blog and creative writing site with poems, shayari and book reviews, deployed on GitHub Pages.',
    features: ['Designed and deployed as a personal creative space'],
    tech: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    repos: [{ label: 'Source code', href: 'https://github.com/priyanshipt/inked-by-priyanshi' }],
    demo: null, // Add the live GitHub Pages URL here once confirmed.
  },
  {
    id: 'port-management',
    icon: 'ship',
    title: 'Port Management System',
    badge: 'Forked repository',
    summary:
      'A full-stack CRUD application for vessel scheduling, container inventory and live berth status. This is a fork of ChintanLakum/Port-Management-System that I worked with; the original work belongs to its author.',
    features: ['Worked with the full-stack CRUD codebase'],
    tech: ['JavaScript'],
    repos: [{ label: 'Forked repository', href: 'https://github.com/priyanshipt/Port-Management-System' }],
    demo: null,
  },
];

export const education = [
  {
    title: 'B.E. in Computer Engineering',
    place: 'Government Engineering College (GEC), Rajkot',
    period: '2024 to 2027',
    note: '8.15 CGPA after 6th semester',
  },
  {
    title: 'Diploma in Computer Engineering',
    place: 'A.V. Parekh Technical Institute',
    period: '2021 to 2024',
    note: '8.77 CGPA',
  },
  {
    title: '10th Standard',
    place: 'Sardar Patel Education Trust, Gadhada',
    period: '2018',
    note: '90 PR',
  },
];

export const internships = [
  {
    title: 'Internship training',
    place: 'TatvaSoft',
    period: 'Jul 2026 to Aug 2026 (15 days)',
    tech: ['ASP.NET', 'AngularJS', 'PostgreSQL'],
    note: 'Learned ASP.NET for the backend, AngularJS for the frontend and PostgreSQL for the database.',
  },
  {
    title: 'Computer Hardware and Networking training',
    place: 'National Small Industries Corporation (NSIC)',
    period: 'Sep 2022 to Dec 2022',
    tech: [],
    note: 'Built a practical understanding of hardware maintenance and basic networking concepts.',
  },
];

export const certifications = [
  { title: 'Data Analytics Job Simulation', issuer: 'Deloitte (Forage)', date: 'Jun 2026' },
  { title: 'Cybersecurity Job Simulation', issuer: 'Deloitte (Forage)', date: 'Jun 2026' },
  { title: 'Cybersecurity Analyst Job Simulation', issuer: 'Tata Group (Forage)', date: 'Jun 2026' },
  { title: 'Codeversity Hackathon', issuer: 'IIT Gandhinagar', date: 'Feb 2026' },
];
