import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CartContext from "../context/CartContext";
import { IoMdHeartEmpty } from "react-icons/io";

const PrimaryButton = styled.button`
  font-family: "Inter";
  background-color: #1f1f1f;
  color: white;
  width: 100%;
  border: 1px solid black;
  border-radius: 6px;
  height: 3em;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: 0.2s all ease;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: black;
  }
`;
const SecondaryButton = styled.div`
  font-family: "Inter";
  background-color: white;
  border: 1px solid gray;
  color: black;
  width: 20%;
  border-radius: 6px;

  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: 0.2s all ease;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;
const SVG = styled.svg`
  stroke-width: 2;
  transition: 0.5s all ease;
  &:hover {
    fill: red;
    stroke: red;
  }
`;
const ProductCard = ({ image, name, price, tag, id }) => {
  const { cart, addToCart, totalCartItems, setTotalCartItems } =
    useContext(CartContext);
  const btn = useRef(null);
  const setRedColor = () => {
    // btn.current.style.fill = "red";
    // btn.current.style.stroke = "red";
    // btn.current.style.strokeWidth = "0";
  };
  const setDefaultColor = () => {
    btn.current.style.fill = "none";
    btn.current.style.stroke = "black";
    btn.current.style.strokeWidth = "2";
  };
  return (
    <div style={{ height: "400px", width: "260px" }}>
      <Link
        to={`/product/${id}`}
        state={{ image, name, price }}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div
          style={{
            height: "50%",
            width: "100%",
            //   objectFit: "cover",
            borderRadius: "10px",
            backgroundColor: "gray",
            position: "relative",
          }}
        >
          <img
            src={image ? image : ""}
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "inherit",
              objectFit: "cover",
            }}
          ></img>
          <div
            style={{
              position: "absolute",
              top: "4px",
              right: "2px",
              borderRadius: "5px",
              backgroundColor: "green",
              fontSize: "10px",
              color: "white",
              padding: "3px 5px",
            }}
          >
            {tag}
          </div>
        </div>
      </Link>
      <div>
        <Link
          to={`/product/${id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <p style={{ fontSize: "16px", fontWeight: "500" }}>{name}</p>
          <p style={{ fontSize: "18px", color: "#C42232" }}>
            Rs. {price ? price.split(".")[0] : 0}
          </p>
        </Link>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <PrimaryButton
            style={{ width: "75%" }}
            onClick={() => addToCart(id, name, image, price)}
          >
            {" "}
            <div style={{ height: "20px", width: "20px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-2 h-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </div>
            Add To Cart
          </PrimaryButton>
          <SecondaryButton>
            {/* <IoMdHeartEmpty size={18} /> */}
            <div style={{ height: "18px", width: "18px", display: "flex" }}>
              <SVG
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
                // ref={btn}
                // onMouseEnter={setRedColor}
                // onMouseLeave={setDefaultColor}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </SVG>
            </div>
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
