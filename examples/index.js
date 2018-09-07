import { render } from "react-dom";
import React, { Component } from "react";

import Both from "./components/both";
import Vertical from "./components/vertical";
import Horizontal from "./components/horizontal";
import Custom from "./components/custom";

class Example extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Both />
        <Vertical />
        <Horizontal />
        <Custom />
      </div>
    );
  }
}
render(<Example />, document.getElementById("root"));
