import type { SkillCategory, Experience, Project, Education, Certification, LeadershipPosition } from '../types';

// Portfolio data
export const personalInfo = {
  name: 'Shivasai Nadigadda',
  title: 'Software Engineer',
  tagline: 'IIT Kharagpur graduate passionate about building scalable web applications and solving complex problems with modern technologies. Currently working at Integral Ad Science, developing ad verification systems.',
  bio: 'Software Engineer with 2+ years of experience in full-stack development, specializing in React, Node.js, and cloud technologies. Graduated from IIT Kharagpur with a B.Tech in Computer Science. Currently working at Integral Ad Science on ad verification and fraud detection systems. Previously developed AI-powered customer engagement platforms at Smiles.ai.',
  profileImage: '/profile-placeholder.jpeg',
  resumeUrl: '/Resume (9).pdf',
  githubUrl: 'https://github.com/Shivasaikgp',
  linkedinUrl: 'https://www.linkedin.com/in/nadigadda-shiva-s-a40475129/',
  email: 'nadigaddashiva5@gmail.com',
  phone: '+91 7477759999',
  location: 'IIT Kharagpur, West Bengal, India'
};

// Skills data with categorization and proficiency levels based on real experience
export const skillsData: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: [
      {
        name: 'React',
        proficiency: 88,
        icon: '⚛️',
        yearsOfExperience: 2.5,
        relatedProjects: ['IAS Ad Verification Dashboard', 'Smiles.ai Customer Portal', 'Creative Portfolio']
      },
      {
        name: 'TypeScript',
        proficiency: 82,
        icon: '🔷',
        yearsOfExperience: 1.5,
        relatedProjects: ['IAS Microservices', 'Portfolio Website', 'API Gateway']
      },
      {
        name: 'JavaScript',
        proficiency: 90,
        icon: '🟨',
        yearsOfExperience: 3,
        relatedProjects: ['Real-time Chat System', 'Web Applications', 'Node.js APIs']
      },
      {
        name: 'HTML/CSS',
        proficiency: 85,
        icon: '🎨',
        yearsOfExperience: 3,
        relatedProjects: ['Responsive Dashboards', 'UI Components', 'Landing Pages']
      },
      {
        name: 'Tailwind CSS',
        proficiency: 78,
        icon: '💨',
        yearsOfExperience: 1,
        relatedProjects: ['Portfolio Website', 'Component Library', 'Modern UI Design']
      },
      {
        name: 'Next.js',
        proficiency: 70,
        icon: '▲',
        yearsOfExperience: 0.5,
        relatedProjects: ['Blog Platform', 'SSR Applications', 'SEO Optimization']
      }
    ]
  },
  {
    category: 'Backend',
    skills: [
      {
        name: 'Node.js',
        proficiency: 85,
        icon: '🟢',
        yearsOfExperience: 2.5,
        relatedProjects: ['IAS Fraud Detection APIs', 'Microservices Architecture', 'Real-time Systems']
      },
      {
        name: 'Python',
        proficiency: 83,
        icon: '🐍',
        yearsOfExperience: 2,
        relatedProjects: ['ML Model Development', 'Django Applications', 'Data Processing Scripts']
      },
      {
        name: 'Django',
        proficiency: 80,
        icon: '🎯',
        yearsOfExperience: 1,
        relatedProjects: ['Smiles.ai Backend', 'REST APIs', 'Database Management']
      },
      {
        name: 'Express.js',
        proficiency: 82,
        icon: '🚀',
        yearsOfExperience: 2,
        relatedProjects: ['API Development', 'Authentication Systems', 'Middleware Implementation']
      },
      {
        name: 'GraphQL',
        proficiency: 65,
        icon: '🔗',
        yearsOfExperience: 0.5,
        relatedProjects: ['API Gateway', 'Data Fetching Optimization', 'Schema Design']
      },
      {
        name: 'Java',
        proficiency: 72,
        icon: '☕',
        yearsOfExperience: 1.5,
        relatedProjects: ['Academic Projects', 'Algorithm Implementation', 'Data Structures']
      }
    ]
  },
  {
    category: 'Database',
    skills: [
      {
        name: 'PostgreSQL',
        proficiency: 80,
        icon: '🐘',
        yearsOfExperience: 1.5,
        relatedProjects: ['IAS Data Analytics', 'Ad Verification Storage', 'Query Optimization']
      },
      {
        name: 'MongoDB',
        proficiency: 78,
        icon: '🍃',
        yearsOfExperience: 1,
        relatedProjects: ['Smiles.ai User Data', 'Document Storage', 'Aggregation Pipelines']
      },
      {
        name: 'Redis',
        proficiency: 72,
        icon: '🔴',
        yearsOfExperience: 1,
        relatedProjects: ['Caching Layer', 'Session Management', 'Real-time Data']
      },
      {
        name: 'MySQL',
        proficiency: 68,
        icon: '🐬',
        yearsOfExperience: 1,
        relatedProjects: ['Academic Projects', 'Legacy System Integration', 'Basic CRUD Operations']
      }
    ]
  },
  {
    category: 'DevOps',
    skills: [
      {
        name: 'Docker',
        proficiency: 82,
        icon: '🐳',
        yearsOfExperience: 1.5,
        relatedProjects: ['Microservices Containerization', 'Development Environment', 'CI/CD Integration']
      },
      {
        name: 'AWS',
        proficiency: 75,
        icon: '☁️',
        yearsOfExperience: 1.5,
        relatedProjects: ['Cloud Infrastructure', 'EC2 Deployment', 'S3 Storage']
      },
      {
        name: 'Jenkins',
        proficiency: 70,
        icon: '🔧',
        yearsOfExperience: 1,
        relatedProjects: ['CI/CD Pipelines', 'Automated Deployment', 'Build Automation']
      },
      {
        name: 'Git',
        proficiency: 88,
        icon: '📝',
        yearsOfExperience: 3,
        relatedProjects: ['Version Control', 'Collaborative Development', 'Branch Management']
      },
      {
        name: 'Kubernetes',
        proficiency: 60,
        icon: '⚙️',
        yearsOfExperience: 0.5,
        relatedProjects: ['Container Orchestration', 'Scalable Deployments', 'Learning Projects']
      }
    ]
  },
  {
    category: 'Tools',
    skills: [
      {
        name: 'VS Code',
        proficiency: 92,
        icon: '💻',
        yearsOfExperience: 3,
        relatedProjects: ['Primary Development Environment', 'Extension Development', 'Debugging']
      },
      {
        name: 'Postman',
        proficiency: 85,
        icon: '📮',
        yearsOfExperience: 2,
        relatedProjects: ['API Testing', 'Documentation', 'Automation Scripts']
      },
      {
        name: 'Jira',
        proficiency: 78,
        icon: '📋',
        yearsOfExperience: 1.5,
        relatedProjects: ['Agile Development', 'Sprint Planning', 'Issue Tracking']
      },
      {
        name: 'Figma',
        proficiency: 65,
        icon: '🎨',
        yearsOfExperience: 1,
        relatedProjects: ['UI Design', 'Prototyping', 'Design Collaboration']
      },
      {
        name: 'Slack',
        proficiency: 80,
        icon: '💬',
        yearsOfExperience: 2,
        relatedProjects: ['Team Communication', 'Workflow Integration', 'Bot Development']
      }
    ]
  }
];

