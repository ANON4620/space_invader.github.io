const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const game = {
	clearCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
};

const player = {
	x: canvas.width / 2,
	y: null,
	width: 30,
	height: 30,

	draw() {
		ctx.fillRect(player.x, player.y, player.width, player.height);
	},

	moveWithMouse(e) {
		player.x = e.clientX - (player.width / 2);
	},

	moveWithTouch(e) {
		player.x = e.touches[0].clientX - (player.width / 2);
	}
};

const bullet = {
	x: [],
	y: [],
	width: 10,
	height: player.height,

	draw() {
		for(let i = 0; i < bullet.y.length; i++) {
			ctx.fillRect(bullet.x[i], bullet.y[i], bullet.width, bullet.height);
		}
	},

	fire() {
		bullet.x.push(player.x + bullet.width);
		bullet.y.push(player.y - bullet.height);
	},

	move() {
		// if no more bullets in array then exit function
		if(bullet.y.length === 0) {
			return;
		}

		for(let i = 0; i < bullet.y.length; i++) {
			bullet.y[i] -= 10;
		}

		if((bullet.y[0] + bullet.height) <= 0) {
			bullet.delete();
		}
	},

	delete() {
		// if no more bullets in array then exit function
		if(bullet.y.length === 0) {
			return;
		}

		bullet.x.shift();
		bullet.y.shift();
	}
};

const enemy = {
	x: [],
	y: [],
	width: player.width,
	height: player.height,

	draw() {
		for(let i = 0; i < enemy.y.length; i++) {
			ctx.fillRect(enemy.x[i], enemy.y[i], enemy.width, enemy.height);
		}
	},

	create() {
		enemy.x.push(randomRange(0, canvas.width - enemy.width));
		enemy.y.push(-enemy.height);

		setTimeout(() => {
			requestAnimationFrame(enemy.create);
		}, 3000);
	},

	move() {
		// if no more enemies left in array then exit function
		if(enemy.y.length === 0) {
			return;
		}

		for(let i = 0; i < enemy.x.length; i++) {
			enemy.y[i]++;
		}

		if(enemy.y[0] >= canvas.height) {
			enemy.delete();
		}
	},

	delete() {
		// if no more enemies left in array then exit function
		if(enemy.y.length === 0) {
			return;
		}

		enemy.x.shift();
		enemy.y.shift();
	}
};

function randomRange(min, max) {
	return Math.random() * (max - min + 1) + min;
}

function main() {
	game.clearCanvas();

	player.draw();
	bullet.draw();
	enemy.draw();

	enemy.move();
	bullet.move();

	setTimeout(() => {
		requestAnimationFrame(main);
	}, 10);
}



player.y = canvas.height - (player.height + 10);
requestAnimationFrame(enemy.create);
requestAnimationFrame(main);