import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Navbar } from "../components/Navbar";
import SecondNavbar from "../components/SecondNavbar";
import NavbarContext from "../context/NavbarContext";
import HomeSlider from "../components/HomeSlider";
import HomeCard from "../components/HomeCard";
import Info from "../components/Info";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import Announcement from "../components/Announcement";
import BelowAnnouncement from "../components/BelowAnnouncement";
import BreadcrumContext from "../context/BreadcrumContext";
import Skeleton from "../components/Skeleton";

const Wrapper = styled.div`
  font-family: "Inter", sans-serif;
`;

const Hero = styled.div`
  padding: 0 9%;
  display: grid;
  grid-template-columns: 0.45fr 1.55fr;
`;
const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: absolute;
  top: 2.8rem;
  font-size: 14px;
  border: 1px solid #f6f6f6;
  background-color: white;
  width: 100%;

  overflow: hidden;

  padding-top: 5px;
  padding-bottom: 5px;
  /* transition: 1s all ease; */
`;

const MenuItem = styled.div`
  padding: 2px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: left;

  &:hover {
    background-color: black;
    color: white;
  }
  transition: 0.3s all ease;
`;

const Body = styled.div`
  margin: 0.8em 9%;
`;
const HomeCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: space-between;
  border-top: 1px solid #dee0ea;
  padding: 0.8em 0;
  gap: 3rem;
  @media screen and (min-width: 0px) and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: 1025px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const Home = () => {
  const { categories } = useContext(NavbarContext);

  const [electronics, setelectronics] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getFeatured = async () => {
      setLoading(true);
      try {
        let newArrival = await axios.get(
          "https://api.chec.io/v1/products?limit=8&category_slug=electronics",
          {
            headers: {
              "X-Authorization": `${process.env.REACT_APP_PUBLIC_KEY}`,
            },
          }
        );
        setelectronics(newArrival.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getFeatured();
  }, []);

  return (
    <Wrapper>
      <Announcement />
      <BelowAnnouncement />
      <Navbar />
      <SecondNavbar>
        {" "}
        <HomeSlider />
      </SecondNavbar>
      <Body>
        <HomeCardWrapper style={{}}>
          <HomeCard
            title="Free Shipping"
            description="Free Shipping for orders over Rs. 130"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="0.6"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLineCap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
          </HomeCard>
          <HomeCard
            title="Money Guarantee"
            description="Within 30 days for an exchange"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="0.6"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLineCap="round"
                strokeLinejoin="round"
                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
              />
            </svg>
          </HomeCard>
          <HomeCard
            title="Online Support"
            description="Within 20 days for an exchange"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="0.6"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLineCap="round"
                strokeLinejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>
          </HomeCard>
          <HomeCard
            title="Flexible Payment"
            description="Pay with Multiple Credit Cards"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="0.6"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLineCap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
              />
            </svg>
          </HomeCard>
        </HomeCardWrapper>
        {loading ? (
          <Skeleton />
        ) : (
          <Info title="Newest In Electronics">
            {electronics?.length
              ? electronics.map((product, index) => {
                  return (
                    <ProductCard
                      key={product.image.url}
                      id={product.id}
                      image={product.image.url}
                      name={product.name}
                      price={product.price.formatted}
                      tag={product.categories[0].name}
                    />
                  );
                })
              : ""}
          </Info>
        )}

        <div>
          <p
            style={{ fontWeight: "500", fontSize: "24px", textAlign: "center" }}
          >
            Search By Category
          </p>
          <div
            style={{
              display: "grid",

              rowGap: "2rem",
              columnGap: "2rem",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
            }}
          >
            {categories?.length
              ? categories.map((category, index) => {
                  return (
                    <CategoryCard
                      key={category.id}
                      id={category.id}
                      image={category?.assets[0]?.url}
                      name={category.name}

                      // tag={product.categories[0].name}
                    />
                  );
                })
              : ""}
          </div>
        </div>
      </Body>
    </Wrapper>
  );
};

export default Home;
