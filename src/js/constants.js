import { k } from "./kaboomCtx";

export const scaleFactor = 3;
export const interactionRange = 140;
export const debug = false;

export const player = k.make([
    k.sprite("spritesheet", { anim: "idle-down" }),
    k.area({
      shape: new k.Rect(k.vec2(0, 3), 10, 10),
    }),
    k.body(),
    k.anchor("center"),
    k.pos(),
    k.scale(scaleFactor),
    k.z(1),
    {
      speed: 220,
      direction: "down",
      isInDialogue: false,
      inCombat: false,
    },
    "player",
  ]);

console.log("constants.js is loaded!")
