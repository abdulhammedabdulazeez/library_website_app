import { Hero } from "@/components/Hero";
import { HomeImgCollage } from "@/components/HomeImgCollage";
import { HomePageSlide } from "@/components/HomePageSlide";
import { ManualCard } from "@/components/ManualCard";
import { BookOfficeHours } from "@/components/BookOfficeHours";
import { FAQ } from "@/components/FAQ";
import { Link } from "react-router-dom";
import { UPCOMING_EVENTS } from "@/data/events";
import { useMemo } from "react";
import { FeaturedEventCard } from "@/components/events/FeaturedEventCard";
import { LibraryChatBot } from "@/components/LibraryChatBot";

export const HomePage = () => {
  const featuredEvent = useMemo(() => UPCOMING_EVENTS[0], []);

  return (
    <div>
      <Hero
        backgroundImage="/assets/library_website_app/library/hero-image.jpg"
        title="Welcome to the ALU Library!"
        description="Search for books in LIBRARIKA"
        height="full"
        overlayOpacity={0.5}
        buttons={[
          {
            label: "Library OPAC",
            link: "https://www.google.com/url?q=https%3A%2F%2Falu.librarika.com%2F&sa=D&sntz=1&usg=AOvVaw30qnilbvwvwDdvdSmOklfX",
            className: "bg-[#891326] hover:bg-[#6d0f1e] px-6 py-6 text-lg",
            isExternal: true,
          },
        ]}
      />

      <LibraryChatBot />

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
          <p className="text-xl font-light tracking-wide text-gray-900 sm:text-2xl">
            As a leader in education on the continent, the{" "}
            <span className="text-[#891326]">African</span>
          </p>
          <p className="text-xl font-light tracking-wide text-gray-900 sm:text-2xl">
            <span className="text-[#891326]">Leadership University</span>{" "}
            Library is primarily digital, especially for our students in Rwanda.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-[#CEF1FF] p-10 flex flex-col md:flex-row items-center justify-between rounded-3xl">
          <div className="w-full mb-4 md:mb-0 md:w-1/4 mx-auto">
            <p className="text-sm font-light tracking-wide">
              We currently have subscriptions to several electronic information
              sources, including databases that provide access to over 263,300
              journals that cover topics in education, political science, social
              science, engineering, history, business, computers and technology,
              economics, entrepreneurship, and finance, among others—all for
              you!
            </p>
            <p className="text-sm font-light tracking-wide">
              <a
                href="https://www.google.com/url?q=https%3A%2F%2Falu.librarika.com%2F&sa=D&sntz=1&usg=AOvVaw30qnilbvwvwDdvdSmOklfX"
                target="_blank"
                className="text-[#891326] underline hover:text-[#891326]/80"
              >
                Search and reserve a book here
              </a>
            </p>
          </div>

          <HomeImgCollage />
        </div>
      </section>

      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mb-20">
        <div className="w-full md:w-2/3 mx-auto">
          <HomePageSlide />
        </div>
      </section>

      {/* Manuals Section */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mb-20">
        <div className="mb-8">
          <hr className="border-2 border-[#D00D2D] w-16 mb-4" />
          <h2 className="mb-3 text-3xl font-light tracking-wide text-gray-900">
            Manuals
          </h2>
          <p className="text-sm font-light tracking-wide text-gray-600">
            Detailed user manuals to help you understand and use these services
            effectively.
          </p>
        </div>

        {/* Manual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ManualCard
            imageSrc="/assets/library_website_app/library/home-img-col-1.jpg"
            title="EBSCOHost"
            description="Searching for Journals, newsletters, and ebooks"
            link="https://research.ebsco.com/c/e3zs3u?auth-callid=a11b727a-70b0-9c27-9039-e89288de282b&db=a9h%2Cbth%2Ciih%2Ce000xww%2Ce020mww%2Cnlebk%2Ceue%2Cent%2Ceric%2Cpwh%2Cbwh"
          />
          <ManualCard
            imageSrc="/assets/library_website_app/library/home-img-col-2.jpg"
            title="BUKU"
            description="Searching for e-textbooks across all fields"
            link="https://buku.app/"
          />
          <ManualCard
            imageSrc="/assets/library_website_app/library/home-img-col-3.jpg"
            title="LIBRARIKA"
            description="Searching for physical copy of a book in the library"
            link="https://alu.librarika.com/"
          />
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mb-20">
        <div className="mb-8 flex items-center justify-between">
          <div className="">
            <hr className="border-1 border-[#D00D2D] w-32 mb-4" />
            <h2 className="mb-3 text-3xl font-light tracking-wide text-gray-900">
              Events and Workshops
            </h2>
            <p className="text-sm font-light tracking-wide text-gray-600">
              Stay updated with the latest events and workshops happening at the
              library.
            </p>
          </div>

          <Link
            to="/library/events"
            className="text-[#891326] underline hover:text-[#891326]/80"
          >
            View all events
          </Link>
        </div>
        {featuredEvent && <FeaturedEventCard event={featuredEvent} />}
      </section>

      {/* Book Office Hours Section */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mb-20">
        <BookOfficeHours
          allowedDescription={true}
          appointmentUrl="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3CMLgDECh21NpasAuQLdP4dmNNKtQESzJz8nfd7ILMXpFFRecBxhKb8Nej1DDTRC-DTcY9VWXk"
        />
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mb-20">
        <FAQ />
      </section>
    </div>
  );
};
