import { ButtonComponent } from "../Button";
import wheelStyles from "./index.module.css";

/**
 * Component that will control all operations in the ipod
 * @param {Object} props props from parent(IpodContainer)  
 * @returns JSX - Wheel component 
 */
export const ControlWheel = (props) => {
  return (
    <div id="wheel" className={wheelStyles["wheel-container"]}>
      <ButtonComponent onClick={props.handleMenuClick} text={"Menu"} />
      <div className={wheelStyles["mid-buttons-container"]}>
        <ButtonComponent
          onClick={props.handleBackward}
          text={<i className="fa-solid fa-backward-fast"></i>}
        />
        <ButtonComponent
          onClick={props.handleSelectClick}
          bg={"rgb(230, 230, 230)"}
          radius={"20rem"}
          width={"4rem"}
          height={"4rem"}
        />
        <ButtonComponent
          onClick={props.handleForward}
          text={<i className="fa-solid fa-forward-fast"></i>}
        />
      </div>
      <ButtonComponent
        onClick={props.togglePlayPause}
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