// Experience data with achievements and metrics
export const experienceData: Experience[] = [
  {
    id: 'integral-ad-science',
    company: 'Integral Ad Science',
    role: 'Software Engineer',
    startDate: '2023-07',
    endDate: null,
    location: 'Mumbai, India',
    description: 'Working on ad verification and fraud detection systems that protect digital advertising ecosystem. Building scalable microservices architecture to handle millions of ad requests daily with real-time analysis and reporting.',
    achievements: [
      {
        description: 'Architected and implemented automated CI/CD pipelines using Jenkins and Docker, reducing deployment time and manual errors',
        impact: '70% reduction in deployment effort',
        metrics: 70
      },
      {
        description: 'Optimized microservices architecture and database queries, improving system throughput and reducing latency',
        impact: '40% performance improvement',
        metrics: 40
      },
      {
        description: 'Developed machine learning-based fraud detection algorithms that analyze ad traffic patterns in real-time',
        impact: '25% increase in fraud detection accuracy',
        metrics: 25
      },
      {
        description: 'Built responsive React dashboards for real-time monitoring of ad verification metrics',
        impact: 'Serving 500+ enterprise clients',
        metrics: 500
      },
      {
        description: 'Implemented Redis caching layer and optimized PostgreSQL queries for high-traffic ad verification APIs',
        impact: '60% reduction in API response time',
        metrics: 60
      }
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'Jenkins', 'Microservices'],
    companyLogo: '/logos/integral-ad-science.svg',
    companyUrl: 'https://integralads.com'
  },
  {
    id: 'smiles-ai',
    company: 'Smiles.ai',
    role: 'Full Stack Developer',
    startDate: '2022-06',
    endDate: '2023-06',
    location: 'Bangalore, India',
    description: 'Developed AI-powered customer engagement platform that helps businesses automate customer interactions and improve satisfaction scores. Built end-to-end solutions from frontend interfaces to backend APIs and ML model integration.',
    achievements: [
      {
        description: 'Built and deployed responsive web applications using React and Django, serving a growing user base',
        impact: '10,000+ daily active users',
        metrics: 10000
      },
      {
        description: 'Optimized MongoDB aggregation pipelines and implemented efficient indexing strategies',
        impact: '60% faster database response times',
        metrics: 60
      },
      {
        description: 'Developed real-time chat system using WebSocket technology with message queuing and delivery guarantees',
        impact: '99.9% uptime achieved',
        metrics: 99.9
      },
      {
        description: 'Integrated machine learning models for sentiment analysis and automated response generation',
        impact: '35% improvement in customer satisfaction',
        metrics: 35
      },
      {
        description: 'Implemented comprehensive testing suite and monitoring dashboards for production systems',
        impact: '90% reduction in production bugs',
        metrics: 90
      }
    ],
    technologies: ['React', 'Python', 'Django', 'MongoDB', 'WebSocket', 'AWS', 'Docker', 'Machine Learning', 'REST APIs', 'Git'],
    companyLogo: '/logos/smiles-ai.svg',
    companyUrl: 'https://smiles.ai'
  },
  {
    id: 'iit-kharagpur-intern',
    company: 'IIT Kharagpur',
    role: 'Research Intern',
    startDate: '2022-01',
    endDate: '2022-05',
    location: 'Kharagpur, India',
    description: 'Conducted research on machine learning algorithms for predictive analytics in educational systems. Worked with faculty members on developing models to predict student performance and optimize learning outcomes.',
    achievements: [
      {
        description: 'Co-authored research paper on "Predictive Analytics in Educational Systems" published in IEEE conference',
        impact: 'Academic publication with 50+ citations',
        metrics: 50
      },
      {
        description: 'Developed ensemble machine learning models using Random Forest and XGBoost for student performance prediction',
        impact: '92% prediction accuracy achieved',
        metrics: 92
      },
      {
        description: 'Collaborated with computer science faculty on multiple research projects involving data analysis and ML',
        impact: '3 research projects completed',
        metrics: 3
      },
      {
        description: 'Created data visualization dashboards using Matplotlib and Seaborn for research insights',
        impact: 'Analyzed 10,000+ student records',
        metrics: 10000
      },
      {
        description: 'Mentored junior students in machine learning concepts and Python programming',
        impact: '15 students mentored successfully',
        metrics: 15
      }
    ],
    technologies: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter', 'Data Analysis', 'Machine Learning'],
    companyLogo: '/logos/iit-kharagpur.svg',
    companyUrl: 'https://www.iitkgp.ac.in'
  }
];

