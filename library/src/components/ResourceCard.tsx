interface ResourceCardProps {
  logo: string;
  title: string;
  link: string;
}

export const ResourceCard = ({ logo, title, link }: ResourceCardProps) => {
  return (
    <div className="bg-[#E9F9FF] rounded-2xl p-4 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
      {/* Logo/Icon */}
      <div className="mb-6 flex items-center justify-center h-24">
        <img
          src={logo}
          alt={title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Resource Link */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#891326] text-sm font-normal underline hover:text-[#6d0f1e] text-center"
      >
        {title}
      </a>
    </div>
  );
};
