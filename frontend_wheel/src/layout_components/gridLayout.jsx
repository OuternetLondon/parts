import React, { useState, useRef, useEffect, useContext } from "react";
import Loop_components from "./loop_components";

const GridLayout = ({ tools, style, position, size }) => {
  return (
    <>
      <div
        style={{
          ...style,
          display: "grid",
          ...position,
          ...size,
          position: "absolute",
          gridTemplateColumns: `repeat(${style.column_number}, 1fr)`,
          gridTemplateRows: `repeat(${style.row_number}, 1fr)`,
          placeItems: "center",
        }}
      >
        {Loop_components({ component_array: tools })}
      </div>
    </>
  );
};

export default GridLayout;
