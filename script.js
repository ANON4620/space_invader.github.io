const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

const game = {
	loop() {
		for(let i = 0; i < bullet.y.length; i++) {
			ctx.clearRect(bullet.x[i], bullet.y[i], bullet.width, bullet.height);
			bullet.y[i] -= 10;
			ctx.fillRect(bullet.x[i], bullet.y[i], bullet.width, bullet.height);
		}
		if(bullet.y[0] < 0) {
			ctx.clearRect(bullet.x[0], bullet.y[0], bullet.width, bullet.height);
			bullet.x.shift();
			bullet.y.shift();
		}
		if(bullet.y.length === 0) {
			return;
		}

		setTimeout(() => {
			requestAnimationFrame(game.loop);
		}, 10);
	}
};

const player = {
	x: canvas.width / 2,
	y: canvas.height - 40,
	width: 30,
	height: 30,

	move(e) {
		ctx.clearRect(player.x, player.y, canvas.width, canvas.height);

		player.x = e.clientX;
		if(player.x <= 0 || (player.x + player.width) >= canvas.width)
			return;
		
		ctx.fillRect(player.x, player.y, player.width, player.height);
	}
};

const bullet = {
	x: [],
	y: [],
	width: 10,
	height: player.height,

	fire() {
		bullet.x.push(player.x + bullet.width);
		bullet.y.push(player.y - player.height);
		if(bullet.y.length === 1) {
			requestAnimationFrame(game.loop);
		}
	}
};

let firing;

canvas.addEventListener("mousemove", player.move);
canvas.addEventListener("mousedown", () => {
	bullet.fire();
	firing = setInterval(bullet.fire, 100);
});
canvas.addEventListener("mouseup", () => {
	clearInterval(firing);
});

ctx.fillRect(player.x, player.y, player.width, player.height);