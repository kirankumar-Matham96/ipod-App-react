import { Component } from "react";
import { Menu } from "../Menu";
import { ControlWheel } from "../ControlWheel";
import ipodStyles from "./index.module.css";

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
    };
  }

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
