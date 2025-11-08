interface ToolShowcaseProps {
  toolName: string;
  description: string;
  tryNowLink: string;
  logoSrc: string;
  logoAlt: string;
  borderColor: "green" | "red";
  layout?: "image-right" | "image-left";
}

export const ToolShowcase = ({
  toolName,
  description,
  tryNowLink,
  logoSrc,
  logoAlt,
  borderColor,
  layout = "image-right",
}: ToolShowcaseProps) => {
  const borderColorClass =
    borderColor === "green" ? "border-[#15803d]" : "border-[#891326]";

  const contentSection = (
    <div className="w-1/2 flex flex-col justify-center">
      <h2 className="text-4xl font-medium text-[#891326] mb-4">{toolName}</h2>
      <p className="text-gray-700 text-base font-light leading-relaxed mb-6">
        {description}
      </p>
      <a
        href={tryNowLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#891326] text-sm font-light underline hover:text-[#6d0f1e] inline-block"
      >
        Try Now &gt;&gt;
      </a>
    </div>
  );

  const logoSection = (
    <div className="w-1/2 flex items-center justify-center">
      <div
        className={`${borderColorClass} border-18 rounded-3xl bg-white p-12 w-80 h-96 flex items-center justify-center`}
      >
        <img
          src={logoSrc}
          alt={logoAlt}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );

  return (
    <div className="bg-[#E9F9FF] rounded-3xl p-12 flex gap-12 items-center">
      {layout === "image-right" ? (
        <>
          {contentSection}
          {logoSection}
        </>
      ) : (
        <>
          {logoSection}
          {contentSection}
        </>
      )}
    </div>
  );
};
