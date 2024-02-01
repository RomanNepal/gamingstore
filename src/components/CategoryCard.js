import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Wrapper = styled.div`
  height: 200px;
  width: 150px;
  @media screen and (max-width: 768px) {
    width: 140px;
    height: 190px;
  }
`;
const ImageWrapper = styled.div`
  height: 80%;
  width: 100%;
  border-radius: 10px;
  background-color: gray;
  position: relative;
  @media screen and (max-width: 768px) {
  }
`;

const TitleWrapper = styled.div`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  height: 20%;
  /* border: 1px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
  }
`;
const CategoryCard = ({ image, name, id }) => {
  return (
    <Link
      to={`/searchresult/${id}`}
      state={{ searchByCategory: true, name: name }}
      style={{ textDecoration: "none", color: "black" }}
    >
      <Wrapper
        style={{
          border: "1px solid black",
          padding: "10px",
          borderRadius: "15px",
          borderColor: "#f1f1f1",
        }}
      >
        <ImageWrapper style={{}}>
          <img
            src={image ? image : ""}
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "inherit",
              objectFit: "cover",
            }}
          ></img>
        </ImageWrapper>
        <TitleWrapper>{name}</TitleWrapper>
      </Wrapper>
    </Link>
  );
};

export default CategoryCard;
