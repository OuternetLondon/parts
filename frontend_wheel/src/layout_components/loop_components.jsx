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
          const style = {
            ...component.position,
            ...(customStyle && { ...customStyle }),
            width: `${component.size.width}px`,
            height: `${component.size.height}px`,
            backgroundColor: component.button_style.color,
            border: component.button_style.border,
            borderRadius: component.button_style.borderRadius,
            padding: component.button_style.padding,
            boxShadow: component.button_style.boxShadow,
          };
          let fontStyle;

          fontStyle = {
            fontSize: component.font_style.fontSize,
            fontColor: component.font_style.fontColor,
            fontFlashColor: component.font_style.fontFlashColor,
            fontWeight: component.font_style.fontWeight,
            textWrap: component.font_style.textWrap,
            fontHoverColor: component.font_style.fontHoverColor,
          };

          let mapping;

          switch (component.svg) {
            case "top_arrow":
              mapping = (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={component.svg_styling.strokeWidth}
                  stroke="currentColor"
                  className={
                    component.svg_styling.className
                  } /*color={component.color}*/
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                  />
                </svg>
              );

              break;
            case "bottom_arrow":
              mapping = (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={component.svg_styling.strokeWidth}
                  stroke="currentColor"
                  className={
                    component.svg_styling.className
                  } /*color={component.color}*/
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  />
                </svg>
              );
              break;
            case "left_arrow":
              mapping = (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={component.svg_styling.strokeWidth}
                  stroke="currentColor"
                  className={
                    component.svg_styling.className
                  } /*color={component.color}*/
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              );
              break;
            case "right_arrow":
              mapping = (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={component.svg_styling.strokeWidth}
                  stroke="currentColor"
                  className={
                    component.svg_styling.className
                  } /*color={component.color}*/
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              );

              break;
            default:
              mapping = component.mapping;
          }

          return (
            <Button
              key={component.id}
              name={component.name}
              fontStyle={fontStyle}
              flashColor={component.button_style.flashColor}
              hoverColor={component.button_style.hoverColor}
              style={style}
              component_mapping={mapping}
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
