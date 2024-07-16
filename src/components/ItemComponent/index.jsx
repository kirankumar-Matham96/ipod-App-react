import React from "react";
import itemComponentStyles from "./index.module.css";
export const ItemComponent = (props) => {
  console.log("props in ItemComponent => ", props);
  return (
    <div
      className={
        props.text
          ? itemComponentStyles["item-component-container"]
          : itemComponentStyles["default-container"]
      }
    >
      <p>{props?.text}</p>
    </div>
  );
};
