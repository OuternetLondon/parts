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
import tinycolor from "tinycolor2";
import useSetColors from "./hooks/useSetColors";

const App = () => {
  const CONFIG = {
    userId: "user123",
    timestamp: "2023-01-07T14:00:00Z",
    colors: [
      { name: "primary", value: "#422ad5" },
      { name: "secondary", value: "#f43098" },
      { name: "accent", value: "#00d3bb" },
      { name: "neutral", value: "#09090b" },
      { name: "info", value: "#00bafe" },
    ],
    components: [
      {
        /*id: "MainSection",
        type: "ButtonJoystick",
        position: { position: "absolute", top: "10px", left: "900px" },
        size: { width: "500px", height: "500px" },
        distance: "0.3",*/
        id: "MainSection",
        type: "ButtonJoystick",
        style: "absolute top-0 left-[60%] z-0 justify-center items-center flex",
        size: "size-200",
        distance: 0.1,
        children: [
          {
            name: "joystickL",
            type: "joystick",
            position: "z-0",
            size: { inner_height_width: 60, outer_height_width: 130 },
            style: {
              inner_color: "bg-primary",
              outer_color: "bg-sky-200",
              border: "border-2 black",
            },
            mapping: "joystickL",
          },
          {
            name: "buttonA",
            type: "button",
            position: " z-0",
            style:
              "bg-[url(https://a-z-animals.com/media/2022/12/shutterstock_1645981366.jpg)] bg-cover group [box-shadow:inset_0_0_5px_0_#333] cursor-pointer btn-square btn-lg drop-shadow-md  h-25 w-25",
            text_style:
              "group-hover:text-purple-900 text-5xl font-bold text-black drop-shadow-xl ",
            text_display: " A",
          },
          {
            name: "buttonA",
            type: "button",
            position: " z-0",
            style:
              "group justify-center items-center flex [box-shadow:inset_0_0_5px_0_#333] cursor-pointer btn-circle btn-lg drop-shadow-md h-25 w-25 ",
            radial: "primary",
            text_style:
              "group-hover:text-purple-900 hover:color-grey-500 text-6xl font-bold text-black drop-shadow-xl ",
            text_display: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="4"
                stroke="currentColor"
                class="size-13"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                />
              </svg>
            ),
          },
          {
            name: "buttonA",
            type: "button",
            position: " z-0",
            style:
              "group justify-center items-center flex [box-shadow:inset_0_0_5px_0_#333] cursor-pointer btn-circle btn-lg drop-shadow-md bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% h-25 w-25  hover:bg-[radial-gradient(ellipse_at_50%_75%,_rgb(219_234_254),_rgb(96_165_250),_rgb(59_130_246))] ",
            text_style:
              "group-hover:text-purple-900 hover:color-grey-500 text-6xl font-bold text-black drop-shadow-xl ",
            text_display: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="4"
                stroke="currentColor"
                class="size-13"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                />
              </svg>
            ),
          },
        ],
      },
      {
        id: "dpad",
        type: "DPad",
        style:
          "flex relative items-center justify-center h-150 top-0 left-50 z-0 ",
        width: "w-150",
        distance: 0.7,
        children: [
          {
            name: "buttonA",
            type: "button",
            position: " z-0",
            style:
              "group [box-shadow:inset_0_0_5px_0_#333] cursor-pointer btn-circle btn-lg drop-shadow-2xl bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% h-25 w-25  hover:bg-[radial-gradient(ellipse_at_50%_75%,_rgb(219_234_254),_rgb(96_165_250),_rgb(59_130_246))] ",
            text_style:
              "group-hover:text-purple-900 text-5xl font-bold text-black drop-shadow-xl ",
            text_display: " A",
          },
          {
            name: "buttonA",
            type: "button",
            position: " z-0",
            style:
              "group justify-center items-center flex [box-shadow:inset_0_0_5px_0_#333] cursor-pointer btn-circle btn-lg drop-shadow-2xl bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% h-25 w-25  hover:bg-[radial-gradient(ellipse_at_50%_75%,_rgb(219_234_254),_rgb(96_165_250),_rgb(59_130_246))] ",
            text_style:
              "group-hover:text-purple-900 hover:color-grey-500 text-6xl font-bold text-black drop-shadow-xl ",
            text_display: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="4"
                stroke="currentColor"
                class="size-13"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                />
              </svg>
            ),
          },
          {
            name: "buttonA",
            type: "button",
            position: " z-0",
            style:
              "group justify-center items-center flex [box-shadow:inset_0_0_5px_0_#333] cursor-pointer btn-circle btn-lg drop-shadow-2xl bg-[radial-gradient(ellipse_at_50%_75%,_rgb(255_255_255),_rgb(66_42_213),_rgb(0_0_0))] h-25 w-25  hover:bg-[radial-gradient(ellipse_at_50%_75%,_rgb(219_234_254),_rgb(96_165_250),_rgb(59_130_246))] ",
            text_style:
              "group-hover:text-purple-900  hover:color-grey-500 text-6xl font-bold text-black drop-shadow-xl ",
            text_display: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={4}
                stroke="currentColor"
                className="size-13"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            ),
          },
          {
            name: "buttonA",
            type: "button",
            position: " z-0",
            style: `h-25 w-25 btn btn-circle btn-primary btn-lg drop-shadow-lg`,
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
      {useSetColors(CONFIG.colors)}
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
              style={component.style}
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
