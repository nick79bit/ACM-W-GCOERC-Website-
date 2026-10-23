/**
 * Verified Knowledge Base for ACM-W GCOERC Student Chapter
 * Built strictly from verified project data in constants, eventsData, and chapter records.
 * No fabricated facts.
 */

export const SUGGESTED_QUESTIONS = [
  "What is ACM-W?",
  "How can I join?",
  "What events do you organize?",
  "How can I contact the team?",
];

export const ACMW_KNOWLEDGE = {
  chapter: {
    fullName: "ACM-W Student Chapter, Guru Gobind Singh College of Engineering & Research Centre (GCOERC), Nashik",
    shortName: "ACM-W GCOERC",
    mission:
      "ACM-W GCOERC Nashik is the Women's Chapter of the Association for Computing Machinery that inspires students to become future innovators, leaders, and changemakers. Through technical, non-technical, and social events, industry interaction, workshops, and career counseling, ACM-W bridges the gap between classroom learning and industry expectations.",
  },
  contact: {
    email: "gcoercacm@gmail.com",
    college: "Guru Gobind Singh College of Engineering & Research Centre, Nashik",
    location: "Nashik, Maharashtra",
  },
  facultyMentors: [
    {
      name: "Dr. Nita Thakare",
      designation: "Head of Department (Computer Engineering)",
    },
    {
      name: "Dr. Sweety Jachak",
      designation: "ACM Faculty Sponsor",
    },
    {
      name: "Mrs. Gauri Puranik",
      designation: "ACM-W Faculty Advisor",
    },
    {
      name: "Dr. Priti Bhamare",
      designation: "Faculty Advisor (Ceremonial & Planning)",
    },
  ],
  studentCoreTeam: [
    { name: "Ms. Shreya Naigaonkar", role: "Chairperson" },
    { name: "Ms. Ruchika Banait", role: "Vice Chairperson" },
    { name: "Ms. Sajiree Shinde", role: "Secretary" },
    { name: "Ms. Madhurani Hagawane", role: "Treasurer" },
    { name: "Ms. Shrawani Nerkar", role: "Webmaster" },
    { name: "Ms. Anuja Bhadane", role: "Web Coordinator" },
    { name: "Ms. Nikita Deore", role: "Membership Chair" },
  ],
  events: [
    {
      title: "Installation Ceremony",
      date: "11th August 2026",
      venue: "Main Auditorium, GCOERC",
      description:
        "Official installation ceremony of the GCOERC ACM Student Chapter with 250+ students & faculty. Featured keynote address by Mr. Suchit Tiwari (Founder & CEO, Cognifront) on technology, automation ethics, and character building, alongside guidance from Dr. Priti Bhamare.",
    },
    {
      title: "Agentic AI Workshop",
      date: "7th-9th September 2026",
      venue: "Seminar Hall, GCOERC",
      description:
        "3-day hands-on technical workshop on autonomous AI agents, Vibe Coding, and AI-powered development tools conducted by YSM Info Solutions in collaboration with AILeela.",
    },
    {
      title: "TechSpark 2026",
      date: "15th September 2026",
      venue: "Project Lab, GCOERC",
      description:
        "Engineers' Day project competition with 110+ students across departments presenting projects in AI & ML, Web Development, Robotics, IoT, Data Analytics, and Embedded Systems.",
    },
    {
      title: "Rooted in Responsibility: GCOERC Tree Plantation Drive",
      date: "22nd August 2026",
      venue: "Khambale, Nashik",
      description:
        "Social outreach drive planting 150+ native saplings in association with Samsonite India Ltd., Nashik District United Gurudwara Committee, NPWA, and GGSF.",
    },
    {
      title: "Post-Visarjan Cleanup Drive 2026",
      date: "26th September 2026",
      venue: "Goda Ghat, Nashik",
      description:
        "Environmental conservation initiative in association with Nashik Ploggers, removing improperly immersed idols from Goda Ghat and advocating eco-friendly practices.",
    },
    {
      title: "AI for Earth and Sustainability",
      date: "2nd October 2026",
      venue: "Mahindra & Mahindra, Nashik",
      description:
        "Exhibition at Mahindra & Mahindra's 81st Foundation Day. The ACM Group was honored with an Appreciation Certificate by Chief Guest Mr. Harsh K. Rai (CEO – Farm Division & Gromax).",
    },
  ],
};

/**
 * Intelligent verified response generator using only documented facts.
 */
