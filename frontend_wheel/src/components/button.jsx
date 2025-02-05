import { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { UserContext } from "../context/userContext";
import { useSocket } from "../context/socketContext";
import tinycolor from "tinycolor2";
import clsx from "clsx";
import "../index.css";

const generateJSON = (userId, name, controlType, action, data) => {
  return {
    userId,
    timestamp: new Date().toISOString(),
    name,
    controlType,
    action,
    data,
  };
};

function Button({
  text_display,
  container_text,
  name,
  /* flashColor,
  hoverColor,
  fontStyle,*/
  radial,
  position,
  classes,
  fontClass,
  tailwindStyles,
  inlineStyles,
  font_style,
  fontTailwind,
  customStyle,
  angle,
  radius,
}) {
  let color;
  let lightColor;
  let darkColor;
  if (radial) {
    color = tinycolor(radial.trim()).toHexString();
    // console.log("color radial", color);
    lightColor = tinycolor(color).lighten(45).toHexString();
    darkColor = tinycolor(color).darken(40).toHexString();
    //console.log("darkColor", darkColor);
    color = tinycolor(color).toHexString();
  }

  const { user } = useContext(UserContext);
  const socket = useSocket();

  function handleClick() {
    const JSON = generateJSON(user, name, "button", "click", null);
    socket.emit("button_data", JSON);
  }
  return (
    <>
      <div
        style={{
          ...(angle && {
            transform: `rotate(${angle}deg) translate(${radius}) rotate(-${angle}deg)`,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.3s",
          }),
          ...customStyle,
        }}
        id="outer-btn-container"
        className="outer-btn-container"
      >
        <div id="middle-btn-container" className="middle-btn-container">
          <button
            onClick={() => handleClick()}
            className={`${classes}  ${tailwindStyles}   `}
            style={{
              ...(radial && {
                background: `radial-gradient(circle at 50% 75%, ${lightColor}, ${color} 50%, ${darkColor} 90%)`,
              }),
              ...inlineStyles,
              ...position,
            }}
          >
            <p
              className={` ${fontClass} ${fontTailwind} `}
              style={{ ...font_style }}
            >
              {text_display}
            </p>
          </button>
          <span id="middle-btn-container-text">
            {container_text.middleContainerText}
          </span>
        </div>
        <span id="outer-btn-container-text">
          {container_text.outerContainerText}
        </span>
      </div>
    </>
  );
}

export default Button;
