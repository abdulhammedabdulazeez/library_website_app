import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, Phone, Linkedin, Instagram } from "lucide-react";
import type { TeamMember } from "@/types/team";

interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  return (
    <Dialog>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        {/* Team Member Image */}
        <div className="aspect-square overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Name */}
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {member.name}
          </h3>

          {/* Role */}
          <p className="text-sm text-gray-600 mb-3">{member.role}</p>

          {/* Short Bio */}
          <p className="text-sm text-gray-700 font-light leading-relaxed mb-4">
            {member.shortBio}
          </p>

          {/* Read More Trigger */}
          <DialogTrigger asChild>
            <button className="text-[#D00D2D] text-sm font-medium hover:underline">
              Read More
            </button>
          </DialogTrigger>
        </div>
      </div>

      {/* Modal Content */}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-6 mb-4">
            {/* Member Image in Modal */}
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-xl object-cover"
            />
            <div>
              <DialogTitle className="text-2xl font-bold mb-1">
                {member.name}
              </DialogTitle>
              <p className="text-gray-600">{member.role}</p>
            </div>
          </div>
        </DialogHeader>

        <DialogDescription asChild>
          <div className="space-y-4">
            {/* Full Bio */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">About</h4>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {member.fullBio}
              </p>
            </div>

            {/* Social Links */}
            {Object.keys(member.socialLinks).length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Connect with {member.name.split(" ")[0]}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {member.socialLinks.email && (
                    <a
                      href={`mailto:${member.socialLinks.email}`}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">Email</span>
                    </a>
                  )}

                  {member.socialLinks.whatsapp && (
                    <a
                      href={`https://wa.me/${member.socialLinks.whatsapp}`}
                      className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">WhatsApp</span>
                    </a>
                  )}

                  {member.socialLinks.linkedin && (
                    <a
                      href={member.socialLinks.linkedin}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  )}

                  {member.socialLinks.instagram && (
                    <a
                      href={member.socialLinks.instagram}
                      className="flex items-center gap-2 px-4 py-2 bg-pink-100 hover:bg-pink-200 rounded-lg transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="w-4 h-4" />
                      <span className="text-sm">Instagram</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
