import React from "react";
import ArrowNav from "../../lib";

export default function Custom() {
  return (
    <div>
      <ArrowNav name="ARROW_NAV">
        <div>Do Something awesome</div>
        <div tabIndex={-1}>or</div>
        <div>Don't use JS</div>
      </ArrowNav>
    </div>
  );
}
