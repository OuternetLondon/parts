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

const Joystick = ({ styles, positioning, name }) => {
  const [pressed, setPressed] = useState(false);
  const [position, setPosition] = useState({ angle: 0, distance: 0 }); // Start at center
  const joystickRef = useRef(null);
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const { user } = useContext(UserContext);
  const socket = useSocket();

  const OUTER_CIRCLE_SIZE = styles.outer_h;
  const INNER_CIRCLE_SIZE = styles.inner_h;
  const MAX_DISTANCE = OUTER_CIRCLE_SIZE / 2;

  useEffect(() => {
    if (joystickRef.current) {
      const updateCenter = () => {
        const rect = joystickRef.current.getBoundingClientRect();
        setCenter({
          x: rect.left + OUTER_CIRCLE_SIZE / 2,
          y: rect.top + OUTER_CIRCLE_SIZE / 2,
        });
      };

      updateCenter();
      window.addEventListener("resize", updateCenter);
      return () => window.removeEventListener("resize", updateCenter);
    }
  }, []);

  const calculatePolarPosition = (clientX, clientY) => {
    let dx = clientX - center.x;
    let dy = clientY - center.y;

    let distance = Math.sqrt(dx * dx + dy * dy);
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    angle = angle < 0 ? angle + 360 : angle;

    const normalizedDistance = Math.min(distance / MAX_DISTANCE, 1);

    return {
      angle,
      distance: normalizedDistance,
    };
  };

  const getPolarToCartesian = (angle, distance) => {
    const radians = angle * (Math.PI / 180);
    const scaledDistance = distance * MAX_DISTANCE;
    return {
      x: Math.cos(radians) * scaledDistance,
      y: Math.sin(radians) * scaledDistance,
    };
  };

  useEffect(() => {
    if (pressed) {
      const handleGlobalMouseMove = (e) => {
        handleMove(e.clientX, e.clientY);
      };

      const handleGlobalTouchMove = (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      };

      const handleGlobalEnd = () => {
        handleEnd();
      };

      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("mouseup", handleGlobalEnd);
      window.addEventListener("touchmove", handleGlobalTouchMove, {
        passive: false,
      });
      window.addEventListener("touchend", handleGlobalEnd);

      return () => {
        window.removeEventListener("mousemove", handleGlobalMouseMove);
        window.removeEventListener("mouseup", handleGlobalEnd);
        window.removeEventListener("touchmove", handleGlobalTouchMove);
        window.removeEventListener("touchend", handleGlobalEnd);
      };
    }
  }, [pressed, center]);

  const handleStart = (clientX, clientY) => {
    setPressed(true);
    const newPos = calculatePolarPosition(clientX, clientY);
    setPosition(newPos);
  };

  const handleMove = (clientX, clientY) => {
    if (pressed) {
      const newPos = calculatePolarPosition(clientX, clientY);
      setPosition(newPos);
    }
  };

  const handleEnd = () => {
    setPressed(false);
    setPosition({ angle: 0, distance: 0 }); // Return to center
    const JSON = generateJSON(user, name, "joystick", "mouseUp", null);
    socket.emit("controls_data", JSON);
    console.log("mouse up");
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
    const JSON = generateJSON(user, name, "joystick", "mouseDown", null);
    socket.emit("controls_data", JSON);
    console.log("mouse down");
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    if (!user || !socket) return;
    const JSON = generateJSON(user, name, "joystick", "mouseMove", {
      angle: position.angle,
      distance: position.distance,
    });
    socket.emit("controls_data", JSON);
  }, [user, position, socket]);

  const visualPosition = getPolarToCartesian(position.angle, position.distance);

  return (
    <div className={`p-4 ${positioning}  `}>
      <div
        ref={joystickRef}
        className="relative select-none touch-none"
        style={{
          width: OUTER_CIRCLE_SIZE,
          height: OUTER_CIRCLE_SIZE,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className={`absolute rounded-full ${styles.border} ${styles.outer_color} `}
          style={{
            width: OUTER_CIRCLE_SIZE,
            height: OUTER_CIRCLE_SIZE,
          }}
        />

        <div
          className={`absolute rounded-full ${styles.inner_color}`}
          style={{
            width: INNER_CIRCLE_SIZE,
            height: INNER_CIRCLE_SIZE,
            left:
              OUTER_CIRCLE_SIZE / 2 - INNER_CIRCLE_SIZE / 2 + visualPosition.x,
            top:
              OUTER_CIRCLE_SIZE / 2 - INNER_CIRCLE_SIZE / 2 + visualPosition.y,
            transform: "translate(0, 0)",
            transition: pressed ? "none" : "all 0.2s ease-out", // Smooth return to center
            // backgroundColor: styles.inner_color,
            opacity: pressed ? 1 : 0.8,
          }}
        />
      </div>
    </div>
  );
};

export default Joystick;
