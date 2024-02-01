import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";

import axios from "axios";
import "./Slider.css";
import Skeleton from "./Skeleton";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Wrapper = styled.div`
  height: 600px;
  @media screen and (max-width: 768px) {
    height: 300px;
  }
`;
const IconDiv = styled.div`
  transition: 1s all ease;
  display: "flex";
  /* &:hover {
    background-color: rgba(211, 211, 211, 0.5);
  } */
  /* background-color: rgba(211, 211, 211, 0.5); */
  background-color: white;
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
const DotsWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 45%;
  display: flex;
  gap: 10px;
  @media screen and (max-width: 768px) {
    left: 40%;
  }
`;
const HomeSlider = () => {
  // const settings = {
  //   focusOnSelect: true;
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: true,
  //   lazyLoading: true,
  //   customPaging: (i) => (
  //     <div
  //       style={{
  //         width: "20px",
  //         height: "3px",
  //         marginTop: "-30px", // Set your desired margin here

  //         background: i === 2 ? "#000" : "#bbb", // Change the active and inactive dot colors
  //         borderRadius: "5px",
  //       }}
  //     ></div>
  //   ),
  // };
  const [featured, setFeatured] = useState();
  const images = [0, 1, 2];
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);
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
    <Wrapper
      style={{
        display: "flex",
        marginTop: "1.5rem",
        width: "100%",
        position: "relative",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          userSelect: "none",
        }}
      >
        {loading ? (
          <Skeleton />
        ) : (
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "relative",

              backgroundColor: "white",
            }}
          >
            {/* <IconDiv
              style={{
                display: "flex",
                alignItems: "center",
                color: "gray",
                cursor: "pointer",
                position: "absolute",
                top: "0",
                border: "1px solid black",
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
            </IconDiv> */}
            <Link
              style={{ height: "100%", width: "100%" }}
              to={`/product/${featured ? featured[currentImage]?.id : ""}`}
              state={{
                image: featured ? featured[currentImage]?.image.url : "",
                name: featured ? featured[currentImage]?.name : "",
                price: featured ? featured[currentImage]?.price.formatted : "",
              }}
            >
              <Image
                src={featured ? featured[currentImage]?.image?.url : ""}
                height={"100%"}
                width={"100%"}
                style={{
                  objectFit: "cover",
                }}
              ></Image>
            </Link>
            {/* <IconDiv
              style={{
                display: "flex",
                alignItems: "center",
                color: "gray",
                cursor: "pointer",
                position: "absolute",
                top: "0",
                right: "0",
                border: "1px solid black",
              }}
              onClick={() => setCurrentImage((currentImage + 1) % 3)}
            >
              <BiChevronRight />
            </IconDiv> */}
          </div>
        )}

        <IconDiv
          style={{
            display: hover ? "flex" : "none",
            alignItems: "center",
            color: "gray",
            cursor: "pointer",
            position: "absolute",
            top: "50%",
            // backgroundColor: hover ? "white" : "",
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

        <DotsWrapper style={{}}>
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
        </DotsWrapper>
        <IconDiv
          style={{
            display: hover ? "flex" : "none",
            alignItems: "center",
            color: "gray",
            cursor: "pointer",
            position: "absolute",
            top: "50%",
            right: "0",
            // backgroundColor: hover ? "white" : "",
          }}
          hover={hover}
          onClick={() => setCurrentImage((currentImage + 1) % 3)}
        >
          <BiChevronRight />
        </IconDiv>
      </div>
    </Wrapper>
  );
};

export default HomeSlider;
