export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'ai-cv' | 'web-dev' | 'other';
  skills: string[];
  image: string;
  liveDemo?: string;
  github?: string;
  featured?: boolean;
  detailedDescription?: string;
  challenges?: string[];
  solutions?: string[];
  outcomes?: string[];
  techStack?: {
    frontend?: string[];
    backend?: string[];
    ai?: string[];
    other?: string[];
  };
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon: string;
  link?: string;
}

export interface Research {
  id: string;
  title: string;
  abstract: string;
  year: string;
  conference: string;
  link?: string;
}

export const projects: Project[] = [
  {
    id: 'face-recognition',
    title: 'Face Recognition System',
    description: 'Developed a real-time face detection and recognition system using Python, OpenCV, and the face_recognition library. CS50x Final Project demonstrating practical application of computer vision.',
    category: 'ai-cv',
    skills: ['Python', 'OpenCV', 'face_recognition', 'Computer Vision'],
    image: '/assets/images/face-recognition.jpg',
    github: 'https://github.com/AlBaraa-1/cs50x-2024-projects/tree/main/Final%20Project',
    featured: true,
    detailedDescription: 'A comprehensive face recognition system that combines real-time face detection with accurate recognition capabilities. This project showcases the practical implementation of computer vision techniques in a real-world application.',
    challenges: [
      'Implementing efficient real-time face detection with minimal latency',
      'Handling varying lighting conditions and face angles',
      'Optimizing the recognition algorithm for accuracy',
      'Managing multiple face detections simultaneously'
    ],
    solutions: [
      'Utilized OpenCV\'s optimized detection algorithms for real-time processing',
      'Implemented adaptive threshold techniques for different lighting conditions',
      'Used face_recognition library with optimized parameters for better accuracy',
      'Created a queue-based system for handling multiple detections'
    ],
    outcomes: [
      'Achieved 95% accuracy in face recognition under normal conditions',
      'Real-time processing with less than 100ms latency',
      'Successfully handles multiple faces simultaneously',
      'Robust performance in varying lighting conditions'
    ],
    techStack: {
      frontend: ['OpenCV GUI', 'Tkinter'],
      backend: ['Python', 'SQLite'],
      ai: ['face_recognition', 'dlib', 'OpenCV', 'NumPy']
    }
  },
  {
    id: 'ai-text-summarizer',
    title: 'AI Text Summarizer',
    description: 'Engineered a Python command-line tool for text and PDF summarization, leveraging advanced Hugging Face AI models. CS50p Final Project showcasing NLP capabilities.',
    category: 'ai-cv',
    skills: ['Python', 'Hugging Face', 'NLP', 'PDF Processing'],
    image: '/assets/images/ai-text-summarizer.png',
    github: 'https://github.com/AlBaraa-1',
    featured: true
  },
  {
    id: 'athkar-website',
    title: 'Athkar Website',
    description: 'Developed a responsive Islamic Athkar application using HTML, CSS, and JavaScript. Features a clean interface for accessing Islamic daily remembrances.',
    category: 'web-dev',
    skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    image: '/assets/images/athkar-website.png',
    github: 'https://github.com/AlBaraa-1/athkar_applacation',
    liveDemo: 'https://albaraa-1.github.io/athkar_applacation/'
  },
  {
    id: 'color-detection',
    title: 'Color Detection with OpenCV',
    description: 'A real-time color detection system using OpenCV and Python, featuring webcam integration, HSV color space processing, and dynamic mask creation. The system can detect specific colors (yellow by default) in video streams, draw bounding boxes around detected regions, and display both original and masked views simultaneously.',
    category: 'ai-cv',
    skills: ['Python', 'OpenCV', 'NumPy', 'Computer Vision', 'Real-time Processing', 'HSV Color Space'],
    image: '/assets/images/color-detection.png',
    github: 'https://github.com/AlBaraa-1/Color-Detection',
    featured: true
  }
];

