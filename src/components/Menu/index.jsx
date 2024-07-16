import { MenuItem } from "../MenuItem";
import menuStyles from "./index.module.css";

export const Menu = (props) => {
  return (
    <div className={menuStyles["menu-container"]}>
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
    </div>
  );
};
