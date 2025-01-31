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
      >
        {isOn ? text.toggleon : text.toggleoff}
      </button>
    </>
  );
};

export default ToggleButton;
