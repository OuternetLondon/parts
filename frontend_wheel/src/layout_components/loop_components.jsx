import React, { useState, useRef, useEffect, useContext } from "react";

const Loop_components = ({ component_array }) => {
  return (
    <>
      {component_array.components.map((component) => {
        if (component.type === "button") {
          const style = {
            position: "absolute",
            left: `${component.position.x}px`,
            top: `${component.position.y}px`,
            width: `${component.size.width}px`,
            height: `${component.size.height}px`,
            backgroundColor: component.button_style.color,
            border: component.button_style.border,
            borderRadius: component.button_style.borderRadius,
            padding: component.button_style.padding,
          };

          const fontStyle = {
            fontSize: component.font_style.fontSize,
            fontColor: component.font_style.fontColor,
            fontFlashColor: component.font_style.fontFlashColor,
            fontWeight: component.font_style.fontWeight,
            textWrap: component.font_style.textWrap,
          };

          return (
            <Button
              key={component.id}
              name={component.name}
              fontStyle={fontStyle}
              flashColor={component.button_style.flashColor}
              style={style}
              component_mapping={component.mapping}
            ></Button>
          );
        } else if (component.type === "joystick") {
          const styles = {
            inner_h: component.size.inner_height_width,
            outer_h: component.size.outer_height_width,
            inner_color: component.style.inner_color,
            outer_color: component.style.outer_color,
            position: {
              left: `${component.position.x}px`,
              top: `${component.position.y}px`,
            },
          };
          return <Joystick styles={styles} name={component.name}></Joystick>;
        } else if (component.type === "steeringWheel") {
          const style = {
            position: "absolute",
            left: `${component.position.x}px`,
            top: `${component.position.y}px`,
            width: `${component.size.width}px`,
            height: `${component.size.height}px`,
            outer_rim_color: component.style.outer_rim_color,
            spoke_color: component.style.spoke_color,
            hub_color: component.style.hub_color,
            border: component.style.border,
          };
          return (
            <RacingWheel name={component.name} style={style}></RacingWheel>
          );
        } else if (component.type === "dPad") {
          return <DPad position={component.position}></DPad>;
        } else if (component.type === "touchpad") {
          const style = {
            ...component.style,
            position: "absolute",
            left: `${component.position.x}px`,
            top: `${component.position.y}px`,
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
