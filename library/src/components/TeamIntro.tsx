export const TeamIntro = () => {
  return (
    <div className="flex flex-col gap-10 rounded-3xl bg-[#CEF1FF] px-6 py-10 sm:px-8 lg:flex-row lg:items-center lg:gap-16 lg:px-12">
      {/* Left Section - Image */}
      <div className="overflow-hidden rounded-2xl shadow-sm lg:flex-1">
        <img
          src="/assets/library_website_app/library/slide-img-1.jpg"
          alt="Library team collaboration"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Right Section - Text Content */}
      <div className="flex flex-col gap-4 text-center lg:flex-1 lg:text-left">
        {/* Red accent line */}
        <hr className="mx-auto mb-2 w-16 border-2 border-[#D00D2D] lg:mx-0" />

        {/* Main title */}
        <h2 className="text-2xl font-semibold tracking-wide text-gray-900 sm:text-3xl lg:text-[2rem]">
          Meet the faces behind our exceptional library services!
        </h2>

        {/* Description paragraph */}
        <p className="text-sm font-light leading-relaxed tracking-wide text-gray-700 sm:text-base">
          Our dedicated team is here to assist you on your academic journey,
          providing expert guidance and support every step of the way. Whether
          you have questions about resources, need assistance with research, or
          want to chat about your favourite books, we're here to help. Connect
          with us today and discover the difference our team can make!
        </p>
      </div>
    </div>
  );
};
