import React, { useState, useRef, useEffect, useContext } from "react";
import Loop_components from "./loop_components";
import Joystick from "../components/joystick";
import Button from "../components/button";

const ButtonJoystick = ({ tools, size, distance }) => {
  const buttonCount = tools.filter((tool) => tool.type === "button").length;
  console.log("tools", parseInt(size.width));
  return (
    <>
      <div
        style={{
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
          width: size.width,
          height: size.height,
        }}
      >
        {tools.map((tool, index) => {
          if (tool.type === "joystick") {
            const styles = {
              inner_h: tool.size.inner_height_width,
              outer_h: tool.size.outer_height_width,
              inner_color: tool.style.inner_color,
              outer_color: tool.style.outer_color,
            };
            return (
              <Joystick
                key={tool.name}
                styles={styles}
                name={tool.name}
              ></Joystick>
            );
          } else if (tool.type === "button") {
            const style = {
              width: `${tool.size.width}px`,
              height: `${tool.size.height}px`,
              backgroundColor: tool.button_style.color,
              border: tool.button_style.border,
              borderRadius: tool.button_style.borderRadius,
              padding: tool.button_style.padding,
            };

            const fontStyle = {
              fontSize: tool.font_style.fontSize,
              fontColor: tool.font_style.fontColor,
              fontFlashColor: tool.font_style.fontFlashColor,
              fontWeight: tool.font_style.fontWeight,
              textWrap: tool.font_style.textWrap,
            };

            const angle = (index / buttonCount) * 360;
            return (
              <Button
                key={tool.id}
                name={tool.name}
                fontStyle={fontStyle}
                flashColor={tool.button_style.flashColor}
                style={style}
                component_mapping={tool.mapping}
                angle={angle}
                radius={`${parseInt(size.width) / distance / 10}px`}
              ></Button>
            );
          }
        })}
      </div>
    </>
  );
};

export default ButtonJoystick;
