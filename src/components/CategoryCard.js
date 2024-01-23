import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ image, name, id }) => {
  return (
    <Link
      to={`/searchresult/${id}`}
      state={{ searchByCategory: true, name: name }}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div
        style={{
          height: "200px",
          width: "150px",
          border: "1px solid black",
          padding: "10px",
          borderRadius: "15px",
          borderColor: "#f1f1f1",
        }}
      >
        <div
          style={{
            height: "80%",
            width: "100%",

            borderRadius: "10px",
            backgroundColor: "gray",
            position: "relative",
          }}
        >
          <img
            src={image ? image : ""}
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "inherit",
              objectFit: "cover",
            }}
          ></img>
        </div>
        <div style={{ height: "20%" }}>
          <p
            style={{ fontSize: "16px", fontWeight: "500", textAlign: "center" }}
          >
            {name}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
