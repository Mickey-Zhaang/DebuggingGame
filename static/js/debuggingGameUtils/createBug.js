import { scaleFactor } from "./constants";

export function createBug(k, map, entity) {
    const bugInstance = k.make([
      k.sprite("beetles", {anim : "idle-down"}),
      k.area({
        shape: new k.Rect(k.vec2(0, 0), 10, 10),
      }),
      k.anchor("center"),
      k.pos(),
      k.scale(scaleFactor),
      {
        hasInteracted: false,
        isDead: false,
      },
      "bug",
    ])
  
    bugInstance.pos = k.vec2(
      (map.pos.x + entity.x) * scaleFactor,
      (map.pos.y + entity.y) * scaleFactor
    );
  
    return bugInstance;
  }