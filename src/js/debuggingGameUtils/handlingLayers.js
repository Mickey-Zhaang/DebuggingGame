import { createBug } from "./createBug";

export function handleLayers(k, layers, player, map, scaleFactor) {
    //Handling Layers i.e spawnpoints, mob spawns, npc spawns
    for (const layer of layers) {
        //Handling Layer: collisions from startingMap.json
        if (layer.name === "collisions") {
        for (const boundary of layer.objects) {
            map.add([
            k.area({
                shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
            }),
            k.body({ isStatic: true }),
            k.pos(boundary.x, boundary.y),
            boundary.name,
            ]);
        }
        continue;
        }

        //Handling Layer: Spawnpoint from startingMap.json
        if (layer.name === "Spawnpoint") {
        for (const entity of layer.objects) {

            //Mob Spawn?
            if (entity.name.includes("mob")) {
            //creates an instance per spawnpoint found that is named MOB#
            
            const clickedBug = createBug(k, map, entity);
            
            k.add(clickedBug);
            continue;
            }

            if(entity.name === "NPC4") {
            const oldMan = k.make ([
                k.sprite("oldMan", {anim : "idle-down"}),
                k.area({
                shape: new k.Rect(k.vec2(0, 0), 10, 10),
                }),
                k.anchor("center"),
                k.pos(),
                k.scale(scaleFactor),
                {
                interactedComplete: false,
                },
                "oldMan",
            ])

            oldMan.pos = k.vec2(
                (map.pos.x + entity.x) * scaleFactor,
                (map.pos.y + entity.y) * scaleFactor
            );
            k.add(oldMan);
            
            }

            //Player Spawn
            if (entity.name === "spawnpoints") {
            player.pos = k.vec2(
                (map.pos.x + entity.x) * scaleFactor,
                (map.pos.y + entity.y) * scaleFactor
            );
            k.add(player);
            continue;
            }
        }
        }

        //Handling Layer: Foreground Layer
        if (layer.name === "Foreground objects") {
            layer.data.forEach((tileID, index) => {
                if (tileID === 0) return; // Skip empty tiles
                const tileWidth = 12;
                const tileHeight = 12;
            
                const x = ((index) % layer.width) * tileWidth; 
                const y = Math.floor((index) / layer.width) * tileHeight; 
                
                k.add([
                k.sprite("startingAssets", {frame: (tileID - 1)}),  //was tough, thanks 2-d arrays
                k.pos(x * scaleFactor, y * scaleFactor),
                k.z(5),
                k.scale(scaleFactor)
                ]);
            });
        }
    }
}