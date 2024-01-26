import React from "react";
import { Link as Li } from "react-router-dom";
import styled from "styled-components";
const Wrapper = styled.div`
  height: 40px;
  color: #1f1f1f;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 9%;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Text = styled.p`
  font-weight: ${(props) => (props.semibold ? 500 : "normal")};
`;
const LinkGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: #1f1f1f;
`;
const Link = styled(Li)`
  text-decoration: none;
`;
const BelowAnnouncement = () => {
  return (
    <Wrapper>
      <div>
        <Text semibold={"true"}>
          Free Shipping World wide for all orders over <b> $199.</b> Click and
          Shop Now.
        </Text>
      </div>

      <LinkGroup>
        <Link to={"/"}>Order Tracking</Link>
        <Link to={"/"}>English</Link>
        <Link to={"/"}>USD</Link>
      </LinkGroup>
    </Wrapper>
  );
};

export default BelowAnnouncement;
