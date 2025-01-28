import React, { useState, useRef, useEffect, useContext } from "react";
import Loop_components from "./loop_components";

const AbsolutePositionedContainer = ({ tools, positioning }) => {
  return (
    <>
      <div style={{ position: "relative", ...positioning }}>
        {Loop_components({ component_array: tools })}
      </div>
    </>
  );
};

export default AbsolutePositionedContainer;
