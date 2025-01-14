import React, { useState, useRef, useEffect, useContext } from "react";
import Loop_components from "./loop_components";

const AbsolutePositionedContainer = ({ tools, style }) => {
  console.log("tools", tools);
  console.log("style", style);
  return (
    <>
      <div style={{ ...style }}></div>
      {Loop_components({ component_array: tools })}
    </>
  );
};

export default AbsolutePositionedContainer;
