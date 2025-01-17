import React, { useState } from "react";
import Button from "../components/button";
import Loop_components from "./loop_components";

const DPad = ({ buttons, style, distance }) => {
  // const [spacing, setSpacing] = useState(100);
  let spacing = parseInt(style.width) * distance;
  console.log("spacing", spacing);
  const adjustSpacing = (event) => {
    setSpacing(event.target.value);
  };
  console.log("style", style.width);
  const containerStyle = {
    /*width: "200px",
    height: "200px",
    position: "relative",*/
    ...style,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const buttonStyle = {
    width: "50px",
    height: "50px",
    backgroundColor: "gray",
    border: "none",
    position: "absolute",
    cursor: "pointer",
  };

  return (
    <div>
      <div style={containerStyle}>
        {buttons.map((tool, index) => {
          let customStyle;
          //let spacing = parseInt(style.width);
          console.log("index", index);
          if (index === 0) {
            customStyle = {
              top: `${spacing}px`,
              left: "50%",
              transform: "translate(-50%, 0)",
              position: "absolute",
            };
          } else if (index === 1) {
            customStyle = {
              bottom: `${spacing}px`,
              left: "50%",
              transform: "translate(-50%, 0)",
              position: "absolute",
            };
          } else if (index === 2) {
            customStyle = {
              left: `${spacing}px`,
              top: "50%",
              transform: "translate(0, -50%)",
              position: "absolute",
            };
          } else if (index === 3) {
            customStyle = {
              right: `${spacing}px`,
              top: "50%",
              transform: "translate(0, -50%)",
              position: "absolute",
            };
          }

         // {Loop_components( component_array = {[tool]}, customStyle)}
          return (
            <Loop_components
              key={tool.id}
              component_array={[tool]}
              customStyle={customStyle}
            />
          );
          /*
          const style = {
            ...customStyle,
            position: "absolute",
            width: `${tool.size.width}px`,
            height: `${tool.size.height}px`,
            backgroundColor: tool.button_style.color,
            border: tool.button_style.border,
            borderRadius: tool.button_style.borderRadius,
            padding: tool.button_style.padding,
            boxShadow: tool.button_style.boxShadow,

          };

          const fontStyle = {
            fontSize: tool.font_style.fontSize,
            fontColor: tool.font_style.fontColor,
            fontFlashColor: tool.font_style.fontFlashColor,
            fontWeight: tool.font_style.fontWeight,
            textWrap: tool.font_style.textWrap,
            fontHoverColor: component.font_style.fontHoverColor,
          };
          return (
            <Button
              key={tool.id}
              name={tool.name}
              fontStyle={fontStyle}
              flashColor={tool.button_style.flashColor}
              hoverColor={component.button_style.hoverColor}
              style={style}
              component_mapping={tool.mapping}
            ></Button>
          ); */
        })}
        {/*<button
          style={{
            ...buttonStyle,
            top: `${spacing}px`,
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
        >
          &#9650;
        </button>
        <button
          style={{
            ...buttonStyle,
            bottom: `${spacing}px`,
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
        ></button>
        <button
          style={{
            ...buttonStyle,
            left: `${spacing}px`,
            top: "50%",
            transform: "translate(0, -50%)",
          }}
        >
          &#9664;
        </button>
        <button
          style={{
            ...buttonStyle,
            right: `${spacing}px`,
            top: "50%",
            transform: "translate(0, -50%)",
          }}
        >
          &#9654;
        </button> */}
      </div>
    </div>
  );
};

export default DPad;
