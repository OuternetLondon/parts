import React from "react";
import { useState, useContext } from "react";
import { io } from "socket.io-client";
import { UserContext } from "../context/userContext";
import { useSocket } from "../context/socketContext";
import usegenerateJSON from "../hooks/usegenerateJSON";

const ToggleButton = ({
  name,
  classes,
  text,
  toggle_on_style,
  toggle_off_style,
  toggle_on_inline,
  toggle_off_inline,
}) => {
  const { user } = useContext(UserContext);
  const socket = useSocket();
  const [isOn, setIsOn] = useState(false);

  function handleClick() {
    let action;
    if (!isOn) {
      action = "toggleOn";
    } else {
      action = "toggleOff";
    }
    const JSON = usegenerateJSON(user, name, "toggleButton", action, null);
    socket.emit("controls_data", JSON);

    setIsFlashing(true);
  }

  let toggle_on = classes.toggleon;

  let toggleoff = classes.toggleoff;
  return (
    <>
      <div id="toggle-outer-container">
        <div id="toggle-inner-container">
          <button
            onClick={() => {
              setIsOn(!isOn);
              handleClick();
            }}
            className={
              isOn
                ? `${toggle_on} ${toggle_on_style}`
                : `${toggleoff} ${toggle_off_style}`
            }
            style={isOn ? { ...toggle_on_inline } : { ...toggle_off_inline }}
          >
            <p> {isOn ? text.toggleon : text.toggleoff}</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default ToggleButton;
