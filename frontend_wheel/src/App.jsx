import React, { useState, useEffect, Children } from "react";
import RacingWheel from "./components/racing_wheel";
import Joystick from "./components/joystick";
import Button from "./components/button";
import DPad from "./components/d_pad";
import Touchpad from "./components/touchpad";
import AbsolutePositionedContainer from "./layout_components/absolutePositioned";

const App = () => {
  const CONFIG = {
    userId: "user123",
    timestamp: "2023-01-07T14:00:00Z",
    components: [
      {
        id: "MainSection",
        type: "AbsolutePositionedContainer",
        style: { width: "50%", height: "100vh" },
        children: [
          {
            name: "buttonA",
            type: "button",
            position: { x: 300, y: 320, z: 0 },
            size: { width: 90, height: 90 },
            button_style: {
              color: "#388E3C",
              border: "2px solid black",
              borderRadius: "50%",
              flashColor: "#C8E6C9",
              padding: "0px",
            },
            font_style: {
              fontSize: "1rem",
              fontColor: "white",
              fontFlashColor: "black",
              fontWeight: "bold",
              textWrap: "wrap",
            },
            mapping: "Button A",
          },
          {
            name: "buttonB",
            type: "button",
            position: { x: 215, y: 420, z: 0 },
            size: { width: 90, height: 90 },
            button_style: {
              color: "#D32F2F",
              border: "2px solid black",
              borderRadius: "50%",
              flashColor: "#FFCDD2",
              padding: "0px",
            },
            font_style: {
              fontSize: "1rem",
              fontColor: "white",
              fontFlashColor: "black",
              fontWeight: "bold",
              textWrap: "wrap",
            },
            mapping: "Button B",
          },
          {
            name: "joystickL",
            type: "joystick",
            position: { x: 300, y: 400, z: 0 },
            size: { inner_height_width: 60, outer_height_width: 200 },
            style: {
              inner_color: "#0D47A1",
              outer_color: "#BBDEFB",
              border: "1px solid gray",
            },
            mapping: "joystickL",
          },
          {
            id: "touchpad1",
            type: "touchpad",
            position: { x: 300, y: 300, z: 0 },
            style: {
              width: "400px",
              height: "200px",
              backgroundColor: "lightBlue",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      {CONFIG.components.map((component, index) => {
        console.log("component type", component.type);
        if (component.type === "AbsolutePositionedContainer") {
          console.log("AbsolutePositionedContainer ran");
          return (
            <AbsolutePositionedContainer
              tools={component.children}
              style={component.style}
            ></AbsolutePositionedContainer>
          );
        }
      })}
    </>
  );
};

export default App;
