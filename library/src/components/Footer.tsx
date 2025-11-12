export const Footer = () => {
  return (
    <footer className="bg-[#052D73] text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col items-center gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
          <div className="flex w-full flex-col items-center gap-4 md:w-auto md:items-start">
            <img
              src="/alu-logo.png"
              alt="African Leadership University logo"
              className="h-12 w-auto"
              loading="lazy"
            />
          </div>

          <div
            className="hidden h-16 w-px bg-white/30 md:block"
            aria-hidden="true"
          />

          <div className="flex w-full flex-col items-center gap-2 text-center text-sm md:w-auto md:items-start md:text-left">
            <span className="uppercase tracking-wider text-white/80">
              ALU Rwanda Campus
            </span>
            <p className="max-w-xs leading-relaxed text-white/90">
              Bumbogo, Kigali Innovation City,
              <br />
              Next to Azam, Kigali, Rwanda
            </p>
          </div>

          <div
            className="hidden h-16 w-px bg-white/30 md:block"
            aria-hidden="true"
          />

          <div className="flex w-full flex-col items-center gap-2 text-center text-sm md:w-auto md:items-end md:text-right">
            <a
              href="tel:+250784650219"
              className="font-medium text-white transition-colors duration-200 hover:text-white/80"
            >
              +250 784 650 219
            </a>
            <a
              href="mailto:library_rw@comms.alueducation.com"
              className="font-medium text-white transition-colors duration-200 hover:text-white/80"
            >
              library_rw@comms.alueducation.com
            </a>
          </div>
        </div>

        <div className="mt-8 flex w-full flex-col items-center gap-4 border-t border-white/10 pt-6 text-xs text-white/60 md:mt-10">
          <p>
            © {new Date().getFullYear()} African Leadership University. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
