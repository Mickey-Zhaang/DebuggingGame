function setCamScale(k) {
    const resizeFactor = k.width() / k.height();
    if (resizeFactor < 1) {
      k.camScale(k.vec2(1));
    } else {
      k.camScale(k.vec2(1.5));
    }
  }

export function settingUpCameraMovement(k, player) {
    setCamScale(k);
    
      k.onResize(() => {
        setCamScale(k);
      });
    
      k.onUpdate(() => {
          k.camPos(player.pos.x, player.pos.y)
      });
}