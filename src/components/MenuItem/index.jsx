import React from "react";
import menuItemStyles from "./index.module.css";
/**
 * Simple component that renders the menu items.
 * It also responsible for rendering updated content when menu item has changed.
 * @param {Object} props from parent(Menu)
 * @returns JSX - menu list item
 */
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
