import { ButtonComponent } from "../Button";
import wheelStyles from "./index.module.css";

export const ControlWheel = () => {
  return (
    <div className={wheelStyles["wheel-container"]}>
      <ButtonComponent text={"Menu"} />
      <div className={wheelStyles["mid-buttons-container"]}>
        <ButtonComponent text={<i className="fa-solid fa-backward-fast"></i>} />
        <ButtonComponent
          color={"rgb(230, 230, 230)"}
          radius={"20rem"}
          width={"4rem"}
          height={"4rem"}
        />
        <ButtonComponent text={<i className="fa-solid fa-forward-fast"></i>} />
      </div>
      <ButtonComponent
        text={
          <>
            <i className="fa-solid fa-play"></i>&nbsp;
            <i className="fa-solid fa-pause"></i>
          </>
        }
      />
    </div>
  );
};
