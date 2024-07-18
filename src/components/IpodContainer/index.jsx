import React, { Component } from "react";
import { Menu } from "../Menu";
import { ControlWheel } from "../ControlWheel";
import ipodStyles from "./index.module.css";
import ZingTouch from "zingtouch";

const zt = new ZingTouch.Region(document.body);

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
      audio?.pause();
    } else {
      audio?.play();
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

  // forward song
  handleForward = () => {
    // state update
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
        // audio element update
        const audio = this.audioRef.current;
        audio.currentTime = this.state.currentTime;
      }
    );
  };

  // backward song
  handleBackward = () => {
    // state update
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
        // audio element update
        const audio = this.audioRef.current;
        audio.currentTime = this.state.currentTime;
      }
    );
  };

  // Handle end of audio playback
  handleEnded = () => {
    this.setState({ isPlaying: false });
  };

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

  handleRotate = (e) => {
    // if showMenu = false & showSubMenu = true
    if (!this.state.showMenu && this.state.showSubMenu) {
      // Use sub menu here
      const newMenu = this.state.menu;
      const newSelectedItem = newMenu.find((item) => item.isSelected);
      let newSubMenu = newSelectedItem.subMenu;

      newSubMenu = newSubMenu.map((item, index) => {
        // changing counter here
        return index === this.state.subMenuCounter
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false };
      });

      newMenu.find((item) => item.isSelected).subMenu = newSubMenu;
      this.handleSelectItem(e, newMenu, newSubMenu, true);
      return;
    }

    // if showMenu = true
    let newMenu = this.state.menu;
    newMenu = newMenu.map((item, index) => {
      // if item does not have subMenu
      return index === this.state.menuCounter
        ? { ...item, isSelected: true }
        : { ...item, isSelected: false };
    });

    this.handleSelectItem(e, newMenu);
  };

  componentDidMount = () => {
    const wheel = document.getElementById("wheel");
    zt.bind(wheel, "rotate", this.handleRotate);
  };

  handleMenuClick = () => {
    // get the current selected item
    const itemToShow = this.state.menu.find((item) => item.isSelected);
    // if the selected item has subMenu
    if (itemToShow?.subMenu) {
      // if the subMenu is showing currently
      if (this.state.showSubMenu) {
        // close subMenu and show mainMenu
        this.setState({
          showSubMenu: false,
          showMenu: true,
        });
      } else {
        // close/open menu and show/hide selected item component
        this.setState({
          showMenu: !this.state.showMenu,
          showItemComponent: !this.state.showItemComponent,
        });
      }
    } else {
      // if the selected item dows not have subMenu
      // close/open menu and show/hide selected item component
      this.setState({
        showMenu: !this.state.showMenu,
        showItemComponent: !this.state.showItemComponent,
      });
    }
  };

  handleSelectClick = () => {
    const { showMenu, showSubMenu } = this.state;

    if (showSubMenu) {
      this.setState({ showSubMenu: false, showItemComponent: true });
    } else if (showMenu) {
      // is any menu item is selected?
      const itemToShow = this.state.menu.find((item) => item.isSelected);

      if (itemToShow?.subMenu) {
        this.setState({ showMenu: false, showSubMenu: true });
      } else {
        this.setState({ showMenu: false, showItemComponent: true });
      }
    } else {
      // if player functionality is implemented, this part will be used
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
