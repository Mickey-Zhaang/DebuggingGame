import { dialogueData, scaleFactor } from "./constants";
import { k } from "./kaboomCtx";
import { displayDialogue, setCamScale } from "./utils";

console.log("main.js is loaded!")


k.loadSprite("spritesheet", "../spritesheet.png", {
  sliceX: 39,
  sliceY: 31,
  anims: {
    "idle-down": 936,
    "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
    "idle-side": 975,
    "walk-side": { from: 975, to: 978, loop: true, speed: 8 },
    "idle-up": 1014,
    "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
  },
});

k.loadSprite("startingAssets", "../First Asset pack.png", {
  sliceX: 32,
  sliceY: 32,
});

k.loadSprite("map", "../startMap.png");

k.setBackground(k.Color.fromHex("#311047"));

k.scene("main", async () => {
  console.log("Starting Scene 'main'")
  const mapData = await (await fetch("../startMap.json")).json();
  const layers = mapData.layers;

  const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);

  const player = k.make([
    k.sprite("spritesheet", { anim: "idle-down" }),
    k.area({
      shape: new k.Rect(k.vec2(0, 3), 10, 10),
    }),
    k.body(),
    k.anchor("center"),
    k.pos(),
    k.scale(scaleFactor),
    {
      speed: 250,
      direction: "down",
      isInDialogue: false,
    },
    "player",
  ]);
  console.log("Done Building Scene 'main'")


  //Handling Layers
  for (const layer of layers) {
    //Handling Layer: collisions from startingMap.json
    if (layer.name === "collisions") {
      for (const boundary of layer.objects) {
        map.add([
          k.area({
            shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
          }),
          k.body({ isStatic: true }),
          k.pos(boundary.x, boundary.y),
          boundary.name,
        ]);
      }
      continue;
    }

    //Handling Layer: Spawnpoint from startingMap.json
    if (layer.name === "Spawnpoint") {
      for (const entity of layer.objects) {
        if (entity.name === "player-spawn") {
          player.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor,
            (map.pos.y + entity.y) * scaleFactor
          );
          k.add(player);
          continue;
        }
      }
    }

    //Handling Layer: Foreground Layer
    if (layer.name === "Foreground objects") {
      layer.data.forEach((tileID, index) => {
        if (tileID === 0) return; // Skip empty tiles
        const tileWidth = 12;
        const tileHeight = 12;
    
        const x = ((index) % layer.width) * tileWidth; 
        const y = Math.floor((index) / layer.width) * tileHeight; 
        
        k.add([
          k.sprite("startingAssets", {frame: (tileID - 1)}),  //was tough, thanks 2-d arrays
          k.pos(x * scaleFactor, y * scaleFactor),
          k.z(5),
          k.scale(scaleFactor)
        ]);
    });
    }
  }

  //Camera resizing and movement with player
  setCamScale(k);

  k.onResize(() => {
    setCamScale(k);
  });

  const mapWidth = 70 * 12 * scaleFactor;
  const mapHeight = 60 * 12 * scaleFactor;
  
  k.onUpdate(() => {
      const playerPos = player.worldPos();
  
      const halfScreenWidth = k.width() / 2;
      const halfScreenHeight = k.height() / 2;
  
      const clampedX = Math.max(
          halfScreenWidth,
          Math.min(playerPos.x, mapWidth - halfScreenWidth)
      );
  
      const clampedY = Math.max(
          halfScreenHeight,
          Math.min(playerPos.y, mapHeight - halfScreenHeight)
      );
  
      k.camPos(clampedX, clampedY);
  });
  //End Camera resizing...

  //Movement controls
  k.onMouseDown((mouseBtn) => {
    if (mouseBtn !== "left" || player.isInDialogue) return;

    const worldMousePos = k.toWorld(k.mousePos());
    player.moveTo(worldMousePos, player.speed);

    const mouseAngle = player.pos.angle(worldMousePos);

    const lowerBound = 50;
    const upperBound = 125;

    if (
      mouseAngle > lowerBound &&
      mouseAngle < upperBound &&
      player.curAnim() !== "walk-up"
    ) {
      player.play("walk-up");
      player.direction = "up";
      return;
    }

    if (
      mouseAngle < -lowerBound &&
      mouseAngle > -upperBound &&
      player.curAnim() !== "walk-down"
    ) {
      player.play("walk-down");
      player.direction = "down";
      return;
    }

    if (Math.abs(mouseAngle) > upperBound) {
      player.flipX = false;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "right";
      return;
    }

    if (Math.abs(mouseAngle) < lowerBound) {
      player.flipX = true;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "left";
      return;
    }
  });
  k.onMouseRelease(stopAnims);

  function stopAnims() {
    if (player.direction === "down") {
      player.play("idle-down");
      return;
    }
    if (player.direction === "up") {
      player.play("idle-up");
      return;
    }

    player.play("idle-side");
  }
  //End Movement controls
});

console.log("about to run scene 'main'")
k.go("main");
