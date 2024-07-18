import React from "react";
import itemComponentStyles from "./index.module.css";
export const ItemComponent = (props) => {
  const { selectedItem } = props;

  console.log({ selectedItem });

  if (selectedItem?.subMenu) {
    return (
      <div
        className={
          selectedItem.subMenu.find((item) => item.isSelected).content
            ? itemComponentStyles["item-component-container"]
            : itemComponentStyles["default-container"]
        }
      >
        <p>{selectedItem.subMenu.find((item) => item.isSelected).content}</p>
      </div>
    );
  }

  return (
    <div
      className={
        selectedItem?.content
          ? itemComponentStyles["item-component-container"]
          : itemComponentStyles["default-container"]
      }
    >
      <p>{selectedItem?.content}</p>
    </div>
  );
};
