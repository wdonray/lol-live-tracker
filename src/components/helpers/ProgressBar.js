import React from "react";
import "../../style/ProgressBar.css";
const ProgressBar = ({ bgcolor, progress }) => {
  return (
    <div className={"container"}>
      <div
        style={{ width: `${progress}%`, backgroundColor: bgcolor }}
        className={"filler"}
      >
        <span className={"label"}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
