// Edit this file to update projects. repo/demo/image = null means "not added yet".
// Put screenshots in public/projects/ and reference them like '/projects/medicare-ai.png'.
// `features` are drawn from your project descriptions: verify and edit them to match what you actually built.
export const FILTERS = [['all', 'All'], ['ai', 'AI/ML'], ['web', 'Web Development'], ['dsa', 'Java/DSA']]
export const PROJECTS = [
  { id: 'medicare-ai', name: 'Medicare-AI', category: 'ai', label: 'AI / ML',
    problem: 'Healthcare tools and patient information are scattered across separate interfaces.',
    description: 'An AI-assisted healthcare platform that brings healthcare-related tools, patient information and useful application workflows into one interface.',
    tech: ['React', 'FastAPI', 'Python', 'SQLite'],
    features: ['Unified interface for healthcare workflows', 'Patient information handling', 'AI-assisted tooling'],
    repo: 'https://github.com/abhishekanandtiwari/Medicare', demo: null, image: '/projects/medicare-ai.png' },
  { id: 'autoscaling', name: 'AI-Based Predictive Autoscaling Engine', category: 'ai', label: 'AI / ML',
    problem: 'Reactive scaling lags behind sudden workload changes.',
    description: 'A machine-learning project that forecasts incoming workload and supports resource-scaling decisions.',
    tech: ['Python', 'Flask', 'Pandas', 'Scikit-learn'],
    features: ['Workload forecasting', 'Scaling decision support'],
    repo: 'https://github.com/abhishekanandtiwari/AI-Based-Predictive-Autoscaling-Engine', demo: null, image: '/projects/autoscaling-engine.png' },
  { id: 'mini-search', name: 'Mini Search Engine', category: 'dsa', label: 'Java / DSA',
    problem: 'Finding the right document in a collection needs fast indexing and lookup.',
    description: 'A Java search application that uses HashMap and Trie data structures for document indexing and search.',
    tech: ['Java', 'Swing', 'HashMap', 'Trie'],
    features: ['HashMap-based document indexing', 'Trie-based prefix lookup', 'Swing desktop interface'],
    repo: 'https://github.com/abhishekanandtiwari/Mini-Search-Engine', demo: null, image: '/projects/mini-search-engine.png' },
]
