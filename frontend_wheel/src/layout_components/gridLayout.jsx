import React, { useState, useRef, useEffect, useContext } from "react";
import Loop_components from "./loop_components";

const GridLayout = ({ tools, style, position, size, default_grid_layout }) => {
  let columns;
  let rows;
  let gap;
  let cell_size;
  if (!style.column_number) {
    columns = default_grid_layout.columns;
  } else {
    columns = style.column_number;
  }
  if (!style.row_number) {
    rows = default_grid_layout.rows;
  } else {
    rows = style.row_number;
  }
  if (!style.gap) {
    gap = default_grid_layout.gap;
  } else {
    gap = style.gap;
  }
  if (!style.cell_size) {
    cell_size = default_grid_layout.cell_size;
  } else {
    cell_size = style.cell_size;
  }
  return (
    <>
      <div
        style={{
          gap: gap,
          display: "grid",
          ...position,
          ...size,
          position: "absolute",
          gridTemplateColumns: `repeat(${columns}, ${cell_size})`,
          gridTemplateRows: `repeat(${rows}, ${cell_size})`,
          placeItems: "center",
        }}
      >
        {Loop_components({ component_array: tools })}
      </div>
    </>
  );
};

export default GridLayout;
