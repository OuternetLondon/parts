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
  angle,
  radius,
}) {
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
        className={`${position} ${style}`}
        style={
          {
            //  ...buttonStyle,
            /* ...(angle && {
            transform: `rotate(${angle}deg) translate(${radius}) rotate(-${angle}deg)`,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.3s",
          }),*/
            //  ...(isHovered && !isFlashing && { backgroundColor: hoverColor }),
          }
        }
        // onMouseEnter={() => setIsHovered(true)}
        //onMouseLeave={() => setIsHovered(false)}
        //className=" hover:bg-red-500 "
        //className="w-16 h-16 bg-blue-500 hover:bg-green-500 rounded-full transition-colors duration-200"
      >
        {text_display}
      </button>
    </>
  );
}

export default Button;
