console.log("utils.js is loaded!")

export function displayDialogue(onDisplayEnd) {
  const dialogueUI = document.getElementById("textbox-container");
  const dialogue = document.getElementById("dialogue");
  const closeBtn = document.getElementById("close");
  const fightBtn = document.getElementById("fight");

  dialogueUI.style.display = "block";
  dialogue.innerHTML = "Do you want to fight the bug?";

  //logic for clicking fight button
  function onFightBtnClick() {
    console.log("hello")
    fightBtn.removeEventListener("click", onFightBtnClick)
  }
  fightBtn.addEventListener("click", onFightBtnClick);

  //logic for clicking close button
  function onCloseBtnClick() {
    onDisplayEnd();
    dialogueUI.style.display = "none"; //hides the html
    dialogue.innerHTML = "!"; //does nothing?
    closeBtn.removeEventListener("click", onCloseBtnClick);
  }
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
