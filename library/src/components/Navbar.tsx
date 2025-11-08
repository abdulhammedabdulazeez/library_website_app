import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#1e3a8a] text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Knowledge Management */}
          <div className="flex items-center space-x-4">
            <Link to="/library" className="flex items-center space-x-3">
              <div className="text-white">
                <div className="text-xl font-bold leading-tight">
                  <span className="text-2xl">ALU</span>
                </div>
              </div>
            </Link>
            <div className="hidden md:block">
              <span className="text-white text-sm font-medium">
                Knowledge Management
              </span>
            </div>
          </div>

          {/* Right side - Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Our Service Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:text-gray-200 hover:bg-transparent p-0 h-auto font-medium"
                >
                  Our Services
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Link to="/library/services/research-support" className="w-full">
                    Research Support
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/library/services/creative-writing" className="w-full">
                    Creative Writing Enhancement
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/library/team"
              className="text-white hover:text-gray-200 transition-colors duration-200 font-medium"
            >
              Our Team
            </Link>
            
            <Link
              to="/library/events"
              className="text-white hover:text-gray-200 transition-colors duration-200 font-medium"
            >
              Upcoming Events
            </Link>

            {/* G.C.G.O Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:text-gray-200 hover:bg-transparent p-0 h-auto font-medium"
                >
                  G.C.G.O
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Link to="/gcgo/about" className="w-full">
                    About G.C.G.O
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/gcgo/resources" className="w-full">
                    Resources
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gray-200 hover:bg-transparent"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#1e3a8a] border-t border-blue-800">
              <Link
                to="/"
                className="block px-3 py-2 text-white hover:text-gray-200 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-white hover:text-gray-200 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/services"
                className="block px-3 py-2 text-white hover:text-gray-200 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Our Service
              </Link>
              <Link
                to="/creative-writing"
                className="block px-3 py-2 text-white hover:text-gray-200 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Creative Writing Enhancement
              </Link>
              <Link
                to="/events"
                className="block px-3 py-2 text-white hover:text-gray-200 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Upcoming Events
              </Link>
              <Link
                to="/gcgo"
                className="block px-3 py-2 text-white hover:text-gray-200 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                G.C.G.O
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
