import { Hero } from "@/components/Hero";
import { TeamIntro } from "@/components/TeamIntro";
import { TeamGrid } from "@/components/TeamGrid";
import type { TeamMember } from "@/types/team";

export const TeamPage = () => {
  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Henry Chukwudi JOHN",
      role: "Lead Library Services",
      image: "/assets/library_website_app/library/Henry-image.png",
      shortBio:
        "Henry is a seasoned digital library and information scientist with over ten (10) years of practice as a lead in both secondary school and university libraries in Nigeria.",
      fullBio: `Henry is a seasoned digital library and information scientist with over ten (10) years of practice as a lead in both secondary school and university libraries in Nigeria.

His expertise spans digital resource management, information literacy training, and developing innovative library services that meet the evolving needs of students and researchers.

Henry is passionate about leveraging technology to make knowledge more accessible and has successfully implemented several digital library initiatives throughout his career.`,
      socialLinks: {
        email: "henry.john@alueducation.com",
        linkedin: "https://linkedin.com/in/henryjohn",
        whatsapp: "250123456789",
      },
    },
    {
      id: "2",
      name: "Youssouf Ouedraogo",
      role: "Library Associate (Intern)",
      image: "/assets/library_website_app/library/Youssouf-image.png",
      shortBio:
        "Youssouf Ouedraogo, hailing from Burkina Faso, is a driven student at African Leadership University, Rwanda, pursuing studies in global challenges with a specialization in governance.",
      fullBio: `Youssouf Ouedraogo, hailing from Burkina Faso, is a driven student at African Leadership University, Rwanda, pursuing studies in global challenges with a specialization in governance.

With a keen interest in how information shapes policy and decision-making, Youssouf brings fresh perspectives to the library team. He is particularly interested in how libraries can serve as catalysts for community development and civic engagement.

As a Library Associate Intern, Youssouf supports various library operations while learning about information management and user services.`,
      socialLinks: {
        email: "youssouf.ouedraogo@alustudent.com",
        linkedin: "https://linkedin.com/in/youssoufouedraogo",
        instagram: "https://instagram.com/youssouf",
      },
    },
    {
      id: "3",
      name: "Abdulazeez Abdulhammed",
      role: "Library Associate (Intern)",
      image: "/assets/library_website_app/library/Hamid-image.jpeg",
      shortBio:
        "Abdulazeez Abdulhammed, a driven software engineering student passionate about literature and environmental sustainability.",
      fullBio: `Abdulazeez Abdulhammed is a driven software engineering student passionate about literature and environmental sustainability.

He brings a unique blend of technical skills and literary appreciation to the library team. Abdulazeez is particularly interested in the intersection of technology and library services, exploring how digital tools can enhance the reading and research experience.

His passion for environmental sustainability influences his approach to library work, always seeking eco-friendly solutions and promoting awareness about sustainability through library programs.`,
      socialLinks: {
        email: "abdulazeez.abdulhammed@alustudent.com",
        linkedin: "https://linkedin.com/in/abdulazeezabdulhammed",
        whatsapp: "250987654321",
        instagram: "https://instagram.com/abdulazeez",
      },
    },
  ];

  return (
    <>
      <Hero
        backgroundImage="/assets/library_website_app/library/hero-image.jpg"
        title="Meet Our Team"
        description="Meet the amazing team behind the ALU Library"
        height="medium"
      />

      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 my-20">
        <TeamIntro />
      </section>

      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mb-20">
        <TeamGrid members={teamMembers} />
      </section>
    </>
  );
};
