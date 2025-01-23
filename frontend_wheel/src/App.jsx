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
  document.documentElement.style.setProperty("--color-primary", "red");
  const CONFIG = {
    userId: "user123",
    timestamp: "2023-01-07T14:00:00Z",
    components: [
      {
        id: "dpad",
        type: "DPad",
        style:
          "flex items-center justify-center absolute h-50 top-50 left-50 z-0 ",
        width: "w-50",
        distance: 0.166,
        children: [
          {
            name: "buttonA",
            type: "button",
            position: "absolute top-0 left-50 z-0",
            style: "h-25 w-25 btn btn-circle btn-primary btn-lg",
            text_display: "Button A",
          },
          {
            name: "buttonA",
            type: "button",
            position: "absolute top-0 left-50 z-0",
            style: "h-25 w-25 btn btn-circle btn-primary btn-lg",
            text_display: "Button A",
          },
          {
            name: "buttonA",
            type: "button",
            position: "absolute top-0 left-50 z-0",
            style: "h-25 w-25 btn btn-circle btn-primary btn-lg",
            text_display: "Button A",
          },
          {
            name: "buttonA",
            type: "button",
            position: "absolute top-0 left-50 z-0",
            style: "h-25 w-25 btn btn-circle btn-primary btn-lg",
            text_display: "Button A",
          },
        ],
      },
      /*{
        id: "section",
        type: "AbsolutePositionedContainer",
        style: "relative h-50 w-[50vw] top-50 left-50 z-0",
        children: [
          {
            name: "buttonA",
            type: "button",
            position: "absolute top-0 left-50 z-0",
            style: "h-25 w-25 btn btn-circle btn-primary btn-lg",
            text_display: "Button A",
          },
          {
            name: "buttonB",
            type: "button",
            position: "absolute top-0 left-80 z-0",
            style: "h-25 w-25 btn btn-circle btn-secondary btn-lg",
            text_display: "Button B",
          },
        ],
      },*/
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
              width={component.width}
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
