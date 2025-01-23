import { useState, useEffect, useContext } from "react";
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

function Button({
  text_display,
  name,
  /* flashColor,
  hoverColor,
  fontStyle,*/
  position,
  style,
  text_style,
  customStyle,
  angle,
  radius,
}) {
  console.log("text style", text_style);
  const { user } = useContext(UserContext);
  const socket = useSocket();
  /*const [isFlashing, setIsFlashing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);*/

  function handleClick() {
    const JSON = generateJSON(user, name, "button", "click", null);
    socket.emit("controls_data", JSON);
  }

  /*useEffect(() => {
    if (isFlashing) {
      const timeout = setTimeout(() => setIsFlashing(false), 300); // Flash duration (300ms)
      return () => clearTimeout(timeout);
    }
  }, [isFlashing]);*/

  /*const buttonStyle = {
    ...style,
    backgroundColor: isFlashing ? flashColor : style?.backgroundColor || "blue", // Flash color: yellow
    //transition: "background-color 0.3s ease",
  };*/

  return (
    <>
      <button
        onClick={() => handleClick()}
        className={`${position} ${style}   `}
        /* style={{
            boxShadow: "inset 0 0 10px 0 #333",
          }}*/
        style={customStyle ? customStyle : {}}
      >
        <p className={text_style}> {text_display}</p>
      </button>
    </>
  );
}

export default Button;
