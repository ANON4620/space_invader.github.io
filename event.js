let mouseFiring, touchFiring;

canvas.addEventListener("mousedown", event => {
	bullet.fire();
	mouseFiring = setInterval(bullet.fire, 250);
	event.preventDefault();
});
canvas.addEventListener("mousemove", event => {
	player.x = event.clientX - (player.width / 2);
	player.restrictCanvas();
	event.preventDefault();
});
canvas.addEventListener("mouseup", event => {
	clearInterval(mouseFiring);
	event.preventDefault();
});

canvas.addEventListener("touchstart", event => {
	bullet.fire();
	touchFiring = setInterval(bullet.fire, 250);
	event.preventDefault();
});
canvas.addEventListener("touchmove", event => {
	player.x = event.touches[0].clientX - (player.width / 2);
	player.restrictCanvas();
	event.preventDefault();
});
canvas.addEventListener("touchend", event => {
	clearInterval(touchFiring);
	event.preventDefault();
});
