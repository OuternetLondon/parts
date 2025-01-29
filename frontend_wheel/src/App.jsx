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
import tinycolor from "tinycolor2";
import useSetColors from "./hooks/useSetColors";
import ToggleButton from "./components/toggleButton";
import { useStyles } from "./hooks/useStyles";

import "./index.css";
const App = () => {
  const styles = useStyles();
  const CONFIG = {
    userId: "user123",
    timestamp: "2023-01-07T14:00:00Z",
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
      /* {
        id: "GridSection",
        type: "GridLayout",
        style: {
          column_number: 2,
          row_number: 2,
          gap: "10px",
        },
        size: { height: "200px", width: "200px" },
        position: {
          top: "50px",
          left: "20px",
        },
        children: [],
      },*/
      {
        id: "section",
        type: "AbsolutePositionedContainer",
        //   style: "relative h-30 w-[50vw] top-30 left-50 z-0",
        position: {
          top: "100px",
          left: "100px",
          height: "100px",
          width: "50vw",
        },
        children: [
          {
            name: "buttonA",
            type: "button",
            //position: "absolute top-0 left-1/2 z-0",
            classes: "standard-button clip-spiked circular-button",
            height: "",
            width: "",
            size: "xl",
            img_url: "",
            color: "",
            hover_color: "white",
            border: "large",
            border_color: "black",
            text_display: "test",
            font_style: {
              classes: "button-text",
              fontSize: "",
              fontWeight: "",
              color: "orange-500",
              hover_color: "black",
            },
            position: {
              position: "absolute",
              top: "0",
              left: "30%",
              zIndex: "0",
            },
          },
          /*
          {
            name: "buttonC",
            type: "button",
            position: {
              position: "absolute",
              top: "0",
              left: "70%",
              zIndex: "0",
            },
            classes: "radial",
            height: "120px",
            width: "120px",
            color: "secondary",
            text_display: "Button B",
            hover_color: "info",
            font_style: {
              classes: "button-text",
              fontSize: "2rem",
              fontWeight: 800,
              color: "white",
              hover_color: "primary",
            },
          },
          {
            name: "buttonC",
            type: "button",
            position: {
              position: "absolute",
              top: "0",
              left: "90%",
              zIndex: "0",
            },
            classes: "image-button square-button standard-button",
            img_url:
              "https://a-z-animals.com/media/2022/12/shutterstock_1645981366.jpg",
            height: "120px",
            width: "120px",
            color: "primary",
            hover_color: "info",
            text_display: "Button image",
            font_style: {
              classes: "button-text",
              size: "2rem",
              fontWeight: 800,
              color: "white",
              hover_color: "neutral",
            },
          },*/
        ],
      },
      {
        id: "SectionTwo",
        type: "ButtonJoystick",
        position: {
          top: "200px",
          left: "20px",
        },
        //style: "absolute top-0 left-[60%] z-0 justify-center items-center flex",
        size: "400px",
        distance: 0.3,
        outerborderWidth: "70%",
        outerborderColor: "primary",
        children: [
          {
            name: "joystickL",
            type: "joystick",
            position: "z-0",
            size: { inner_height_width: 80, outer_height_width: 130 },
            inner_joystick: {
              name: "innerJoystick",
              type: "inner_joystick",
              //position: "absolute top-0 left-1/2 z-0",
              classes: "standard-button circular-button",
              height: "",
              width: "100px",
              size: "xl",
              img_url:
                "https://a-z-animals.com/media/2022/12/shutterstock_1645981366.jpg",
              color: "primary",
              hover_color: "white",
              border: "medium",
              border_color: "primary",
              text_display: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="4"
                  stroke="currentColor"
                  class="size-12"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 19.5-15-15m0 0v11.25m0-11.25h11.25"
                  />
                </svg>
              ),
              font_style: {
                classes: "button-text",
                fontSize: "",
                fontWeight: "",
                color: "primary",
                hover_color: "primary",
              },
            },
            style: {
              outer_color: "secondary",
              border: "large",
              border_color: "primary",
            },
            mapping: "joystickL",
          },
          {
            name: "buttonA",
            type: "button",
            //position: "absolute top-0 left-1/2 z-0",
            classes: "image-tint clip-spiked standard-button circular-button",
            height: "",
            width: "",
            size: "xl",
            img_url:
              "https://a-z-animals.com/media/2022/12/shutterstock_1645981366.jpg",
            color: "secondary",
            hover_color: "white",
            border: "large",
            border_color: "",
            text_display: "",
            font_style: {
              classes: "button-text",
              fontSize: "",
              fontWeight: "",
              color: "orange-500",
              hover_color: "black",
            },
            position: {
              zIndex: "0",
            },
          },
          {
            name: "buttonA",
            type: "button",
            //position: "absolute top-0 left-1/2 z-0",
            classes: "image-tint clip-spiked standard-button circular-button",
            height: "",
            width: "",
            size: "xl",
            img_url:
              "https://a-z-animals.com/media/2022/12/shutterstock_1645981366.jpg",
            color: "secondary",
            hover_color: "white",
            border: "large",
            border_color: "",
            text_display: "",
            font_style: {
              classes: "button-text",
              fontSize: "",
              fontWeight: "",
              color: "orange-500",
              hover_color: "black",
            },
            position: {
              zIndex: "0",
            },
          },
          {
            name: "buttonA",
            type: "button",
            //position: "absolute top-0 left-1/2 z-0",
            classes: "image-tint clip-spiked standard-button circular-button",
            height: "",
            width: "",
            size: "xl",
            img_url:
              "https://a-z-animals.com/media/2022/12/shutterstock_1645981366.jpg",
            color: "secondary",
            hover_color: "white",
            border: "large",
            border_color: "",
            text_display: "",
            font_style: {
              classes: "button-text",
              fontSize: "",
              fontWeight: "",
              color: "orange-500",
              hover_color: "black",
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
          top: "100px",
          left: "80%",
        },
        size: { height: "100px", width: "100px" },
        distance: 1,
        children: [
          {
            name: "buttonA",
            type: "button",
            //position: "absolute top-0 left-1/2 z-0",
            classes: "standard-button clip-spiked circular-button",
            height: "",
            width: "",
            size: "xl",
            img_url: "",
            color: "",
            hover_color: "white",
            border: "large",
            border_color: "black",
            text_display: "test",
            font_style: {
              classes: "button-text",
              fontSize: "",
              fontWeight: "",
              color: "orange-500",
              hover_color: "black",
            },
            position: {
              position: "absolute",
            },
          },
          {
            name: "buttonA",
            type: "button",
            //position: "absolute top-0 left-1/2 z-0",
            classes: "standard-button clip-spiked circular-button",
            height: "",
            width: "",
            size: "xl",
            img_url: "",
            color: "",
            hover_color: "white",
            border: "large",
            border_color: "black",
            text_display: "test",
            font_style: {
              classes: "button-text",
              fontSize: "",
              fontWeight: "",
              color: "orange-500",
              hover_color: "black",
            },
            position: {
              position: "absolute",
            },
          },
          {
            name: "buttonA",
            type: "button",
            //position: "absolute top-0 left-1/2 z-0",
            classes: "standard-button clip-spiked circular-button",
            height: "",
            width: "",
            size: "xl",
            img_url: "",
            color: "",
            hover_color: "white",
            border: "large",
            border_color: "black",
            text_display: "test",
            font_style: {
              classes: "button-text",
              fontSize: "",
              fontWeight: "",
              color: "orange-500",
              hover_color: "black",
            },
            position: {
              position: "absolute",
            },
          },
          {
            name: "buttonA",
            type: "button",
            //position: "absolute top-0 left-1/2 z-0",
            classes: "standard-button clip-spiked circular-button",
            height: "",
            width: "",
            size: "xl",
            img_url: "",
            color: "",
            hover_color: "white",
            border: "large",
            border_color: "black",
            text_display: "test",
            font_style: {
              classes: "button-text",
              fontSize: "",
              fontWeight: "",
              color: "orange-500",
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

  return (
    <>
      <button className="btn btn-primary btn-lg group ">
        <p className="group-hover:text-red-500">test</p>
      </button>
      {useSetColors(CONFIG.colors)}
      {CONFIG.components.map((component, index) => {
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
