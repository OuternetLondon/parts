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
import buttonOne from "./assets/button_one.jpg";
import buttonTwo from "./assets/button_two.jpg";
import buttonThree from "./assets/button_three.jpg";
import buttonFour from "./assets/button_four.jpg";

import "./index.css";
import { use } from "react";
const App = () => {
  const [valuesSet, setValuesSet] = useState(false);
  const styles = useStyles();
  const CONFIG = {
    userId: "user123",
    timestamp: "2023-01-07T14:00:00Z",
    customCSS:
      ".middle-btn-container:nth-child(3)::after { position: absolute;  top: 50%; right: -15px; transform: translateY(-50%); width: 10px; height: 10px; background-color: red;  }  #middle-btn-container {display: flex; flex-direction: column; gap: 20px; } #middle-btn-container-text {font-weight: bold; font-size: 1.2rem; text-wrap: nowrap; }",
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
          {
            name: "buttonA",
            type: "button",
            //position: "absolute top-0 left-1/2 z-0",
            classes: " standard-button circular-button ",
            height: "",
            width: "",
            size: "",
            img_url: "",
            color: "secondary",
            hover_color: "",
            border: "",
            border_color: "",
            button_text_display: "",
            radial: "",
            opacity: "",
            font_style: {
              classes: "",
              fontSize: "",
              fontWeight: "", //light, normal, medium, bold, extrabold
              color: "",
              hover_color: "",
            },
            position: {
              position: "absolute",
            },
          },
          {
            name: "touchpad1",
            type: "touchpad",
            classes: "standard-touchpad",
            position: {
              //   position: "absolute",
              //  top: "10px",
              // left: "300px",
              zIndex: 0,
            },
            style: {
              width: "200px",
              height: "110px",
              //backgroundColor: "secondary",
            },
          },
          {
            name: "steeringWheel1",
            type: "steeringWheel",
            position: { position: "absolute", top: "-50px", left: "310px" },
            size: { width: "300px", height: "300px" },
            style: {
              outer_rim_color: "neutral",
              spoke_color: "primary",
              hub_color: "secondary",
              center_marker_color: "secondary",
            },
            mapping: "steering",
          },
          {
            name: "toggleButtonOne",
            type: "toggle_button",
            // toggle_on_classes: "toggle-on-default",
            // toggle_off_classes: "toggle-off-default",
            font_style: {
              classes: "",
              fontSize: "",
              fontWeight: "", //light, normal, medium, bold, extrabold
              color: "",
            },
            toggle_on: {
              classes: "toggle-on-default",
              text_display: "ON",
              /* color: "success",
              hover_color: "warning",
              border: "large",
              borderColor: "red-500",
              size: {
                height: "50px",
                width: "100px",
              },*/
            },
            toggle_off: {
              classes: "toggle-off-default",
              text_display: "OFF",
              /*  color: "error",
              hover_color: "warning",
              border: "large",
              borderColor: "primary",
              size: { height: "50px", width: "100px" },*/
            },
          },
        ],
      },
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
          zIndex: -2,
        },
        //style: "absolute top-0 left-[60%] z-0 justify-center items-center flex",
        size: "350px",
        distance: 0.3,
        //outerborderWidth: "70%",
        //outerborderColor: "secondary",
        children: [
          {
            name: "joystickL",
            type: "joystick",
            position: "z-0",
            size: { inner_height_width: 60, outer_height_width: 100 },
            inner_classes: "standard-inner-joystick",
            outer_classes: "standard-outer-joystick",
            style: {
              inner_color: "primary",
              outer_color: "secondary",
              border: "",
              border_color: "",
            },
            mapping: "joystickL",
          },
          {
            name: "buttonA",
            type: "button",
            //position: "absolute top-0 left-1/2 z-0",
            classes: " standard-button circular-button clip-spiked",
            height: "",
            width: "",
            size: "",
            img_url: buttonOne,
            color: "",
            hover_color: "",
            border: "large",
            border_color: "primary",
            button_text_display: "",
            radial: "",
            opacity: "",
            font_style: {
              classes: "",
              fontSize: "",
              fontWeight: "", //light, normal, medium, bold, extrabold
              color: "",
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
            classes: " clip-spiked standard-button circular-button",
            height: "",
            width: "",
            size: "",
            img_url: buttonTwo,
            color: "",
            hover_color: "",
            border: "large",
            border_color: "primary",
            button_text_display: "",
            radial: "",
            font_style: {
              classes: "",
              fontSize: "",
              fontWeight: "", //light, normal, medium, bold, extrabold
              color: "",
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
            classes: "clip-spiked standard-button circular-button",
            height: "",
            width: "",
            size: "",
            img_url: buttonThree,
            color: "",
            hover_color: "",
            border: "large",
            border_color: "primary",
            button_text_display: "",
            radial: "",
            font_style: {
              classes: "",
              fontSize: "",
              fontWeight: "", //light, normal, medium, bold, extrabold
              color: "",
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
            classes: "clip-spiked standard-button circular-button",
            height: "",
            width: "",
            size: "",
            img_url: buttonFour,
            color: "",
            hover_color: "",
            border: "large",
            border_color: "primary",
            button_text_display: "",
            radial: "",
            font_style: {
              classes: "",
              fontSize: "",
              fontWeight: "", //light, normal, medium, bold, extrabold
              color: "",
              hover_color: "",
            },
            position: {
              position: "absolute",
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
