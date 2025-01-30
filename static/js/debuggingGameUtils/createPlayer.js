import { scaleFactor } from "./constants";

export function createPlayer(k) {
    const player = k.make([
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
    return player;
  }