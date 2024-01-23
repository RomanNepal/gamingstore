import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "./Slider.css";
import Skeleton from "./Skeleton";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
const HomeSlider = () => {
  const settings = {
    focusOnSelect: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    lazyLoading: true,
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
  const images = [0, 1, 2];
  const [currentImage, setCurrentImage] = useState(0);
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
    <div
      style={{
        display: "flex",
        marginTop: "1rem",
        width: "100%",
        height: "500px",
      }}
    >
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <div
            style={{ display: "flex", alignItems: "center", color: "gray" }}
            onClick={() => {
              if (currentImage == 0) {
                setCurrentImage(2);
              } else {
                setCurrentImage(currentImage - 1);
              }
            }}
          >
            <BiChevronLeft />
          </div>
          <div style={{ height: "100%", width: "100%" }}>
            <Link
              to={`/product/${featured ? featured[currentImage]?.id : ""}`}
              state={{
                iamge: featured ? featured[currentImage]?.image.url : "",
                name: featured ? featured[currentImage]?.name : "",
                price: featured ? featured[currentImage]?.price : "",
              }}
            >
              <img
                src={featured ? featured[currentImage]?.image?.url : ""}
                height={"100%"}
                width={"100%"}
                style={{ objectFit: "contain" }}
              ></img>
            </Link>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", color: "gray" }}
            onClick={() => setCurrentImage((currentImage + 1) % 3)}
          >
            <BiChevronRight />
          </div>
        </>
      )}
    </div>
  );
};

export default HomeSlider;
