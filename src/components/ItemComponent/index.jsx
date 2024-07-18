import React, { Component } from "react";
import itemComponentStyles from "./index.module.css";

/**
 * Component to render the main screen in the ipod based on conditions.
 * Since it manges the changes, class component is used.
 */
export default class ItemComponent extends Component {
  /**
   * Lifecycle method called after the component is mounted into the DOM.
   * Adds event listeners to the audio element for time updates, metadata loading, and audio end.
   */
  componentDidMount = () => {
    const { updateTime, handleLoadedMetadata, handleEnded, audioRef } =
      this.props;
    const audio = audioRef.current;
    audio?.addEventListener("timeupdate", updateTime);
    audio?.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio?.addEventListener("ended", handleEnded);
  };

  /**
   * Lifecycle method called before the component is unmounted from the DOM.
   * Removes event listeners from the audio element for time updates, metadata loading, and audio end.
   */
  componentWillUnmount = () => {
    const { updateTime, handleLoadedMetadata, handleEnded, audioRef } =
      this.props;
    const audio = audioRef.current;
    audio?.removeEventListener("timeupdate", updateTime);
    audio?.removeEventListener("loadedmetadata", handleLoadedMetadata);
    audio?.removeEventListener("ended", handleEnded);
  };

  render() {
    const {
      selectedItem,
      subMenuCounter,
      currentTime,
      duration,
      seekBarValue,
      audioRef,
      formatTime,
      handleSeekBarChange,
    } = this.props;

    if (selectedItem?.subMenu) {
      return (
        <div
          className={
            selectedItem.subMenu.find((item) => item.isSelected).content
              ? itemComponentStyles["item-component-container"]
              : itemComponentStyles["default-container"]
          }
        >
          {selectedItem?.subMenu[subMenuCounter].content === "All Songs" && (
            <>
              <div className={itemComponentStyles["all-songs-container"]}>
                <div
                  className={itemComponentStyles["all-songs-upper-container"]}
                >
                  <img
                    src="https://static.gettyimages.com/display-sets/creative-landing/images/GettyImages-1907862843.jpg"
                    alt="song"
                  />
                  <div
                    className={
                      itemComponentStyles["item-component-text-container"]
                    }
                  >
                    <span className={itemComponentStyles["song-title"]}>
                      {selectedItem?.subMenu[subMenuCounter].song.title}
                    </span>
                    <span className={itemComponentStyles["song-artist"]}>
                      {selectedItem?.subMenu[subMenuCounter].song.artist}
                    </span>
                  </div>
                </div>

                <div>
                  <audio id="custom-audio" ref={audioRef}>
                    <source
                      src="https://samplelib.com/lib/preview/mp3/sample-3s.mp3"
                      type="audio/ogg"
                    />
                    <source
                      src="https://samplelib.com/lib/preview/mp3/sample-3s.mp3"
                      type="audio/mpeg"
                    />
                    <source
                      src="https://samplelib.com/lib/preview/mp3/sample-3s.mp3"
                      type="audio/mp3"
                    />
                    Your browser does not support the audio element.
                  </audio>
                  <div>
                    <input
                      id={itemComponentStyles["seek-bar"]}
                      type="range"
                      min={0}
                      max={duration}
                      value={seekBarValue}
                      onChange={handleSeekBarChange}
                      step="0.0001"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.25rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.75rem",
                        margin: "0",
                        padding: "0",
                      }}
                    >
                      {formatTime(currentTime)}
                    </p>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        margin: "0",
                        padding: "0",
                      }}
                    >
                      {formatTime(duration)}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {(selectedItem?.subMenu[subMenuCounter].content === "Artists" ||
            selectedItem?.subMenu[subMenuCounter].content === "Albums") && (
            <p>{selectedItem?.subMenu[subMenuCounter].content}</p>
          )}
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
        {(selectedItem?.content === "Games" && (
          <span className={itemComponentStyles["icon"]}>
            <i className="fa-solid fa-dice"></i>
          </span>
        )) ||
          (selectedItem?.content === "Settings" && (
            <span className={itemComponentStyles["icon"]}>
              <i className="fa-solid fa-gear"></i>
            </span>
          ))}
        <p>{selectedItem?.content}</p>
      </div>
    );
  }
}
