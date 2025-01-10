import React, { useState, useRef, useEffect, useContext} from 'react';
import { UserContext } from '../context/userContext';
import { useSocket } from '../context/socketContext';

const generateJSON = (userId, controlType, action, data) => {
  return {
    userId,
    timestamp: new Date().toISOString(),
    name: "default",
    controlType,
    action,
    data,
  };
};

const Joystick = ({styles}) => {
  const [pressed, setPressed] = useState(false);
  const [position, setPosition] = useState({ angle: 0, distance: 0 });
  const joystickRef = useRef(null);
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const {user} = useContext(UserContext);
  const socket = useSocket();
  
  console.log("styles", styles);

  useEffect(() => {
    console.log('Styles:', styles);
  }, [styles]);
  // Constants
  const OUTER_CIRCLE_SIZE = styles.outer_h;
  const INNER_CIRCLE_SIZE = styles.inner_h;
  const MAX_DISTANCE = OUTER_CIRCLE_SIZE / 2; // Constrain to outer circle radius

  useEffect(() => {
    if (joystickRef.current) {
      const rect = joystickRef.current.getBoundingClientRect();
      setCenter({
        x: rect.left + OUTER_CIRCLE_SIZE / 2,
        y: rect.top + OUTER_CIRCLE_SIZE / 2
      });
    }
  }, []);

  const calculatePolarPosition = (clientX, clientY) => {
    // Calculate relative coordinates from center
    let dx = clientX - center.x;
    let dy = clientY - center.y;

    // Calculate raw distance from center
    let distance = Math.sqrt(dx * dx + dy * dy);

    // Constrain distance to outer circle radius (midpoint constraint)
    if (distance > MAX_DISTANCE) {
      const scale = MAX_DISTANCE / distance;
      dx *= scale;
      dy *= scale;
      distance = MAX_DISTANCE;
    }

    // Calculate angle in degrees (0 to 360)
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    angle = angle < 0 ? angle + 360 : angle;

    // Normalize distance to 0-1 range relative to outer radius
    distance = distance / MAX_DISTANCE;

    return {
      angle,
      distance
    };
  };

  // Convert polar coordinates back to Cartesian for visual display
  const getPolarToCartesian = (angle, distance) => {
    const radians = angle * (Math.PI / 180);
    const scaledDistance = distance * MAX_DISTANCE;
    return {
      x: Math.cos(radians) * scaledDistance,
      y: Math.sin(radians) * scaledDistance
    };
  };

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
    setPosition({ angle: 0, distance: 0 });
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
    e.preventDefault();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    handleEnd();
  };

  useEffect(() => { 
    if(!user) return;
    const JSON = generateJSON(
      user, 
      "joystick", 
      "mouseEvent", 
      {angle: position.angle, distance: position.distance}
    );
    socket.emit('controls_data', JSON);
  }, [user, position, socket]);

  // Calculate visual position of inner circle
  const visualPosition = pressed ? getPolarToCartesian(position.angle, position.distance) : { x: 0, y: 0 };
  
  return (
    <div className="p-4" style={{position: "absolute", left: styles.position.left, top: styles.position.top}}>
      <div
        ref={joystickRef}
        className="relative select-none touch-none"
        style={{
          width: OUTER_CIRCLE_SIZE,
          height: OUTER_CIRCLE_SIZE
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Outer circle */}
        <div
          className="absolute rounded-full border-2"
          style={{
            width: OUTER_CIRCLE_SIZE,
            height: OUTER_CIRCLE_SIZE,
            backgroundColor: styles.outer_color,
          }}
        />
        
        {/* Inner circle */}
        {pressed && (
          <div
            className="absolute rounded-full bg-blue-500"
            style={{
              width: INNER_CIRCLE_SIZE,
              height: INNER_CIRCLE_SIZE,
              left: OUTER_CIRCLE_SIZE / 2 - INNER_CIRCLE_SIZE / 2 + visualPosition.x,
              top: OUTER_CIRCLE_SIZE / 2 - INNER_CIRCLE_SIZE / 2 + visualPosition.y,
              transform: 'translate(0, 0)',
              transition: 'transform 0.1s ease-out',
              backgroundColor: styles.inner_color,
            }}
          />
        )}
      </div>

      {/* Display polar coordinates for debugging */}
      <div className="mt-4 text-sm">
        <p>Angle: {position.angle.toFixed(1)}°</p>
        <p>Distance: {(position.distance * 100).toFixed(1)}%</p>
      </div>
    </div>
  );
};

export default Joystick;