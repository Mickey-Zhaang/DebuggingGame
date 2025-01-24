import { fightScenes } from "./constants";
//For Future Me: 
//Basically make sure Ming gets his code embedder page to actually work so I can integrate what I have here into that page.
//I removed all functionalities from the onFightBtnClick() so that it only directs us to an html page where I just run this script test.js to do all the random number mumbo jumbo

function getRandomFightScene() {
    const maxScenes = Object.keys(fightScenes).length
  
    if(maxScenes === 0) {
      return "You've defeated everything!";
    }
    const randomKey = Math.floor(Math.random() * maxScenes) + 1;
    const fightSceneText = fightScenes[randomKey];
    delete fightScenes[randomKey];
    return fightSceneText;
  }

let fightSceneText = getRandomFightScene();

const testingStuffElement = document.getElementById("testingStuff");

console.log(fightScenes);


testingStuffElement.textContent = fightSceneText;