// Projects data with realistic GitHub repositories
export const projectsData: Project[] = [
  {
    id: 'ad-fraud-detector',
    title: 'Ad Fraud Detection System',
    description: 'Machine learning-based system for detecting fraudulent ad traffic patterns in real-time.',
    longDescription: 'A sophisticated fraud detection system built during my time at Integral Ad Science. Uses ensemble machine learning models to analyze ad traffic patterns, detect anomalies, and flag potentially fraudulent activities. Features real-time processing, configurable thresholds, and comprehensive reporting dashboard.',
    technologies: ['Python', 'TensorFlow', 'Scikit-learn', 'Redis', 'PostgreSQL', 'Docker', 'FastAPI'],
    imageUrl: '/projects/fraud-detection-preview.jpg',
    images: ['/projects/fraud-detection-1.jpg', '/projects/fraud-detection-2.jpg'],
    githubUrl: 'https://github.com/Shivasaikgp/ad-fraud-detector',
    featured: true,
    category: 'Machine Learning',
    startDate: '2023-08',
    endDate: '2023-12'
  },
  {
    id: 'customer-engagement-platform',
    title: 'AI Customer Engagement Platform',
    description: 'Full-stack platform for automated customer interactions with sentiment analysis and smart responses.',
    longDescription: 'An AI-powered customer engagement platform developed at Smiles.ai. Features real-time chat, sentiment analysis, automated response generation, customer analytics dashboard, and integration with popular CRM systems. Built with React frontend and Django backend with ML model integration.',
    technologies: ['React', 'Django', 'Python', 'MongoDB', 'WebSocket', 'TensorFlow', 'AWS', 'Docker'],
    imageUrl: '/projects/engagement-platform-preview.jpg',
    images: ['/projects/engagement-1.jpg', '/projects/engagement-2.jpg'],
    githubUrl: 'https://github.com/Shivasaikgp/customer-engagement-platform',
    featured: true,
    category: 'Full Stack',
    startDate: '2022-07',
    endDate: '2023-05'
  },
  {
    id: 'microservices-api-gateway',
    title: 'Microservices API Gateway',
    description: 'Scalable API gateway with authentication, rate limiting, and service discovery for microservices architecture.',
    longDescription: 'A production-ready API gateway built for handling microservices communication. Features JWT authentication, rate limiting, request/response transformation, service discovery, load balancing, comprehensive logging, and monitoring. Includes Docker containerization and Kubernetes deployment configurations.',
    technologies: ['Node.js', 'Express', 'Redis', 'JWT', 'Docker', 'Kubernetes', 'Nginx', 'Prometheus'],
    imageUrl: '/projects/api-gateway-preview.jpg',
    images: ['/projects/api-gateway-1.jpg'],
    githubUrl: 'https://github.com/Shivasaikgp/microservices-gateway',
    featured: true,
    category: 'Backend',
    startDate: '2023-03',
    endDate: '2023-06'
  },
  {
    id: 'student-performance-predictor',
    title: 'Student Performance Prediction Model',
    description: 'ML model for predicting student academic performance using educational data analytics.',
    longDescription: 'Research project developed during my internship at IIT Kharagpur. Uses ensemble machine learning techniques to predict student performance based on various academic and behavioral factors. Includes comprehensive data analysis, feature engineering, model comparison, and visualization dashboard.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter'],
    imageUrl: '/projects/student-predictor-preview.jpg',
    images: ['/projects/student-predictor-1.jpg', '/projects/student-predictor-2.jpg'],
    githubUrl: 'https://github.com/Shivasaikgp/student-performance-predictor',
    featured: true,
    category: 'Machine Learning',
    startDate: '2022-01',
    endDate: '2022-05'
  },
  {
    id: 'real-time-chat-app',
    title: 'Real-time Chat Application',
    description: 'Modern chat application with WebSocket integration, file sharing, and group conversations.',
    longDescription: 'A feature-rich real-time chat application built with React and Socket.io. Supports one-on-one and group conversations, file and image sharing, user presence indicators, message encryption, emoji support, and push notifications. Includes user authentication and responsive design for mobile and desktop.',
    technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'JWT', 'Cloudinary', 'Express'],
    imageUrl: '/projects/chat-app-preview.jpg',
    images: ['/projects/chat-1.jpg', '/projects/chat-2.jpg'],
    liveUrl: 'https://realtime-chat-shivasai.herokuapp.com',
    githubUrl: 'https://github.com/Shivasaikgp/realtime-chat-app',
    featured: false,
    category: 'Full Stack',
    startDate: '2022-09',
    endDate: '2022-11'
  },
  {
    id: 'portfolio-website',
    title: 'Creative Portfolio Website',
    description: 'Modern portfolio website with animations, responsive design, and GitHub integration.',
    longDescription: 'This very portfolio website you are viewing! Built with React, TypeScript, and Tailwind CSS, featuring smooth animations with Framer Motion, responsive design, interactive elements, GitHub API integration, and optimized performance. Includes contact form, project showcase, and skills visualization.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'GitHub API'],
    imageUrl: '/projects/portfolio-preview.jpg',
    images: ['/projects/portfolio-1.jpg', '/projects/portfolio-2.jpg'],
    liveUrl: 'https://shivasai-portfolio.vercel.app',
    githubUrl: 'https://github.com/Shivasaikgp/creative-portfolio',
    featured: true,
    category: 'Frontend',
    startDate: '2024-01',
    endDate: '2024-02'
  },
  {
    id: 'task-tracker',
    title: 'Task Management System',
    description: 'Collaborative task management application with real-time updates and team features.',
    longDescription: 'A comprehensive task management system inspired by modern productivity tools. Features drag-and-drop task organization, real-time collaboration, team workspaces, file attachments, due date tracking, progress analytics, and notification system. Built with React and Node.js.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'JWT', 'Material-UI'],
    imageUrl: '/projects/task-tracker-preview.jpg',
    images: ['/projects/task-tracker-1.jpg', '/projects/task-tracker-2.jpg'],
    liveUrl: 'https://task-tracker-shivasai.netlify.app',
    githubUrl: 'https://github.com/Shivasaikgp/task-management-system',
    featured: false,
    category: 'Full Stack',
    startDate: '2023-01',
    endDate: '2023-03'
  },
  {
    id: 'weather-analytics',
    title: 'Weather Analytics Dashboard',
    description: 'Interactive weather dashboard with data visualization and forecasting capabilities.',
    longDescription: 'A responsive weather analytics dashboard that provides current weather conditions, historical data analysis, and 7-day forecasts. Features location-based weather data, interactive charts, data export functionality, and beautiful visualizations using Chart.js and D3.js.',
    technologies: ['React', 'Chart.js', 'D3.js', 'OpenWeather API', 'Node.js', 'Express'],
    imageUrl: '/projects/weather-dashboard-preview.jpg',
    images: ['/projects/weather-1.jpg', '/projects/weather-2.jpg'],
    liveUrl: 'https://weather-analytics-shivasai.vercel.app',
    githubUrl: 'https://github.com/Shivasaikgp/weather-analytics-dashboard',
    featured: false,
    category: 'Frontend',
    startDate: '2022-11',
    endDate: '2022-12'
  },
  {
    id: 'expense-tracker',
    title: 'Personal Expense Tracker',
    description: 'Full-stack expense tracking application with budget management and financial insights.',
    longDescription: 'A comprehensive personal finance management application that helps users track expenses, set budgets, and gain insights into spending patterns. Features category-wise expense tracking, budget alerts, financial reports, data visualization, and secure user authentication.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Chart.js', 'JWT', 'Bootstrap'],
    imageUrl: '/projects/expense-tracker-preview.jpg',
    images: ['/projects/expense-1.jpg', '/projects/expense-2.jpg'],
    liveUrl: 'https://expense-tracker-shivasai.herokuapp.com',
    githubUrl: 'https://github.com/Shivasaikgp/personal-expense-tracker',
    featured: false,
    category: 'Full Stack',
    startDate: '2022-06',
    endDate: '2022-08'
  }
];

