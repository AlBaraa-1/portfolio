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
  gameDetails?: {
    questOverview: string;
    skillsUnlocked: string[];
    bossFights: string[];
    bonusLevel: string;
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
  featured?: boolean;
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
    title: 'Real-Time Face Recognition System',
    description: '🎯 A Python-based real-time face detection and identification system that uses computer vision to recognize faces from a webcam feed. The system compares detected faces against a database of known individuals and provides instant visual feedback with green boxes for recognized faces and red boxes for unknown ones.',
    category: 'ai-cv',
    skills: ['Python', 'OpenCV', 'face_recognition', 'DeepFace', 'NumPy', 'Gradio'],
    image: '/assets/images/face-recognition.png',
    github: 'https://github.com/AlBaraa-1/Computer-vision/tree/main/face_recognition',
    featured: true,
    detailedDescription: '🔍 A comprehensive real-time face recognition system that processes live video feeds to detect and identify faces instantly. Features optimized performance through frame resizing, easy folder-based image management, and robust visual feedback system with color-coded recognition results.',
    challenges: [
      'Implementing real-time face detection with minimal processing latency',
      'Managing multiple camera configurations and device compatibility',
      'Handling varying lighting conditions for consistent recognition accuracy',
      'Optimizing performance while maintaining recognition quality',
      'Creating an intuitive setup process for reference images'
    ],
    solutions: [
      'Used frame resizing to 25% for faster processing while maintaining accuracy',
      'Implemented configurable camera index system for multi-camera setups',
      'Applied adaptive lighting techniques and clear image requirements',
      'Utilized OpenCV optimization and face_recognition library efficiency',
      'Created simple folder-based system with filename-to-name mapping'
    ],
    outcomes: [
      'Real-time face detection and recognition from live webcam feed',
      'Instant visual feedback with color-coded recognition results',
      'Easy setup with drag-and-drop reference image management',
      'Cross-platform compatibility (Windows/macOS/Linux)',
      'Optimized performance for smooth real-time operation'
    ],
    techStack: {
      frontend: ['OpenCV GUI', 'Live Video Display'],
      backend: ['Python', 'File-based Image Storage'],
      ai: ['face_recognition', 'DeepFace', 'OpenCV', 'NumPy'],
      other: ['Gradio (Web Interface)', 'Multi-format Image Support']
    },
    gameDetails: {
      questOverview: "🎯 Epic Quest Complete! Built a real-time facial recognition guardian that instantly identifies friend from foe using advanced computer vision magic. Green auras mark allies, red warnings signal unknowns - like having digital eyes that never forget a face!",
      skillsUnlocked: [
        "👁️ Real-Time Vision Mastery - Achieved instant face detection from live feeds",
        "🎨 Visual Feedback Sorcery - Deployed color-coded recognition system",
        "⚡ Performance Optimization Magic - Mastered frame processing efficiency",
        "� Camera Configuration Wizardry - Conquered multi-device compatibility"
      ],
      bossFights: [
        "📷 The Multi-Camera Hydra - Defeated device compatibility chaos with configurable indices",
        "� The Lighting Demon - Conquered varying illumination with adaptive techniques",
        "⚡ The Performance Dragon - Slayed processing bottlenecks with smart frame resizing"
      ],
      bonusLevel: "🏆 Hidden Feature: The system can be extended with Gradio web interface for remote access - turning your local recognition system into a web-accessible security station!"
    }
  },
  {
    id: 'ai-text-summarizer',
    title: 'AI Text Summarizer',
    description: '📚 A Python command-line application that summarizes the content of any text or PDF file using advanced artificial intelligence models from Hugging Face. Users can specify the desired summary style (briefly, in detail, bullet points) with intelligent API integration and comprehensive error handling.',
    category: 'ai-cv',
    skills: ['Python', 'Hugging Face BART', 'NLP', 'PDFPlumber', 'API Integration', 'CLI Development'],
    image: '/assets/images/ai-text-summarizer.png',
    github: 'https://github.com/AlBaraa-1/cs50p-projects/tree/main/FinalProject',
    featured: true,
    detailedDescription: '🤖 A comprehensive text summarization tool built as CS50P final project, featuring Hugging Face BART model integration, flexible summary styles, PDF processing capabilities, and robust error handling with complete pytest test coverage.',
    challenges: [
      'Integrating Hugging Face API with proper authentication and error handling',
      'Processing both text and PDF files with different parsing requirements',
      'Implementing flexible summary styles that work with AI model limitations',
      'Creating comprehensive test coverage including API mocks and user input simulation',
      'Building intuitive CLI interface with graceful error messaging'
    ],
    solutions: [
      'Implemented secure environment variable-based API token management',
      'Used PDFPlumber library for reliable PDF text extraction',
      'Designed prompt engineering for different summary styles with BART model',
      'Created pytest test suite with monkeypatch for mocking external dependencies',
      'Built user-friendly CLI with clear prompts and file validation'
    ],
    outcomes: [
      'Successfully processes both .txt and .pdf files with high accuracy',
      'Supports multiple summary styles: brief, detailed, and bullet points',
      'Includes comprehensive error handling for missing files and API issues',
      'Features complete test coverage with automated pytest suite',
      'Saves summaries to output.txt with console display'
    ],
    techStack: {
      frontend: ['Command-Line Interface', 'Interactive Prompts'],
      backend: ['Python', 'File I/O Processing'],
      ai: ['Hugging Face BART', 'Transformer Models', 'NLP Pipeline'],
      other: ['PDFPlumber', 'Requests Library', 'Environment Variables', 'Pytest Testing']
    },
    gameDetails: {
      questOverview: "📚 Epic Quest Completed! Forged an intelligent document summarizer that wields Hugging Face BART transformers to distill lengthy texts into perfect insights. Like having a digital librarian that reads faster than light and remembers everything!",
      skillsUnlocked: [
        "🤖 BART Model Mastery - Deployed advanced transformer summarization",
        "� PDF Sorcery - Conquered complex document parsing with PDFPlumber",
        "🔧 API Integration Magic - Mastered Hugging Face authentication",
        "� Test Automation Wizardry - Built comprehensive pytest coverage with mocks"
      ],
      bossFights: [
        "🔐 The API Authentication Dragon - Defeated token management challenges",
        "📖 The PDF Parsing Hydra - Conquered complex document structure extraction",
        "🎯 The Summary Style Sphinx - Mastered prompt engineering for different outputs",
        "🧪 The Testing Demon - Vanquished complex mocking scenarios"
      ],
      bonusLevel: "� CS50P Achievement Unlocked: This project demonstrates advanced Python concepts including API integration, file processing, testing, and CLI design - earning perfect marks in Harvard's CS50P final project evaluation!"
    }
  },
  {
    id: 'athkar-website',
    title: 'Athkar Website',
    description: 'Developed a responsive Islamic Athkar application using HTML, CSS, and JavaScript. Features a clean interface for accessing Islamic daily remembrances.',
    category: 'web-dev',
    skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    image: '/assets/images/athkar-website.png',
    github: 'https://github.com/AlBaraa-1/athkar_applacation',
    liveDemo: 'https://albaraa-1.github.io/athkar_applacation/',
    gameDetails: {
      questOverview: "🕌 Sacred Quest Achieved! Crafted a serene digital sanctuary for Islamic remembrances, creating a responsive spiritual companion that adapts beautifully across all devices.",
      skillsUnlocked: [
        "📱 Responsive Design Mastery - Perfected mobile-first layouts",
        "🎨 CSS Artistry - Designed calming, spiritual aesthetics",
        "⚡ Vanilla JS Powers - Built smooth interactions without frameworks",
        "🌐 Cross-Platform Magic - Ensured universal accessibility"
      ],
      bossFights: [
        "📱 The Multi-Device Hydra - Conquered responsive design across all screen sizes",
        "🎨 The Typography Demon - Mastered Arabic text rendering and readability",
        "⚡ The Performance Gatekeeper - Optimized loading speeds for spiritual focus"
      ],
      bonusLevel: "✨ Hidden Gem: The app includes a subtle prayer time indicator and remembers your last reading position, creating a personalized spiritual journey!"
    }
  },
  {
    id: 'color-detection',
    title: 'Color Detection with OpenCV',
    description: '🌈 Real-time color detection system using OpenCV and Python that demonstrates HSV color space conversion for robust color detection. Captures video from webcam, applies dynamic masks for target colors (yellow by default), and visualizes detected regions with bounding boxes in real-time.',
    category: 'ai-cv',
    skills: ['Python', 'OpenCV', 'NumPy', 'Pillow', 'HSV Color Space', 'Real-time Processing'],
    image: '/assets/images/color-detection.png',
    github: 'https://github.com/AlBaraa-1/Computer-vision/tree/main/color_detection',
    featured: true,
    detailedDescription: '🎯 A comprehensive real-time color detection application that captures live video streams, converts frames to HSV color space for robust color isolation, creates dynamic masks for target colors, and displays both original frames and color masks simultaneously with bounding box visualization.',
    challenges: [
      'Achieving real-time performance with live video processing',
      'Implementing robust color detection using HSV color space conversion',
      'Creating accurate bounding box detection for irregular color regions',
      'Building modular code structure for easy color customization',
      'Handling varying lighting conditions and camera quality'
    ],
    solutions: [
      'Utilized OpenCV optimized video capture and processing functions',
      'Implemented HSV color space conversion for better color isolation',
      'Applied morphological operations and contour detection for accurate bounding boxes',
      'Created utility functions in separate modules for easy color range adjustments',
      'Used dynamic thresholding and mask refinement techniques'
    ],
    outcomes: [
      'Real-time color detection with smooth video processing',
      'Accurate bounding box visualization around detected color regions',
      'Modular architecture supporting easy color customization',
      'Simultaneous display of original frame and color mask',
      'Educational demonstration of computer vision fundamentals'
    ],
    techStack: {
      frontend: ['OpenCV GUI', 'Real-time Video Display'],
      backend: ['Python', 'Utility Functions'],
      ai: ['OpenCV Computer Vision', 'HSV Color Processing', 'Contour Detection'],
      other: ['NumPy Arrays', 'Pillow Image Processing', 'Webcam Integration']
    },
    gameDetails: {
      questOverview: "🌈 Chromatic Vision Quest Complete! Forged a real-time color tracking system that hunts specific hues through live video streams, painting dynamic masks and targeting boxes like a digital artist's precision tool.",
      skillsUnlocked: [
        "🎨 HSV Color Mastery - Conquered robust color space conversions",
        "📹 Real-Time Vision Powers - Mastered live webcam stream processing",
        "📦 Bounding Box Sorcery - Deployed accurate region detection algorithms",
        "� Modular Architecture Magic - Built extensible color detection framework"
      ],
      bossFights: [
        "🌈 The HSV Transformation Dragon - Mastered color space conversion complexities",
        "⚡ The Frame Rate Hydra - Conquered real-time processing performance challenges",
        "👻 The Lighting Phantom - Defeated varying illumination conditions with dynamic thresholding"
      ],
      bonusLevel: "🎨 Hidden Feature: The modular design allows instant color switching by simply modifying BGR values - perfect for creating rainbow trackers, gesture controls, or interactive art installations!"
    }
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
    link: 'https://drive.google.com/file/d/1Zt7eW_svaZ7Z-8kulvW4DFfonvnhtioF/view?usp=sharing',
    featured: true
  },
  {
    id: 'cs50p',
    title: 'CS50P: Introduction to Programming with Python',
    issuer: 'Harvard University',
    date: '2024',
    description: 'Advanced Python programming concepts and applications',
    icon: '🐍',
    link: 'https://drive.google.com/file/d/1xibJ02x-gbo93fApiQqpZKWukALjh-Oh/view?usp=sharing',
    featured: true
  },
  {
    id: 'samsung-innovation',
    title: 'Samsung Innovation Campus AI Course',
    issuer: 'Samsung',
    date: 'Currently Attending',
    description: 'Artificial Intelligence and Machine Learning fundamentals program',
    icon: '🏫',
    link: '#',
    featured: true
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