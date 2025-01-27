import React from "react";
import { useState, useContext } from "react";
import { io } from "socket.io-client";
import { UserContext } from "../context/userContext";
import { useSocket } from "../context/socketContext";
import usegenerateJSON from "../hooks/usegenerateJSON";

const ToggleButton = ({}) => {
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

  let toggle_on_style = "btn btn-secondary";

  let toggleoff_style = "btn btn-neutral";

  return (
    <>
      <button
        onClick={() => {
          setIsOn(!isOn);
          handleClick();
        }}
        className={isOn ? toggle_on_style : toggleoff_style}
      >
        Toggle
      </button>
    </>
  );
};

export default ToggleButton;
