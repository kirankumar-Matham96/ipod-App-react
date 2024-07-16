import React from "react";
import menuItemStyles from "./index.module.css";

export const MenuItem = (props) => {
  return (
    <div className={menuItemStyles["menu-item"]}>
      {props.isSelected ? (
        <p style={{ backgroundColor: "lightblue" }}>
          {props.text}
          <i className="fa-solid fa-chevron-right"></i>
        </p>
      ) : (
        <p>{props.text}</p>
      )}
    </div>
  );
};
