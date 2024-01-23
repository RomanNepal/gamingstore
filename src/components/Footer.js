import React from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa6";
import styled from "styled-components";
import { BiLogoInstagramAlt } from "react-icons/bi";
import logo from "../images/logo.png";
const Wrapper = styled.div`
  padding: 0 9%;
  margin-top: 2rem;
  background-color: #111111;
  color: white;
  font-family: "Lato", sans-serif;
`;
const LinkGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 2em;
  padding: 5% 0;
  border-bottom: 1px solid white;
`;
const Text = styled.p`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "16px")};
`;
const SocialMediaGroup = styled.div`
  display: flex;
  padding: 5% 0;
  gap: 1em;
  justify-content: center;
`;
const SocialMediaDiv = styled.div`
  border-radius: 100%;
  width: 36px;
  height: 36px;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Footer = () => {
  return (
    <Wrapper>
      <LinkGroup>
        <div>
          <img src={logo} style={{ height: "20%" }} alt="logo"></img>
          <Text>Nepali Brands Under A Roof</Text>
        </div>
        <div>
          <Text>Report a problem</Text>
          <Text>Suggestions</Text>
          <Text>Submit a ticket</Text>
        </div>
        <div>
          <Text>Apple</Text>
          <Text>Samsung</Text>
          <Text>Huawei</Text>
          <Text>Lenovo</Text>
          <Text>Zara</Text>
          <Text>Versace</Text>
        </div>
        <div>
          <Text>Donate to charity</Text>
          <Text>Subscribe</Text>
        </div>
        <div>
          <Text>About us</Text>
          <Text>Contact us</Text>
          <Text>Partnership</Text>
          <Text>Email us</Text>
          <Text></Text>
        </div>
      </LinkGroup>
      <SocialMediaGroup>
        <SocialMediaDiv>
          <FaFacebookF color={"white"} size={"24px"} />
        </SocialMediaDiv>
        <SocialMediaDiv>
          <FaTwitter color={"white"} size={"24px"} />
        </SocialMediaDiv>
        <SocialMediaDiv>
          <BiLogoInstagramAlt color={"white"} size={"24px"} />
        </SocialMediaDiv>
      </SocialMediaGroup>
    </Wrapper>
  );
};

export default Footer;
