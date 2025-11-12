import { Hero } from "@/components/Hero";
import { MissionCuratorGrid } from "@/components/gcgo/MissionCuratorGrid";
import { gcgoList } from "@/data/gcgo";

export const Gcgo = () => {
  const missionCurators = gcgoList
    .filter((gcgo) => gcgo.curator_info)
    .map(({ curator_info, gcgo, slug }) => ({
      curator: curator_info!,
      gcgo,
      slug,
    }));

  return (
    <>
      <Hero
        backgroundImage="/assets/library_website_app/library/library-15.jpg"
        title="Global Challenges and Global Opportunities"
        height="large"
      />

      <section className="mx-auto w-full max-w-4xl px-4 py-16">
        <div className="aspect-video w-full rounded-3xl overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/mAN_r1K02uw?start=2"
            title="Global Challenges and Global Opportunities overview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h2 className="mt-6 text-3xl font-medium tracking-wide text-gray-900">
            Global <span className="text-[#891326]">Challenges</span> &amp;
            Global <span className="text-[#891326]">Opportunities</span>
          </h2>
          <p className="text-lg text-gray-600">(G.C.G.O)</p>
        </header>

        <div className="space-y-10">
          <div>
            <hr className="h-1 mb-4 w-32 bg-[#D00D2D]" />
            <h3 className="mb-3 text-3xl font-light tracking-wide text-gray-900">
              Mission Curators
            </h3>
          </div>
          <MissionCuratorGrid curators={missionCurators} />
        </div>
      </section>
    </>
  );
};
