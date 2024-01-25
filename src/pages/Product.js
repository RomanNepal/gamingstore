import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import SecondNavbar from "../components/SecondNavbar";
import { Navbar } from "../components/Navbar";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import BelowAnnouncement from "../components/BelowAnnouncement";
import parse from "html-react-parser";
import Skeleton from "../components/Skeleton";
import CartContext from "../context/CartContext";
const Wrapper = styled.div`
  padding: 5% 9%;
  font-family: "Inter", sans-serif;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.4fr;
`;

const Col1 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Col2 = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 9%;
  align-items: top;
`;
const Button = styled.button`
  height: 100%;
  width: 100%;
  background-color: #1f1f1f;
  border: none;
  color: white;
  cursor: pointer;
  transition: 0.3s all ease;
  &:hover {
    background-color: white;
    border: 1px solid black;
    color: black;
  }
`;
const stars = [1, 2, 3, 4, 5];
const Product = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState();
  const [variants, setVariants] = useState();
  const [currentImage, setCurrentImage] = useState(0);
  const [variant, setVariant] = useState();
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    setLoading(true);
    const getProduct = async () => {
      try {
        let prod = await axios.get(
          `https://api.chec.io/v1/products/${id}?type=id`,
          {
            headers: {
              "X-Authorization": `${process.env.REACT_APP_PUBLIC_KEY}`,
            },
          }
        );
        setProduct(prod.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, []);

  useEffect(() => {
    const getVariants = async () => {
      try {
        let vari = await axios.get(
          `https://api.chec.io/v1/products/${id}/variant_groups`,
          {
            headers: {
              "X-Authorization": `${process.env.REACT_APP_PUBLIC_KEY}`,
            },
          }
        );
        setVariants(vari.data.data[0].options);
      } catch (err) {
        console.log(err);
      }
    };
    getVariants();
  }, []);
  return (
    <>
      <Announcement />
      <BelowAnnouncement />
      <Navbar />
      <Wrapper>
        <Grid>
          <Col1>
            <div
              style={{
                height: "500px",
                width: "500px",
                border: "1px solid #e4e4e4",
                borderRadius: "16px",
                transition: "1s all ease-out",
                overflow: "hidden",
              }}
            >
              {loading ? (
                <Skeleton
                  height={"100%"}
                  width={"100%"}
                  borderRadius={"inherit"}
                />
              ) : (
                <img
                  src={product ? product.assets[currentImage].url : ""}
                  style={{
                    objectFit: "contain",
                    height: "100%",
                    width: "100%",
                    borderRadius: "inherit",
                    transition: "1s all ease-out",
                  }}
                ></img>
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              {product
                ? product?.assets.map((item, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          border: `${
                            currentImage === index
                              ? "2px solid red"
                              : "2px solid #e4e4e4"
                          }`,
                          height: "50px",
                          width: "50px",
                          borderRadius: "8px",

                          transition: "0.3s all ease-in",
                        }}
                      >
                        <img
                          src={item.url}
                          alt="slider_image"
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                            borderRadius: "6px",
                          }}
                          onClick={() => {
                            setCurrentImage(index);
                          }}
                        ></img>
                      </div>
                    );
                  })
                : "HEEEEEE"}
            </div>
          </Col1>
          <Col2>
            <p
              style={{
                lineHeight: "0em",
                marginTop: "0",
                fontSize: "28px",
                fontWeight: "500",
              }}
            >
              {state.name ? state.name : ""}
            </p>
            <div style={{ display: "flex", alignItems: "center" }}>
              {stars.map(() => {
                return (
                  <div
                    style={{ height: "18px", width: "18px", display: "flex" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#F9C300"
                      class="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                );
              })}
              &nbsp;
              <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                132 reviews
              </p>
            </div>
            <div style={{ color: "green", fontSize: "24px" }}>
              Rs. {state?.price}
            </div>
            <div>
              {/* <p style={{ fontSize: "24px" }}>Description</p> */}
              <div style={{ fontSize: "14px", color: "gray" }}>
                {parse(product?.description ? product.description : "")}
              </div>
            </div>

            <div>
              <p style={{ fontSize: "16px", fontWeight: "500" }}>
                {variants?.length ? "Variants" : ""}
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                gap: "10px",
                width: "100%",

                // border: "1px solid black",
              }}
            >
              {variants?.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      fontSize: "14px",
                      backgroundColor: item.name === variant ? "red" : "",
                      color: item.name === variant ? "white" : "",
                      border: "1px solid #e6e6e6",
                      padding: "8px",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "0.2s all ease",
                      //   borderRadius: "5px",
                    }}
                    onClick={() => setVariant(item.name)}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "3rem" }}>
              <div
                style={{
                  display: "flex",
                  // gridTemplateColumns: "1fr 1fr 1fr",
                  border: "1px solid #e6e6e6",
                  fontSize: "16px",
                  gap: "10px",
                  padding: "0.5em",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "25%",
                    cursor: "pointer",
                    color: "gray",
                    userSelect: "none",
                  }}
                  onClick={() => {
                    if (count > 1) setCount((prev) => prev - 1);
                  }}
                >
                  -
                </div>
                <div
                  style={{
                    height: "100%",
                    width: "50%",
                  }}
                >
                  {count}
                </div>
                <div
                  style={{
                    height: "100%",
                    width: "25%",
                    color: "gray",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  onClick={() => {
                    setCount((prev) => prev + 1);
                  }}
                >
                  +
                </div>
              </div>

              <Button
                onClick={() =>
                  addToCart(id, state.name, state.image, state.price)
                }
              >
                ADD TO CART
              </Button>
            </div>
            <div style={{ marginTop: "3rem", display: "flex", gap: "10px" }}>
              <p style={{ fontSize: "16px", fontWeight: "500" }}>Categories:</p>
              <p style={{ fontSize: "16px", fontWeight: "400" }}>
                {product?.categories.map((p) => {
                  return `${p.name}, `;
                })}
              </p>
            </div>
          </Col2>
        </Grid>
      </Wrapper>
    </>
  );
};

export default Product;
