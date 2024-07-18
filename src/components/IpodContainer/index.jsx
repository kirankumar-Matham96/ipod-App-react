import React, { Component } from "react";
import { Menu } from "../Menu";
import { ControlWheel } from "../ControlWheel";
import ipodStyles from "./index.module.css";
import ZingTouch from "zingtouch";

const zt = new ZingTouch.Region(document.body);

/**
 * Class component to manage state of the ipod
 */
export default class IpodContainer extends Component {
  constructor() {
    super();
    this.state = {
      menu: [
        { id: 1, content: "Cover Flow", isSelected: false },
        {
          id: 2,
          content: "Music",
          subMenu: [
            {
              id: 1,
              content: "All Songs",
              isSelected: false,
              song: {
                id: 1,
                title: "A Small Miracle",
                artist: "Romarecord1973",
                album: "Anonymous",
                filePath: "assets/a-small-miracle-132333.mp3",
              },
            },
            {
              id: 2,
              content: "Artists",
              isSelected: false,
              artists: [
                {
                  id: 1,
                  name: "Romarecord1973",
                },
                {
                  id: 2,
                  name: "Olexy",
                },
                {
                  id: 3,
                  name: "Lesfm",
                },
                {
                  id: 4,
                  name: "Music_For_Videos",
                },
                {
                  id: 5,
                  name: "lvymusic",
                },
              ],
            },
            {
              id: 3,
              content: "Albums",
              isSelected: false,
              albums: [
                {
                  id: 1,
                  name: "Unknown",
                },
              ],
            },
          ],
        },
        { id: 3, content: "Games", isSelected: false },
        { id: 4, content: "Settings", isSelected: false },
      ],
      menuCounter: 0,
      subMenuCounter: 0,
      showMenu: false,
      showSubMenu: false,
      showItemComponent: true,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      seekBarValue: 0,
    };
    this.audioRef = React.createRef();
  }

  /**
   * Formats the given time in seconds to a string in the format "minutes:seconds".
   * If the seconds value is less than 10, it prepends a "0" for a consistent display.
   * @param {number} time - The time in seconds to format.
   * @returns {string} - The formatted time string.
   */
  formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  /**
   * Toggles the play/pause state of the audio element.
   * If the audio is currently playing, it pauses it and updates the button text to "Play".
   * If the audio is currently paused, it plays it and updates the button text to "Pause".
   */
  togglePlayPause = () => {
    const audio = this.audioRef.current;
    if (this.state.isPlaying) {
      audio?.pause();
    } else {
      audio?.play();
    }
    this.setState({ isPlaying: !this.state.isPlaying });
  };

  /**
   * Updates the current time and seek bar value of the audio element.
   * This function is called during the audio's time update events.
   */
  updateTime = () => {
    const audio = this.audioRef.current;
    this.setState({
      currentTime: audio.currentTime,
      seekBarValue: audio.currentTime,
    });
  };

  /**
   * Updates the duration state once the audio metadata is loaded.
   * This function is called when the audio's metadata (including duration) is loaded.
   */
  handleLoadedMetadata = () => {
    const audio = this.audioRef.current;
    this.setState({ duration: audio.duration });
  };

  /**
   * Handles changes to the seek bar, updating the audio's current time accordingly.
   * This function is called when the seek bar value changes (e.g., when the user drags the seek bar).
   * @param {object} e - The event object from the input change event.
   */
  handleSeekBarChange = (e) => {
    const newValue = e.target.value;
    this.audioRef.current.currentTime = newValue;
    this.setState({ seekBarValue: newValue });
  };

  /**
   * Advances the audio by one second, updating the state and the audio's current time.
   * This function is called when the forward button is clicked.
   */
  handleForward = () => {
    this.setState(
      {
        seekBarValue:
          this.state.currentTime < this.state.duration &&
          this.state.seekBarValue + 1 < this.state.duration
            ? this.state.seekBarValue + 1
            : this.state.duration,
        currentTime:
          this.state.currentTime < this.state.duration &&
          this.state.seekBarValue + 1 < this.state.duration
            ? this.state.currentTime + 1
            : this.state.duration,
      },
      () => {
        const audio = this.audioRef.current;
        if (audio) {
          audio.currentTime = this.state.currentTime;
        }
      }
    );
  };

  /**
   * Rewinds the audio by one second, updating the state and the audio's current time.
   * This function is called when the backward button is clicked.
   */
  handleBackward = () => {
    this.setState(
      {
        seekBarValue:
          this.state.currentTime > 0 && this.state.seekBarValue - 1 > 0
            ? this.state.seekBarValue - 1
            : 0,
        currentTime:
          this.state.currentTime > 0 && this.state.seekBarValue - 1 > 0
            ? this.state.currentTime - 1
            : 0,
      },
      () => {
        const audio = this.audioRef.current;
        if (audio) {
          audio.currentTime = this.state.currentTime;
        }
      }
    );
  };

  /**
   * Handles the end of audio playback by setting the play state to false.
   * This function is called when the audio playback ends.
   */
  handleEnded = () => {
    this.setState({ isPlaying: false });
  };

