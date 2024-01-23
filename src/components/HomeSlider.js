import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "./Slider.css";
import Skeleton from "./Skeleton";
const HomeSlider = () => {
  const settings = {
    focusOnSelect: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    customPaging: (i) => (
      <div
        style={{
          width: "20px",
          height: "3px",
          marginTop: "-30px", // Set your desired margin here

          background: i === 2 ? "#000" : "#bbb", // Change the active and inactive dot colors
          borderRadius: "5px",
        }}
      ></div>
    ),
  };
  const [featured, setFeatured] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getFeatured = async () => {
      try {
        let featuredProducts = await axios.get(
          "https://api.chec.io/v1/products?limit=3&category_slug=featured",
          {
            headers: {
              "X-Authorization": `${process.env.REACT_APP_PUBLIC_KEY}`,
            },
          }
        );
        setFeatured(featuredProducts.data.data);

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getFeatured();
  }, []);
  return (
    <div style={{ marginTop: "1rem", width: "940px", height: "500px" }}>
      <Slider style={{ onfocus: "" }} {...settings}>
        {featured?.length
          ? featured?.map((product, index) => {
              return (
                <div
                  className="slider"
                  style={
                    {
                      // overflow: "hidden",
                      // height: loading ? "500px" : "500px",
                    }
                  }
                  key={product.id}
                >
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <img
                      src={product.image.url}
                      alt="carouselimage"
                      style={{
                        height: "500px",
                        width: "100%",
                        objectFit: "contain",
                      }}
                    ></img>
                  )}
                </div>
              );
            })
          : ""}
      </Slider>
    </div>
  );
};

export default HomeSlider;
