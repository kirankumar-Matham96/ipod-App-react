import { MenuItem } from "../MenuItem";
import menuStyles from "./index.module.css";
import ItemComponent from "../ItemComponent";

export const Menu = (props) => {
  const {
    subMenuCounter,
    formatTime,
    handleSeekBarChange,
    togglePlayPause,
    isPlaying,
    currentTime,
    updateTime,
    handleLoadedMetadata,
    duration,
    seekBarValue,
    audioRef,
  } = props;
  const selectedItem = props.menu.find((item) => item.isSelected);
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

      {props.showSubMenu &&
        props.menu.map((item) => {
          return item.isSelected ? (
            <div key={item.id} className={menuStyles["menu"]}>
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

      {props.showItemComponent && (
        <>
          <ItemComponent
            selectedItem={selectedItem ? selectedItem : null}
            subMenuCounter={subMenuCounter}
            formatTime={formatTime}
            updateTime={updateTime}
            handleLoadedMetadata={handleLoadedMetadata}
            handleSeekBarChange={handleSeekBarChange}
            togglePlayPause={togglePlayPause}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            seekBarValue={seekBarValue}
            audioRef={audioRef}
          />
        </>
      )}
    </div>
  );
};
