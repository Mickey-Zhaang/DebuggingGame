import {interactionRange, scaleFactor, debug} from "./constants";
import { k } from "./kaboomCtx";
import { displayDialogue, loadAssets, mouseMovement, setCamScale, createBug} from "./utils";


if (debug) console.log("main.js is loaded!")

//Makes the note disappear after 10 sec
const note = document.getElementById("note");
const timer = 10000; // sets a timer for 10 sec
setTimeout(() => {
  note.style.display = "none";
}, timer);

loadAssets(k);

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

//**************** HOME SCENE ****************
k.scene("main", async () => {
  if (debug) console.log("Starting Scene 'main'")

  const mapData = await (await fetch("../startMap.json")).json();
  const layers = mapData.layers;

  const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor), ]);

  k.onClick(() => {

    const clickedBug = k.get("bug").find((bug) => bug.isHovering());
    if(clickedBug) {
      const distance = player.pos.dist(clickedBug.pos);
      if(distance > interactionRange) {
        return;
      }

      player.isInDialogue = true;

      if(!clickedBug.hasBeenHit) {
        if(debug) console.log("bug has been clicked");
        clickedBug.hasBeenHit = true;

        displayDialogue(()=> {
          player.isInDialogue = false;
          clickedBug.hasBeenHit = false;
        })
      }
    }
  })
//**************** END HOME SCENE ****************

  //Handling Layers i.e spawnpoints, mob spawns, npc spawns
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

        //Mob Spawn?
        if (entity.name.includes("mob")) {
          //creates an instance per spawnpoint found that is named MOB#
          
          const clickedBug = createBug(k, map, entity, scaleFactor);
          
          k.add(clickedBug);
          continue;
        }

        if(entity.name === "NPC4") {
          const oldMan = k.make ([
            k.sprite("oldMan", {anim : "idle-down"}),
            k.area({
              shape: new k.Rect(k.vec2(0, 0), 10, 10),
            }),
            k.anchor("center"),
            k.pos(),
            k.scale(scaleFactor),
            {
              interactedComplete: false,
            },
            "oldMan",
          ])

          oldMan.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor,
            (map.pos.y + entity.y) * scaleFactor
          );
          k.add(oldMan);
          
        }

        //Player Spawn
        if (entity.name === "spawnpoints") {
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

  //Camera resizing and movement with player (I'll leave these seperate)
  setCamScale(k);

  k.onResize(() => {
    setCamScale(k);
  });

  k.onUpdate(() => {
      k.camPos(player.pos.x, player.pos.y)
  });
  //End Camera resizing...

  //Movement controls (Modularized)
  k.onMouseDown((mouseBtn) => mouseMovement(k, player, mouseBtn));
  //End Movement controls
});

if (debug) console.log("about to run scene 'main'")
k.go("main");
