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

              B.Ed in Library and Information Science; M.Ed in Educational Media and Technology from Tai Solarin University of Education; M.A. in Rare Books and Digital Humanities from the Université Bourgogne-Franche-Comté, France.

              A recipient of the ERASMUS+ Mobility grant as part of the Master in English Language winner of the ISITE-BFC "Rare Book and Digital Humanities" call for projects. He is an Associate researcher at the Centre for Digital Humanities, University of Lagos in Nigeria. And currently running 2 PhD degrees; A split-site Phd in Digital Humanities with the Université de Bourgogne, France and University of Lagos, Nigeria. And another online Doctoral Programme in Society, Technology and Culture at Universitat Oberta de Catalunya (UOC) Spain.

              Some of his research projects in promoting digital literacy in Nigeria are LitTech- Lagos 1.0 and a geospatial map of Nigerian museums called NIG- MUSEUMS Map, among other projects he is currently working on, such as the Nig-ewriters. His research works have been widely referenced across the world. His scholarly contribution to library science in the LinkedIn community earned him a  "Top Library Services Voice."

              Henry is also a certified teacher by the Teachers Registration Council of Nigeria and a chartered librarian. He has a CAIE certification (Cambridge, UK).`,
      socialLinks: {
        email: "hjohn@alueducation.com",
        linkedin: "https://www.linkedin.com/in/john-henry-chukwudi-29372854/",
        whatsapp: "+234 81344 3 1148",
      },
    },
    {
      id: "2",
      name: "Youssouf Ouedraogo",
      role: "Library Associate (Intern)",
      image: "/assets/library_website_app/library/Youssouf-image.png",
      shortBio:
        "Youssouf Ouedraogo, hailing from Burkina Faso, is a driven student at African Leadership University, Rwanda, pursuing studies in global challenges with a specialization in governance.",
      fullBio: `Youssouf Ouedraogo, hailing from Burkina Faso, is a driven student at African Leadership University, Rwanda, pursuing studies in global challenges with a specialization in governance. He has been an integral part of our library team for the past two years. His genuine interest lies in good governance and global security, mainly focusing on terrorism-related concerns. Over the past two years, Youssouf has immersed himself in the enriching environment of the university, passionately delving into academic pursuits and actively contributing to discussions on pressing global issues. Notably, he is among the fortunate recipients of the prestigious Patoranking scholarship, an initiative that recognizes and supports promising African leaders.`,
      socialLinks: {
        email: "y.ouedraogo@alustudent.com ",
        linkedin:
          "https://www.linkedin.com/in/youssouf-ou%C3%A9draogo-751767203/",
        instagram: "https://www.instagram.com/you.ouedraogo/",
        whatsapp: "++250 781 137 211",
      },
    },
    {
      id: "3",
      name: "Abdulazeez Abdulhammed",
      role: "Library Associate (Intern)",
      image: "/assets/library_website_app/library/Hamid-image.jpeg",
      shortBio:
        "Abdulazeez Abdulhammed, a driven software engineering student passionate about literature and environmental sustainability.",
      fullBio: `Meet Abdulazeez Abdulhammed, a driven software engineering student passionate about literature and environmental sustainability. As a library intern, Abdulazeez seamlessly blends his technical insight in front-end development with his deep-rooted appreciation for books, ensuring an enriching digital experience for library users. Beyond his coding prowess, Abdulazeez actively engages in volunteer research, contributing his expertise to projects that address pressing environmental issues. With a keen eye for detail and adept project management skills, Abdulazeez is a valuable team member and a catalyst for innovation and positive change. His unwavering commitment to excellence and sustainability underscores his dedication to making a meaningful impact in both the digital realm and the global fight against climate change.`,
      socialLinks: {
        email: "a.abdulhammed@alustudent.com",
        linkedin: "https://linkedin.com/in/abdulazeezabdulhammed",
        whatsapp: "+23464522780",
        // instagram: "https://instagram.com/abdulazeez",
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