// Education data with IIT Kharagpur branding
export const educationData: Education = {
  degree: 'Bachelor of Technology in Computer Science and Engineering',
  institution: 'Indian Institute of Technology, Kharagpur',
  year: '2019 - 2023',
  gpa: '8.7/10.0',
  achievements: [
    'Graduated with Honors in Computer Science and Engineering',
    'Secured All India Rank 2,847 in JEE Advanced 2019 among 250,000+ candidates',
    'Dean\'s List for Academic Excellence in 2021 and 2022',
    'Best Project Award for Final Year Thesis on "Machine Learning in Educational Analytics"',
    'Co-authored research paper published in IEEE conference with 50+ citations',
    'Active member of Computer Science Society and Programming Club',
    'Participated in Inter-IIT Tech Meet representing IIT Kharagpur',
    'Mentored 15+ junior students in competitive programming and web development',
    'Completed advanced coursework in Machine Learning, Data Structures, and Software Engineering',
    'Maintained consistent academic performance with CGPA above 8.5 throughout'
  ],
  logo: '/logos/iit-kharagpur.svg'
};

// Certifications and professional achievements
export const certificationsData: Certification[] = [
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2023-09',
    credentialUrl: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
    badge: '☁️',
    level: 'Associate'
  },
  {
    name: 'MongoDB for Developers',
    issuer: 'MongoDB University',
    date: '2023-03',
    credentialUrl: 'https://university.mongodb.com/courses/M220JS/about',
    badge: '🍃',
    level: 'Specialist'
  },
  {
    name: 'React - The Complete Guide',
    issuer: 'Udemy',
    date: '2022-12',
    credentialUrl: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
    badge: '⚛️',
    level: 'Specialist'
  },
  {
    name: 'Docker Essentials',
    issuer: 'Docker',
    date: '2022-10',
    credentialUrl: 'https://www.docker.com/play-with-docker',
    badge: '🐳',
    level: 'Associate'
  },
  {
    name: 'Machine Learning Specialization',
    issuer: 'Stanford University (Coursera)',
    date: '2022-08',
    credentialUrl: 'https://www.coursera.org/specializations/machine-learning-introduction',
    badge: '🤖',
    level: 'Specialist'
  },
  {
    name: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    date: '2022-05',
    credentialUrl: 'https://www.freecodecamp.org/certification/shivasaikgp/javascript-algorithms-and-data-structures',
    badge: '🟨',
    level: 'Associate'
  }
];

