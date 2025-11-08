import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface HeroButton {
  label: string;
  link: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
  isExternal?: boolean;
}

export interface HeroProps {
  backgroundImage: string;
  title: string;
  description?: string;
  buttons?: HeroButton[];
  overlayOpacity?: number;
  textAlign?: "left" | "center" | "right";
  height?: "full" | "large" | "medium" | "small" | "custom";
  customHeight?: string;
}

export const Hero = ({
  backgroundImage,
  title,
  description,
  buttons = [],
  overlayOpacity = 80,
  textAlign = "left",
  height = "full",
  customHeight,
}: HeroProps) => {
  // Map height options to Tailwind classes
  const heightMap = {
    full: "h-screen", // 100vh - Homepage
    large: "h-[600px]", // 600px - Feature pages
    medium: "h-96", // 384px - Most inner pages
    small: "h-64", // 256px - Simple headers
  };

  const heightClass =
    height === "custom" && customHeight
      ? customHeight
      : heightMap[height as keyof typeof heightMap];

  const alignmentClass = {
    left: "justify-start text-left",
    center: "justify-center text-center",
    right: "justify-end text-right",
  }[textAlign];

  return (
    <section
      className={`relative ${heightClass} before:absolute before:inset-0 before:bg-black/${overlayOpacity} before:opacity-${overlayOpacity} before:z-0`}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />

      {/* Content */}
      <div
        className={`relative z-10 flex h-full items-center ${alignmentClass} text-white`}
      >
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div
            className={
              textAlign === "center" ? "mx-auto max-w-3xl" : "max-w-2xl"
            }
          >
            <h1 className="text-5xl font-bold mb-4 tracking-wide leading-normal">
              {title}
            </h1>

            {description && (
              <p className="text-xl mb-8 font-light">{description}</p>
            )}

            {buttons.length > 0 && (
              <div
                className={`flex gap-4 ${
                  textAlign === "center"
                    ? "justify-center"
                    : textAlign === "right"
                    ? "justify-end"
                    : ""
                }`}
              >
                {buttons.map((button, index) => (
                  <Button
                    key={index}
                    variant={button.variant}
                    className={button.className || "px-6 py-6 text-lg"}
                    asChild
                  >
                    {button.isExternal ? (
                      <a
                        href={button.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {button.label}
                      </a>
                    ) : (
                      <Link to={button.link}>{button.label}</Link>
                    )}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
