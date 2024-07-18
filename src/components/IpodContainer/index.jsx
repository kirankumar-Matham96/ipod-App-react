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

  handleSelectItem = (e, newMenu, newSubMenu, isSubMenu = false) => {
    if (parseInt(Math.abs(e.detail.angle) % 15) === 0) {
      if (e.detail.distanceFromLast >= 0) {
        if (isSubMenu) {
          this.setState(
            {
              menu: newMenu,
              subMenuCounter:
                this.state.subMenuCounter >= newSubMenu.length - 1
                  ? 0
                  : this.state.subMenuCounter + 1,
            },
            () => {
              console.log(
                "subMenuCounter after state update => ",
                this.state.subMenuCounter
              );
            }
          );
        } else {
          this.setState(
            {
              menu: newMenu,
              menuCounter:
                this.state.menuCounter >= newMenu.length - 1
                  ? 0
                  : this.state.menuCounter + 1,
            },
            () => {
              console.log(
                "MenuCounter after state update => ",
                this.state.menuCounter
              );
            }
          );
        }
      } else {
        if (isSubMenu) {
          this.setState(
            {
              menu: newMenu,
              subMenuCounter:
                this.state.subMenuCounter <= 0
                  ? newSubMenu.length - 1
                  : this.state.subMenuCounter - 1,
            },
            () => {
              console.log(
                "subMenuCounter after state update => ",
                this.state.subMenuCounter
              );
            }
          );
        } else {
          this.setState(
            {
              menu: newMenu,
              menuCounter:
                this.state.menuCounter <= 0
                  ? newMenu.length - 1
                  : this.state.menuCounter - 1,
            },
            () => {
              console.log(
                "MenuCounter after state update => ",
                this.state.menuCounter
              );
            }
          );
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
        console.log("index => ", index);
        console.log("subMenuCounter => ", this.state.subMenuCounter);
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
