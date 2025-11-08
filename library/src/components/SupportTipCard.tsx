import { ArrowUpRight } from "lucide-react";

interface SupportTipCardProps {
  icon: React.ReactNode;
  title: string;
  description: string | React.ReactNode;
  actionText: string;
  actionLink: string;
  isExternal?: boolean;
}

export const SupportTipCard = ({
  icon,
  title,
  description,
  actionText,
  actionLink,
  isExternal = true,
}: SupportTipCardProps) => {
  return (
    <div className="bg-[#0048B3] rounded-2xl p-6 flex flex-col hover:bg-[#314660] transition-colors">
      {/* Icon */}
      <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
        <div className="text-[#891326]">{icon}</div>
      </div>

      {/* Title */}
      <h3 className="text-[#F8FBFF] text-xl font-medium mb-3">{title}</h3>

      {/* Description */}
      <div className="text-[#F8FBFF] text-sm font-light leading-relaxed mb-4 flex-grow">
        {description}
      </div>

      {/* Action Link */}
      <a
        href={actionLink}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-[#F8FBFF] text-sm font-medium inline-flex items-center gap-2 hover:underline"
      >
        {actionText}
        <ArrowUpRight className="w-4 h-4" />
      </a>
    </div>
  );
};
