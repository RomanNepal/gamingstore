import React from "react";

const Info = ({ title, children }) => {
  return (
    <div>
      <p style={{ fontWeight: "500", fontSize: "24px", textAlign: "center" }}>
        {title}
      </p>
      <div
        style={{
          display: "grid",
          gap: "1em",
          rowGap: "1.2em",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Info;
