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
	xDown = event.touches[0].clientX;
	bullet.fire();
	touchFiring = setInterval(bullet.fire, 250);
	event.preventDefault();
});
canvas.addEventListener("touchmove", event => {
	const xUp = event.touches[0].clientX;
	const xDiff = xDown - xUp;

	if(xDiff > 4 || xDiff < -4) {
		player.x = event.touches[0].clientX - (player.width / 2);
		player.restrictCanvas();
	}

	event.preventDefault();
});
canvas.addEventListener("touchend", event => {
	clearInterval(touchFiring);
	event.preventDefault();
});
