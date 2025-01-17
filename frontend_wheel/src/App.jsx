import React, { useState, useEffect, Children } from "react";
import RacingWheel from "./components/racing_wheel";
import Joystick from "./components/joystick";
import Button from "./components/button";
import DPad from "./layout_components/d_pad";
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
        type: "AbsolutePositionedContainer",
        style: { width: "50%", height: "100vh" },
        children: [ 
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
        ]
      }, 
      {
        id: "secondSection",
        type: "ButtonJoystick",
        position: { position: "absolute", top: "30%", left: "70%" },
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
      {
        id: "MainSection",
        type: "DPad",
        style: {
          position: "absolute",
          top: "30%",
          left: "5%",
          height: "300px",
          width: "300px",
        },
        distance: 0.7,
        children: [
          /* {
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
          },*/
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
            position: { z: -1 },
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
         /*
         {
            id: "steeringWheel1",
            type: "steeringWheel",
             position: { x: 500, y: 600 },
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
            position: { z: 0 },
            style: {
              width: "400px",
              height: "300px",
              backgroundColor: "lightBlue",
            },
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
