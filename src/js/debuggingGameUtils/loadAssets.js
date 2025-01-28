export function loadAssets (k) {
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
  
    k.loadSprite("oldMan", "../oldManSprite.png", {
      sliceX: 5,
      sliceY: 2,
      anims: {
        "idle-down": {from: 1, to: 4, loop: true, speed: 3},
      }
    });
  
    k.loadSprite("beetles", "../beetles.png", {
      sliceX: 4,
      sliceY: 4,
      anims: {
        "idle-down": {from: 1, to: 3, loop: true, speed: 3},
      }
    })
    
    k.loadSprite("map", "../startMap.png");

    //sounds
    k.loadSound("bugSquashed", "../bugSquashed.wav")
  }