import { useState, useEffect, useContext } from "react";
import useWebSocket from "react-use-websocket";
import React from "react";
import useDeviceMotion from "../hooks/useMotion";
import "../index.css";
import RacingWheelDesign from "./racing_wheel_design";
import { v4 as uuidv4 } from "uuid";
import { io } from "socket.io-client";
//import useUser from '../hooks/useUser';
import { UserContext } from "../context/userContext";
import { useSocket } from "../context/socketContext";

//const socket = io("https://tech.outernetglobal.com/testenv");
//const socket = io("http://localhost:5057");

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

function RacingWheel({ style, name }) {
  const { user } = useContext(UserContext);
  const motion = useDeviceMotion();
  const [rotation, setRotation] = useState(0); // Wheel rotation angle
  const socket = useSocket();

  useEffect(() => {
    const { beta, gamma } = motion.orientation; // Beta (forward/backward), Gamma (side tilt)
    let angle = 0;

    // Determine if the phone is horizontal or vertical
    const isHorizontal = Math.abs(beta) < 45; // Phone is horizontal if beta is small

    // Use beta for horizontal, gamma for vertical
    const tilt = isHorizontal ? beta : gamma;

    // Adjust rotation range and sensitivity
    const maxTilt = 80; // Maximum typical tilt value for full rotation
    const minTilt = 5; // Minimum tilt threshold to ignore small movements
    if (Math.abs(tilt) > minTilt) {
      // Apply dead zone for small tilts
      // Map tilt to -45° to 45° rotation
      angle = Math.max(-90, Math.min(90, (tilt / maxTilt) * 90));
    }

    // Smooth rotation using weighted average
    setRotation((prevRotation) => prevRotation * 0.8 + angle * 0.2);
  }, [motion.orientation]);

  useEffect(() => {
    if (!user) return;
    if (!socket) return;
    let JSON = generateJSON(user, name, "steeringWheel", "orientation", {
      "orientation-gama": motion.orientation.gamma,
      "orientation-beta": motion.orientation.beta,
    });
    socket.emit("controls_data", JSON);
  }, [user, motion, socket]);

  return (
    <>
      <div style={{ position: "absolute", left: style.left, top: style.top }}>
        <RacingWheelDesign style={style} rotation={rotation} />
      </div>
    </>
  );
}
export default RacingWheel;
