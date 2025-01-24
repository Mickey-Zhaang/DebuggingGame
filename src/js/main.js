import {interactionRange, scaleFactor, debug, player} from "./constants";
import { k } from "./kaboomCtx";
import { displayDialogue, mouseMovement, setCamScale} from "./utils";


if (debug) console.log("main.js is loaded!")

//Makes the note disappear after 10 sec
const note = document.getElementById("note");
const timer = 10000; // sets a timer for 10 sec
setTimeout(() => {
  note.style.display = "none";
}, timer);


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

    "slime-idle-down": 858,
    "slime-walk-down": { from: 858, to: 859, loop: true, speed: 2 },
  },
});

k.loadSprite("startingAssets", "../First Asset pack.png", {
  sliceX: 32,
  sliceY: 32,
});

k.loadSprite("map", "../startMap.png");

//**************** HOME SCENE ****************
k.scene("main", async () => {
  if (debug) console.log("Starting Scene 'main'")

  const mapData = await (await fetch("../startMap.json")).json();
  const layers = mapData.layers;

  const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);

  k.onClick(() => {

    const clickedSlime = k.get("slime").find((slime) => slime.isHovering());
    if(clickedSlime) {
      const distance = player.pos.dist(clickedSlime.pos);
      if(distance > interactionRange) {
        return;
      }

      player.isInDialogue = true;

      if(!clickedSlime.hasBeenHit) {
        if(debug) console.log("Slime has been clicked");
        clickedSlime.hasBeenHit = true;

        displayDialogue(()=> {
          player.isInDialogue = false;
          clickedSlime.hasBeenHit = false;
        })
      }
    }

  })

  // //Clicking a Slime Logic (OUTDATED)
  // slime.onClick(() => {
  //   //prevents you from clicking the slime until you are within range
  //   const distance = player.pos.dist(slime.pos);
  //   if (distance > interactionRange) {
  //     return;
  //   }

  //   //logic to display the textbox inviting you to battle
  //   player.isInDialogue = true;
  //   if (!slime.hasBeenHit) {
  //     if (debug) console.log("Slime has been clicked")
  //     slime.hasBeenHit = true;
  //     displayDialogue(() => {
  //       player.isInDialogue = false; // Set to False to allow movement after clicking close button (i.e. we cannot move while in dialogue)
  //     })
  //   }
  //   slime.hasBeenHit = false;
  // })
//**************** END HOME SCENE ****************



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

        //Mob Spawn?
        if (entity.name.includes("mob")) {
          //creates an instance per spawnpoint found that is named MOB#
          const slimeInstance = k.make([
            k.sprite("spritesheet", {anim : "slime-walk-down"}),
            k.area({
              shape: new k.Rect(k.vec2(0, 0), 10, 10),
            }),
            k.anchor("center"),
            k.pos(),
            k.scale(scaleFactor),
            {
              hasBeenHit: false,
              isDead: false,
            },
            "slime",
          ])

          slimeInstance.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor,
            (map.pos.y + entity.y) * scaleFactor
          );
          k.add(slimeInstance);
          continue;
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
