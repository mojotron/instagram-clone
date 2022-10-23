export const maxMove = currentZoom => {
  // 1 is original zoom value (min value), max zoom is 2 or increase of 100%
  if (currentZoom <= 1) return 0;
  if (currentZoom >= 2) return 50;
  const percentIncrease = ((currentZoom - 1) / 1) * 100;
  return parseFloat((percentIncrease / 2).toFixed(1));
};

// move element child element with mouse move event but not beyond parent
// boundaries, child element is bigger then parent element, parent element
// hides overflow with css. When child border touches parent border it
// stops execution.
export const calcReposition = (
  eventPosition,
  parentBoundingClientRect,
  moveStart,
  zoomLevel
) => {
  // if (!repositionActive) return;
  // console.log('moving');
  const parent = parentBoundingClientRect;
  // get last position of user mouse move
  const lastX = ((moveStart.x - parent.left) / parent.width) * 100;
  const lastY = ((moveStart.y - parent.top) / parent.width) * 100;
  // get current position
  const x = ((eventPosition.x - parent.left) / parent.width) * 100;
  const y = ((eventPosition.y - parent.top) / parent.height) * 100;
  // calculate current move(mouse walk)
  const moveX = lastX - x;
  const moveY = lastY - y;

  const newPosition = {};
  // use maxMove to stop child pass parent container
  const maxImageMove = maxMove(zoomLevel);

  if (Math.abs(moveX) >= maxImageMove) {
    if (moveX > 0) newPosition.x = maxImageMove;
    else newPosition.x = -maxImageMove;
  } else {
    newPosition.x = moveX;
  }

  if (Math.abs(moveY) >= maxImageMove) {
    if (moveY > 0) newPosition.y = maxImageMove;
    else newPosition.y = -maxImageMove;
  } else {
    newPosition.y = moveY;
  }
  return newPosition;
};
