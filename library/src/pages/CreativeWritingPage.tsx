import { Hero } from "@/components/Hero";
import { ToolShowcase } from "@/components/ToolShowcase";
import { InfoCard } from "@/components/InfoCard";

export const CreativeWritingPage = () => {
  return (
    <>
      <Hero
        backgroundImage="/assets/library_website_app/library/hero-image.jpg"
        title="Creative Writing Enhancement"
        height="medium"
        buttons={[
          {
            label: "Grammarly",
            link: "/request-support",
            variant: "default",
            isExternal: true,
            className: "bg-[#891326] text-white hover:bg-[#6d0f1e]",
          },
          {
            label: "Turnitin",
            link: "/request-support",
            variant: "default",
            isExternal: true,
            className: "border-[#891326] hover:bg-[#891326] hover:text-white",
          },
        ]}
      />

      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 my-20 text-center">
        <div className="">
          {/* Main Heading with highlighted keywords */}
          <div className="mb-8">
            <p className="text-2xl font-medium tracking-wide leading-normal text-gray-900">
              So, you're looking to improve your{" "}
              <span className="text-[#891326]">writing</span>?
            </p>
          </div>

          {/* Supporting Paragraph */}
          <p className="text-sm font-light text-gray-600 mb-4 leading-relaxed">
            Writing, especially creative writing, is something you are only born
            with the knowledge of how to do. You can always get better! And
            we're passionate about helping you improve and reach your potential!
            The library provides two main provisions: to enhance your
            vocabulary, improve your grammar and punctuation, provide feedback
            and suggestions, and make writing an enjoyable experience for you.
          </p>
        </div>
      </section>

      {/* Grammarly Section */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mb-20">
        <ToolShowcase
          toolName="Grammarly"
          description="Grammarly is a writing enhancement tool that goes beyond your basic spell checkers. It includes spell, punctuation, grammar, and plagiarism checker."
          tryNowLink="https://www.grammarly.com/"
          logoSrc="/assets/library_website_app/library/grammarly-logo.png"
          logoAlt="Grammarly Logo"
          borderColor="green"
          layout="image-right"
        />
      </section>

      {/* Grammarly Info Card */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mb-20">
        <InfoCard
          title="All new ALU students are added to Grammarly automatically."
          subtitle="Create or log in to your account with your @alustudent.com email."
          additionalInfo={
            <>
              You can also send an email to{" "}
              <a
                href="mailto:library_rw@comms.alueducation.com"
                className="underline hover:text-gray-200"
              >
                library_rw@comms.alueducation.com
              </a>{" "}
              or{" "}
              <a
                href="/grammarly-info"
                className="underline hover:text-gray-200"
              >
                click this link
              </a>{" "}
              for more information on how it works.
            </>
          }
        />
      </section>

      {/* Turnitin Section */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mb-20">
        <ToolShowcase
          toolName="Turnitin"
          description="Turnitin is an originality-checking and plagiarism-prevention service that checks your writing for citation mistakes or inappropriate copying."
          tryNowLink="https://www.turnitin.com/"
          logoSrc="/assets/library_website_app/library/turnitin-logo.png"
          logoAlt="Turnitin Logo"
          borderColor="red"
          layout="image-left"
        />
      </section>

      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mb-20">
        <div className="mb-8">
          <hr className="border-1 border-[#D00D2D] w-32 mb-4" />
          <h2 className="mb-3 w-1/2 text-3xl font-light tracking-wide text-gray-900">
            You're welcome to schedule an office hour here for creative writing
            support
          </h2>
        </div>
      </section>
    </>
  );
};
