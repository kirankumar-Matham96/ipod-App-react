import { Component } from "react";
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
            { id: 1, content: "All Songs", isSelected: false },
            { id: 2, content: "Artists", isSelected: false },
            { id: 3, content: "Albums", isSelected: false },
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
    };
  }

  handleSelectItem = (e, newMenu) => {
    if (parseInt(e.detail.angle % 15) === 0) {
      if (e.detail.distanceFromLast >= 0) {
        this.setState({
          menu: newMenu,
          menuCounter:
            this.state.menuCounter >= newMenu.length - 1
              ? 0
              : this.state.menuCounter + 1,
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
  };

  handleRotate = (e) => {
    const selectedItemSubMenu = this.state.menu.find(
      (item) => item.isSelected
    )?.subMenu;
    let newMenu = this.state.menu;

    newMenu = newMenu.map((item, index) => {
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
    // check if menu is open?
    if (this.state.showMenu) {
      // is any menu item is selected?
      const itemToShow = this.state.menu.find((item) => item.isSelected);
      // if menu item is not selected ? close menu : close menu and show item component;
      if (itemToShow) {
        if (itemToShow.subMenu) {
          this.setState({
            showMenu: !this.state.showMenu,
            showSubMenu: !this.state.showSubMenu,
          });
        } else {
          this.setState({
            showMenu: !this.state.showMenu,
            showItemComponent: !this.state.showItemComponent,
          });
        }
      }
    }
  };

  render() {
    const { menu } = this.state;
    return (
      <div className={ipodStyles["ipod-container"]}>
        <Menu
          menu={menu}
          showMenu={this.state.showMenu}
          showItemComponent={this.state.showItemComponent}
          showSubMenu={this.state.showSubMenu}
        />
        <ControlWheel
          handleMenuClick={this.handleMenuClick}
          handleSelectClick={this.handleSelectClick}
        />
      </div>
    );
  }
}
