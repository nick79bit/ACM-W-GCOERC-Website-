import {
  agenticAiWorkshop,
  techspark2026,
  aiForEarthSustainability,
  installationCeremony,
  treePlantationDrive,
  postVisarjanCleanup,
  agenticAiMoment1,
  agenticAiMoment2,
  agenticAiMoment3,
  techsparkMoment1,
  techsparkMoment2,
  techsparkMoment3,
  aiEarthMoment1,
  aiEarthMoment2,
  aiEarthMoment3,
  installationMoment1,
  installationMoment2,
  installationMoment3,
  treePlantationMoment1,
  treePlantationMoment2,
  treePlantationMoment3,
  cleanupMoment1,
  cleanupMoment2,
  cleanupMoment3,
} from "../assets/events";

export const eventCategories = [
  {
    id: "technical-workshops-bootcamps",
    title: "Technical Workshops & Bootcamps",
    badge: "Hands-on Learning",
    icon: "💻",

  },
  {
    id: "non-technical-events",
    title: "Non-Technical Events",
    badge: "Fun & Games",
    icon: "🎮",

  },
  {
    id: "installation-ceremony",
    title: "Installation Ceremony",
    badge: "Chapter Milestones",
    icon: "🎙️",

  },
  {
    id: "social-activities",
    title: "Social Activities",
    badge: "Social Outreach",
    icon: "🤝",

  }
];

