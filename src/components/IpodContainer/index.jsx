import React, { Component } from "react";
import Menu from "../Menu/index";
import ControlWheel from "../ControlWheel";
import ipodStyles from "./index.module.css";

export default class IpodContainer extends Component {
  render() {
    return (
      <div className={ipodStyles["ipod-container"]}>
        <Menu />
        <ControlWheel />
      </div>
    );
  }
}
