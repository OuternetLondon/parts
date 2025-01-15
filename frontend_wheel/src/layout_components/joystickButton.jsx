import React, { useState, useRef, useEffect, useContext } from "react";
import Loop_components from "./loop_components";
//import Button from "../components/button";

const Button = ({ label, angle }) => {
  console.log("Button");
  const buttonStyle = {
    position: "absolute",
    width: "40px",
    height: "40px",
    backgroundColor: "#888",
    borderRadius: "50%",
    border: "none",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "transform 0.3s",
    transform: `rotate(${angle}deg) translate(100px) rotate(-${angle}deg)`,
  };

  return <button style={buttonStyle}>{label}</button>;
};

const JoystickButton = () => {
  const containerStyle = {
    position: "relative",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    backgroundColor: "#f0f0f0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  };

  const joystickStyle = {
    width: "100px",
    height: "100px",
    backgroundColor: "#ccc",
    borderRadius: "50%",
    position: "absolute",
  };

  const buttons = ["A", "B", "X", "Y", "L1", "R1", "Start", "Select"];

  return (
    <div style={containerStyle}>
      <div style={joystickStyle}></div>
      {buttons.map((button, index) => {
        const angle = (index / buttons.length) * 360;
        return <Button key={index} label={button} angle={angle} />;
      })}
    </div>
  );
};

export default JoystickButton;
