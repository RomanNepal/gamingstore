import React from "react";
import { LiaShippingFastSolid } from "react-icons/lia";

const HomeCard = (props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5em",
      }}
    >
      <div style={{ height: "55px", width: "55px" }}>{props.children}</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "250px",
        }}
      >
        <p
          style={{
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "0em",
            color: "#1F1F1F",
          }}
        >
          {props.title}
        </p>
        <p
          style={{
            fontWeight: "100",
            fontSize: "14px",
            lineBreak: "strict",
            marginTop: "3px",
            color: "gray",
          }}
        >
          {props.description}
        </p>
      </div>
    </div>
  );
};

export default HomeCard;
