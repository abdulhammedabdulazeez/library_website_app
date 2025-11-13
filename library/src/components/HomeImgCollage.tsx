import PhotoAlbum from "react-photo-album";
import "react-photo-album/styles.css";
import type { Photo } from "react-photo-album";

export const HomeImgCollage = () => {
  const photos: Photo[] = [
    {
      src: "/assets/library_website_app/library/home-img-col-1.jpg",
      alt: "ALU Library",
      width: 1600,
      height: 2400,
    },
    {
      src: "/assets/library_website_app/library/home-img-col-2.jpg",
      alt: "ALU Library",
      width: 3600,
      height: 2400,
    },
    {
      src: "/assets/library_website_app/library/home-img-col-3.jpg",
      alt: "ALU Library",
      width: 1734,
      height: 2400,
    },
  ];
  return (
    <div className="w-full md:w-1/3 mx-auto">
      <PhotoAlbum
        photos={photos}
        layout={"columns"}
        columns={2}
        spacing={16}
        padding={6}
        //   targetRowHeight={}
        render={{
          wrapper: ({ style, ...rest }) => (
            <div
              style={{
                ...style,
                borderRadius: "10px",
                boxShadow:
                  30 + 30 > 0
                    ? "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)"
                    : "none",
                transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              }}
              {...rest}
            />
          ),
        }}
      />
    </div>
  );
};
