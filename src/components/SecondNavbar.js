import React, { useContext, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import NavbarContext from "../context/NavbarContext";
import "./SecondNavbar.css";
import Skeleton from "./Skeleton";
const Wrapper = styled.div`
  height: 60px;
  padding: 0 9%;
  font-size: 0.4em;
  font-weight: 500;
  border-bottom: 1px solid #dfe0e2;
  border-top: 1px solid #dfe0e2;
  display: grid;
  grid-template-columns: 0.45fr 1.55fr;
  column-gap: 20px;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
const AllCategories = styled.div`
  border-right: 1px solid #dfe0e2;
  height: 100%;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
`;

const NavGroup = styled.div`
  padding-left: 12px;
  display: flex;
  gap: 28px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #1f1f1f;
  font-size: 13px;
  letter-spacing: 2px;
`;

const SecondWrapper = styled.div`
  padding: 0 9%;
  font-size: 0.4em;
  font-weight: 500;
  height: 250px;
  border-bottom: 1px solid #dfe0e2;
  border-top: 1px solid #dfe0e2;
  display: grid;
  grid-template-columns: 0.45fr 1.55fr;
  column-gap: 20px;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: absolute;
  top: 3.75rem;
  overflow: hidden;
  border-right: 1px solid #dfe0e2;
  width: 100%;
  height: 510px;
  padding-top: 1.5rem;
  font-size: 14px;
  font-weight: 400;
`;

const Category = styled.div``;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;

  margin-left: 9%;
  margin-right: 9%;
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;
const SecondNavbar = ({ children }) => {
  const { categories, setCategories, loading } = useContext(NavbarContext);
  const [toggle, setToggle] = useState(true);
  const toggleMenu = (e) => {
    setToggle((prev) => !prev);
  };
  const ref = useRef(null);
  return (
    <>
      <Wrapper>
        <AllCategories>
          All Categories{" "}
          <BsChevronDown
            size={12}
            style={{ marginRight: "20px" }}
            onClick={toggleMenu}
          />
          <CSSTransition
            in={toggle}
            nodeRef={ref}
            timeout={300}
            unmountOnExit
            classNames={"cats"}
          >
            <CategoryList ref={ref}>
              {loading ? (
                <Skeleton />
              ) : (
                categories?.length !== 0 &&
                categories?.map((category, index) => (
                  <Link
                    to={`/searchresult/${category.id}`}
                    state={{ searchByCategory: true, name: category.name }}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Category key={category.id}>{category?.name}</Category>
                  </Link>
                ))
              )}
            </CategoryList>
          </CSSTransition>
        </AllCategories>
        <NavGroup>
          <StyledLink to={"/"}>HOME</StyledLink>
          <StyledLink to={"/"}>SHOP</StyledLink>
          <StyledLink to={"/"}>MEN</StyledLink>
          <StyledLink to={"/"}>WOMEN</StyledLink>
          <StyledLink to={"/"}>ELECTRONICS</StyledLink>
        </NavGroup>
      </Wrapper>
      <Grid>
        <div></div>
        <div>{children}</div>
      </Grid>
      {/* <SecondWrapper>
        <CSSTransition
          in={toggle}
          nodeRef={nodeRef}
          unmountOnExit
          classNames={"categories"}
        >
          <CategoryList ref={nodeRef}>
            {categories?.length !== 0 &&
              categories?.map((category, index) => (
                <Category>{category?.name}</Category>
              ))}
          </CategoryList>
        </CSSTransition>
        {toggle ? "" : <div></div>}
        <div> {children}</div>
      </SecondWrapper> */}
    </>
  );
};

export default SecondNavbar;
