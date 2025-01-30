
export function displayDialogue(who, onDisplayEnd, fightBtnClicked) {
    const dialogueUI = document.getElementById("textbox-container");
    const dialogue = document.getElementById("dialogue");
    const closeBtn = document.getElementById("close");
    const fightBtn = document.getElementById("fight");
    const fightScene = document.getElementById("fight-scene-wrapper")
  
    dialogueUI.style.display = "block";
  
    //******* GLOBAL FUNCTIONS *******
    function onFightBtnClick() {
      fightBtnClicked();
      onDisplayEnd();
      dialogueUI.style.display = "none"; //hides dialogue box
      dialogue.innerHTML = "!"; //sets the html to nothing
      fightScene.style.display = "flex"; //pulls up fight scene
      fightBtn.removeEventListener("click", onFightBtnClick);
    }
  
  
    //logic for clicking close button
    function onCloseBtnClick() { 
      onDisplayEnd();
      dialogueUI.style.display = "none"; 
      dialogue.innerHTML = "!";
      closeBtn.removeEventListener("click", onCloseBtnClick);
    }

    //******* End GLOBAL FUNCTIONS *******

    //******* Conditionals for Event Listeners ******* 

    if (who === "bug") {
      
      dialogue.innerHTML = "Do you want to fight the bug?";
      fightBtn.style.display = "block"; 
      closeBtn.style.display = "block";
      //logic for clicking fight button
      
    
      //Adding Desired Event Listeners
      fightBtn.addEventListener("click", onFightBtnClick);
      closeBtn.addEventListener("click", onCloseBtnClick);
    } else if (who == "oldMan") {
     
      const dialogueLines = [ 
        "Hello there!",
        "I haven't seen you around these parts before.",
        "Be careful, this place is dangerous.",
      ];
    
      let dialogueIndex = 0; 
    
      function showNextDialogue() {
        if (dialogueIndex < dialogueLines.length) {
          dialogue.innerHTML = dialogueLines[dialogueIndex]; 
        } else {
          onDisplayEnd();
          dialogueUI.style.display = "none";
          dialogue.innerHTML = ""; 
          document.removeEventListener("click", showNextDialogue); 
          return;
         }
          dialogueIndex++; 
        }
        dialogue.innerHTML = dialogueLines[dialogueIndex];
        fightBtn.style.display = "none"; 
        closeBtn.style.display = "none";
        // Attach click event to progress dialogue
        document.addEventListener("click", showNextDialogue);
      }
    
    //******* END Conditionals for Event Listeners ******* 
      
  }