export function getVerifiedAnswer(userQuery) {
  const q = userQuery.toLowerCase().trim();

  // 1. What is ACM-W?
  if (
    q.includes("what is acm-w") ||
    q.includes("about acm-w") ||
    q.includes("who are you") ||
    q.includes("what does acm-w stand for")
  ) {
    return (
      `**ACM-W GCOERC** is the Women's Chapter of the Association for Computing Machinery at Guru Gobind Singh College of Engineering & Research Centre, Nashik.\n\n` +
      `🎯 **Our Mission:** We inspire students to become future innovators, leaders, and changemakers in computing.\n\n` +
      `💡 **What We Do:** Through technical bootcamps, workshops, project competitions, industry visits, and community initiatives, we bridge the gap between classroom learning and industry expectations.`
    );
  }

  // 2. How can I join?
  if (
    q.includes("how can i join") ||
    q.includes("join") ||
    q.includes("membership") ||
    q.includes("register") ||
    q.includes("become a member")
  ) {
    return (
      `Joining **ACM-W GCOERC** is easy! Here is how you can get involved:\n\n` +
      `1. **Connect with the Membership Chair:** You can reach out directly to **Ms. Nikita Deore** (Membership Chair) or any core team member.\n` +
      `2. **Contact via Email:** Send an inquiry to official chapter email: **[gcoercacm@gmail.com](mailto:gcoercacm@gmail.com)**.\n` +
      `3. **Fill the Contact Form:** Use the contact section right on this website to send your details, and our executive team will get in touch with you!\n` +
      `4. **Participate in Events:** Attend our upcoming technical workshops and chapter induction drives announced on campus.`
    );
  }

  // 3. What events do you organize?
  if (
    q.includes("event") ||
    q.includes("workshop") ||
    q.includes("techspark") ||
    q.includes("activities") ||
    q.includes("what events do you organize")
  ) {
    return (
      `ACM-W GCOERC organizes events across 4 major tracks:\n\n` +
      `💻 **Technical Workshops & Bootcamps:**\n` +
      `• *Agentic AI Workshop* (7th–9th Sept 2026) – Hands-on autonomous AI agents & Vibe Coding.\n` +
      `• *TechSpark 2026* (15th Sept 2026) – Engineers' Day project competition with 110+ participants across AI/ML, Web Dev, IoT & Robotics.\n\n` +
      `🎙️ **Chapter Milestones & Sessions:**\n` +
      `• *Installation Ceremony* (11th Aug 2026) – Inauguration with 250+ students and keynote by Mr. Suchit Tiwari (CEO, Cognifront).\n\n` +
      `🤝 **Social & Environmental Initiatives:**\n` +
      `• *Tree Plantation Drive* (22nd Aug 2026) – 150+ native saplings planted at Khambale.\n` +
      `• *Post-Visarjan Cleanup Drive* (26th Sept 2026) – Goda Ghat conservation with Nashik Ploggers.\n\n` +
      `🏆 **Industry Exhibitions:**\n` +
      `• *AI for Earth & Sustainability* (2nd Oct 2026) – Honored with an Appreciation Certificate at Mahindra & Mahindra's 81st Foundation Day.\n\n` +
      `You can also explore all moments in detail on the **[Events Page](/events)**!`
    );
  }

  // 4. How can I contact the team?
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("reach") ||
    q.includes("location") ||
    q.includes("phone")
  ) {
    return (
      `You can get in touch with the ACM-W GCOERC team through multiple channels:\n\n` +
      `✉️ **Official Email:** [gcoercacm@gmail.com](mailto:gcoercacm@gmail.com)\n` +
      `📍 **Campus Location:** Guru Gobind Singh College of Engineering & Research Centre (GCOERC), Nashik, Maharashtra\n` +
      `📝 **Website Form:** Scroll down to the **Contact Section** on this page to send a message directly to our inbox.`
    );
  }

  // Team & Leadership queries
  if (
    q.includes("team") ||
    q.includes("member") ||
    q.includes("chairperson") ||
    q.includes("lead") ||
    q.includes("who is the president") ||
    q.includes("who is the chair")
  ) {
    return (
      `Here is the **Student Core Committee** of ACM-W GCOERC:\n\n` +
      `• **Chairperson:** Ms. Shreya Naigaonkar\n` +
      `• **Vice Chairperson:** Ms. Ruchika Banait\n` +
      `• **Secretary:** Ms. Sajiree Shinde\n` +
      `• **Treasurer:** Ms. Madhurani Hagawane\n` +
      `• **Webmaster:** Ms. Shrawani Nerkar\n` +
      `• **Web Coordinator:** Ms. Anuja Bhadane\n` +
      `• **Membership Chair:** Ms. Nikita Deore\n\n` +
      `Check out their profiles and LinkedIn links in the **Team** section of this website!`
    );
  }

  // Faculty mentors query
  if (
    q.includes("faculty") ||
    q.includes("mentor") ||
    q.includes("advisor") ||
    q.includes("hod") ||
    q.includes("sponsor") ||
    q.includes("teacher")
  ) {
    return (
      `Our chapter is guided by esteemed faculty mentors at GCOERC:\n\n` +
      `• **Mrs. Gauri Puranik** – ACM-W Faculty Advisor\n` +
      `• **Dr. Sweety Jachak** – ACM Faculty Sponsor\n` +
      `• **Dr. Nita Thakare** – Head of Department (Computer Engineering)\n` +
      `• **Dr. Priti Bhamare** – Faculty Advisor & Mentor`
    );
  }

  // Greetings
  if (
    q === "hi" ||
    q === "hello" ||
    q === "hey" ||
    q.startsWith("hi ") ||
    q.startsWith("hello ")
  ) {
    return (
      `Hello there! 👋 I am the **ACM-W GCOERC Virtual Assistant**.\n\n` +
      `I can answer questions about our chapter, executive team, faculty mentors, upcoming and past events, and how to become a member. Feel free to pick one of the suggested questions below or type your query!`
    );
  }

  // Default fallback for unmatched questions
  return (
    `I can help you with verified information regarding **ACM-W GCOERC**:\n\n` +
    `• Chapter details and objectives\n` +
    `• How to become an ACM-W member\n` +
    `• Events & workshops (Agentic AI, TechSpark, Tree Plantation, Cleanup Drive, etc.)\n` +
    `• Core student committee & faculty advisors\n` +
    `• Official contact details\n\n` +
    `Feel free to click one of the suggested questions below or email us directly at **[gcoercacm@gmail.com](mailto:gcoercacm@gmail.com)**.`
  );
}
