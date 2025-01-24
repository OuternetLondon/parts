import React, { useState } from "react";
import Button from "../components/button";
import Loop_components from "./loop_components";

const DPad = ({ buttons, style, distance, width }) => {
  let widthInt = parseInt(width.replace(/\D/g, ""), 10);
  let spacing = parseInt(widthInt) * distance;

  return (
    <div className={`${style} ${width}`}>
      {buttons.map((tool, index) => {
        let customStyle;
        if (index === 0) {
          customStyle = {
            top: `${spacing}px`,
            left: "50%",
            transform: "translate(-50%, 0)",
            position: "absolute",
          };
        } else if (index === 1) {
          customStyle = {
            bottom: `${spacing}px`,
            left: "50%",
            transform: "translate(-50%, 0)",
            position: "absolute",
          };
        } else if (index === 2) {
          customStyle = {
            left: `${spacing}px`,
            top: "50%",
            transform: "translate(0, -50%)",
            position: "absolute",
          };
        } else if (index === 3) {
          customStyle = {
            right: `${spacing}px`,
            top: "50%",
            transform: "translate(0, -50%)",
            position: "absolute",
          };
        }

        return (
          <Loop_components
            key={tool.id}
            component_array={[tool]}
            customStyle={customStyle}
          />
        );
      })}
    </div>
  );
};

export default DPad;
