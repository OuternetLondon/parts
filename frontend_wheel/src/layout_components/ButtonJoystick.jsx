import React, { useState, useRef, useEffect, useContext } from "react";
import Loop_components from "./loop_components";
import Joystick from "../components/joystick";
import Button from "../components/button";

const ButtonJoystick = ({ tools, size, distance, position }) => {
  const buttonCount = tools.filter((tool) => tool.type === "button").length;
  console.log("tools", parseInt(size.width));
  return (
    <>
      <div
        style={{
          ...position,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          // position: "relative",
          width: size.width,
          height: size.height,
        }}
      >
        {tools.map((tool, index) => {
          if (tool.type === "joystick") {
            return <Loop_components key={tool.id} component_array={[tool]} />;
          } else if (tool.type === "button") {
            const angle = (index / buttonCount) * 360;
            const radius = `${parseInt(size.width) / distance / 10}px`;
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
