import React, { useState, useRef, useEffect, useContext } from "react";
import Loop_components from "./loop_components";
import Joystick from "../components/joystick";
import Button from "../components/button";

const ButtonJoystick = ({
  tools,
  distance,
  size,
  position,
  border,
  outerborderColor,
}) => {
  const buttonCount = tools.filter((tool) => tool.type === "button").length;

  let borderSize;
  if (border) {
    borderSize = border;
  }
  return (
    <>
      <div
        className={` z-0 justify-center items-center flex`}
        id="button-joystick-outer-container"
        style={{
          ...position,
          width: `${size}`,
          height: `${size}`,
          position: "absolute",
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        {border && (
          <div
            className={`absolute border-4 border-${outerborderColor}`}
            style={{
              top: "50%",
              left: "50%",
              width: `${borderSize}`, // Adjust to make the circular border smaller
              height: `${borderSize}`, // Adjust to make the circular border smaller
              borderRadius: "50%", // Make it circular
              // Circular border style
              transform: "translate(-50%, -50%)", // Center it within the parent container
            }}
          ></div>
        )}
        {tools.map((tool, index) => {
          if (tool.type === "joystick") {
            return <Loop_components key={tool.id} component_array={[tool]} />;
          } else if (tool.type === "button") {
            const angle = (index / buttonCount) * 360;
            const radius = `${
              parseInt(size.replace(/\D/g, ""), 10) / distance / 10
            }px`;
            return (
              <Loop_components
                key={tool.id}
                component_array={[tool]}
                angle={angle}
                radius={radius}
              />
            );
          }
        })}
      </div>
    </>
  );
};

export default ButtonJoystick;
