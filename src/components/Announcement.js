import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  height: 40px;
  background-color: #1f1f1f;
  color: white;
  font-size: 10px;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Announcement = () => {
  return (
    <Wrapper>
      <div>
        SUMMER SALE FOR ALL SWIM SUITS AND FREE EXPRESS INTERNATIONAL DELIVERY -
        OFF 50%! SHOP NOW
      </div>
    </Wrapper>
  );
};

export default Announcement;
