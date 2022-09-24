let firing;

canvas.addEventListener("mousedown", () => {
	bullet.fire();
	firing = setInterval(bullet.fire, 150);
});
canvas.addEventListener("mousemove", player.moveWithMouse);
canvas.addEventListener("mouseup", () => {
	clearInterval(firing);
});

canvas.addEventListener("touchstart", () => {
	bullet.fire();
	firing = setInterval(bullet.fire, 150);
});
canvas.addEventListener("touchmove", player.moveWithTouch);
canvas.addEventListener("touchend", () => {
	clearInterval(firing);
});
