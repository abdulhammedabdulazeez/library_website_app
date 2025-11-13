import { type LibraryEvent } from "@/types/events";

const EVENT_IMAGE = "/assets/library_website_app/library/event-flyer-1.png";

export const UPCOMING_EVENTS: LibraryEvent[] = [
  {
    id: "academic-research-integrity-3",
    title: "Academic Research Integrity Workshop 3.0",
    date: "Tuesday, December 2, 2025",
    time: "3:00 – 4:30 pm CAT",
    location: "Google Meet",
    description:
      "Join us for an essential workshop that equips you with the knowledge and skills to uphold the highest standards of academic integrity. Learn about ressearch publication writing, AI in education, and capstone research and ethics guidelines.",
    image: "/assets/library_website_app/library/Academic Research Integrity Workshop 3.0.png",
    registrationUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSd_YAClPTDOy-W6FUzrRX_HN6yAsZaX147oxMPJmwHj2eugXA/viewform",
    speakers: [
      {
        name: "Emmanuel Ekosse",
        title: "Chair, ALU Research & Ethics Committee",
      },
      {
        name: "SUE SNYMAN",
        title: "Director of Research, ALU School of Wildlife Conservation",
      },
      {
        name: "Dr. Francois Sarah",
        title: "Programme Manager, ALCHE",
      },
      {
        name: "Frank Onuh",
        title: "Doctoral Researcher, University of Lethbridge, Canada",
      },
    ],
  },
  {
    id: "academic-research-integrity-2",
    title: "Academic Research Integrity Workshop 2.0",
    date: "Tuesday, March 19, 2024",
    time: "3:00 – 4:30 pm CAT",
    location: "Google Meet",
    description:
      "Join us for an essential workshop that equips you with the knowledge and skills to uphold the highest standards of academic integrity. Learn about plagiarism detection, proper citation, and ethical conduct in research.",
    image: EVENT_IMAGE,
    registrationUrl: "https://meet.google.com/ybp-hhvf-wcj",
    speakers: [
      {
        name: "Monique Coombes",
        title: "Writing Centre Senior Associate",
      },
      {
        name: "Sue Snyman",
        title: "Director of Research, School of Wildlife Conservation",
      },
      {
        name: "Chioma J Okonkwo",
        title: "Specialization Learning Coach (Planetary Health)",
      },
    ],
  },
  {
    id: "data-visualization-clinic",
    title: "Data Visualization Clinic",
    date: "Thursday, April 11, 2024",
    time: "2:00 – 4:00 pm CAT",
    location: "ALU Campus | Innovation Hub",
    description:
      "Bring your datasets and receive hands-on guidance on structuring impactful visual stories. Our librarians will walk you through dashboards, infographics, and narrative techniques.",
    image: EVENT_IMAGE,
    registrationUrl: "#",
  },
  {
    id: "grant-writing-lab",
    title: "Grant Writing Lab: Pitching Your Impact",
    date: "Wednesday, April 24, 2024",
    time: "10:00 am – 12:00 pm CAT",
    location: "Library Collaboration Space",
    description:
      "Craft persuasive proposals with support from our research services team. Learn how to structure need statements, budgets, and evaluation frameworks that resonate with reviewers.",
    image: EVENT_IMAGE,
    registrationUrl: "#",
  },
];

export const PAST_EVENTS: LibraryEvent[] = [
  {
    id: "digital-citation-essentials",
    title: "Digital Citation Essentials",
    date: "Thursday, January 25, 2024",
    time: "4:00 – 5:30 pm CAT",
    location: "Online",
    description:
      "A practical session on using reference managers effectively, covering Zotero basics, citation styles, and collaborative workflows.",
    image: EVENT_IMAGE,
  },
  {
    id: "open-access-panel",
    title: "Open Access Publishing Panel",
    date: "Tuesday, November 14, 2023",
    time: "1:00 – 2:30 pm CAT",
    location: "Library Learning Theatre",
    description:
      "Researchers and publishers discussed the future of open scholarship, funding mandates, and tips for selecting reputable journals.",
    image: EVENT_IMAGE,
  },
  {
    id: "research-methods-studio",
    title: "Research Methods Studio",
    date: "Friday, September 8, 2023",
    time: "9:30 – 11:00 am CAT",
    location: "Library Collaboration Space",
    description:
      "Students workshopped study designs, data collection plans, and ethical approvals with faculty mentors and the library team.",
    image: EVENT_IMAGE,
  },
];
