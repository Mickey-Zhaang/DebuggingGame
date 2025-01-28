import { interactionRange } from "./constants";
import { displayDialogue } from "./displayDialogue";

export function playerInteractingWith(k, clicked, player, sound) {
    if(clicked) {
        const distance = player.pos.dist(clicked.pos);
        if(distance > interactionRange) {
          return;
        }
  
        player.isInDialogue = true;
  
        if(!clicked.hasInteracted) {
            clicked.hasInteracted = true;

            k.play(sound, {
                volume: 0.6,
                speed: 1.2,
            });

            displayDialogue(()=> {
                player.isInDialogue = false;
                clicked.hasInteracted = false;
            });
        }
      }
}