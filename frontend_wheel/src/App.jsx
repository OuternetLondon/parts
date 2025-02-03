import React, { useState, useEffect, Children } from "react";
import RacingWheel from "./components/racing_wheel";
import Joystick from "./components/joystick";
import Button from "./components/button";
import DPad from "./layout_components/d_pad";
import Touchpad from "./components/touchpad";
import ToggleSwitch from "./components/toggleSwitch";
import AbsolutePositionedContainer from "./layout_components/absolutePositioned";
import GridLayout from "./layout_components/gridLayout";
import ButtonJoystick from "./layout_components/ButtonJoystick";
import JoystickButton from "./layout_components/joystickButton";
import FlexLayout from "./layout_components/flex_layout";
import { on } from "ws";
import useSetColors from "./hooks/useSetColors";
import ToggleButton from "./components/toggleButton";
import { useStyles } from "./hooks/useStyles";

import "./index.css";
import { use } from "react";
const App = () => {
  const [valuesSet, setValuesSet] = useState(false);
  const styles = useStyles();
  const CONFIG = {
    userId: "user123",
    timestamp: "2023-01-07T14:00:00Z",
    customCSS:
      "#middle-btn-container {display: flex; flex-direction: column; gap: 20px; } #middle-btn-container-text {font-weight: bold; font-size: 1.2rem; text-wrap: nowrap; }",
    colors: [
      { name: "primary", value: "#1790db" },
      { name: "secondary", value: "#820aa8" },
      { name: "accent", value: "#00d3bb" },
      { name: "neutral", value: "#09090b" },
      { name: "info", value: "#00bafe" },
      { name: "success", value: "#00d390" },
      { name: "warning", value: "#fcb700" },
      { name: "error", value: "#ff637d" },
      { name: "black", value: "#000000" },
      { name: "white", value: "#ffffff" },
      { name: "blue-500", value: "#0000ff" },
      { name: "red-500", value: "#ff0000" },
      { name: "green-500", value: "#00ff00" },
      { name: "yellow-500", value: "#ffff00" },
      { name: "orange-500", value: "#ffa500" },
      { name: "purple-500", value: "#800080" },
    ],
    button_size_default: 1, // 1 = normal size, 2 = double size..etc
    font_size_default: 1, // 1 = normal size, 2 = double size..etc
    border_thickness: 1, // 1 = normal size, 2 = double size..etc
    font_weight: 1,
    default_grid_layout: {
      columns: 2,
      rows: 1,
      gap: "10px",
      cell_size: "1fr",
    },
    components: [
      /*{
        id: "flex_section",
        type: "FlexLayout",
        position: {
          top: "100px",
          left: "20px",
        },
        size: { height: "200px", width: "200px" },
        style: {
          gap: "20px",
          direction: "horizontal", //or vertical
        },
        children: [],
      },*/

      {
        id: "SectionTwo",
        type: "ButtonJoystick",
        position: {
          top: "-5%",
          left: "0%",
        },
        //style: "absolute top-0 left-[60%] z-0 justify-center items-center flex",
        size: "250px",
        distance: 0.3,
        //outerborderWidth: "70%",
        //outerborderColor: "secondary",
        children: [
          {
            name: "joystickL",
            type: "joystick",
            position: "z-0",
            size: { inner_height_width: 80, outer_height_width: 130 },
            inner_classes: "standard-inner-joystick",
            outer_classes: "standard-outer-joystick",
            style: {
              inner_color: "",
              outer_color: "",
              border: "",
              border_color: "",
            },
            mapping: "joystickL",
          },
        ],
      },
      {
        id: "GridSection",
        type: "GridLayout",
        style: {
          //     column_number: 2,
          //   row_number: 2,
          //gap: "10px",
          //cell_size: "1fr",
        },
        size: { width: "300px" },
        position: {
          left: "5%",
          bottom: "10%",
        },
        children: [
          /*{
            name: "touchpad1",
            type: "touchpad",
            classes: "standard-touchpad",
            position: {
              position: "absolute",
              top: "10px",
              left: "300px",
              zIndex: 0,
            },
            style: {
              width: "200px",
              height: "110px",
              //backgroundColor: "secondary",
            },
          },*/
          {
            name: "buttonA",
            type: "button",
            //position: "absolute top-0 left-1/2 z-0",
            classes: "standard-button circular-button",
            height: "",
            width: "",
            size: "xl", //sm md lg xl
            img_url: "",
            color: "",
            hover_color: "white",
            border: "small",
            border_color: "black",
            outer_container_text: "",
            middle_container_text: "Button One",
            button_text_display: "test 3",
            font_style: {
              classes: "",
              fontSize: "base", // xs sm base lg xl..etc.
              fontWeight: "",
              color: "",
              hover_color: "",
            },
            position: {
              zIndex: "0",
            },
          },
          {
            name: "buttonA",
            type: "button",
            //position: "absolute top-0 left-1/2 z-0",
            classes: "standard-button circular-button",
            height: "",
            width: "",
            size: "xl", //sm md lg xl
            img_url: "",
            color: "",
            hover_color: "",
            border: "",
            border_color: "",
            outer_container_text: "",
            middle_container_text: "Button Two",
            button_text_display: "",
            font_style: {
              classes: "",
              fontSize: "xl", // xs sm base lg xl..etc.
              fontWeight: "",
              color: "",
              hover_color: "",
            },
            position: {
              zIndex: "0",
            },
          },
        ],
      },
      {
        id: "sectionThree",
        type: "DPad",
        position: {
          left: "75%",
          bottom: "8%",
        },
        size: { height: "200px", width: "200px" },
        distance: 0.6,
        children: [
          {
            name: "buttonA",
            type: "button",
            //position: "absolute top-0 left-1/2 z-0",
            classes: " standard-button circular-button",
            height: "",
            width: "",
            size: "xl",
            img_url: "",
            color: "",
            hover_color: "white",
            border: "",
            border_color: "",
            button_text_display: "radial",
            radial: "primary",
            font_style: {
              classes: "button-text",
              fontSize: "",
              fontWeight: "medium", //light, normal, medium, bold, extrabold
              color: "black",
              hover_color: "",
            },
            position: {
              position: "absolute",
            },
          },
          {
            name: "buttonA",
            type: "button",
            //position: "absolute top-0 left-1/2 z-0",
            classes: "standard-button  circular-button",
            height: "",
            width: "",
            size: "xl",
            img_url: "",
            color: "",
            hover_color: "white",
            border: "",
            border_color: "",
            button_text_display: "a",
            radial: "red-500",
            font_style: {
              classes: "button-text",
              fontSize: "xl",
              fontWeight: "medium",
              color: "black",
              hover_color: "",
            },
            position: {
              position: "absolute",
            },
          },
          {
            name: "buttonA",
            type: "button",
            //position: "absolute top-0 left-1/2 z-0",
            classes: "standard-button  circular-button",
            height: "",
            width: "",
            size: "xl",
            img_url: "",
            color: "",
            hover_color: "white",
            border: "",
            border_color: "",
            button_text_display: "test",
            radial: "blue-500",
            font_style: {
              classes: "button-text",
              fontSize: "",
              fontWeight: "medium",
              color: "black",
              hover_color: "",
            },
            position: {
              position: "absolute",
            },
          },
          {
            name: "buttonA",
            type: "button",
            //position: "absolute top-0 left-1/2 z-0",
            classes: "standard-button circular-button",
            height: "",
            width: "",
            size: "xl",
            img_url: "",
            color: "",
            hover_color: "white",
            border: "",
            border_color: "",
            button_text_display: "D",
            radial: "yellow-500",
            font_style: {
              classes: "button-text",
              fontSize: "2xl",
              fontWeight: "medium",
              color: "black",
              hover_color: "black",
            },
            position: {
              position: "absolute",
            },
          },
        ],
      },
      /**/
    ],
  };

  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = CONFIG.customCSS;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [CONFIG]);

  useEffect(() => {
    useSetColors(
      CONFIG.colors,
      CONFIG.button_size_default,
      CONFIG.font_size_default,
      CONFIG.border_thickness,
      CONFIG.font_weight,
      CONFIG.customCSS
    );
    setValuesSet(true);
  }, [CONFIG]);
  return (
    <>
      {valuesSet &&
        CONFIG.components.map((component, index) => {
          if (component.type === "AbsolutePositionedContainer") {
            return (
              <AbsolutePositionedContainer
                tools={component.children}
                positioning={component.position}
                key={component.id}
              ></AbsolutePositionedContainer>
            );
          } else if (component.type === "GridLayout") {
            return (
              <GridLayout
                tools={component.children}
                style={component.style}
                size={component.size}
                position={component.position}
                default_grid_layout={CONFIG.default_grid_layout}
                key={component.id}
              ></GridLayout>
            );
          } else if (component.type === "ButtonJoystick") {
            return (
              <ButtonJoystick
                tools={component.children}
                position={component.position}
                border={component.outerborderWidth}
                outerborderColor={component.outerborderColor}
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
                position={component.position}
                size={component.size}
                key={component.id}
              ></FlexLayout>
            );
          } else if (component.type === "DPad") {
            return (
              <DPad
                buttons={component.children}
                position={component.position}
                size={component.size}
                // width={component.width}
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
