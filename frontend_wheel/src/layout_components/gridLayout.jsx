import React, { useState, useRef, useEffect, useContext } from "react";
import Loop_components from "./loop_components";

const GridLayout = ({ tools, style }) => {
  console.log("tools", tools);
  return (
    <>
      <div style={{ ...style }}>
        {Loop_components({ component_array: tools })}
      </div>
    </>
  );
};

export default GridLayout;
