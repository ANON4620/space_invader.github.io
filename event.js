let mouseFiring, touchFiring;

canvas.addEventListener("mousedown", () => {
	mouseFiring = setInterval(bullet.fire, 150);
});
canvas.addEventListener("mousemove", player.moveWithMouse);
canvas.addEventListener("mouseup", () => {
	clearInterval(mouseFiring);
});

canvas.addEventListener("touchstart", () => {
	touchFiring = setInterval(bullet.fire, 150);
});
canvas.addEventListener("touchmove", player.moveWithTouch);
canvas.addEventListener("touchend", () => {
	clearInterval(touchFiring);
});
