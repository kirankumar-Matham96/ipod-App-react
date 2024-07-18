import React, { Component } from "react";
import itemComponentStyles from "./index.module.css";
import { ButtonComponent } from "../Button";

export default class ItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      seekBarValue: 0,
    };
    this.audioRef = React.createRef();
  }

  // Format time function (minutes:seconds)
  formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Play/Pause toggle function
  togglePlayPause = () => {
    const audio = this.audioRef.current;
    if (this.state.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    this.setState({ isPlaying: !this.state.isPlaying });
  };

  // Update current time and seek bar value
  updateTime = () => {
    const audio = this.audioRef.current;
    this.setState({
      currentTime: audio.currentTime,
      seekBarValue: audio.currentTime,
    });
  };

  // Update duration once loaded metadata
  handleLoadedMetadata = () => {
    const audio = this.audioRef.current;
    this.setState({ duration: audio.duration });
  };

  // Seek bar change handler
  handleSeekBarChange = (e) => {
    const newValue = e.target.value;
    this.audioRef.current.currentTime = newValue;
    this.setState({ seekBarValue: newValue });
  };

  // Handle end of audio playback
  handleEnded = () => {
    this.setState({ isPlaying: false });
  };

  componentDidMount() {
    const audio = this.audioRef.current;
    audio?.addEventListener("timeupdate", this.updateTime);
    audio?.addEventListener("loadedmetadata", this.handleLoadedMetadata);
    audio?.addEventListener("ended", this.handleEnded);
  }

  componentWillUnmount() {
    const audio = this.audioRef.current;
    audio?.removeEventListener("timeupdate", this.updateTime);
    audio?.removeEventListener("loadedmetadata", this.handleLoadedMetadata);
    audio?.removeEventListener("ended", this.handleEnded);
  }

  render() {
    const { isPlaying, currentTime, duration, seekBarValue } = this.state;
    const { selectedItem, subMenuCounter } = this.props;

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
              <div
                style={{
                  alignSelf: "stretch",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "40px 20px 30px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <img
                    src="https://static.gettyimages.com/display-sets/creative-landing/images/GettyImages-1907862843.jpg"
                    alt="song"
                    style={{
                      width: "45%",
                    }}
                  />
                  <div
                    className={
                      itemComponentStyles["item-component-text-container"]
                    }
                  >
                    <p
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "700",
                        margin: "0",
                        padding: "0",
                      }}
                    >
                      {selectedItem?.subMenu[subMenuCounter].song.title}
                    </p>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        margin: "0",
                        padding: "0",
                      }}
                    >
                      {selectedItem?.subMenu[subMenuCounter].song.artist}
                    </p>
                  </div>
                </div>

                <div>
                  <audio id="custom-audio" ref={this.audioRef}>
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
                      onChange={this.handleSeekBarChange}
                      step="0.0001"
                    />
                    <ButtonComponent
                      onClick={this.togglePlayPause}
                      color="blue"
                      width="30px"
                      height="30px"
                      radius="20rem"
                      bg={"transparent"}
                      text={
                        isPlaying ? (
                          <i className="fa-solid fa-pause"></i>
                        ) : (
                          <i className="fa-solid fa-play"></i>
                        )
                      }
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
                      {this.formatTime(this.state.currentTime)}
                    </p>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        margin: "0",
                        padding: "0",
                      }}
                    >
                      {this.formatTime(this.state.duration)}
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
          <span>
            <i className="fa-solid fa-dice"></i>
          </span>
        )) ||
          (selectedItem?.content === "Settings" && (
            <span>
              <i className="fa-solid fa-gear"></i>
            </span>
          ))}
        <p>{selectedItem?.content}</p>
      </div>
    );
  }
}
