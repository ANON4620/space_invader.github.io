let mouseFiring, touchFiring;
let xDown;

canvas.addEventListener("mousedown", event => {
	if(game.stop)
		return;

	bullet.fire();
	mouseFiring = setInterval(bullet.fire, bullet.creation_delay);
	event.preventDefault();
});
canvas.addEventListener("mousemove", event => {
	if(game.stop)
		return;

	player.x = event.clientX - (player.width / 2);
	player.restrictPlayArea();
	event.preventDefault();
});
canvas.addEventListener("mouseup", event => {
	if(game.stop)
		return;

	clearInterval(mouseFiring);
	event.preventDefault();
});

canvas.addEventListener("touchstart", event => {
	if(game.stop)
		return;

	xDown = event.touches[0].clientX;
	bullet.fire();
	touchFiring = setInterval(bullet.fire, bullet.creation_delay);
	event.preventDefault();
});
canvas.addEventListener("touchmove", event => {
	if(game.stop)
		return;

	const xUp = event.touches[0].clientX;
	const xDiff = xDown - xUp;

	if(xDiff > 4 || xDiff < -4) {
		player.x = event.touches[0].clientX - (player.width / 2);
		player.restrictPlayArea();
	}

	event.preventDefault();
});
canvas.addEventListener("touchend", event => {
	if(game.stop)
		return;

	clearInterval(touchFiring);
	event.preventDefault();
});
