// src/pages/GcgoDetailPage.tsx
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { gcgoBySlug } from "@/data/gcgo";
import { CuratorProfileSection } from "@/components/gcgo/CuratorProfileSection";
import { BookOfficeHours } from "@/components/BookOfficeHours";
import { ResourcesSection } from "@/components/gcgo/ResourcesSection";

export const GcgoDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const gcgo = useMemo(() => {
    if (!slug) return undefined;
    return gcgoBySlug[slug];
  }, [slug]);

  if (!gcgo) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">GCGO not found</h1>
        <p className="max-w-xl text-gray-600">
          We couldn’t find that Goal-Centered Growth Opportunity. Browse the
          full list to learn more about our focus areas.
        </p>
        <Button
          onClick={() => navigate("/library/gcgo")}
          className="bg-[#D00D2D] text-white hover:bg-[#A30B22]"
        >
          View all GCGOs
        </Button>
      </main>
    );
  }

  return (
    <>
      <Hero
        backgroundImage={gcgo.heroImage}
        title={gcgo.title}
        height="large"
      />

      <main className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        {gcgo.curator_info ? (
          <CuratorProfileSection
            curator={gcgo.curator_info}
            gcgoName={gcgo.gcgo ?? gcgo.title}
          />
        ) : null}

        {/* Book Office Hours Section */}
        <section className="mx-auto w-full my-20">
          <BookOfficeHours allowedDescription={false} appointmentUrl="" />
        </section>

        {/* Resources Section */}
        {gcgo.resources?.length ? (
          <section className="mx-auto w-full my-20">
            <ResourcesSection resources={gcgo.resources} />
          </section>
        ) : null}

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-gray-200 bg-white px-6 py-8 shadow-sm">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Explore other GCGOs
            </h3>
            <p className="text-sm text-gray-600">
              Discover additional strategic pillars supporting our mission.
            </p>
          </div>
          <Button
            onClick={() => navigate("/library/gcgo")}
            variant="outline"
            className="border-[#D00D2D] text-[#D00D2D] hover:bg-[#D00D2D] hover:text-white"
          >
            Back to overview
          </Button>
        </footer>
      </main>
    </>
  );
};
