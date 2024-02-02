import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import logo from "../images/logo.png";
import NavbarContext from "../context/NavbarContext";
import { GoChevronDown } from "react-icons/go";
import { IoPersonOutline } from "react-icons/io5";
import { FaCross, FaRegHeart } from "react-icons/fa6";
import { BsCart2, BsSearch } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { CSSTransition } from "react-transition-group";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
import { RxCross2 } from "react-icons/rx";

const Wrapper = styled.div`
  height: 86px;
  padding: 0 9%;
  border-bottom: 1px solid #dfe0e2;
  border-top: 1px solid #dfe0e2;
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
  /* width */

  ::-webkit-scrollbar {
    width: 8px;
    padding-left: 1rem;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: none;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => (props.inside ? "#d0d0d0" : "white")};
    border-radius: 16px;
    margin-left: 1rem;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: gray;
  }
`;
const LogoLink = styled(Link)`
  @media screen and (min-width: 1024px) {
    display: none;
  }
`;
const Ham = styled.div`
  height: 24px;
  width: 24px;
  display: flex;
  @media screen and (min-width: 1024px) {
    display: none;
  }
`;
const LogoandHam = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
const Logo = styled.img`
  height: 50px;
  width: 50px;
  margin-left: 20px;
`;

const SearchBar = styled.input`
  height: 100%;
  width: 75%;
  background-color: #f1f1f3;
  border: none;
  border-right: 1px solid #dfe0e2;
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 100%;
  background-color: #f1f1f3;
  border-radius: 0;
  border: none;
  color: #1f1f1f;
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
  z-index: 10;
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

const InfoCircle = styled.div`
  width: 15px;
  height: 15px;
  position: absolute;
  top: 5px;
  left: 15px;
  font-size: 10px;
  background-color: red;
  border-radius: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SearchBarWrapper = styled.div`
  width: 55%;
  height: 50%;
  display: flex;
  object-fit: cover;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
const Profile = styled.div`
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
const Heart = styled.div`
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
const Hams = styled.div`
  display: flex;
  @media screen and (min-width: 1024px) {
    display: none;
  }
`;
const SideBar = styled.div`
  position: fixed;
  display: flex;

  top: 0rem;
  height: 110vh;
  width: 100vw;
  left: ${(props) => (props.open ? "0" : "-100vw")};

  font-size: 0.9rem;
  transition: left 0.5s;

  z-index: 3;
  @media screen and (min-width: 1024px) {
    display: none;
  }
  .firstDiv {
    overflow: scroll;
    width: 40%;
    @media screen and (max-width: 768px) {
      width: 50%;
    }
  }
  .secondDiv {
    background-color: rgba(0, 0, 0, 0.5);
    width: 60%;
    @media screen and (max-width: 768px) {
      width: 50%;
    }
    height: inherit;
  }
`;
export const Navbar = () => {
  const { categories, loading } = useContext(NavbarContext);
  const { cart, totalCartItems } = useContext(CartContext);
  const [toggle, setToggle] = useState(false);
  const [cat, setCat] = useState("");
  const [catName, setCatName] = useState("");
  const [open, setOpen] = useState(false);
  const [inside, setInside] = useState(false);
  const toggleMenu = (e) => {
    setToggle((prev) => !prev);
  };
  const nodeRef = useRef(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    if (e.key === "Enter" && query !== "") {
      navigate(`/searchresult/${query}`, {
        state: {
          searchByProduct: cat.length === 0,
          searchByProductAndCategory: cat.length > 0,
          category_id: cat,
          name: query,
        },
      });
      setQuery("");
      setCat("");
      setCatName("");
    }
  };

  return (
    <Wrapper inside={inside}>
      <SideBar open={open}>
        <div
          className="firstDiv"
          style={{
            padding: "1rem 0",
            height: "inherit",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
          }}
          onMouseEnter={() => {
            setInside(true);
          }}
          onMouseLeave={() => {
            setInside(false);
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0",
              alignItems: "center",
            }}
          >
            <Link to={"/"}>
              {" "}
              <Logo src={logo} alt="Logo"></Logo>
            </Link>
            <div>
              <RxCross2
                size={24}
                style={{
                  cursor: "pointer",
                  marginRight: "1rem",
                  backgroundColor: "#e9e9e9",
                }}
                onClick={() => {
                  setOpen(false);
                }}
              />
            </div>
          </div>
          {categories?.length !== 0 &&
            categories?.map((category, index) => (
              <div
                key={category.id}
                style={{
                  display: "flex",
                  padding: "1rem 1rem",
                }}
              >
                <Link
                  to={`/searchresult/${category.id}`}
                  state={{ searchByCategory: true, name: category.name }}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "500",
                  }}
                >
                  {category?.name}
                </Link>
              </div>
            ))}
        </div>
        <div className="secondDiv"></div>
      </SideBar>
      <LogoandHam>
        <Hams style={{ height: "24px", width: "24px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </Hams>
        <Link to={"/"}>
          {" "}
          <Logo src={logo} alt="Logo"></Logo>
        </Link>
      </LogoandHam>
      <Ham
        onClick={() => {
          console.log("open is: ", open);
          setOpen(!open);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </Ham>
      <LogoLink to={"/"}>
        {" "}
        <Logo src={logo} alt="Logo"></Logo>
      </LogoLink>
      <SearchBarWrapper>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f1f1f3",
            width: "50px",
            height: "104%",
          }}
        >
          <CiSearch size={20} />
        </div>
        <SearchBar
          type="text"
          placeholder="Search your favorite product..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            console.log(query);
          }}
          onKeyDown={handleSubmit}
        />
        <div
          style={{
            width: "25%",
            height: "105%",
            display: "flex",
            alignItems: "center",
            position: "relative",
            flexDirection: "column",
          }}
        >
          <Button onClick={toggleMenu}>
            {loading ? "Loading..." : catName ? catName : "Select Category"}{" "}
            <GoChevronDown />
          </Button>
          {/* {toggle && ( */}
          <CSSTransition
            in={toggle}
            nodeRef={nodeRef}
            timeout={300}
            unmountOnExit
            classNames={"menu"}
            style={{ zIndex: "10" }}
          >
            <MenuItems ref={nodeRef} style={{ zIndex: "10" }}>
              {categories?.length !== 0 &&
                categories?.map((category, index) => (
                  <MenuItem
                    key={category.id}
                    onClick={() => {
                      setCat(category.id);
                      setCatName(category.name);
                      nodeRef.current.style.height = "0px";
                    }}
                  >
                    {category?.name}
                  </MenuItem>
                ))}
            </MenuItems>
          </CSSTransition>
          {/* )} */}
        </div>
      </SearchBarWrapper>
      <div style={{ display: "flex", gap: "20px" }}>
        <Profile>
          <IoPersonOutline size={24} color={"#3F3F3F"} />
        </Profile>
        <Heart style={{ position: "relative" }}>
          <FaRegHeart size={22} color={"#3F3F3F"} />
          <InfoCircle>0</InfoCircle>
        </Heart>
        <Link to={"/cart"}>
          <div style={{ position: "relative" }}>
            <BsCart2 size={24} color={"#3F3F3F"} />
            <InfoCircle>{totalCartItems ? totalCartItems : 0}</InfoCircle>
          </div>
        </Link>
      </div>
    </Wrapper>
  );
};
