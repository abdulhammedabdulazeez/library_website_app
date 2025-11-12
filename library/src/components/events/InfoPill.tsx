import { type ReactNode } from "react";

type InfoPillProps = {
  icon: ReactNode;
  children: ReactNode;
};

export const InfoPill = ({ icon, children }: InfoPillProps) => {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm">
      {icon}
      {children}
    </span>
  );
};

