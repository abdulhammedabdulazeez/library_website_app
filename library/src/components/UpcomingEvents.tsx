import { Link } from "react-router-dom";

export const UpcomingEvents = () => {
  return (
    <div className="bg-[#CEF1FF] p-10 flex items-center justify-between rounded-3xl gap-10">
      {/* Left Section - Single Image */}
      <div className="w-1/2 mx-auto">
        <img
          src="/assets/library_website_app/library/event-image.png"
          alt="Library event"
          className="rounded-2xl w-full h-auto object-cover"
        />
      </div>

      {/* Right Section - Text Content */}
      <div className="w-1/3 mx-auto">
        {/* Red accent line and title */}
        <hr className="border-2 border-[#D00D2D] w-16 mb-4" />
        <h2 className="text-3xl font-bold tracking-wide text-gray-900 mb-6">
          Upcoming Events
        </h2>

        {/* Event announcement */}
        <p className="text-base font-medium text-gray-900 mb-4">
          Join us for our upcoming Academic Research Integrity 2.0 Workshop on
          March 19, 2024!
        </p>

        {/* Event description */}
        <p className="text-sm font-light tracking-wide text-gray-700 mb-6">
          This essential event is designed to equip you with the knowledge and
          skills needed to uphold the highest standards of academic integrity in
          your research endeavors. Led by experts in the field, the workshop
          will cover key topics such as plagiarism detection, proper citation
          practices, and ethical conduct in research.
        </p>

        {/* Learn More link */}
        <Link
          to="/events"
          className="text-[#D00D2D] font-medium hover:text-[#891326] inline-flex items-center"
        >
          Learn More &gt;&gt;
        </Link>
      </div>
    </div>
  );
};
