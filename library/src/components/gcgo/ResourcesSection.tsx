type Resource = {
  img_url: string;
  title: string;
  url: string;
};

type ResourcesSectionProps = {
  heading?: string;
  resources: Resource[];
};

export const ResourcesSection = ({
  heading = "View Resources",
  resources,
}: ResourcesSectionProps) => {
  if (!resources.length) {
    return null;
  }

  return (
    <section>
      <header className="mb-10">
        <div className="h-1 w-16 bg-[#D00D2D]" />
        <h2 className="mt-6 text-3xl font-semibold text-gray-900">{heading}</h2>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <article key={resource.url} className="space-y-3">
            <a
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D00D2D]"
            >
              <img
                src={resource.img_url}
                alt={resource.title}
                className="aspect-[3/4] w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition-all duration-200 group-hover:bg-black/30 group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#D00D2D]">
                  View resource
                </span>
              </div>
            </a>
            <p className="text-sm font-medium leading-6 text-gray-800 line-clamp-3">
              {resource.title}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
