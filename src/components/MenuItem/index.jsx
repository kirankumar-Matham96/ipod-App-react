import React from "react";
import menuItemStyles from "./index.module.css";

export const MenuItem = (props) => {
  return (
    <div
      className={menuItemStyles["menu-item"]}
      style={{ backgroundColor: "" }}
    >
      <p>{props.text}</p>
    </div>
  );
};
