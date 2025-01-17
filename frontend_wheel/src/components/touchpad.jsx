import React, { useState, useRef, useEffect, useContext } from "react";
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

const VirtualTouchpad = ({ style, position }) => {
  const { user } = useContext(UserContext);
  const socket = useSocket();

  const touchpadRef = useRef(null);
  const [isPressed, setIsPressed] = useState(false);
  const [touchInfo, setTouchInfo] = useState({
    startX: 0,
    startY: 0,
    moveX: 0,
    moveY: 0,
    direction: "",
    position: "",
  });

  // Minimum distance for swipe detection
  const MIN_SWIPE_DISTANCE = 50;

  const handleStart = (clientX, clientY) => {
    const rect = touchpadRef.current.getBoundingClientRect();
    setIsPressed(true);

    setTouchInfo({
      startX: clientX,
      startY: clientY,
      moveX: 0,
      moveY: 0,
      direction: "",
      position: clientX - rect.left < rect.width / 2 ? "left" : "right",
    });
  };

  const handleMove = (clientX, clientY) => {
    if (!isPressed) return;

    setTouchInfo((prev) => ({
      ...prev,
      moveX: clientX - prev.startX,
      moveY: clientY - prev.startY,
    }));
  };

  const handleEnd = () => {
    if (!isPressed) return;

    const { moveX, moveY } = touchInfo;
    const absX = Math.abs(moveX);
    const absY = Math.abs(moveY);

    if (Math.max(absX, absY) < MIN_SWIPE_DISTANCE) {
      setTouchInfo((prev) => ({ ...prev, direction: "tap" }));
      setIsPressed(false);
      return;
    }

    let direction = "";
    if (absX > absY) {
      direction = moveX > 0 ? "right" : "left";
    } else {
      direction = moveY > 0 ? "down" : "up";
    }

    setTouchInfo((prev) => ({ ...prev, direction }));
    const JSON = generateJSON(
      user,
      name,
      "touchpad",
      `swipe${direction}`,
      `position:${touchInfo.position}`
    );
    socket.emit("controls_data", JSON);
    setIsPressed(false);
  };

  // Mouse event handlers
  const handleMouseDown = (e) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  return (
    <div className="">
      <div
        ref={touchpadRef}
        style={{
          ...style,
        }}
        className={`w-full h-64 bg-gray-100 rounded-lg border-2 ${
          isPressed ? "border-blue-500" : "border-gray-300"
        } touch-none select-none flex items-center justify-center cursor-pointer`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="text-center space-y-2">
          <p className="text-lg font-medium">
            {touchInfo.direction ? ` ${touchInfo.direction} swipe` : ""}
          </p>
          <div className="text-sm text-gray-600"></div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTouchpad;
