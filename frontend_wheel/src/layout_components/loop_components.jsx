import React, { useState, useRef, useEffect, useContext } from "react";
import Button from "../components/button";
import Joystick from "../components/joystick";
import RacingWheel from "../components/racing_wheel";
import DPad from "./d_pad";
import Touchpad from "../components/touchpad";
import ToggleButton from "../components/toggleButton";

const Loop_components = ({ component_array, customStyle, angle, radius }) => {
  return (
    <>
      {component_array.map((component) => {
        if (component.type === "toggle_button") {
          const toggle_style = component.style;
          return (
            <ToggleButton
              key={component.id}
              name={component.name}
              toggle_style={toggle_style}
            >
              {" "}
            </ToggleButton>
          );
          //const style =
        } else if (component.type === "button") {
          console.log("component", component.position);
          let style = customStyle && component.style;
          return (
            <Button
              key={component.id}
              name={component.name}
              position={component.position}
              style={style}
              text_display={component.text_display}
              {...(angle && { angle })}
              {...(radius && { radius })}
            ></Button>
          );
        } else if (component.type === "joystick") {
          const styles = {
            inner_h: component.size.inner_height_width,
            outer_h: component.size.outer_height_width,
            inner_color: component.style.inner_color,
            outer_color: component.style.outer_color,
          };
          let positioning = {
            ...component.position,
          };
          return (
            <Joystick
              key={component.name}
              styles={styles}
              positioning={positioning}
              name={component.name}
            ></Joystick>
          );
        } else if (component.type === "steeringWheel") {
          const style = {
            width: `${component.size.width}px`,
            height: `${component.size.height}px`,
            outer_rim_color: component.style.outer_rim_color,
            spoke_color: component.style.spoke_color,
            hub_color: component.style.hub_color,
            border: component.style.border,
          };
          let positioning = {
            ...component.position,
          };
          return (
            <RacingWheel
              name={component.name}
              positioning={positioning}
              style={style}
            ></RacingWheel>
          );
        } else if (component.type === "dPad") {
          return <DPad position={component.position}></DPad>;
        } else if (component.type === "touchpad") {
          const style = {
            ...component.style,
            ...component.position,
          };
          return (
            <Touchpad
              key={component.id}
              name={component.name}
              style={style}
              position={component.position}
            ></Touchpad>
          );
        }
        return null;
      })}
    </>
  );
};

export default Loop_components;
