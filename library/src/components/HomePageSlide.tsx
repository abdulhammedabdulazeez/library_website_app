import { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const useMediaQuery = (query: string) => {
  const getMatches = (mediaQuery: string) => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(mediaQuery).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => getMatches(query));

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(mediaQueryList.matches);

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", listener);
    } else {
      mediaQueryList.addListener(listener);
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", listener);
      } else {
        mediaQueryList.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
};

export const HomePageSlide = () => {
  // const spanStyle = {
  //   padding: "20px",
  //   background: "#efefef",
  //   color: "#000000",
  // };

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "450px",
  };
  const slideImages = [
    {
      url: "/assets/library_website_app/library/slide-img-1.jpg",
      caption: "Slide 1",
    },
    {
      url: "/assets/library_website_app/library/slide-img-2.jpg",
      caption: "Slide 2",
    },
    {
      url: "/assets/library_website_app/library/slide-img-3.jpg",
      caption: "Slide 3",
    },
  ];

  const isAtLeastSm = useMediaQuery("(min-width: 640px)");

  return (
    <div className="w-full px-0 sm:px-4 lg:px-6">
      <Slide
        slidesToShow={1}
        slidesToScroll={1}
        infinite={true}
        duration={5000}
        autoplay={true}
        pauseOnHover={true}
        indicators={true}
        arrows={isAtLeastSm}
      >
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              className="md:rounded-3xl"
              style={{
                ...divStyle,
                backgroundImage: `url(${slideImage.url})`,
              }}
            >
              {/* <span style={spanStyle}>{slideImage.caption}</span> */}
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};
