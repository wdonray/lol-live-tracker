import React from "react";
import "../../style/LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <div>
      <div id="pageLoader" className={"pageLoader"}>
        <div></div>
        <div></div>
      </div>
      <span id="pageLoader2" className="pageLoader2">
        Load&nbsp;ng
      </span>
    </div>
  );
}

export default LoadingSpinner;
