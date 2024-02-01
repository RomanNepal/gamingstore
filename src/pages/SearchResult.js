import React, { useContext, useEffect, useState } from "react";
import Announcement from "../components/Announcement";
import BelowAnnouncement from "../components/BelowAnnouncement";
import { Navbar } from "../components/Navbar";
import styled from "styled-components";
import NavbarContext from "../context/NavbarContext";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Skeleton from "../components/Skeleton";
const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;
const Left = styled.div`
  width: 20%;
  margin: 4% 0;
  padding: 0em 0 0 9%;
`;
const Right = styled.div`
  width: 80%;

  margin-left: 3rem;
  margin-top: 4%;
`;
const Text = styled.p`
  margin: 0;
  font-size: ${(props) => (props.size ? props.size : "16px")};
  font-family: Inter;
  font-weight: ${(props) =>
    props.bold ? "600" : props.medium ? "500" : "400"};
  color: ${(props) => (props.gray ? "#1f1f1f" : "black")};
`;
const Input = styled.input`
  height: 15px;
  width: 15px;
  &:selection {
    background-color: red;
  }
  &:active {
    background-color: red;
  }
  &:focus {
    background-color: red;
  }
`;
const ProductsDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-right: 8%;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const SearchResult = () => {
  const { categories } = useContext(NavbarContext);
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState();
  const { query } = useParams();
  const { state } = useLocation();
  console.log("State in searchresult is: ", state);
  console.log("query is: ", query);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    setLoading(true);
    const getProducts = async () => {
      try {
        let result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/products${
            state?.searchByCategory
              ? `?category_id=${query}`
              : state?.searchByProductAndCategory
              ? `?category_id=${state.category_id}&query=${query}`
              : `?query=${query}`
          }`,
          {
            headers: {
              "X-Authorization": `${process.env.REACT_APP_PUBLIC_KEY}`,
            },
          }
        );
        setResult(result.data.data);
        setMeta(result.data.meta);
        console.log(result.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [query, state]);
  return (
    <>
      <Announcement />
      <BelowAnnouncement />
      <Navbar />
      <Wrapper>
        <Left>
          <Text medium>Product Categories</Text>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "1rem",
            }}
          >
            {categories?.length !== 0 &&
              categories?.map((category, index) => (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                  key={category.name}
                >
                  <Input type="checkbox"></Input>
                  <Text size={"13px"}>{category?.name}</Text>
                </div>
              ))}
          </div>
        </Left>

        <Right>
          <div>
            <Text size={"13px"} gray>
              Showing 1-{meta?.pagination?.count} of {meta?.pagination?.total}{" "}
              results for "{state.name ? state.name : query.split("=")[1]}"
            </Text>
          </div>
          <ProductsDiv>
            {loading ? (
              <Skeleton width={"100%"} />
            ) : result?.length ? (
              result?.map((item, index) => {
                return (
                  <ProductCard
                    key={item.image.url}
                    id={item.id}
                    image={item.image.url}
                    name={item.name}
                    price={item.price.formatted}
                    tag={item.categories[0].name}
                  />
                );
              })
            ) : (
              "No Result Found"
            )}
          </ProductsDiv>
        </Right>
      </Wrapper>
    </>
  );
};

export default SearchResult;
