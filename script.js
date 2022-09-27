const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const game = {
	clear() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	},

	draw() {
		player.draw();
		bullet.draw();
		enemy.draw();
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

	restrictCanvas() {
		if(player.x < 0) {
			player.x = 0;
		}

		if((player.x + player.width) > canvas.width) {
			player.x = canvas.width - player.width;
		}
	},

	moveWithMouse(e) {
		player.x = e.clientX - (player.width / 2);
		player.restrictCanvas();
	},

	moveWithTouch(e) {
		player.x = e.touches[0].clientX - (player.width / 2);
		player.restrictCanvas();
	}
};

const bullet = {
	arr: [],
	width: 10,
	height: player.height,

	draw() {
		for(let i = 0; i < bullet.arr.length; i++) {
			ctx.fillRect(bullet.arr[i].x, bullet.arr[i].y, bullet.width, bullet.height);
		}
	},

	fire() {
		bullet.arr.push({x: player.x + bullet.width, y: player.y});
	},

	move() {
		// if no more bullets in array then exit function
		if(bullet.arr.length === 0) {
			return;
		}

		for(let i = 0; i < bullet.arr.length; i++) {
			bullet.arr[i].y -= 10;
		}

		if((bullet.arr[0].y + bullet.height) < 0) {
			bullet.delete(0);
		}
	},

	delete(bulletIndex) {
		if(bulletIndex === 0) {
			bullet.arr.shift();
		}
		else {
			for(let i = bulletIndex; i < bullet.arr.length - 1; i++) {
				bullet.arr[i].x = bullet.arr[i + 1].x;
				bullet.arr[i].y = bullet.arr[i + 1].y;
			}

			bullet.arr.pop();
		}
	},

	touchesEnemy(bulletIndex, enemyIndex) {
		if( (bullet.arr[bulletIndex].y <= (enemy.arr[enemyIndex].y + enemy.height)) && ((enemy.arr[enemyIndex].y + enemy.height) < player.y) ) {
			if( (bullet.arr[bulletIndex].x <= (enemy.arr[enemyIndex].x + enemy.width)) && ((bullet.arr[bulletIndex].x + bullet.width) >= enemy.arr[enemyIndex].x) ) {
				return true;
			}
		}

		return false;
	}
};

const enemy = {
	arr: [],
	width: player.width,
	height: player.height,

	draw() {
		for(let i = 0; i < enemy.arr.length; i++) {
			ctx.fillRect(enemy.arr[i].x, enemy.arr[i].y, enemy.width, enemy.height);
		}
	},

	create() {
		enemy.arr.push({x: randomRange(0, canvas.width - enemy.width), y: -enemy.height});

		setTimeout(() => {
			requestAnimationFrame(enemy.create);
		}, 3000);
	},

	move() {
		// if no more enemies left in array then exit function
		if(enemy.arr.length === 0) {
			return;
		}

		for(let i = 0; i < enemy.arr.length; i++) {
			enemy.arr[i].y++;
		}

		if(enemy.arr[0].y > canvas.height) {
			enemy.delete(0);
		}
	},

	delete(enemyIndex) {
		if(enemyIndex === 0) {
			enemy.arr.shift();
		}
		else {
			for(let i = enemyIndex; i < enemy.arr.length - 1; i++) {
				enemy.arr[i].x = enemy.arr[i + 1].x;
				enemy.arr[i].y = enemy.arr[i + 1].y;
			}

			enemy.arr.pop();
		}
	}
};

function randomRange(min, max) {
	return Math.random() * (max - min + 1) + min;
}

function main() {
	game.clear();
	game.draw();

	enemy.move();
	bullet.move();

	for(let i = 0; i < bullet.arr.length; i++) {
		for(let j = 0; j < enemy.arr.length; j++) {
			if(bullet.touchesEnemy(i, j))
			{
				bullet.delete(i);
				enemy.delete(j);
			}
		}
	}

	setTimeout(() => {
		requestAnimationFrame(main);
	}, 10);
}



player.y = canvas.height - (player.height + 10);
requestAnimationFrame(enemy.create);
requestAnimationFrame(main);