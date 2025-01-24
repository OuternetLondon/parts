const useSetColors = (color_object) => {
  color_object.forEach((color) => {
    console.log("colors", color.name, color.value);
    document.documentElement.style.setProperty(
      `--color-${color.name}`,
      color.value
    );
  });
  document.documentElement.style.setProperty(`--color-dark`, "#00bafe");
  return;
};

export default useSetColors;
