import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

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
    
    return (
      <div className="slide-container">
        <Slide slidesToShow={1} slidesToScroll={1} infinite={true} duration={5000} autoplay={true} pauseOnHover={true} indicators={true} arrows={true}>
          {slideImages.map((slideImage, index) => (
            <div key={index}>
                  <div
                      className="rounded-3xl"
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