export const certifications: Certification[] = [
  {
    id: 'cs50x',
    title: 'CS50x: Introduction to Computer Science',
    issuer: 'Harvard University',
    date: '2024',
    description: 'Comprehensive introduction to computer science and programming',
    icon: '🎓',
    link: 'https://drive.google.com/file/d/1Zt7eW_svaZ7Z-8kulvW4DFfonvnhtioF/view?usp=sharing'
  },
  {
    id: 'cs50p',
    title: 'CS50P: Introduction to Programming with Python',
    issuer: 'Harvard University',
    date: '2024',
    description: 'Advanced Python programming concepts and applications',
    icon: '🐍',
    link: 'https://drive.google.com/file/d/1xibJ02x-gbo93fApiQqpZKWukALjh-Oh/view?usp=sharing'
  },
  {
  id: 'samsung-innovation',
  title: 'Samsung Innovation Campus AI Course',
  issuer: 'Samsung',
  date: 'Currently Attending',
  description: 'Artificial Intelligence and Machine Learning fundamentals program',
  icon: '📱',
  link: '#'
  },
  {
    id: 'intro-ai-2023',
    title: 'Introduction to Artificial Intelligence (2023)',
    issuer: 'LinkedIn Learning',
    date: '2023',
    description: 'Comprehensive introduction to AI concepts and applications',
    icon: '🎯',
    link: '#'
  },
  {
    id: 'ai-thinking-machines',
    title: 'AI Foundations: Thinking Machines',
    issuer: 'LinkedIn Learning',
    date: '2023',
    description: 'Foundational concepts in artificial intelligence and machine learning',
    icon: '🧠',
    link: '#'
  },
  {
    id: 'generative-ai',
    title: 'What is Generative AI?',
    issuer: 'LinkedIn Learning',
    date: '2024',
    description: 'Understanding generative artificial intelligence technologies',
    icon: '⚡',
    link: '#'
  },
  {
    id: 'ai-machine-learning',
    title: 'AI Foundations: Machine Learning',
    issuer: 'LinkedIn Learning',
    date: '2023',
    description: 'Machine learning algorithms and practical applications',
    icon: '🔬',
    link: '#'
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering with ChatGPT!',
    issuer: 'LinkedIn Learning',
    date: '2024',
    description: 'Advanced techniques for effective AI prompt design and optimization',
    icon: '💡',
    link: '#'
  },
  {
    id: 'git-github',
    title: 'Learning Git and GitHub',
    issuer: 'LinkedIn Learning',
    date: '2024',
    description: 'Version control and collaborative development with Git and GitHub',
    icon: '🔧',
    link: '#'
  },
  {
    id: 'say-no-guilt',
    title: 'How to Say No Without Guilt',
    issuer: 'LinkedIn Learning',
    date: '2024',
    description: 'Professional communication and boundary setting skills',
    icon: '💬',
    link: '#'
  },
  {
    id: 'sql-w3schools',
    title: 'SQL',
    issuer: 'W3Schools',
    date: '2024',
    description: 'Database management and SQL query fundamentals',
    icon: '🗄️',
    link: '#'
  },
  {
  id: 'creative-thinking',
  title: 'Solve Problems with Creative & Critical Thinking',
  issuer: 'edX',
  date: '2024',
  description: 'Problem-solving methodologies and critical thinking skills',
  icon: '🧠',
  link: '#'
  }
  
];

export const research: Research[] = [
  {
    id: 'snams2025-ai-edu',
    title: 'The Impact of Artificial Intelligence in Education on Student Learning Outcomes and Teaching Methods',
    abstract: 'This research explores the transformative effects of AI integration in educational settings, analyzing its influence on both student learning outcomes and teaching methodologies. Published in IEEE Proceedings and indexed by Scopus and DBLP, this study contributes significant insights to the field of AI in Education, providing evidence-based recommendations for effective AI implementation in educational environments.',
    year: '2025',
    conference: 'SNAMS 2025 - 12th International Conference on Social Networks Analysis, Management and Security',
    link: 'https://drive.google.com/file/d/1jShKJypgcEJrit4GVvDwrJ8SStJJpRhP/view?usp=sharing'
  }
];