import React from "react";
import ArrowNav from "../../lib";

import data from "./data";

export default function Vertical() {
  return (
    <ArrowNav mode={ArrowNav.mode.VERTICAL}>
      {data.map(d => (
        <div key={d}>{d}</div>
      ))}
    </ArrowNav>
  );
}
