import kaboom from "kaboom";
import { debug } from "./constants";

if (debug) console.log("kaboomCtx.js is loaded!")

if (debug) console.log("Before Kaboom initialization:", document.querySelectorAll("canvas"));

export const k = kaboom({
  global: false,
  touchToMouse: true,
  canvas: document.getElementById("game"),
  debug: false, // set to false once ready for production
  background: [80, 2, 80],
});

if (debug) console.log("After Kaboom initialization:", document.querySelectorAll("canvas"));

