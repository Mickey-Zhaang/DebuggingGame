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