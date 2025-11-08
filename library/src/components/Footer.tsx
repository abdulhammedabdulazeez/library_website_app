import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#1e3a8a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          {/* Main title */}
          <h3 className="text-xl font-semibold">ALU Rwanda Campus</h3>

          {/* Address */}
          <div className="flex items-center justify-center space-x-2 text-sm">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="text-center">
              Bumbogo, Kigali Innovation City, Next to Azam, Kigali, Rwanda
            </span>
          </div>

          {/* Contact information */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
            {/* Phone */}
            <a
              href="tel:+250784650219"
              className="flex items-center space-x-1 hover:text-gray-200 transition-colors duration-200 underline decoration-1 underline-offset-2"
            >
              <Phone className="h-4 w-4" />
              <span>+250 784 650 219</span>
            </a>

            {/* Separator */}
            <span className="hidden sm:inline text-gray-300">|</span>

            {/* Email */}
            <a
              href="mailto:library_rw@comms.alueducation.com"
              className="flex items-center space-x-1 hover:text-gray-200 transition-colors duration-200 underline decoration-1 underline-offset-2"
            >
              <Mail className="h-4 w-4" />
              <span>library_rw@comms.alueducation.com</span>
            </a>

            {/* Separator */}
            <span className="hidden sm:inline text-gray-300">|</span>

            {/* ALU Rwanda link */}
            <a
              href="https://alueducation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-gray-200 transition-colors duration-200"
            >
              <span>[ALU Rwanda]</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Bottom border */}
        <div className="mt-6 pt-6 border-t border-blue-800">
          <div className="text-center text-xs text-gray-300">
            <p>
              © {new Date().getFullYear()} African Leadership University. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
