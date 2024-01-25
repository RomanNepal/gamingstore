import React, { useContext, useEffect, useState } from "react";
import Announcement from "../components/Announcement";
import BelowAnnouncement from "../components/BelowAnnouncement";
import { Navbar } from "../components/Navbar";
import styled from "styled-components";
import CartContext from "../context/CartContext";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
const Body = styled.div`
  margin-left: 9%;
  margin-right: 9%;

  font-family: Inter;
  font-size: 16px;
`;
const Flexbox = styled.div`
  display: flex;
  border: 1px solid #e7e7e7;
  background-color: ${(props) => (props.dark ? "#1f1f1f" : "")};
  color: ${(props) => (props.dark ? "white" : "")};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
`;

const Table = styled.table`
  width: 100%;
  margin-top: 2rem;
  padding: 1rem;
  border-collapse: separate;
  border-spacing: 2rem;
`;

const Th = styled.th`
  color: #a0a0a0;
  font-size: 12px;
  letter-spacing: 1px;
`;
const Tbody = styled.tbody``;
const Trow = styled.tr``;
const Tdata = styled.td`
  /* display: flex; */
  align-items: center;
  gap: 20px;
  margin-top: 10px;

  text-align: center;
  font-weight: 500;
`;

const Text = styled.p`
  color: ${(props) => (props ? props.color : "black")};
`;
const Cart = () => {
  const { cart, addToCart, decreaseItem } = useContext(CartContext);
  const [carts, setCart] = useState(cart.length > 0 ? cart : []);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total =
        total +
        cart[i].quantity *
          Number(cart[i].price.split(".")[0].split(",").join(""));
    }

    setTotalPrice(total);
  }, [carts]);

  return (
    <>
      <Announcement />
      <BelowAnnouncement />
      <Navbar />
      <Body>
        <Flexbox
          style={{ borderRadius: "10px", marginTop: "2rem", width: "100%" }}
        >
          <div style={{ width: "70%" }}>
            <Table>
              <thead
                style={{
                  fontSize: "24px",
                  paddingBottom: "3%",
                  border: "1px solid black",
                }}
              >
                <th
                  colSpan={5}
                  style={{
                    textAlign: "left",
                    borderBottom: "1px solid #d0d0d0",
                    paddingBottom: "3%",
                  }}
                >
                  Shopping Cart
                </th>
              </thead>
              <Trow>
                <Th style={{ textAlign: "left" }} colSpan={2}>
                  PRODOCT DETAILS
                </Th>
                <Th>QUANTITY</Th>
                <Th>UNIT PRICE</Th>

                <Th>TOTAL PRICE</Th>
              </Trow>
              {carts?.length > 0
                ? carts?.map((item, index) => (
                    <Trow key={index}>
                      <Tdata>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              height: "100px",
                              width: "100px",
                              border: "1px solid #e6e6e6",
                              borderRadius: "12px",
                            }}
                          >
                            <img
                              src={item.image}
                              style={{
                                height: "100%",
                                width: "100%",
                                borderRadius: "inherit",
                                objectFit: "cover",
                              }}
                            ></img>
                          </div>
                        </div>
                      </Tdata>
                      <Tdata style={{ textAlign: "left" }}>
                        <Text>{item.name}</Text>
                      </Tdata>
                      <Tdata>
                        {/* <input
                      type="text"
                      value={item.quantity}
                      onChange={() => {
                        addToCart(item.id, item.name);
                      }}
                    ></input> */}
                        <button onClick={() => decreaseItem(index)}>-</button>
                        {item.quantity}
                        <button
                          onClick={() =>
                            addToCart(
                              item.id,
                              item.name,
                              item.image,
                              item.price
                            )
                          }
                        >
                          +
                        </button>
                      </Tdata>
                      <Tdata>Rs. {item.price.split(".")[0]}</Tdata>
                      <Tdata>
                        Rs.{" "}
                        {(
                          item.price.split(".")[0].split(",").join("") *
                          item.quantity
                        ).toLocaleString()}
                      </Tdata>
                    </Trow>
                  ))
                : ""}
              {/* <Trow style={{}}>
                <Tdata dark>Sub-total</Tdata>
                <Tdata colSpan={4} dark style={{ padding: "10px" }}>
                  Rs. {totalPrice ? totalPrice.toLocaleString() : 0}
                </Tdata>
              </Trow> */}
            </Table>

            <Flexbox
              style={{
                alignItems: "center",
                border: "none",
                paddingLeft: "3rem",
                paddingBottom: "2rem",
                color: "#5D50DD",
                fontSize: "14px",
                cursor: "pointer",
              }}
              bold
              onClick={() => navigate(-1)}
            >
              <BiArrowBack size={"18px"} /> &nbsp; Continue shopping
            </Flexbox>
          </div>
          <div
            style={{
              width: "30%",
              height: "75vh",
              color: "#1D1D1D",
              fontWeight: "500",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#f8f8f8",
                gap: "2rem",
                paddingLeft: "2rem",
                paddingRight: "2rem",
                height: "100%",
              }}
            >
              <div
                style={{
                  height: "4.5rem",
                  borderBottom: "2px solid #d7d7d7",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "4rem",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Order Summary
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>ITEMS {cart ? cart.length : 0}</div>
                <div>Rs. {totalPrice.toLocaleString()}</div>
              </div>

              <div>
                <div style={{ fontSize: "14px", marginTop: "1rem" }}>
                  PROMO CODE
                </div>

                <input
                  type={"text"}
                  placeholder="Enter your code"
                  style={{
                    height: "3rem",
                    border: "none",
                    paddingLeft: "1rem",
                    marginTop: "1rem",
                    width: "100%",
                  }}
                ></input>
                <button
                  type={"text"}
                  placeholder="Enter your code"
                  style={{
                    height: "2.5rem",
                    border: "none",
                    padding: "5px",
                    marginTop: "1rem",
                    width: "30%",
                    backgroundColor: "red",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  APPLY
                </button>
              </div>
              <div style={{ borderTop: "2px solid #d7d7d7" }}></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Total</div>
                <div>Rs. {totalPrice.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </Flexbox>
      </Body>
    </>
  );
};

export default Cart;
