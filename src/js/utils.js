import {debug} from "./constants";

if (debug) console.log("utils.js is loaded!")

export function displayDialogue(onDisplayEnd) {
  const dialogueUI = document.getElementById("textbox-container");
  const dialogue = document.getElementById("dialogue");
  const closeBtn = document.getElementById("close");
  const fightBtn = document.getElementById("fight");

  dialogueUI.style.display = "block";
  dialogue.innerHTML = "Do you want to fight the bug?";


  //******* Functions for Event Listeners ******* 

  //logic for clicking fight button
  function onFightBtnClick() {
    if (debug) console.log("Ran onFightBtnClick()")
    //Starting new Feature Here
    fightBtn.removeEventListener("click", onFightBtnClick);
    window.location.href = "../templates/test.html";
  }


  //logic for clicking close button
  function onCloseBtnClick() { //Here, after exiting the fight, I probably got to call this as to simulate 
    onDisplayEnd();
    dialogueUI.style.display = "none"; //hides the html
    dialogue.innerHTML = "!"; //does nothing?
    closeBtn.removeEventListener("click", onCloseBtnClick);
  }

  //Adding Desired Event Listeners
  fightBtn.addEventListener("click", onFightBtnClick);
  closeBtn.addEventListener("click", onCloseBtnClick);

}

export function setCamScale(k) {
  const resizeFactor = k.width() / k.height();
  if (resizeFactor < 1) {
    k.camScale(k.vec2(1));
  } else {
    k.camScale(k.vec2(1.5));
  }
}

//START Haven't tested yet
export function saveGameState(k, player) {
  const gameState = {
    player: {
      pos: { x: player.pos.x, y: player.pos.y },
      health: player.health,
    },
    slimes: k.get("slime").map(slime => ({
      pos: { x: slime.pos.x, y: slime.pos.y },
      isDead: slime.isDead || false,
      hasBeenHit: slime.hasBeenHit || false,
    })),
  };

  // Save the game state in sessionStorage
  sessionStorage.setItem("gameState", JSON.stringify(gameState));
  console.log("Game state saved:", gameState);
}

export function restoreGameState() {
  const savedState = sessionStorage.getItem("gameState");
  if (!savedState) {
    console.log("No saved game state found.");
    return;
  }

  const gameState = JSON.parse(savedState);

  // Restore player state
  player.pos = k.vec2(gameState.player.pos.x, gameState.player.pos.y);
  player.health = gameState.player.health;

  console.log("Restored player state:", player);

  // Restore slimes
  const slimes = gameState.slimes;
  slimes.forEach(state => {
    if (state.isDead) {
      return; // Skip adding dead slimes
    }

    const slimeInstance = k.add([
      k.sprite("spritesheet", { anim: "slime-walk-down" }),
      k.area(),
      k.pos(state.pos.x, state.pos.y),
      k.anchor("center"),
      k.scale(scaleFactor),
      {
        hasBeenHit: state.hasBeenHit,
        isDead: state.isDead,
      },
      "slime",
    ]);
    if (debug) console.log("Restored slime:", slimeInstance);
  });
}

//END Haven't tested yet

export function mouseMovement(k, player, mouseBtn) {
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

    //Stopping Animation
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
    k.onMouseRelease(stopAnims)
  
}