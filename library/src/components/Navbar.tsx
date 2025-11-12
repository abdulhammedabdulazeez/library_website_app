import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LinkNavItem = {
  id: string;
  label: string;
  to: string;
  exact?: boolean;
  type: "link";
};

type DropdownNavItem = {
  id: string;
  label: string;
  items: LinkNavItem[];
  type: "dropdown";
};

type NavItem = LinkNavItem | DropdownNavItem;

const navItems: NavItem[] = [
  {
    id: "services",
    label: "Our Services",
    type: "dropdown",
    items: [
      {
        id: "services-research-support",
        label: "Research Support",
        to: "/library/services/research-support",
        type: "link",
      },
      {
        id: "services-creative-writing",
        label: "Creative Writing Enhancement",
        to: "/library/services/creative-writing",
        type: "link",
      },
    ],
  },
  {
    id: "team",
    label: "Our Team",
    to: "/library/team",
    type: "link",
  },
  {
    id: "events",
    label: "Upcoming Events",
    to: "/library/events",
    type: "link",
  },
  {
    id: "gcgo",
    label: "G.C.G.O",
    type: "dropdown",
    items: [
      {
        id: "gcgo-about",
        label: "About G.C.G.O",
        to: "/library/gcgo",
        exact: true,
        type: "link",
      },
      {
        id: "gcgo-health-care",
        label: "Health Care",
        to: "/library/gcgo/health-care",
        type: "link",
      },
      {
        id: "gcgo-job-creation",
        label: "Job Creation",
        to: "/library/gcgo/job-creation",
        type: "link",
      },
    ],
  },
];

const highlightClass = "text-[#D00D2D]";
const SCROLL_UP_THRESHOLD = 12;
const SCROLL_TOP_BUFFER = 80;

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdownState, setMobileDropdownState] = useState<
    Record<string, boolean>
  >({});
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  const isPathActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    if (path === "/library") {
      return location.pathname === path;
    }
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  const dropdownActiveMap = useMemo(() => {
    return navItems.reduce<Record<string, boolean>>((acc, item) => {
      if (item.type === "dropdown") {
        acc[item.id] = item.items.some((navItem) =>
          isPathActive(navItem.to, navItem.exact)
        );
      }
      return acc;
    }, {});
  }, [location.pathname]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileDropdown = (id: string) => {
    setMobileDropdownState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < SCROLL_TOP_BUFFER) {
        setShowNavbar(true);
      } else if (currentScrollY < lastScrollY - SCROLL_UP_THRESHOLD) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY + SCROLL_UP_THRESHOLD) {
        setShowNavbar(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const renderDesktopItem = (item: NavItem) => {
    if (item.type === "dropdown") {
      const isOpen = openDropdown === item.id;
      const isActive = dropdownActiveMap[item.id];
      return (
        <DropdownMenu
          key={item.id}
          open={isOpen}
          onOpenChange={(open) => setOpenDropdown(open ? item.id : null)}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "p-0 h-auto font-medium text-white transition-colors duration-200 hover:bg-transparent hover:text-gray-200",
                (isActive || isOpen) && highlightClass
              )}
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              {item.label}
              {isOpen ? (
                <ChevronUp className="ml-1 h-4 w-4" aria-hidden="true" />
              ) : (
                <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {item.items.map((navItem) => {
              const isActiveLink = isPathActive(navItem.to, navItem.exact);
              return (
                <DropdownMenuItem key={navItem.id} asChild>
                  <Link
                    to={navItem.to}
                    className={cn(
                      "flex w-full items-center justify-between text-sm transition-colors duration-200",
                      isActiveLink && highlightClass
                    )}
                    aria-current={isActiveLink ? "page" : undefined}
                  >
                    {navItem.label}
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    const isActive = isPathActive(item.to, item.exact);
    return (
      <Link
        key={item.id}
        to={item.to}
        className={cn(
          "font-medium transition-colors duration-200 hover:text-gray-200",
          isActive ? highlightClass : "text-white"
        )}
        aria-current={isActive ? "page" : undefined}
      >
        {item.label}
      </Link>
    );
  };

  const renderMobileItem = (item: NavItem) => {
    if (item.type === "dropdown") {
      const isActive = dropdownActiveMap[item.id];
      const isOpen = Boolean(mobileDropdownState[item.id]);
      return (
        <div key={item.id} className="rounded-md bg-blue-900/40">
          <button
            type="button"
            className={cn(
              "flex w-full items-center justify-between px-3 py-2 text-left text-base font-medium text-white transition-colors duration-200 hover:bg-blue-900/70",
              isActive && highlightClass
            )}
            onClick={() => toggleMobileDropdown(item.id)}
            aria-expanded={isOpen}
            aria-controls={`${item.id}-mobile-dropdown`}
          >
            <span>{item.label}</span>
            {isOpen ? (
              <ChevronUp className="h-5 w-5" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
          {isOpen && (
            <div
              id={`${item.id}-mobile-dropdown`}
              className="space-y-1 border-t border-blue-800/50 bg-blue-900/30 py-2"
            >
              {item.items.map((navItem) => {
                const isActiveLink = isPathActive(navItem.to, navItem.exact);
                return (
                  <Link
                    key={navItem.id}
                    to={navItem.to}
                    className={cn(
                      "block px-5 py-2 text-sm transition-colors duration-200 hover:bg-blue-900/60",
                      isActiveLink ? highlightClass : "text-white"
                    )}
                    onClick={handleLinkClick}
                    aria-current={isActiveLink ? "page" : undefined}
                  >
                    {navItem.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    const isActive = isPathActive(item.to, item.exact);
    return (
      <Link
        key={item.id}
        to={item.to}
        className={cn(
          "block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 hover:bg-blue-900/70",
          isActive ? highlightClass : "text-white"
        )}
        onClick={handleLinkClick}
        aria-current={isActive ? "page" : undefined}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 bg-[#1e3a8a] text-white shadow-lg transition-transform duration-300",
        showNavbar ? "translate-y-0" : "-translate-y-full"
      )}
      aria-label="Primary"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link
              to="/library"
              className="flex items-center space-x-2"
              aria-label="ALU Knowledge Management home"
            >
              <div className="text-white">
                <img
                  src="/assets/library_website_app/library/alu-logo-1.png"
                  alt="ALU Knowledge Management"
                  className="h-10"
                />
              </div>
              <div className="hidden md:block">
                <span className="text-white text-sm font-medium">
                  Knowledge Management
                </span>
              </div>
            </Link>
            {/* <div className="hidden md:block">
              <span className="text-white text-sm font-medium">
                Knowledge Management
              </span>
            </div> */}
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => renderDesktopItem(item))}
          </div>

          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="text-white hover:text-gray-200 hover:bg-transparent"
              aria-controls="primary-navigation-mobile"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
              <span className="sr-only">
                {isMobileMenuOpen ? "Close menu" : "Open menu"}
              </span>
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            id="primary-navigation-mobile"
            className="lg:hidden border-t border-blue-800 bg-[#1e3a8a]"
          >
            <div className="space-y-2 px-2 py-3 sm:px-3">
              <Link
                to="/library"
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 hover:bg-blue-900/70",
                  isPathActive("/library", true) ? highlightClass : "text-white"
                )}
                onClick={handleLinkClick}
                aria-current={
                  isPathActive("/library", true) ? "page" : undefined
                }
              >
                Home
              </Link>

              {navItems.map((item) => renderMobileItem(item))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
