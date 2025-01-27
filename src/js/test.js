import { saveGameState } from "./utils";

let fightScenes = { //Let's just put all the prompts in here
  1: ["Prompt 1", "Answer 1"],
  2: ["Prompt 2", "Answer 2"],
  3: ["Prompt 3", "Answer 3"],
  4: ["Prompt 4", "Answer 4"],
  5: ["Prompt 5", "Answer 5"],
}

function getRandomFightScene() {
  const maxScenes = Object.keys(fightScenes).length;

  if(maxScenes === 0) {
    return "You've Defeated Everything!";
  }

  const randomkey = Math.floor(Math.random() * maxScenes) + 1;
  const fightSceneText = fightScenes[randomkey]; //returns an array of 2 elements: prompt # and answer #
  delete fightScenes[randomkey];
  return fightSceneText;
}

let fightSceneText = getRandomFightScene();
const testingTestElement = document.getElementById("testingStuff");

testingTestElement.textContent = fightSceneText;