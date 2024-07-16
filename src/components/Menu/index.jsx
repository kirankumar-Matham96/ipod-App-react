import { MenuItem } from "../MenuItem";
import menuStyles from "./index.module.css";
import { ItemComponent } from "../ItemComponent";

export const Menu = (props) => {
  const selectedItem = props.menu.find((item) => item.isSelected);
  console.log({ selectedItem });
  return (
    <div className={menuStyles["menu-container"]}>
      {props.showMenu && (
        <div className={menuStyles["menu"]}>
          <div className={menuStyles["menu-heading"]}>
            <h4>iPod.js</h4>
          </div>
          {props.menu.map((item) => (
            <MenuItem
              key={item.id}
              text={item.content}
              isSelected={item.isSelected}
            />
          ))}
        </div>
      )}

      {props.showItemComponent && (
        <>
          <ItemComponent text={selectedItem ? selectedItem.content : null} />
        </>
      )}

      {props.showSubMenu &&
        props.menu.map((item) => {
          console.log(item);
          return item.isSelected ? (
            <div className={menuStyles["menu"]}>
              <div className={menuStyles["menu-heading"]}>
                <h4>{item.content}</h4>
              </div>
              {item.subMenu?.map((innerItem) => (
                <MenuItem
                  key={innerItem.id}
                  text={innerItem.content}
                  isSelected={innerItem.isSelected}
                />
              ))}
            </div>
          ) : null;
        })}
    </div>
  );
};