export const allEvents = [
  /* ─── 1. Technical Workshops ─── */
  {
    id: "agentic-ai-workshop",
    categoryId: "technical-workshops-bootcamps",
    categoryTitle: "Technical Workshops",
    title: "Agentic AI Workshop",
    date: "7th-9th September 2026",

    venue: "Seminar Hall, GCOERC",
    shortDescription:
      "The Agentic AI Workshop introduced students to autonomous AI agents through interactive learning, practical demonstrations, and hands-on exploration of real-world AI applications.",
    fullDescription:
      "The Agentic AI Workshop was organized to provide students with practical exposure to the rapidly evolving field of Artificial Intelligence. The workshop was conducted by YSM Info Solutions in collaboration with AILeela, who guided participants through various emerging technologies and their real-world applications.The session focused on AI Agents, Vibe Coding, AI-powered development, hosting, and other modern AI tools and technologies. Rather than being limited to theoretical concepts, the workshop emphasized hands-on practical learning, allowing students to build, experiment, and implement the concepts during the session.Participants gained valuable insights into how AI agents can perform tasks autonomously, how Vibe Coding can accelerate software development, and how applications can be hosted and deployed. The interactive demonstrations and practical activities helped students understand the complete process of developing AI-powered solutions.Overall, the workshop was an engaging and skill-oriented learning experience, giving students practical knowledge of modern AI technologies and motivating them to explore and build innovative AI-based projects.",
    image: agenticAiWorkshop,

    highlights: [
      "Practical exposure to autonomous AI agents and real-world AI applications.",
      "Hands-on experience with Vibe Coding and AI-powered development tools.",
      "Interactive demonstrations of AI-driven hosting and deployment processes.",
      "Skill-oriented learning with opportunities to build and experiment during the session.",
    ],
    speakers: [
      {
        name: "AI Leela",
        role: "Department of Computer Engineering",
        org: "GCOERC Nashik",
        image: null,
      },

    ],
    gallery: [agenticAiMoment1, agenticAiMoment2, agenticAiMoment3],
  },
  {
    id: "TechSpark 2026",
    categoryId: "technical-workshops-bootcamps",
    categoryTitle: "Technical Workshops",
    title: "TechSpark 2026",
    date: "15th September 2026",

    venue: "Project Lab",
    shortDescription:
      "TechSpark 2026 was an open-to-all-departments project competition organized by the Department of Computer Engineering to celebrate Engineers’ Day. The event provided students with a dynamic platform to showcase their creativity, technical skills, and innovative ideas across diverse technology domains such as Web Development, AI & Machine Learning, Robotics, IoT, Database, Data Analytics, Embedded Systems, and more.",
    fullDescription:
      "TechSpark 2026, an interdepartmental project competition, was organized by the Department of Computer Engineering on 15th September 2026 as part of the Engineers’ Day celebration. The event provided students with a dynamic platform to showcase innovative ideas, technical expertise, and problem-solving skills.Participants presented projects across diverse domains including AI & ML, Web Development, IoT, Robotics, Data Analytics, Embedded Systems, and emerging technologies. The competition fostered a spirit of innovation, collaboration, and healthy competition, empowering students to transform ideas into practical solutions and inspiring the next generation of technology innovators.",
    image: techspark2026,

    attendees: "110+ Students",
    highlights: [
      "Open-to-all-departments project competition celebrating Engineers' Day with 110+ student participants.",
      "Showcased projects across diverse domains including AI & ML, Web Development, IoT, Robotics, Data Analytics, and Embedded Systems.",
      "Fostered a spirit of innovation, collaboration, and healthy competition among students from multiple departments.",
      "Empowered students to transform creative ideas into practical, working solutions and prototypes.",
    ],
    speakers: [
      {
        name: "Student Organizers",
        org: "ACM-W Chapter, GCOERC Nashik",
        image: null,
      },
    ],
    gallery: [techsparkMoment1, techsparkMoment2, techsparkMoment3],
  },

  /* ─── 2. Non-Technical Events ─── */
  {
    id: "AI for Earth and Sustainability",
    categoryId: "non-technical-events",
    categoryTitle: "Non-Technical Events",
    title: "AI for Earth and Sustainability",
    date: "2nd October 2026",
    venue: "Mahindra & Mahindra , Nashik",
    shortDescription:
      "Participated in the 81st Foundation Day Exhibition of Mahindra & Mahindra centered around the theme “AI on Earth for Sustainability.”",
    fullDescription:
      "The GCOERC ACM Student Group participated in the 81st Foundation Day Exhibition of Mahindra & Mahindra on 2nd October 2026, centered around the theme “AI on Earth for Sustainability.” The exhibition provided an excellent platform for students to experience industry interaction, professional exposure, and innovation beyond the classroom.The event was graced by Mr. Harsh K. Rai, CEO – Farm Division and Gromax, Mahindra & Mahindra, as the Chief Guest. His presence added significance to the exhibition and offered students an opportunity to gain insights into industry perspectives and emerging areas of innovation.The ACM Group was among the six participating groups from GCOERC and was honored with an Appreciation Certificate for its participation and contribution. The event served as a valuable experience in institutional representation, industry engagement, and professional development.",
    image: aiForEarthSustainability,
    highlights: [
      "Represented GCOERC at the 81st Foundation Day Exhibition of Mahindra & Mahindra on the theme AI on Earth for Sustainability.",
      "Event graced by Mr. Harsh K. Rai, CEO - Farm Division and Gromax, Mahindra & Mahindra, as Chief Guest.",
      "ACM Group honored with an Appreciation Certificate among six participating groups from GCOERC.",
      "Gained valuable exposure in institutional representation, industry engagement, and professional development.",
    ],
    speakers: [
      {
        name: "Mr. Harsh K. Rai",
        role: "CEO – Farm Division and Gromax",
        org: "Mahindra & Mahindra",
        image: null,
      },

    ],
    gallery: [aiEarthMoment1, aiEarthMoment2, aiEarthMoment3],
  },


  /* ─── 3. Career Counselling Sessions ─── */
  {
    id: "installation-ceremony",
    categoryId: "installation-ceremony",
    categoryTitle: "Installation Ceremony",
    title: "Installation Ceremony",
    date: "11th August 2026",
    venue: "Main Auditorium, GCOERC",
    shortDescription:
      "The official installation ceremony of the GCOERC ACM Student Chapter, featuring keynote addresses on technological development, automation ethics, and character building.",
    fullDescription:
      "The GCOERC ACM Installation Ceremony was successfully conducted in the presence of around 250 students. The event marked the beginning of a new journey for the ACM Student Chapter and provided an opportunity to inspire students and the newly appointed office bearers. Mr. Suchit Tiwari, Founder and CEO of Cognifront, addressed the gathering and shared valuable guidance on technological development and automation. He emphasized that while moving towards automation and technological advancement, we should not forget our ethics and cultural values. He encouraged students to draw inspiration from the teachings of the Bhagavad Gita, Vedas, and Upanishads, stressing that true development should also focus on character building and the development of strong values. Dr. Priti Bhamare Ma'am shared her thoughts on the importance of learning beyond the boundaries of the classroom. She encouraged students to be curious and ask as many questions as possible, emphasizing that questioning is an essential part of meaningful learning. She also guided the newly appointed office bearers on the importance of proper planning, effective organization, teamwork, and responsibility in successfully conducting ACM activities. Overall, the ceremony was an inspiring and insightful event that motivated students to pursue technological excellence, continuous learning, ethical values, and strong leadership.",
    image: installationCeremony,

    attendees: "250+ Students & Faculty",
    highlights: [
      "Inspiring guidance on technological development and automation, emphasizing the importance of ethics and cultural values in the age of AI.",
      "Encouragement for students to draw inspiration from ancient wisdom like the Bhagavad Gita, Vedas, and Upanishads for holistic development.",
      "Guidance for newly appointed office bearers on effective planning, organization, teamwork, and responsibility.",
    ],
    speakers: [
      {
        name: " Mr. Suchit Tiwari",
        role: "Founder and CEO",
        org: "Cognifront",
        image: null,
      },
      {
        name: " Dr. Priti Bhamare Ma'am",
        role: "Faculty Advisor",
        org: "ACM-W Chapter, GCOERC Nashik",
        image: null,
      },
    ],
    gallery: [installationMoment1, installationMoment2, installationMoment3],
  },

  /* ─── 4. Social Activities ─── */
  {
    id: "tree-plantation-drive",
    categoryId: "social-activities",
    categoryTitle: "Social Activities",
    title: "Rooted in Responsibility: GCOERC Tree Plantation Drive",
    date: "22 August 2026",
    venue: "Khambale,Nashik",
    shortDescription:
      "A community-driven tree plantation initiative conducted under the guidance of Jathedaar Baba Ranjit Singh Ji, promoting environmental responsibility and a greener future through collective action.",
    fullDescription:
      "A Tree Plantation Drive was organized on 22nd August 2026 at 10:00 AM at Khambale, Maharashtra, near Ghoti-Trimbak Road, under the guidance of Jathedaar Baba Ranjit Singh Ji and in association with Samsonite India Ltd. The initiative was jointly supported by the Nashik District United Gurudwara Committee, Nashik Punjabi Welfare Association (NPWA), and Guru Gobind Singh Foundation (GGSF). The drive aimed to promote environmental awareness and encourage collective responsibility towards nature by planting and nurturing trees, contributing towards a greener and healthier future for generations to come.",
    image: treePlantationDrive,

    attendees: "150+ Participants",
    highlights: [
      "Planted 150+ saplings of native species, enhancing local biodiversity.",
      "Collaborated with multiple community organizations for broader social impact.",
      "Strengthened community bonds through shared environmental action.",
    ],
    speakers: [
      {
        name: "Jathedaar Baba Ranjit Singh Ji",
        role: "Guidance",
        org: "Nashik District United Gurudwara Committee, Nashik Punjabi Welfare Association (NPWA), Guru Gobind Singh Foundation (GGSF).",
        image: null,
      },
    ],
    gallery: [treePlantationMoment1, treePlantationMoment2, treePlantationMoment3],
  },

  {
    id: "post-visarjan-cleanup-drive",
    categoryId: "social-activities",
    categoryTitle: "Social Activities",
    title: "Post-Visarjan Cleanup Drive 2026",
    date: "26th September 2026",
    venue: "Goda Ghat,Nashik",
    shortDescription:
      "The Post Visarjan Cleanup Drive, organized in association with Nashik Ploggers, brought students together to promote environmental responsibility, clean water bodies, and responsible celebrations.",
    fullDescription:
      "The GCOERC Computer Engineering Department – COSA and GCOERC ACM Student Chapter, in association with Nashik Ploggers, participated in the Post-Visarjan Cleanup Drive on 26th September 2026. The initiative focused on removing improperly immersed Ganesha idols from water bodies and promoting responsible idol immersion.The drive provided students with an opportunity to actively contribute towards environmental conservation, community service, and sustainable celebrations. Through enthusiastic participation, students helped spread awareness about protecting water bodies and celebrating festivals with greater environmental responsibility.The initiative truly reflected the spirit of “Celebrating with devotion, responsibility, and care for our environment.",
    image: postVisarjanCleanup,

    attendees: "50+ Participants",
    highlights: [
      "Removed improperly immersed Ganesha idols from water bodies, promoting responsible idol immersion.",
      "Contributed towards environmental conservation, community service, and sustainable celebrations.",
      "Spread awareness about protecting water bodies and celebrating festivals with greater environmental responsibility.",
    ],
    gallery: [cleanupMoment1, cleanupMoment2, cleanupMoment3],
  }
];
