import * as debuggingGameUtils from "./debuggingGameUtils";
const { scaleFactor, handleLayers, k, settingUpCameraMovement, mouseMovement, createPlayer, loadAssets, playerInteractingWith } = debuggingGameUtils;


//Makes the note disappear after 10 sec
const note = document.getElementById("note");
const timer = 10000; // sets a timer for 10 sec
setTimeout(() => {
  note.style.display = "none";
}, timer);

loadAssets(k);

//**************** HOME SCENE ****************
k.scene("main", async () => {

  const mapData = await (await fetch("../startMap.json")).json();
  const layers = mapData.layers;
  const player = createPlayer(k);
  const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor), ]);

  //Handles layers creation and spawn
  handleLayers(k, layers, player, map, scaleFactor);

  //Handles Clicking Logic
  k.onClick(() => {
    const clickedBug = k.get("bug").find((bug) => bug.isHovering());
    const clickedOldMan = k.get("oldMan").find((oldMan) => oldMan.isHovering());

    playerInteractingWith(k, clickedBug, player, "bugSquashed", "bug", () => {
      console.log("Hello")
    });
    playerInteractingWith(k, clickedOldMan, player, "oldManGrumbling", "oldMan");
  })
//**************** END HOME SCENE ****************

  //Camera resizing and movement with player (I'll leave these seperate)
  settingUpCameraMovement(k, player);

  //Movement controls (Modularized)
  k.onMouseDown((mouseBtn) => mouseMovement(k, player, mouseBtn));
});

k.go("main");
