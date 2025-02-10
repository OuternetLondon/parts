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

const VirtualTouchpad = ({ name, style, position, classes }) => {
  const { user } = useContext(UserContext);
  const socket = useSocket();

  const touchpadRef = useRef(null);
  const [isPressed, setIsPressed] = useState(false);
  const [touchInfo, setTouchInfo] = useState({
    startX: 0,
    startY: 0,
    moveX: 0,
    moveY: 0,
    endX: 0,
    endY: 0,
    direction: "",
    position: "",
    touchEvents: [],
    totalDistance: 0,
    pressure: 0,
    touchType: "",
  });

  // Minimum distance for swipe detection
  const MIN_SWIPE_DISTANCE = 50;

  const handleStart = (clientX, clientY, event) => {
    const rect = touchpadRef.current.getBoundingClientRect();
    setIsPressed(true);

    // Determine touch characteristics
    const touchType = event.type.includes("mouse")
      ? "mouse"
      : event.touches && event.touches.length > 1
      ? "multi-touch"
      : "single-touch";

    const pressure = event.type.includes("mouse")
      ? event.pressure || 0.5
      : event.touches[0]?.force || 0.5;

    setTouchInfo({
      startX: clientX,
      startY: clientY,
      moveX: 0,
      moveY: 0,
      endX: 0,
      endY: 0,
      direction: "",
      position: clientX - rect.left < rect.width / 2 ? "left" : "right",
      touchEvents: [
        {
          type: "touchstart",
          x: clientX,
          y: clientY,
          timestamp: new Date().toISOString(),
        },
      ],
      totalDistance: 0,
      pressure: pressure,
      touchType: touchType,
    });
  };

  const handleMove = (clientX, clientY, event) => {
    if (!isPressed) return;

    setTouchInfo((prev) => {
      const moveX = clientX - prev.startX;
      const moveY = clientY - prev.startY;
      const totalDistance = Math.sqrt(moveX * moveX + moveY * moveY);

      const newTouchEvents = [
        ...prev.touchEvents,
        {
          type: "touchmove",
          x: clientX,
          y: clientY,
          timestamp: new Date().toISOString(),
        },
      ];

      return {
        ...prev,
        moveX,
        moveY,
        totalDistance,
        touchEvents: newTouchEvents,
      };
    });
  };

  const handleEnd = (event) => {
    if (!isPressed) return;

    const { moveX, moveY, touchEvents } = touchInfo;
    const absX = Math.abs(moveX);
    const absY = Math.abs(moveY);

    let direction = "";
    if (Math.max(absX, absY) < MIN_SWIPE_DISTANCE) {
      direction = "tap";
    } else if (absX > absY) {
      direction = moveX > 0 ? "right" : "left";
    } else {
      direction = moveY > 0 ? "down" : "up";
    }

    const endEvent = {
      type: "touchend",
      x: touchEvents[touchEvents.length - 1].x,
      y: touchEvents[touchEvents.length - 1].y,
      timestamp: new Date().toISOString(),
    };

    const updatedTouchInfo = {
      ...touchInfo,
      direction,
      endX: endEvent.x,
      endY: endEvent.y,
      touchEvents: [...touchEvents, endEvent],
    };

    setTouchInfo(updatedTouchInfo);

    const JSON = generateJSON(user, name, "touchpad", `swipe${direction}`, {
      position: updatedTouchInfo.position,
      startCoords: { x: touchInfo.startX, y: touchInfo.startY },
      endCoords: { x: updatedTouchInfo.endX, y: updatedTouchInfo.endY },
      moveDistance: { x: moveX, y: moveY },
      totalDistance: touchInfo.totalDistance,
      touchType: touchInfo.touchType,
      pressure: touchInfo.pressure,
    });

    console.log("touchpad JSON", JSON);
    socket.emit("controls_data", JSON);
    setIsPressed(false);
  };

  // Mouse event handlers
  const handleMouseDown = (e) => {
    handleStart(e.clientX, e.clientY, e);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX, e.clientY, e);
  };

  const handleMouseUp = (e) => {
    handleEnd(e);
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY, e);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY, e);
  };

  const handleTouchEnd = (e) => {
    handleEnd(e);
  };

  return (
    <div id="touchpad-outer-container">
      <div
        ref={touchpadRef}
        style={{
          ...position,
          height: style.height ? style.height : "100px",
          width: style.width ? style.width : "200px",
          zIndex: position.zIndex,
        }}
        className={`${classes} w-full h-64 bg-${style.backgroundColor} rounded-lg touch-none select-none flex items-center justify-center cursor-pointer`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="text-center space-y-2">
          <p className="text-lg font-medium"></p>
          <div className="text-sm text-gray-600"></div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTouchpad;
