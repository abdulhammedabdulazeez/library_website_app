import { TeamMemberCard } from "./TeamMemberCard";
import type { TeamMember } from "@/types/team";

interface TeamGridProps {
  members: TeamMember[];
}

export const TeamGrid = ({ members }: TeamGridProps) => {
  return (
    <div>
      {/* Section Header */}
      <div className="mb-8">
        <hr className="border-2 border-[#D00D2D] w-16 mb-4" />
        <h2 className="text-3xl font-bold tracking-wide text-gray-900">
          The Team
        </h2>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};
