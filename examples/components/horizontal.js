import React from "react";
import ArrowNav from "../../lib";

import data from "./data";

export default function Horizontal() {
  return (
    <ArrowNav mode={ArrowNav.mode.HORIZONTAL}>
      {data.map(d => (
        <div key={d}>{d}</div>
      ))}
    </ArrowNav>
  );
}
