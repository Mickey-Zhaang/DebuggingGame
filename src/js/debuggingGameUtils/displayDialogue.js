export function displayDialogue(who, onDisplayEnd) {
    const dialogueUI = document.getElementById("bug-textbox-container");
    const dialogue = document.getElementById("dialogue");
    const closeBtn = document.getElementById("close");
    const fightBtn = document.getElementById("fight");
  
    dialogueUI.style.display = "block";
  
    function onFightBtnClick() {
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
    //******* Functions for Event Listeners ******* 

    if (who === "bug") {
      dialogue.innerHTML = "Do you want to fight the bug?";
      fightBtn.style.display = "block"; 
      closeBtn.style.display = "block";
      //logic for clicking fight button
      
    
      //Adding Desired Event Listeners
      fightBtn.addEventListener("click", onFightBtnClick);
      closeBtn.addEventListener("click", onCloseBtnClick);
    } else if (who == "oldMan") {
      const dialogueLines = [ //haven't found a way around not having two of the same first lines
        "Hello there!",
        "Hello there!",
        "I haven't seen you around these parts before.",
        "Be careful, this place is dangerous.",
      ];
    
      let dialogueIndex = 0; 
    
      function showNextDialogue() {
        if (dialogueIndex < dialogueLines.length) {
          dialogue.innerHTML = dialogueLines[dialogueIndex]; 
          dialogueIndex++; 
        } else {
          onDisplayEnd();
          dialogueUI.style.display = "none";
          dialogue.innerHTML = ""; 
          document.removeEventListener("click", showNextDialogue); 
          }
        }
      
        // Initialize first dialogue line
        dialogue.innerHTML = dialogueLines[dialogueIndex];
        dialogueIndex++; 
      
        fightBtn.style.display = "none"; 
        closeBtn.style.display = "none";
      
        // Attach click event to progress dialogue
        document.addEventListener("click", showNextDialogue);
      }
    
  
  }