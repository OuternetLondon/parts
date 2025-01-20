import React from "react";
import { useState, useContext } from "react";
import { io } from "socket.io-client";
import { UserContext } from "../context/userContext";
import { useSocket } from "../context/socketContext";

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

const ToggleButton = ({
  //isOn = true,
  /* onToggle, 
  width = 52,
  height = 28,
  onColor = 'blue',
  offColor = '#e5e7eb', */
  toggle_style,
  disabled = false,
  name,
  label = "",
}) => {
  const { user } = useContext(UserContext);
  const socket = useSocket();
  const [isOn, setIsOn] = useState(false);
  const toggleSize = toggle_style.height - 4;

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const labelStyle = {
    fontSize: "14px",
  };

  const buttonStyle = {
    position: "relative",
    display: "inline-flex",
    width: `${toggle_style.width}px`,
    height: `${toggle_style.height}px`,
    backgroundColor: isOn ? toggle_style.onColor : toggle_style.offColor,
    borderRadius: "999px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    border: "none",
    padding: 0,
    transition: "background-color 200ms ease-in-out",
  };

  const toggleStyle = {
    position: "absolute",
    width: `${toggleSize}px`,
    height: `${toggleSize}px`,
    backgroundColor: toggle_style.toggle_color,
    borderRadius: "50%",
    margin: "2px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    transform: isOn
      ? `translateX(${toggle_style.width - toggleSize - 4}px)`
      : "translateX(0)",
    transition: "transform 200ms ease-in-out",
    pointerEvents: "none",
  };

  function handleClick() {
    let action;
    if (!isOn) {
      action = "toggleOn";
    } else {
      action = "toggleOff";
    }
    const JSON = generateJSON(user, name, action, "click", null);
    socket.emit("controls_data", JSON);

    setIsFlashing(true);
  }

  return (
    <div style={containerStyle}>
      {label && <span style={labelStyle}>{label}</span>}
      <button
        onClick={() => {
          if (!disabled) {
            setIsOn(!isOn);
            // onToggle(!isOn);
          }
          handleClick();
        }}
        style={buttonStyle}
        disabled={disabled}
        type="button"
        role="switch"
        aria-checked={isOn}
      >
        <span style={toggleStyle} />
      </button>
    </div>
  );
};

export default ToggleButton;
