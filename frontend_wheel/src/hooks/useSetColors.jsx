import { use } from "react";

const useSetColors = (
  color_object,
  button_size,
  font_size,
  border_thickness,
  font_weight
) => {
  color_object.forEach((color) => {
    document.documentElement.style.setProperty(
      `--color-${color.name}`,
      color.value
    );
  });
  document.documentElement.style.setProperty(
    `--size-field`,
    `${0.25 * button_size}rem`
  );
  let font_values = [
    "xs",
    "sm",
    "base",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "7xl",
    "8xl",
    "9xl",
  ];
  let font_sizes = [
    "0.75",
    "1",
    "1.125",
    "1.25",
    "1.5",
    "1.875",
    "2.25",
    "3",
    "3.75",
    "4.5",
    "6",
    "8",
  ];

  font_values.forEach((value, index) => {
    const remSize = getComputedStyle(document.documentElement).getPropertyValue(
      `--text-${value}`
    );
    console.log("remSize", remSize);
    document.documentElement.style.setProperty(
      `--text-${value}`,
      `${parseFloat(font_sizes[index]) * font_size}rem `
    );
    /* const lineHeight = getComputedStyle(
      document.documentElement
    ).getPropertyValue(`--line-height-${value}`);
    document.documentElement.style.setProperty(
      `--text-${value}`,
      `${remSize * font_size} `
    );
    document.documentElement.style.setProperty(
      `--line-height-${value}`,
      `${lineHeight * font_size} `
    );*/
  });

  const border_values = ["2", "4", "8"];
  border_values.forEach((value) => {
    document.documentElement.style.setProperty(
      `--border-${value}`,
      `${value * border_thickness}px `
    );
    // document.documentElement.style.setProperty(`--border-4-default`, `4px `);
    //document.documentElement.style.setProperty(`--border-8-default`, `8px `);
    /*const element = document.querySelector(`.border-${value}`);
    if (element) {
      const borderWidth = getComputedStyle(element).borderWidth;
      element.style.borderWidth = `${
        parseFloat(borderWidth) * border_thickness
      }px`;
    }*/
  });

  //
  let fontWeights = [
    ["light", 300],
    ["medium", 500],
    ["normal", 400],
    ["bold", 700],
    ["extrabold", 800],
  ];
  fontWeights.forEach((weight) => {
    document.documentElement.style.setProperty(
      `--font-weight-${weight[0]}`,
      `${weight[1] * font_weight}`
    );
  });

  return;
};

export default useSetColors;