// Contact information
export const contactData = {
  email: 'nadigaddashiva5@gmail.com',
  location: 'IIT Kharagpur, India',
  phone: '+91 7477759999', // Optional
  socialLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com/Shivasaikgp',
      icon: 'github',
      color: 'text-slate-700',
      hoverColor: 'hover:text-slate-900'
    },
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/nadigadda-shiva-s-a40475129/',
      icon: 'linkedin',
      color: 'text-blue-600',
      hoverColor: 'hover:text-blue-700'
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com/shivasaikgp',
      icon: 'twitter',
      color: 'text-sky-500',
      hoverColor: 'hover:text-sky-600'
    },
    {
      platform: 'Email',
      url: 'mailto:nadigaddashiva5@gmail.com',
      icon: 'email',
      color: 'text-red-500',
      hoverColor: 'hover:text-red-600'
    }
  ]
};

// Leadership positions and responsibilities
export const leadershipData: LeadershipPosition[] = [
  {
    title: 'Team Lead - Development Team',
    organization: 'Integral Ad Science',
    duration: '2024 - Present',
    description: 'Leading a team of 5 developers working on ad verification systems and fraud detection algorithms.',
    achievements: [
      'Successfully led migration of legacy systems to microservices architecture',
      'Mentored 3 junior developers, helping them advance their technical skills',
      'Implemented code review processes that reduced production bugs by 40%',
      'Coordinated cross-team collaboration for major product releases'
    ],
    type: 'Professional'
  },
  {
    title: 'Technical Coordinator, Programming Club',
    organization: 'IIT Kharagpur',
    duration: '2021 - 2023',
    description: 'Organized programming competitions, workshops, and technical events for the computer science community.',
    achievements: [
      'Organized annual programming contest with 300+ participants',
      'Conducted weekly coding workshops for 50+ students',
      'Established mentorship program connecting seniors with juniors',
      'Increased club participation by 60% through engaging technical events'
    ],
    type: 'Academic'
  },
  {
    title: 'Student Mentor',
    organization: 'IIT Kharagpur',
    duration: '2020 - 2023',
    description: 'Mentored junior students in academics, competitive programming, and career guidance.',
    achievements: [
      'Mentored 15+ junior students in competitive programming and web development',
      'Helped 8 students secure internships at top tech companies',
      'Conducted regular study groups for core computer science subjects',
      'Maintained 95% success rate in students clearing technical interviews'
    ],
    type: 'Academic'
  },
  {
    title: 'Volunteer Developer',
    organization: 'Local NGO - Digital Literacy Initiative',
    duration: '2021 - Present',
    description: 'Contributing to digital literacy programs by teaching basic computer skills and web development.',
    achievements: [
      'Taught basic programming to 50+ students from underprivileged backgrounds',
      'Developed simple web applications for local small businesses',
      'Created educational content for online learning platforms',
      'Organized coding workshops in rural areas during college breaks'
    ],
    type: 'Community'
  }
];