interface InfoCardProps {
  title: string;
  subtitle: string;
  additionalInfo: string | React.ReactNode;
}

export const InfoCard = ({
  title,
  subtitle,
  additionalInfo,
}: InfoCardProps) => {
  return (
    <div className="relative bg-[#0048B3] rounded-3xl p-12 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#8BA8D6] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#8BA8D6] rounded-full translate-x-1/2 translate-y-1/2" />

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        {/* Main Heading */}
        <h3 className="text-2xl font-semibold mb-4 leading-relaxed">{title}</h3>

        {/* Subtitle */}
        <p className="text-base font-normal mb-4">{subtitle}</p>

        {/* Additional Info */}
        <div className="text-sm font-light leading-relaxed">
          {additionalInfo}
        </div>
      </div>
    </div>
  );
};

