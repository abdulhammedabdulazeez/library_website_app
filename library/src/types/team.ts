export interface SocialLinks {
  email?: string;
  whatsapp?: string;
  linkedin?: string;
  instagram?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  shortBio: string;
  fullBio: string;
  socialLinks: SocialLinks;
}
