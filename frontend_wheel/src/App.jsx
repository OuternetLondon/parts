import React, { useState, useEffect, Children } from "react";
import RacingWheel from "./components/racing_wheel";
import Joystick from "./components/joystick";
import Button from "./components/button";
import DPad from "./components/d_pad";
import Touchpad from "./components/touchpad";
import AbsolutePositionedContainer from "./layout_components/absolutePositioned";
import GridLayout from "./layout_components/gridLayout";
import ButtonJoystick from "./layout_components/ButtonJoystick";
import JoystickButton from "./layout_components/joystickButton";
import FlexLayout from "./layout_components/flex_layout";
const App = () => {
  const CONFIG = {
    userId: "user123",
    timestamp: "2023-01-07T14:00:00Z",
    components: [
      {
        id: "MainSection",
        type: "FlexLayout",
        style: {
          gap: "10px",
          flexDirection: "row",
          justifyContent: "space-around",
        },
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
            size: { width: 70, height: 70 },
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
            //position: { justifySelf: "center", alignSelf: "center", z: 0 },
            size: { width: 70, height: 70 },
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
            name: "buttonB",
            type: "button",
            //position: { justifySelf: "center", alignSelf: "center", z: 0 },
            size: { width: 70, height: 70 },
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
            mapping: "Button C",
          },
          {
            name: "buttonB",
            type: "button",
            //position: { justifySelf: "center", alignSelf: "center", z: 0 },
            size: { width: 70, height: 70 },
            button_style: {
              color: "purple",
              border: "",
              borderRadius: "0%",
              flashColor: "#FFCDD2",
              padding: "10px",
            },
            font_style: {
              fontSize: "1rem",
              fontColor: "white",
              fontFlashColor: "black",
              fontWeight: "bold",
              textWrap: "nowrap",
            },
            mapping: "Button D",
          },
          {
            name: "buttonB",
            type: "button",
            //position: { justifySelf: "center", alignSelf: "center", z: 0 },
            size: { width: 70, height: 70 },
            button_style: {
              color: "purple",
              border: "",
              borderRadius: "0%",
              flashColor: "#FFCDD2",
              padding: "10px",
            },
            font_style: {
              fontSize: "1rem",
              fontColor: "white",
              fontFlashColor: "black",
              fontWeight: "bold",
              textWrap: "nowrap",
            },
            mapping: "Button D",
          },
          {
            name: "buttonB",
            type: "button",
            //position: { justifySelf: "center", alignSelf: "center", z: 0 },
            size: { width: 70, height: 70 },
            button_style: {
              color: "purple",
              border: "",
              borderRadius: "0%",
              flashColor: "#FFCDD2",
              padding: "10px",
            },
            font_style: {
              fontSize: "1rem",
              fontColor: "white",
              fontFlashColor: "black",
              fontWeight: "bold",
              textWrap: "nowrap",
            },
            mapping: "Button D",
          },
          /*{
            id: "touchpad1",
            type: "touchpad",
            position: { z: 0 },
            style: {
              width: "400px",
              height: "200px",
              backgroundColor: "lightBlue",
            },
          },*/
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
        }
      })}
    </>
  );
};
export default App;
