export const portfolioData = {
  personal: {
    name: "Thrinath Saragada",
    role: "AI/ML Engineer",
    location: "Visakhapatnam, Andhra Pradesh, India",
    email: "saragadathrinath@gmail.com",
    phone: "+91 6305015647",
    linkedin: "https://www.linkedin.com/in/saragadathrinath/",
    github: "https://github.com/Thrinath008",
    instagram: "https://www.instagram.com/__thrinath/?utm_source=ig_web_button_share_sheet",
    resumeUrl: "/ThrinathSaragada_CV.pdf",
  },

  hero: {
    headlineOne: "Thrinath Saragada",
    headlineTwo: "AI/ML Engineer",
    subheadline: "A highly curious and passionate individual driven by the possibilities of data science, AI, and ML.",
    typingCycle: ["Data Science", "Machine Learning", "Deep Learning", "NLP"],
    primaryCta: "View Projects",
    secondaryCta: "Download CV",
  },

  about: {
    title: "About",
    bio: "A highly curious and passionate individual driven by the possibilities of data science, AI, and ML. Seeking an internship to gain hands-on experience and contribute to innovative projects that challenge creative and analytical skills.",
    highlights: [
      "Currently: B.Tech CSE (AI/ML) at Lovely Professional University, Punjab",
      "Exchange: ISEP, Paris - AI/ML Specialization (2024-2025)",
      "Interests: Robotics, Automation, AR/VR, and Future Technologies"
    ]
  },

  skills: {
    title: "Skills",
    groups: [
      {
        heading: "Languages",
        items: ["Python", "Java", "C", "C++", "SQL", "PL/SQL", "R (basics)"]
      },
      {
        heading: "AI/ML",
        items: ["NLP", "Deep Learning", "Neural Networks","TensorFlow","Pytorch", "Scikit-learn", "Hugging Face"]
      },
      {
        heading: "Data Science",
        items: ["Pandas", "NumPy", "Matplotlib", "Data Analysis", "Data Visualization"]
      },
      {
        heading: "Web Development",
        items: ["HTML", "CSS", "JavaScript", "React js", "Next js", "Typescript", "Tailwindcss", "node", "JavaFX"]
      },
      {
        heading: "Tools & Other",
        items: ["Git", "firebase", "VsCode", "jupyter notebook", "Lunix", "Arduino"]
      },
      {
        heading: "Languages Spoken",
        items: ["English", "Telugu", "Hindi", "French (Beginner)"]
      }
    ]
  },

  projects: {
    title: "Projects",
    cards: [
      {
        name: "AI Text Detection Model",
        year: "2024",
        description: "Built a model to distinguish between human-generated and AI-generated text using supervised learning (SVM, Neural Networks) and embeddings (Word2Vec, BERT).",
        tags: ["Python", "Scikit-learn", "Hugging Face", "NLP", "NLTK", "spaCy"],
        links: [
          { label: "GitHub", url: "https://github.com/Thrinath008" }
        ],
        impactPoints: [
          "Implemented SVM and Neural Networks for text classification",
          "Utilized Word2Vec and BERT embeddings for feature extraction",
          "Evaluated on Kaggle's 'LLM Detect AI Generated Text' dataset"
        ]
      },


      {
        name: "Sri Teja Constructions",
        year: "Live — Jul 2025",
        description: "Built a full-scale company website for a civil and piling contractor with complete service and workflow integration.",
        tags: ["React", "TypeScript", "Vite", "TailwindCSS", "Firebase Hosting"],
        links: [
          { label: "Live", url: "https://sritejaconstructions.in/" }
        ],
        impactPoints: [
          "Developed all major website sections including services, projects, equipment, team and contact forms",
          "Implemented WhatsApp auto-messaging and mobile-first UI",
          "Deployed and hosted using Firebase with optimized performance"
        ]
      },
      {
        name: "Trackdemic",
        year: "Live — Jul 2025",
        description: "Full academic‑management dashboard for real-time tracking of attendance, exams, assignments and subjects.",
        tags: ["React", "TypeScript", "Vite", "TailwindCSS", "Firebase Firestore", "Firebase Auth"],
        links: [
          { label: "Live", url: "https://trackdemic.com/" }
        ],
        impactPoints: [
          "Migrated system from local storage to Firestore with real-time sync and auto-updates",
          "Implemented user-based secure isolation, authentication and profile management",
          "Created a complete responsive UI with dashboard visualizations"
        ]
      },
      {
        name: "Smart Vision-based Parking Detection System",
        year: "Dec 2025",
        description: "Real-time detection and analytics system for parking-slot occupancy using CNN model inference on live camera feed.",
        tags: ["Python", "PyTorch", "OpenCV", "NumPy", "CV"],
        links: [
          { label: "GitHub", url: "https://github.com/Thrinath008/smart-parking-system" }
        ],
        impactPoints: [
          "Built full pipeline — ROI labeling, dataset collection automation, model training, live interface",
          "Achieved ~100% accuracy in real‑time slot detection",
          "Implemented highlight overlays and visual analytics dashboard"
        ]
      },
      {
        name: "Handwritten Digit Recognition System",
        year: "Aug 2025",
        description: "Web‑based handwritten digit classification system using custom CNN trained on MNIST dataset.",
        tags: ["Python", "TensorFlow", "Keras", "NumPy", "FastAPI", "Uvicorn", "HTML", "JavaScript", "CNN", "MNIST"],
        links: [
          { label: "GitHub", url: "https://github.com/Thrinath008/mnist_digit_recognizer" }
        ],
        impactPoints: [
          "Achieved 98.6% accuracy with optimized lightweight inference model",
          "Implemented training pipeline, evaluation and deployment with FastAPI",
          "Built interactive UI for real‑time digit prediction"
        ]
      },
      {
        name: "CHAT‑E — AI Powered Conversational Assistant",
        year: "Aug 2025",
        description: "Modular AI chatbot with text‑generation, TTS and real‑time search powered by OpenAI models.",
        tags: ["Python", "OpenAI API", "Hugging Face", "Speech Recognition", "Modular Architecture"],
        links: [
          { label: "GitHub", url: "" }
        ],
        impactPoints: [
          "Developed independent modules for automation, model management and conversation logic",
          "Integrated text‑to‑speech and dynamic real‑time search",
          "Enabled extensible framework for future multi‑modal capabilities"
        ]
      }
    ]
  },

  education: {
    title: "Education",
    entries: [
      {
        period: "2024–2025",
        degree: "Semester Exchange - AI & Machine Learning",
        org: "Institut Supérieur D'Électronique De Paris (ISEP), France",
        details: ["Specialization: Artificial Intelligence and Machine Learning"]
      },
      {
        period: "2023–2027",
        degree: "B.Tech Computer Science and Engineering",
        org: "Lovely Professional University, Punjab, India",
        details: ["Specialization: Artificial Intelligence and Machine Learning"]
      },
      {
        period: "2021–2023",
        degree: "11th and 12th Grade",
        org: "Delhi Public School, Vijayawada",
        details: ["Science Stream"]
      }
    ]
  },

  experience: {
    title: "Certifications",
    items: [
      {
        role: "Full Stack Development",
        org: "Boord",
        period: "2024",
        bullets: [
          "Completed comprehensive full stack development course"
        ]
      },
      {
        role: "Web Design Certification",
        org: "Free Code Camp",
        period: "2023",
        bullets: [
          "Earned certification in web design fundamentals"
        ]
      }
    ]
  },

  contact: {
    title: "Contact",
    copy: "Seeking an internship to gain hands-on experience in data science, AI, and ML.",
    fields: ["Name", "Email", "Message"],
    submitLabel: "Send Message",
    altContacts: [
      { label: "Email", value: "saragadathrinath@gmail.com" },
      { label: "LinkedIn", value: "linkedin.com/in/saragadathrinath" },
      { label: "GitHub", value: "github.com/Thrinath008" }
    ]
  },

  footer: {
    note: "© Thrinath Saragada"
  }
};