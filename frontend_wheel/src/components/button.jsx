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

function Button({ style, component_mapping, name, flashColor, fontStyle }) {
  const { user } = useContext(UserContext);
  const socket = useSocket();
  const [isFlashing, setIsFlashing] = useState(false);

  function handleClick() {
    const JSON = generateJSON(user, name, "button", "click", null);
    socket.emit("controls_data", JSON);

    setIsFlashing(true);
  }

  useEffect(() => {
    if (isFlashing) {
      const timeout = setTimeout(() => setIsFlashing(false), 300); // Flash duration (300ms)
      return () => clearTimeout(timeout);
    }
  }, [isFlashing]);

  const buttonStyle = {
    ...style,
    backgroundColor: isFlashing ? flashColor : style?.backgroundColor || "blue", // Flash color: yellow
    //transition: "background-color 0.3s ease",
  };

  return (
    <>
      <button
        onClick={() => handleClick()}
        style={buttonStyle}
        //className="w-16 h-16 bg-blue-500 hover:bg-green-500 rounded-full transition-colors duration-200"
      >
        <p
          style={{
            fontSize: fontStyle.fontSize || "1rem",
            fontWeight: fontStyle.fontWeight || "normal",
            color: isFlashing
              ? fontStyle.fontFlashColor
              : fontStyle.fontColor || "black",
            textWrap: fontStyle.textWrap || "nowrap",
          }}
        >
          {component_mapping}
        </p>
      </button>
    </>
  );
}

export default Button;
