import { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { UserContext } from "../context/userContext";
import { useSocket } from "../context/socketContext";
import tinycolor from "tinycolor2";
import clsx from "clsx";

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
  console.log("fontstyle button", font_style);
  let color;
  let lightColor;
  let darkColor;
  if (radial) {
    color = radial.trim();
    lightColor = tinycolor(color)
      .lighten(70)
      .toRgbString()
      .replace(/,/g, "_")
      .replace(/\s+/g, "");
    darkColor = tinycolor(color)
      .darken(70)
      .toRgbString()
      .replace(/,/g, "_")
      .replace(/\s+/g, "");
    color = tinycolor(color)
      .toRgbString()
      .replace(/,/g, "_")
      .replace(/\s+/g, "");
  }

  const { user } = useContext(UserContext);
  const socket = useSocket();

  function handleClick() {
    const JSON = generateJSON(user, name, "button", "click", null);
    socket.emit("controls_data", JSON);
  }
  return (
    <>
      <button
        onClick={() => handleClick()}
        className={`${classes}  ${tailwindStyles}  group ${
          radial &&
          `bg-[radial-gradient(ellipse_at_50%_75%,_${lightColor},_${color},_${darkColor})]   `
        } `}
        style={{
          ...inlineStyles,
          ...customStyle,
          ...position,
          ...(angle && {
            transform: `rotate(${angle}deg) translate(${radius}) rotate(-${angle}deg)`,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.3s",
          }),
        }}
      >
        <p className={`${fontClass} ${fontTailwind}`} style={{ ...font_style }}>
          {text_display}
        </p>
      </button>
    </>
  );
}

export default Button;
