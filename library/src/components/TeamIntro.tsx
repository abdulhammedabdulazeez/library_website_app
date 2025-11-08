export const TeamIntro = () => {
  return (
    <div className="bg-[#CEF1FF] p-10 flex items-center justify-between rounded-3xl gap-20">
      {/* Left Section - Image */}
      <div className="w-1/2">
        <img
          src="/assets/library_website_app/library/slide-img-1.jpg"
          alt="Library team collaboration"
          className="rounded-2xl w-full h-auto object-cover"
        />
      </div>

      {/* Right Section - Text Content */}
      <div className="w-1/2">
        {/* Red accent line */}
        <hr className="border-2 border-[#D00D2D] w-16 mb-4" />

        {/* Main title */}
        <h2 className="text-3xl font-bold tracking-wide text-gray-900 mb-6">
          Meet the faces behind our exceptional library services!
        </h2>

        {/* Description paragraph */}
        <p className="text-sm font-light tracking-wide text-gray-700 leading-relaxed">
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
