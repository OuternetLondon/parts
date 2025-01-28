import React, { useState, useRef, useEffect, useContext } from "react";
import Button from "../components/button";
import Joystick from "../components/joystick";
import RacingWheel from "../components/racing_wheel";
import DPad from "./d_pad";
import Touchpad from "../components/touchpad";
import ToggleButton from "../components/toggleSwitch";

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
        } else if (component.type === "button") {
          let tailwindStyles = "";
          let inlineStyles = {};
          let radial;
          console.log("height", component.height);
          if (component.height) {
            inlineStyles["height"] = component.height;
            //inlineStyles = `h-${component.height}`;
          }
          if (component.width) {
            inlineStyles["width"] = component.width;
          }
          if (component.hover_color) {
            tailwindStyles += ` hover:bg-${component.hover_color}`;
          }
          if (component.color) {
            tailwindStyles += ` bg-${component.color}`;
          }
          if (component.image_url) {
            tailwindStyles += `bg-[url(${component.image_url})] bg-cover bg-center`;
          }
          //tailwindStyles = "hover:bg-sky-300 bg-orange-300";

          if (component.classes === "radial") {
            radial = getComputedStyle(
              document.documentElement
            ).getPropertyValue(`--color-${component.color}`);
          } else {
            radial = false;
          }

          let fontStyle = {};
          if (component.font_style.fontWeight) {
            fontStyle["fontWeight"] = component.font_style.fontWeight;
          }
          if (component.font_style.size) {
            fontStyle["fontSize"] = component.font_style.size;
          }

          let fontTailwind = "";
          if (component.font_style.color) {
            fontTailwind += `text-${component.font_style.color}`;
          }
          console.log("fontstyle", fontStyle);
          //console.log("tailwindstyles!!", tailwindStyles);
          //  tailwindStyles = `hover:bg-sky-300 bg-orange-300`;
          // styles = `h-30 w-30 btn btn-circle btn-info btn-lg`;
          //  console.log("overideStyles loop", styles);
          return (
            <Button
              key={component.name}
              name={component.name}
              position={component.position}
              classes={component.classes}
              fontClass={component.font_style.classes}
              tailwindStyles={tailwindStyles}
              inlineStyles={inlineStyles}
              font_style={component.font_style}
              fontTailwind={fontTailwind}
              customStyle={customStyle}
              text_display={component.text_display}
              radial={radial}
              {...(angle && { angle })}
              {...(radius && { radius })}
            ></Button>
          );
        } else if (component.type === "joystick") {
          const styles = {
            inner_h: component.size.inner_height_width,
            outer_h: component.size.outer_height_width,
            border: component.style.border,
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
          return (
            <Touchpad
              key={component.id}
              name={component.name}
              style={component.style}
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
