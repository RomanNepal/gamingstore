import React from "react";
import styled from "styled-components";
const ChildrenWrapper = styled.div`
  display: grid;
  gap: 1em;
  row-gap: 1.2em;
  @media screen and (min-width: 0px) and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: 1001px) and (max-width: 1400px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (min-width: 1401px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
const Info = ({ title, children }) => {
  return (
    <div>
      <p style={{ fontWeight: "500", fontSize: "24px", textAlign: "center" }}>
        {title}
      </p>
      <ChildrenWrapper style={{}}>{children}</ChildrenWrapper>
    </div>
  );
};

export default Info;
