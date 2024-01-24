import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";

import axios from "axios";
import "./Slider.css";
import Skeleton from "./Skeleton";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import styled from "styled-components";
const IconDiv = styled.div`
  transition: 0.2s all ease;
  &:hover {
    background-color: rgba(211, 211, 211, 0.5);
  }
  display: flex;
  align-items: center;
  color: gray;
  cursor: pointer;
`;
const StyledDiv = styled.div`
  transition: 0.5s all ease;
`;

const Image = styled.img`
  transition: 0.5 all ease;
`;
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
      <>
        <IconDiv
          style={{
            display: "flex",
            alignItems: "center",
            color: "gray",
            cursor: "pointer",
          }}
          onClick={() => {
            if (currentImage == 0) {
              setCurrentImage(2);
            } else {
              setCurrentImage(currentImage - 1);
            }
          }}
        >
          <BiChevronLeft />
        </IconDiv>
        <div
          style={{
            height: "100%",
            width: "100%",

            userSelect: "none",
            position: "relative",
          }}
        >
          <Link
            to={`/product/${featured ? featured[currentImage]?.id : ""}`}
            state={{
              image: featured ? featured[currentImage]?.image.url : "",
              name: featured ? featured[currentImage]?.name : "",
              price: featured ? featured[currentImage]?.price.formatted : "",
            }}
          >
            {loading ? (
              <Skeleton />
            ) : (
              <Image
                src={featured ? featured[currentImage]?.image?.url : ""}
                height={"100%"}
                width={"100%"}
                style={{ objectFit: "contain" }}
              ></Image>
            )}
          </Link>
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              left: "45%",
              display: "flex",
              gap: "10px",
            }}
          >
            {images.map((item, index) => (
              <StyledDiv
                style={{
                  height: "2px",
                  width: "20px",
                  backgroundColor: index === currentImage ? "black" : "white",
                  border:
                    index === currentImage
                      ? "1px solid black"
                      : "0.5px solid #d6d6d6",
                }}
                onClick={() => {
                  setCurrentImage(index);
                }}
              ></StyledDiv>
            ))}
          </div>
        </div>
        <IconDiv
          style={{}}
          onClick={() => setCurrentImage((currentImage + 1) % 3)}
        >
          <BiChevronRight />
        </IconDiv>
      </>
    </div>
  );
};

export default HomeSlider;
