import React, { useState, useEffect, Children } from "react";
import RacingWheel from "./components/racing_wheel";
import Joystick from "./components/joystick";
import Button from "./components/button";
import DPad from "./layout_components/d_pad";
import Touchpad from "./components/touchpad";
import ToggleButton from "./components/toggleButton";
import AbsolutePositionedContainer from "./layout_components/absolutePositioned";
import GridLayout from "./layout_components/gridLayout";
import ButtonJoystick from "./layout_components/ButtonJoystick";
import JoystickButton from "./layout_components/joystickButton";
import FlexLayout from "./layout_components/flex_layout";
import { on } from "ws";

const App = () => {
  const CONFIG = {
    userId: "user123",
    timestamp: "2023-01-07T14:00:00Z",
    components: [
      {
        id: "MainSection",
        type: "DPad",
        style: {
          position: "absolute",
          top: "30%",
          left: "70%",
          height: "400px",
          width: "400px",
        },
        distance: 0.166,
        children: [
          {
            name: "buttonA",
            type: "button",
            position: { zIndex: 1 },
            size: { width: 90, height: 90 },
            button_style: {
              color: "#388E3C",
              border: "2px solid black",
              borderRadius: "0px",
              flashColor: "#C8E6C9",
              hoverColor: "#2E7D32",
              padding: "0px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
            },
            font_style: {
              fontColor: "red",
              fontFlashColor: "black",
              fontHoverColor: "purple",
              fontWeight: "bold",
            },
            svg: "top_arrow",
            svg_styling: { className: "size-12", strokeWidth: 5 },
          },
          {
            name: "buttonA",
            type: "button",
            position: { zIndex: 1 },
            size: { width: 90, height: 90 },
            button_style: {
              color: "#388E3C",
              border: "2px solid black",
              borderRadius: "0px",
              flashColor: "#C8E6C9",
              hoverColor: "#2E7D32",
              padding: "0px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
            },
            font_style: {
              fontColor: "red",
              fontFlashColor: "black",
              fontHoverColor: "purple",
              fontWeight: "bold",
            },
            svg: "bottom_arrow",
            svg_styling: { className: "size-12", strokeWidth: 5 },
          },
          {
            name: "buttonA",
            type: "button",
            position: { zIndex: 1 },
            size: { width: 90, height: 90 },
            button_style: {
              color: "#388E3C",
              border: "2px solid black",
              borderRadius: "0px",
              flashColor: "#C8E6C9",
              hoverColor: "#2E7D32",
              padding: "0px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
            },
            font_style: {
              fontColor: "red",
              fontFlashColor: "black",
              fontHoverColor: "purple",
              fontWeight: "bold",
            },
            svg: "left_arrow",
            svg_styling: { className: "size-12", strokeWidth: 5 },
          },
          {
            name: "buttonA",
            type: "button",
            position: { zIndex: 1 },
            size: { width: 90, height: 90 },
            button_style: {
              color: "#388E3C",
              border: "2px solid black",
              borderRadius: "0px",
              flashColor: "#C8E6C9",
              hoverColor: "#2E7D32",
              padding: "0px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
            },
            font_style: {
              fontColor: "red",
              fontFlashColor: "black",
              fontHoverColor: "purple",
              fontWeight: "bold",
            },
            svg: "right_arrow",
            svg_styling: { className: "size-12", strokeWidth: 5 },
          },
        ],
      },
      {
        id: "MainSection",
        type: "ButtonJoystick",
        position: { position: "absolute", top: "30%", left: "10%" },
        size: { width: "350px", height: "350px" },
        distance: "0.27",
        children: [
          {
            name: "joystickL",
            type: "joystick",
            position: { z: 10 },
            size: { inner_height_width: 60, outer_height_width: 120 },
            style: {
              inner_color: "#0D47A1",
              outer_color: "#BBDEFB",
              border: "1px solid gray",
            },
            mapping: "joystickL",
          },
          {
            name: "buttonA",
            type: "button",
            position: { zIndex: 1 },
            size: { width: 90, height: 90 },
            button_style: {
              color: "#388E3C",
              border: "2px solid black",
              borderRadius: "50%",
              flashColor: "#C8E6C9",
              hoverColor: "#2E7D32",
              padding: "0px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
            },
            font_style: {
              fontColor: "red",
              fontFlashColor: "black",
              fontHoverColor: "purple",
              fontWeight: "bold",
            },
            svg: "top_arrow",
            svg_styling: { className: "size-12", strokeWidth: 5 },
          },
          {
            name: "buttonA",
            type: "button",
            position: { zIndex: 1 },
            size: { width: 90, height: 90 },
            button_style: {
              color: "#388E3C",
              border: "2px solid black",
              borderRadius: "50%",
              flashColor: "#C8E6C9",
              hoverColor: "pink",
              padding: "0px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
            },
            display: "text",
            font_style: {
              fontSize: "3rem",
              fontColor: "white",
              fontFlashColor: "black",
              fontHoverColor: "blue",
              fontWeight: "bold",
              textWrap: "wrap",
            },
            mapping: "A",
          },
          {
            name: "buttonA",
            type: "button",
            position: { zIndex: 1 },
            size: { width: 90, height: 90 },
            button_style: {
              color: "#388E3C",
              border: "2px solid black",
              borderRadius: "50%",
              flashColor: "#C8E6C9",
              hoverColor: "#2E7D32",
              padding: "0px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
            },
            display: "text",
            font_style: {
              fontSize: "1rem",
              fontColor: "white",
              fontFlashColor: "black",
              fontHoverColor: "purple",
              fontWeight: "bold",
              textWrap: "wrap",
            },
            mapping: "Button A",
          },
        ],
      },
      /*
      {
        id: "MainSection",
        type: "ButtonJoystick",
        position: { position: "absolute", top: "10px", left: "300px" },
        size: { width: "320px", height: "350px" },
        distance: "0.27",
        children: [
          
          {
            name: "joystickL",
            type: "joystick",
            position: { z: 10 },
            size: { inner_height_width: 60, outer_height_width: 120 },
            style: {
              inner_color: "#0D47A1",
              outer_color: "#BBDEFB",
              border: "1px solid gray",
            },
            mapping: "joystickL",
          },
          {
            name: "buttonA",
            type: "button",
            position: { position: "absolute",  zIndex: 1 },
            size: { width: 90, height: 90 },
            button_style: {
              color: "#388E3C",
              border: "2px solid black",
              borderRadius: "50%",
              flashColor: "#C8E6C9",
              hoverColor: "#2E7D32",
              padding: "0px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)"
            },
            filling: "text",
            font_style: {
              fontSize: "1rem",
              fontColor: "white",
              fontFlashColor: "black",
              fontHoverColor: "purple",
              fontWeight: "bold",
              textWrap: "wrap",
            },
            mapping: "Button A",
          },
        ]} */

      {
        id: "section",
        type: "AbsolutePositionedContainer",
        style: {
          width: "200px",
          height: "200px",
          top: "50%",
          left: "50%",
          position: "absolute",
        },
        children: [
          {
            name: "toggleButton1",
            id: "toggleButton1",
            type: "toggle_button",
            style: {
              width: 90,
              height: 48,
              onColor: "blue",
              offColor: "grey",
              toggle_color: "lightBlue",
            },
            mapping: "toggleButton1",
          },
          /*
          {
            id: "steeringWheel1",
            type: "steeringWheel",
             position: {position: "absolute", top: "300px", left: "300px" },
            size: { width: 200, height: 200 },
            style: {
              outer_rim_color: "gray",
              spoke_color: "red",
              hub_color: "black",
              center_marker_color: "orange",
              border: "3px solid black",
            },
            mapping: "rightStick",
          },
          {
            id: "touchpad1",
            type: "touchpad",
            position: {position: "absolute", top: "400px", left: "350px", z: 0 },
            style: {
              width: "400px",
              height: "200px",
              backgroundColor: "lightBlue",
            },
          },
          {
            name: "buttonA",
            type: "button",
            position: { position: "absolute", left: "300px", top: "310px", zIndex: 1 },
            size: { width: 90, height: 90 },
            button_style: {
              color: "#388E3C",
              border: "2px solid black",
              borderRadius: "50%",
              flashColor: "#C8E6C9",
              hoverColor: "#2E7D32",
              padding: "0px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)"
            },
            display: "text",
            font_style: {
              fontSize: "1rem",
              fontColor: "white",
              fontFlashColor: "black",
              fontHoverColor: "purple",
              fontWeight: "bold",
              textWrap: "wrap",
            },
            mapping: "Button A",
          },
          {
            name: "buttonB",
            type: "button",
            position: { position: "absolute", left: "400px", top: "310px", zIndex: 1 },
            size: { width: 90, height: 90 },
            button_style: {
              color: "#388E3C",
              border: "2px solid black",
              borderRadius: "50%",
              flashColor: "#C8E6C9",
              hoverColor: "#2E7D32",
              padding: "0px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)"
            },
            display: "rightArrow",
            font_style: {
              fontSize: "1rem",
              fontColor: "white",
              fontFlashColor: "black",
              fontHoverColor: "purple",
              fontWeight: "bold",
              textWrap: "wrap",
            },
            mapping: "Button B",
          }, */
        ],
      },
    ],
  };
  return (
    <>
      {CONFIG.components.map((component, index) => {
        console.log("component type", component.type);
        if (component.type === "AbsolutePositionedContainer") {
          return (
            <AbsolutePositionedContainer
              tools={component.children}
              style={component.style}
              key={component.id}
            ></AbsolutePositionedContainer>
          );
        } else if (component.type === "GridLayout") {
          return (
            <GridLayout
              tools={component.children}
              style={component.style}
              key={component.id}
            ></GridLayout>
          );
        } else if (component.type === "ButtonJoystick") {
          return (
            <ButtonJoystick
              position={component.position}
              tools={component.children}
              size={component.size}
              distance={component.distance}
              key={component.id}
            ></ButtonJoystick>
          );
        } else if (component.type === "FlexLayout") {
          return (
            <FlexLayout
              tools={component.children}
              style={component.style}
              key={component.id}
            ></FlexLayout>
          );
        } else if (component.type === "DPad") {
          return (
            <DPad
              buttons={component.children}
              style={component.style}
              distance={component.distance}
              key={component.id}
            ></DPad>
          );
        }
      })}
    </>
  );
};
export default App;
