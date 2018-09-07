import React from "react";
import ArrowNav from "../../lib";

import data from "./data";

export default function Both() {
  return (
    <ArrowNav mode={ArrowNav.mode.BOTH}>
      {data.map(d => (
        <div key={d}>{d}</div>
      ))}
    </ArrowNav>
  );
}
