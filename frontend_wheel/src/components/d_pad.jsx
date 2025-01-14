import Button from "./button";

const DPad = ({ position }) => {
  const x = position.x; // Center X coordinate
  const y = position.y; // Center Y coordinate

  const buttonArray = [
    {
      name: "dpadUp",
      position: { x: x, y: y - 75 }, // Directly above center
      size: { width: 75, height: 75 },
      button_style: {
        color: "#1E88E5", // Blue
        border: "2px solid black",
        borderRadius: "50%",
        flashColor: "#90CAF9", // Light Blue
        padding: "0px",
      },
      font_style: {
        fontSize: "1rem",
        fontColor: "white",
        fontFlashColor: "black",
        fontWeight: "bold",
        textWrap: "wrap",
      },
      mapping: "D-Pad Up",
    },
    {
      name: "dpadDown",
      position: { x: x, y: y + 75 }, // Directly below center
      size: { width: 75, height: 75 },
      button_style: {
        color: "#F4511E", // Orange
        border: "2px solid black",
        borderRadius: "50%",
        flashColor: "#FFAB91", // Light Orange
        padding: "0px",
      },
      font_style: {
        fontSize: "1rem",
        fontColor: "white",
        fontFlashColor: "black",
        fontWeight: "bold",
        textWrap: "wrap",
      },
      mapping: "D-Pad Down",
    },
    {
      name: "dpadLeft",
      position: { x: x - 75, y: y }, // Left of center
      size: { width: 75, height: 75 },
      button_style: {
        color: "#43A047", // Green
        border: "2px solid black",
        borderRadius: "50%",
        flashColor: "#A5D6A7", // Light Green
        padding: "0px",
      },
      font_style: {
        fontSize: "1rem",
        fontColor: "white",
        fontFlashColor: "black",
        fontWeight: "bold",
        textWrap: "wrap",
      },
      mapping: "D-Pad Left",
    },
    {
      name: "dpadRight",
      position: { x: x + 75, y: y }, // Right of center
      size: { width: 75, height: 75 },
      button_style: {
        color: "#E53935", // Red
        border: "2px solid black",
        borderRadius: "50%",
        flashColor: "#EF9A9A", // Light Red
        padding: "0px",
      },
      font_style: {
        fontSize: "1rem",
        fontColor: "white",
        fontFlashColor: "black",
        fontWeight: "bold",
        textWrap: "wrap",
      },
      mapping: "D-Pad Right",
    },
  ];

  return (
    <>
      {buttonArray.map((component, index) => {
        const style = {
          position: "absolute",
          left: `${component.position.x}px`,
          top: `${component.position.y}px`,
          width: `${component.size.width}px`,
          height: `${component.size.height}px`,
          backgroundColor: component.button_style.color,
          border: component.button_style.border,
          borderRadius: component.button_style.borderRadius,
          padding: component.button_style.padding,
        };

        const fontStyle = {
          fontSize: component.font_style.fontSize,
          fontColor: component.font_style.fontColor,
          fontFlashColor: component.font_style.fontFlashColor,
          fontWeight: component.font_style.fontWeight,
          textWrap: component.font_style.textWrap,
        };

        return (
          <Button
            key={index}
            name={component.name}
            fontStyle={fontStyle}
            flashColor={component.button_style.flashColor}
            style={style}
            component_mapping={component.mapping}
          ></Button>
        );
      })}
    </>
  );
};

export default DPad;