  /**
   * Handles the selection of a menu item, updating the state with the new menu or sub-menu selection.
   * It determines the direction of the rotation and updates the appropriate counter accordingly.
   * @param {object} e - The event object containing rotation details.
   * @param {array} newMenu - The new menu array to update the state with.
   * @param {array} newSubMenu - The new sub-menu array to update the state with (if applicable).
   * @param {boolean} isSubMenu - Flag indicating if the selection is in a sub-menu.
   */
  handleSelectItem = (e, newMenu, newSubMenu, isSubMenu = false) => {
    if (parseInt(Math.abs(e.detail.angle) % 15) === 0) {
      if (e.detail.distanceFromLast >= 0) {
        if (isSubMenu) {
          this.setState({
            menu: newMenu,
            subMenuCounter:
              this.state.subMenuCounter >= newSubMenu.length - 1
                ? 0
                : this.state.subMenuCounter + 1,
          });
        } else {
          this.setState({
            menu: newMenu,
            menuCounter:
              this.state.menuCounter >= newMenu.length - 1
                ? 0
                : this.state.menuCounter + 1,
          });
        }
      } else {
        if (isSubMenu) {
          this.setState({
            menu: newMenu,
            subMenuCounter:
              this.state.subMenuCounter <= 0
                ? newSubMenu.length - 1
                : this.state.subMenuCounter - 1,
          });
        } else {
          this.setState({
            menu: newMenu,
            menuCounter:
              this.state.menuCounter <= 0
                ? newMenu.length - 1
                : this.state.menuCounter - 1,
          });
        }
      }
    }
  };

  /**
   * Handles the rotation event, updating the menu or sub-menu selection based on the current state.
   * If the sub-menu is visible, it updates the sub-menu selection; otherwise, it updates the main menu selection.
   * @param {object} e - The event object containing rotation details.
   */
  handleRotate = (e) => {
    // If the main menu is hidden and the sub-menu is visible
    if (!this.state.showMenu && this.state.showSubMenu) {
      const newMenu = this.state.menu;
      const newSelectedItem = newMenu.find((item) => item.isSelected);
      let newSubMenu = newSelectedItem.subMenu;

      newSubMenu = newSubMenu.map((item, index) => {
        // Updating the selection based on the current sub-menu counter
        return index === this.state.subMenuCounter
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false };
      });

      newMenu.find((item) => item.isSelected).subMenu = newSubMenu;
      this.handleSelectItem(e, newMenu, newSubMenu, true);
      return;
    }

    // If the main menu is visible
    let newMenu = this.state.menu;
    newMenu = newMenu.map((item, index) => {
      // Updating the selection based on the current menu counter
      return index === this.state.menuCounter
        ? { ...item, isSelected: true }
        : { ...item, isSelected: false };
    });

    this.handleSelectItem(e, newMenu);
  };

  /**
   * Component lifecycle method that binds the rotate event to the handleRotate function.
   * This is called after the component is mounted into the DOM.
   */
  componentDidMount = () => {
    const wheel = document.getElementById("wheel");
    zt.bind(wheel, "rotate", this.handleRotate);
  };

  /**
   * Handles the click event on the menu button.
   * Toggles the visibility of the sub-menu or the item component based on the current state.
   */
  handleMenuClick = () => {
    // Get the currently selected item from the menu
    const itemToShow = this.state.menu.find((item) => item.isSelected);
    // If the selected item has a sub-menu
    if (itemToShow?.subMenu) {
      // Toggle the visibility of the sub-menu and the main menu
      if (this.state.showSubMenu) {
        this.setState({
          showSubMenu: false,
          showMenu: true,
        });
      } else {
        this.setState({
          showMenu: !this.state.showMenu,
          showItemComponent: !this.state.showItemComponent,
        });
      }
    } else {
      // If the selected item does not have a sub-menu
      // Toggle the visibility of the main menu and the item component
      this.setState({
        showMenu: !this.state.showMenu,
        showItemComponent: !this.state.showItemComponent,
      });
    }
  };

  /**
   * Handles the click event on the select button.
   * Toggles the visibility of the menu, sub-menu, and item component based on the current state.
   */
  handleSelectClick = () => {
    const { showMenu, showSubMenu } = this.state;

    if (showSubMenu) {
      this.setState({ showSubMenu: false, showItemComponent: true });
    } else if (showMenu) {
      // Check if any menu item is selected
      const itemToShow = this.state.menu.find((item) => item.isSelected);

      if (itemToShow?.subMenu) {
        this.setState({ showMenu: false, showSubMenu: true });
      } else {
        this.setState({ showMenu: false, showItemComponent: true });
      }
    }
  };

  render() {
    const {
      menu,
      duration,
      currentTime,
      isPlaying,
      showMenu,
      showItemComponent,
      showSubMenu,
      subMenuCounter,
      seekBarValue,
    } = this.state;

    return (
      <div className={ipodStyles["ipod-container"]}>
        <Menu
          menu={menu}
          showMenu={showMenu}
          showItemComponent={showItemComponent}
          showSubMenu={showSubMenu}
          subMenuCounter={subMenuCounter}
          formatTime={this.formatTime}
          handleSeekBarChange={this.handleSeekBarChange}
          togglePlayPause={this.togglePlayPause}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          seekBarValue={seekBarValue}
          audioRef={this.audioRef}
          updateTime={this.updateTime}
          handleLoadedMetadata={this.handleLoadedMetadata}
          handleEnded={this.handleEnded}
        />
        <ControlWheel
          handleMenuClick={this.handleMenuClick}
          handleSelectClick={this.handleSelectClick}
          togglePlayPause={this.togglePlayPause}
          handleForward={this.handleForward}
          handleBackward={this.handleBackward}
        />
      </div>
    );
  }
}
