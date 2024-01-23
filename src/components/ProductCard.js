import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CartContext from "../context/CartContext";
const PrimaryButton = styled.button`
  font-family: "Inter";
  background-color: #1f1f1f;
  color: white;
  width: 100%;
  border-radius: 8px;
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
const ProductCard = ({ image, name, price, tag, id }) => {
  const { cart, addToCart, totalCartItems, setTotalCartItems } =
    useContext(CartContext);
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
        <PrimaryButton onClick={() => addToCart(id, name, image, price)}>
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
      </div>
    </div>
  );
};

export default ProductCard;
