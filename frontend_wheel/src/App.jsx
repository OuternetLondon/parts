import React, { useState, useEffect } from "react";
import RacingWheel from "./components/racing_wheel";
import Joystick from "./components/joystick";
import Button from "./components/button";

const App = () => {
  const CONFIG = {
    userId: "user123",
    timestamp: "2023-01-07T14:00:00Z",
    components: [
      {
        id: "button1",
        type: "button",
        position: { x: 100, y: 200 },
        size: { width: 100, height: 100 },
        style: {
          color: "red",
          border: "2px solid black",
          borderRadius: "50%",
        },
        mapping: "A",
      },
      {
        id: "joystick1",
        type: "joystick",
        position: { x: 300, y: 400 },
        size: { inner_height_width: 40, outer_height_width: 200 },
        style: {
          inner_color: "blue",
          outer_color: "grey",
          border: "1px solid gray",
        },
        mapping: "leftStick",
      },
      {
        id: "steeringWheel1",
        type: "steeringWheel",
        position: { x: 500, y: 600 },
        size: { width: 200, height: 200 },
        style: { color: "gray", border: "3px solid black" },
        mapping: "rightStick",
      },
    ],
  };

  return (
    <>
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        {CONFIG.components.map((component) => {
          if (component.type === "button") {
            const style = {
              position: "absolute",
              left: `${component.position.x}px`,
              top: `${component.position.y}px`,
              width: `${component.size.width}px`,
              height: `${component.size.height}px`,
              backgroundColor: component.style.color,
              border: component.style.border,
              borderRadius: component.style.borderRadius,
            };

            return (
              <Button
                key={component.id}
                style={style}
                component_mapping={component.mapping}
              ></Button>
            );
          } else if (component.type === "joystick") {
            const styles = {
              inner_h: component.size.inner_height_width,
              outer_h: component.size.outer_height_width,
              inner_color: component.style.inner_color,
              outer_color: component.style.outer_color,
              position: {
                left: `${component.position.x}px`,
                top: `${component.position.y}px`,
              },
            };
            return <Joystick styles={styles}></Joystick>;
          } else if (component.type === "steeringWheel") {
            const style = {
              position: "absolute",
              left: `${component.position.x}px`,
              top: `${component.position.y}px`,
              width: `${component.size.width}px`,
              height: `${component.size.height}px`,
              backgroundColor: component.style.color,
              border: component.style.border,
            };
            return <RacingWheel style={style}></RacingWheel>;
          }

          return null;
        })}
      </div>
    </>
  );
};

export default App;
