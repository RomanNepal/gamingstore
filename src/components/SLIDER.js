import React from "react";
import Slider from "react-slick";

const SLIDER = () => {
  return (
    <div>
      <Slider style={{ onfocus: "" }} {...settings}>
        {featured?.length
          ? featured?.map((product, index) => {
              return (
                <div
                  className="slider"
                  key={product.id}
                  style={{
                    border: "1px solid red",
                    width: "100%",
                  }}
                >
                  <img
                    src={product.image.url}
                    alt="carouselimage"
                    style={{
                      height: "500px",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  ></img>
                </div>
              );
            })
          : ""}
      </Slider>
    </div>
  );
};

export default SLIDER;
