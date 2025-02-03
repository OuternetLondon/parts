import React, { useState, useRef, useEffect, useContext } from "react";
import Loop_components from "./loop_components";

const FlexLayout = ({ tools, style, size, position }) => {
  let direction;
  if (style.direction === "horizontal") {
    direction = "row";
  } else {
    direction = "column";
  }

  return (
    <>
      <div id="flex-outer-container">
        <div
          style={{
            display: "flex",
            flexDirection: direction,
            justifyContent: "space-around",
            ...size,
            ...position,
            position: "absolute",
          }}
          id="flex-inner-container"
        >
          {Loop_components({ component_array: tools })}
        </div>
      </div>
    </>
  );
};

export default FlexLayout;
