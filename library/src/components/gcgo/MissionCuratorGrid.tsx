import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type CuratorInfo = {
  name: string;
  title?: string;
  image?: string;
  gmail?: string;
  email?: string;
};

type MissionCurator = {
  curator?: CuratorInfo;
  gcgo?: string;
  slug: string;
};

type MissionCuratorGridProps = {
  curators: MissionCurator[];
};

export const MissionCuratorGrid = ({ curators }: MissionCuratorGridProps) => {
  return (
    <section className="mx-auto w-full">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {curators.map(({ curator, gcgo, slug }) => {
          if (!curator) {
            return null;
          }

          const email = curator.email ?? curator.gmail;
          const badgeColor = "bg-[#0048B3]";

          return (
            <article
              key={slug}
              className="flex flex-col gap-4 rounded-[32px] shadow-md transition-shadow hover:shadow-xl overflow-hidden"
            >
              <div className="relative bg-[#E5F1FF]">
                <img
                  src={
                    curator.image ??
                    "/assets/library_website_app/library/gcgo-mission-curators-images/placeholder.png"
                  }
                  alt={curator.name}
                  className="h-60 w-full object-contain"
                  loading="lazy"
                />
                {gcgo ? (
                  <span
                    className={cn(
                      "max-w-52 absolute left-4 bottom-4 inline-flex items-center rounded-md px-3 py-1 text-xs font-light text-white text-center",
                      badgeColor
                    )}
                  >
                    {gcgo}
                  </span>
                ) : null}
              </div>
              <div className="space-y-2 px-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {curator.name}
                </h3>
                {email ? (
                  <a
                    href={`mailto:${email}`}
                    className="text-sm font-medium text-[#0B4D71] transition-colors hover:text-[#093B55]"
                  >
                    {email}
                  </a>
                ) : null}
                
              </div>
              <Link
                to={`/library/gcgo/${slug}`}
                className="mt-auto p-4 inline-flex items-center text-sm font-semibold text-[#D00D2D] hover:text-[#A30B22] hover:underline"
              >
                See Resources
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
};
