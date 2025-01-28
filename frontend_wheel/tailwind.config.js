/** @type {import('tailwindcss').Config} */
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // safelist: ["bg-red-300"],
  // theme: {
  //   extend: {},
  // },
  //plugins: [require("daisyui"), tailwindcss()],
  plugins: [tailwindcss()],
});
