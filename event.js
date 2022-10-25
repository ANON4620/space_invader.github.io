let mouseFiring, touchFiring;

canvas.addEventListener("mousedown", (e) => {
	bullet.fire();
	mouseFiring = setInterval(bullet.fire, 300);
	e.preventDefault();
});
canvas.addEventListener("mousemove", player.moveWithMouse);
canvas.addEventListener("mouseup", () => {
	clearInterval(mouseFiring);
});

canvas.addEventListener("touchstart", (e) => {
	bullet.fire();
	touchFiring = setInterval(bullet.fire, 300);
	e.preventDefault();
});
canvas.addEventListener("touchmove", player.moveWithTouch);
canvas.addEventListener("touchend", () => {
	clearInterval(touchFiring);
});
