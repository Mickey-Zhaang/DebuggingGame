import kaboom from "kaboom";
import { scaleFactor } from "./constants";

console.log("kaboomCtx.js is loaded!")

export const k = kaboom({
  global: false,
  touchToMouse: true,
  canvas: document.getElementById("game"),
  debug: false, // set to false once ready for production
});
