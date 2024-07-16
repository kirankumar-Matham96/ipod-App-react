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
        { id: 2, content: "Music", isSelected: false },
        { id: 3, content: "Games", isSelected: false },
        { id: 4, content: "Settings", isSelected: false },
      ],
      counter: 0,
    };
  }

  handleRotate = (e) => {
    let newMenu = this.state.menu;

    newMenu = newMenu.map((item, index) => {
      return index === this.state.counter
        ? { ...item, isSelected: true }
        : { ...item, isSelected: false };
    });

    if (parseInt(e.detail.angle % 15) === 0) {
      if (e.detail.distanceFromLast >= 0) {
        this.setState({
          menu: newMenu,
          counter:
            this.state.counter >= newMenu.length - 1
              ? 0
              : this.state.counter + 1,
        });
      } else {
        this.setState({
          menu: newMenu,
          counter:
            this.state.counter <= 0
              ? newMenu.length - 1
              : this.state.counter - 1,
        });
      }
    }
  };

  componentDidMount = () => {
    const wheel = document.getElementById("wheel");
    zt.bind(wheel, "rotate", this.handleRotate);
  };

  render() {
    const { menu } = this.state;
    return (
      <div className={ipodStyles["ipod-container"]}>
        <Menu menu={menu} />
        <ControlWheel />
      </div>
    );
  }
}
