let mouseFiring, touchFiring;
let xDown;

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
	xDown = event.clientX;
	bullet.fire();
	touchFiring = setInterval(bullet.fire, 250);
	event.preventDefault();
});
canvas.addEventListener("touchmove", event => {
	const xUp = event.clientX;
	const xDiff = xDown - xUp;

	if(!xDiff) {
		player.x = event.touches[0].clientX - (player.width / 2);
		player.restrictCanvas();
	}

	event.preventDefault();
});
canvas.addEventListener("touchend", event => {
	clearInterval(touchFiring);
	event.preventDefault();
});
