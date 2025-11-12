import { Hero } from "@/components/Hero";
import { ResearchSupportIntro } from "@/components/ResearchSupportIntro";
import { ResourceCard } from "@/components/ResourceCard";
import { SupportTipCard } from "@/components/SupportTipCard";
import {
  BookOpen,
  Building,
  BookMarked,
  Bookmark,
  Search,
  Headphones,
  Instagram,
  BookText,
} from "lucide-react";

export const ResearchSupportPage = () => {
  return (
    <>
      <Hero
        backgroundImage="/assets/library_website_app/library/hero-image.jpg"
        title="Research Support"
        description="Get help with your research projects"
        height="medium"
      />

      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 my-20 text-center">
        <ResearchSupportIntro />
      </section>

      {/* Supported Resources Section */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mb-20">
        <div className="mb-8">
          <hr className="border-2 border-[#D00D2D] w-32 mb-4" />
          <h2 className="mb-3 text-3xl font-light tracking-wide text-gray-900">
            Supported Resources and Databases
          </h2>
          <p className="text-sm font-light tracking-wide text-gray-600">
            We support the following resources and databases for your research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ResourceCard
            logo="/assets/library_website_app/library/resources-images/ebsco_host.png"
            title="EBSCOHost"
            link="https://research.ebsco.com/c/e3zs3u?auth-callid=a11b727a-70b0-9c27-9039-e89288de282b&db=a9h%2Cbth%2Ciih%2Ce000xww%2Ce020mww%2Cnlebk%2Ceue%2Cent%2Ceric%2Cpwh%2Cbwh"
          />
          <ResourceCard
            logo="/assets/library_website_app/library/resources-images/buku.png"
            title="BUKU"
            link="https://buku.app/"
          />
          <ResourceCard
            logo="/assets/library_website_app/library/resources-images/librarika.png"
            title="LIBRARIKA"
            link="https://alu.librarika.com/"
          />
        </div>
      </section>

      {/* External Resources Section */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mb-20">
        <div className="mb-8">
          <hr className="border-2 border-[#D00D2D] w-32 mb-4" />
          <h2 className="mb-3 text-3xl font-light tracking-wide text-gray-900">
            External Resources and Databases
          </h2>
          <p className="text-sm font-light tracking-wide text-gray-600">
            We also support the following external resources and databases for
            your research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ResourceCard
            logo="/assets/library_website_app/library/resources-images/google-scholar.png"
            title="Google Scholar"
            link="https://scholar.google.com/"
          />
          <ResourceCard
            logo="/assets/library_website_app/library/resources-images/ssrn.png"
            title="SSRN"
            link="https://www.ssrn.com/"
          />
          <ResourceCard
            logo="/assets/library_website_app/library/resources-images/doaj.png"
            title="Directory of Open Access Journals"
            link="https://doaj.org/"
          />
          <ResourceCard
            logo="/assets/library_website_app/library/resources-images/base.png"
            title="Base"
            link="https://www.base-search.net/"
          />
          <ResourceCard
            logo="/assets/library_website_app/library/resources-images/scematic scholar 1.png"
            title="Semantic Scholar"
            link="https://www.semanticscholar.org/"
          />
        </div>
      </section>

      {/* Support Tips Section */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mb-20">
        <div className="mb-8">
          <hr className="border-1 border-[#D00D2D] w-36 mb-4" />
          <h2 className="mb-3 text-3xl font-light tracking-wide text-gray-900">
            Here are a few quick{" "}
            <span className="text-[#891326]">support tips:</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SupportTipCard
            icon={<BookText className="w-8 h-8" />}
            title="Library Overview"
            description="To learn more about our library, kindly see our orientation slide deck."
            actionText="Learn More"
            actionLink="https://docs.google.com/presentation/d/1n27UYetXcLbIHTmAEECYjPhCik0OHPLs/edit?usp=sharing&ouid=113156932415250844659&rtpof=true&sd=true"
            isExternal={true}
          />

          <SupportTipCard
            icon={<Building className="w-8 h-8" />}
            title="EBSCOHost Database"
            description="To learn how to use EBSCOHost (unlimited resource database), see the EBSCOHost User Guide."
            actionText="View Guide"
            actionLink="https://docs.google.com/presentation/d/1hCbQ6UZka36wJLQq9vOkSJ2cNy_wjXn2VSz0f-8y34I/edit?usp=sharing"
            isExternal={true}
          />

          <SupportTipCard
            icon={<BookOpen className="w-8 h-8" />}
            title="BUKU eBooks"
            description="To learn how to use BUKU (ebooks), kindly refer to our BUKU User Guide."
            actionText="Learn More"
            actionLink="https://docs.google.com/presentation/d/1uF0j7q-sSJ4NKjKOs6LrXd28N42MJaIbxdrXz39MG3Q/edit?usp=sharing"
            isExternal={true}
          />

          <SupportTipCard
            icon={<BookMarked className="w-8 h-8" />}
            title="Librarika (Borrowing Books)"
            description="If you encounter issues registering or using Librarika (borrowing books from the library), kindly refer to our Librarika User Guide."
            actionText="View Guide"
            actionLink="https://docs.google.com/presentation/d/15itke_OwI32WwRqVhrqZiXRow23lFF8AQVabuHfTBgg/edit?usp=sharing"
            isExternal={true}
          />

          <SupportTipCard
            icon={<Bookmark className="w-8 h-8" />}
            title="Canvas LMS Bookmark"
            description="To bookmark the library resources on your Canvas LMS."
            actionText="Bookmark Now"
            actionLink="https://alueducation.instructure.com/courses/402/modules/items/27428"
            isExternal={true}
          />

          <SupportTipCard
            icon={<Search className="w-8 h-8" />}
            title="Research Support"
            description={
              <>
                If you need research support, kindly book a research office hour{" "}
                <a
                  href="https://calendar.app.google/eM9eerMzpA83Zgd56"
                  target="_blank"
                  className="underline font-semibold"
                >
                  HERE
                </a>
                , and remember to fill out the{" "}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdxQpdMUFppDCSWq8e0eT8x2XTiP3Xsyx8Q1C_YmA4gkKqH6g/viewform?usp=sf_link"
                  target="_blank"
                  className="underline font-semibold"
                >
                  RESEARCH OFFICE HOURS FORM
                </a>{" "}
                when booking a session.
              </>
            }
            actionText="Request Support"
            actionLink="https://calendar.app.google/eM9eerMzpA83Zgd56"
            isExternal={true}
          />

          <SupportTipCard
            icon={<Headphones className="w-8 h-8" />}
            title="General Support"
            description={
              <>
                For general library services support, kindly fill out this{" "}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSd9Ij7VSGGxmo9kihcv8u-Or6LTCoUDippMPB9Arxufh03S0A/viewform?usp=sf_link"
                  target="_blank"
                  className="underline font-semibold"
                >
                  FORM
                </a>{" "}
                and a librarian will get in touch with you as soon as possible.
              </>
            }
            actionText="Get Support"
            actionLink="https://docs.google.com/forms/d/e/1FAIpQLSd9Ij7VSGGxmo9kihcv8u-Or6LTCoUDippMPB9Arxufh03S0A/viewform?usp=sf_link"
            isExternal={true}
          />

          <SupportTipCard
            icon={<Instagram className="w-8 h-8" />}
            title="Contact Us"
            description="You can reach out to us on Instagram at @ALULibrary."
            actionText="Contact Us"
            actionLink="https://instagram.com/ALULibrary"
          />
        </div>
      </section>
    </>
  );
};
