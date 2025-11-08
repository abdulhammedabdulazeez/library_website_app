import { Hero } from "@/components/Hero";
import { HomeImgCollage } from "@/components/HomeImgCollage";
import { HomePageSlide } from "@/components/HomePageSlide";
import { ManualCard } from "@/components/ManualCard";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { BookOfficeHours } from "@/components/BookOfficeHours";
import { FAQ } from "@/components/FAQ";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      <Hero
        backgroundImage="/assets/library_website_app/library/hero-image.jpg"
        title="Welcome to the ALU Library!"
        description="Search for books in LIBRARIKA"
        height="full"
        buttons={[
          {
            label: "Library OPAC",
            link: "/library/opac",
            className: "bg-[#891326] hover:bg-[#6d0f1e] px-6 py-6 text-lg",
          },
        ]}
      />

      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 my-20">
        <div className="w-[62%] mx-auto">
          <p className="text-2xl text-center tracking-wider">
            As a leader in education on the continent, the{" "}
            <span className="text-[#891326]">African</span>
          </p>
          <p className="text-2xl text-center tracking-wider">
            <span className="text-[#891326]">Leadership University</span>{" "}
            Library is primarily digital, especially for our students in Rwanda.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-[#CEF1FF] p-10 flex items-center justify-between rounded-3xl">
          <div className="w-1/4 mx-auto">
            <p className="text-sm font-light tracking-wide">
              We currently have subscriptions to several electronic information
              sources, including databases that provide access to over 263,300
              journals that cover topics in education, political science, social
              science, engineering, history, business, computers and technology,
              economics, entrepreneurship, and finance, among others—all for
              you!
            </p>
            <p className="text-sm font-light tracking-wide">
              <Link
                to="/"
                className="text-[#891326] underline hover:text-[#891326]/80"
              >
                Search and reserve a book here
              </Link>
            </p>
          </div>

          <HomeImgCollage />
        </div>
      </section>

      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mb-20">
        <div className="w-2/3 mx-auto">
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
            link="https://search.ebscohost.com/"
          />
          <ManualCard
            imageSrc="/assets/library_website_app/library/home-img-col-2.jpg"
            title="BUKU"
            description="Searching for e-textbooks across all fields"
            link="https://buku.com/"
          />
          <ManualCard
            imageSrc="/assets/library_website_app/library/home-img-col-3.jpg"
            title="LIBRARIKA"
            description="Searching for physical copy of a book in the library"
            link="https://librarika.com/"
          />
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mb-20">
        <UpcomingEvents />
      </section>

      {/* Book Office Hours Section */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mb-20">
        <BookOfficeHours />
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mb-20">
        <FAQ />
      </section>
    </div>
  );
};
