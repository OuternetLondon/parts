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
          const classes = {
            toggleon: component.toggle_on.classes,
            toggleoff: component.toggle_off.classes,
          };
          const text = {
            toggleon: component.toggle_on.text_display,
            toggleoff: component.toggle_off.text_display,
          };
          let toggle_on = "";
          if (component.toggle_on.color) {
            toggle_on = `bg-${component.toggle_on.color}`;
          }
          if (component.toggle_on.hover_color) {
            toggle_on += ` hover:bg-${component.toggle_on.hover_color}`;
          }
          if (component.toggle_on.border) {
            let border = component.toggle_on.border;
            if (border === "large") {
              toggle_on += ` border-8`;
            } else if (border === "medium") {
              toggle_on += ` border-4`;
            } else if (border === "small") {
              toggle_on += ` border-2`;
            } else {
              toggle_on += ` border-0`;
            }
          }
          if (component.toggle_on.border_color) {
            toggle_on += ` border-${component.toggle_on.border_color}`;
          }
          let toggle_on_inline = {};
          if (component.toggle_on.size && component.toggle_on.size.height) {
            toggle_on_inline["height"] = component.toggle_on.size.height;
          }
          if (component.toggle_on.size && component.toggle_on.size.width) {
            toggle_on_inline["width"] = component.toggle_on.size.width;
          }

          let toggle_off = "";
          if (component.toggle_off.color) {
            toggle_off = `bg-${component.toggle_off.color}`;
          }
          if (component.toggle_off.hover_color) {
            toggle_off += ` hover:bg-${component.toggle_off.hover_color}`;
          }
          if (component.toggle_off.border) {
            let border = component.toggle_off.border;
            if (border === "large") {
              toggle_off += ` border-8`;
            } else if (border === "medium") {
              toggle_off += ` border-4`;
            } else if (border === "small") {
              toggle_off += ` border-2`;
            } else {
              toggle_off += ` border-0`;
            }
          }
          if (component.toggle_off.border_color) {
            toggle_off += ` border-${component.toggle_off.border_color}`;
          }
          let toggle_off_inline = {};
          if (component.toggle_off.size && component.toggle_off.size.height) {
            toggle_off_inline["height"] = component.toggle_off.size.height;
          }
          if (component.toggle_off.size && component.toggle_off.size.width) {
            toggle_off_inline["width"] = component.toggle_off.size.width;
          }
          return (
            <ToggleButton
              key={component.id}
              name={component.name}
              classes={classes}
              text={text}
              toggle_on_style={toggle_on}
              toggle_off_style={toggle_off}
              toggle_on_inline={toggle_on_inline}
              toggle_off_inline={toggle_off_inline}
            ></ToggleButton>
          );
        } else if (component.type === "button") {
          //set inline styles for button
          let inlineStyles = {};
          let radial;
          if (component.height) {
            inlineStyles["height"] = component.height;
          }
          if (component.width) {
            inlineStyles["width"] = component.width;
          }
          //inline styles for button
          let tailwindStyles = "";
          if (component.hover_color) {
            tailwindStyles += ` hover:bg-${component.hover_color}`;
          }
          if (component.color) {
            tailwindStyles += ` bg-${component.color}`;
          }

          if (component.img_url) {
            tailwindStyles += ` bg-cover bg-center`;
            inlineStyles["backgroundImage"] = `url(${component.img_url})`;
          }
          if (component.opacity) {
            if (component.opacity === "high") {
              tailwindStyles += ` opacity-25`;
            } else if (component.opacity === "medium") {
              tailwindStyles += ` opacity-50`;
            } else {
              tailwindStyles += ` opacity-75`;
            }
          }
          if (component.size) {
            tailwindStyles += ` btn-${component.size}`;
          }
          if (component.type === "inner_joystick") {
            tailwindStyles += `no-animation`;
          }
          if (component.border) {
            if (component.border === "large") {
              tailwindStyles += ` border-8`;
            } else if (component.border === "medium") {
              tailwindStyles += ` border-4`;
            } else if (component.border === "small") {
              tailwindStyles += ` border-2`;
            } else {
              tailwindStyles += ` border-0`;
            }
          }
          if (component.border_color) {
            tailwindStyles += ` border-${component.border_color}`;
          }

          if (component.radial) {
            radial = getComputedStyle(
              document.documentElement
            ).getPropertyValue(`--color-${component.radial}`);
            console.log("yes radial", radial);
          } else {
            console.log("no radial");
            radial = false;
          }

          let fontStyle = {};

          /* if (component.font_style.size) {
            fontStyle["fontSize"] = component.font_style.size;
          }*/

          let fontTailwind = "";
          if (component.font_style.color) {
            fontTailwind += `text-${component.font_style.color}`;
          }
          if (component.font_style.hover_color) {
            fontTailwind += ` group-hover:text-${component.font_style.hover_color}`;
          }
          if (component.font_style.fontSize) {
            fontTailwind += ` text-${component.font_style.fontSize}`;
          }
          if (component.font_style.fontWeight) {
            fontTailwind += ` font-${component.font_style.fontWeight}`;
          }
          // console.log("fontstyle", fontStyle);
          console.log("tailwindstyles!!", tailwindStyles);
          //  tailwindStyles = `hover:bg-sky-300 bg-orange-300`;
          // styles = `h-30 w-30 btn btn-circle btn-info btn-lg`;
          //  console.log("overideStyles loop", styles);
          let container_text = {
            outerContainerText: component.outer_container_text,
            middleContainerText: component.middle_container_text,
          };
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
              text_display={component.button_text_display}
              container_text={container_text}
              radial={radial}
              {...(angle && { angle })}
              {...(radius && { radius })}
            ></Button>
          );
        } else if (component.type === "joystick") {
          let border_style = "";
          if (component.style.border) {
            if (component.style.border === "large") {
              border_style = "border-8";
            } else if (component.style.border === "none") {
              border_style = "border-0";
            } else if (component.style.border === "medium") {
              border_style = "border-4";
            } else {
              border_style = "border-2";
            }
          }
          if (component.style.border_color) {
            border_style += ` border-${component.style.border_color}`;
          }
          let inner_size;
          let outer_size;
          if (!component.size || !component.size.inner_height_width) {
            inner_size = 60;
          } else {
            inner_size = component.size.inner_height_width;
          }
          if (!component.size || !component.size.outer_height_width) {
            outer_size = 120;
          } else {
            outer_size = component.size.outer_height_width;
          }
          const styles = {
            inner_h: inner_size,
            outer_h: outer_size,
            border: border_style,
            inner_color: `bg-${component.style.inner_color}`,
            outer_color: `bg-${component.style.outer_color}`,
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
              inner_classes={component.inner_classes}
              outer_classes={component.outer_classes}
            ></Joystick>
          );
        } else if (component.type === "steeringWheel") {
          const style = {};
          if (component.size && component.size.width) {
            style.width = component.size.width;
          }
          if (component.size && component.size.height) {
            style.height = component.size.height;
          }
          if (component.style.outer_rim_color) {
            style.outer_rim_color = component.style.outer_rim_color;
          }
          if (component.style.spoke_color) {
            style.spoke_color = component.style.spoke_color;
          }
          if (component.style.hub_color) {
            style.hub_color = component.style.hub_color;
          }
          if (component.style.border) {
            style.border = component.style.border;
          }
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
              classes={component.classes}
            ></Touchpad>
          );
        }
        return null;
      })}
    </>
  );
};

export default Loop_components;
