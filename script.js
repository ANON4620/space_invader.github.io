const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const bg = document.getElementById("background");
const player_sprite = document.getElementById("player-sprite");
const bullet_sprite = document.getElementById("bullet-sprite");
const enemy_sprite = document.getElementById("enemy-sprite");

canvas.width = window.innerWidth - 4;
canvas.height = window.innerHeight - 4;

const background = {
	x: 0,
	y: 0,
	width: canvas.width,
	height: canvas.height,

	draw() {
		ctx.drawImage(bg, background.x, background.y, canvas.width, canvas.height);
		ctx.drawImage(bg, background.x, background.y - background.height, background.width, background.height);
	},

	slide() {
		if(background.y >= canvas.height) {
			background.y = 0;
		}
		else {
			background.y += 0.5;
		}
	}
};

const player = {
	x: canvas.width / 2,
	y: null,
	width: 60,
	height: 60,

	draw() {
		ctx.drawImage(player_sprite, player.x, player.y, player.width, player.height);
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
	width: 30,
	height: player.height,

	draw() {
		for(let i = 0; i < bullet.arr.length; i++) {
			ctx.drawImage(bullet_sprite, bullet.arr[i].x, bullet.arr[i].y, bullet.width, bullet.height);
		}
	},

	fire() {
		bullet.arr.push({x: player.x + (player.width / 2 - bullet.width / 2), y: player.y});
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
		if(bulletIndex <= bullet.arr.length / 2) {
	    		for(let i = bulletIndex; i > 0; i--) {
	      			bullet.arr[i] = bullet.arr[i - 1];
	    		}
			
	    		bullet.arr.shift();
	  	}
	  	else {
		  	for(let i = bulletIndex; i < bullet.arr.length - 1; i++) {
			  	bullet.arr[i] = bullet.arr[i + 1];
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
	costume: {
		x: [0, 467, 934],
		y: [0, 311, 622],
		width: 467,
		height: 311
	},

	draw() {
		for(let i = 0; i < enemy.arr.length; i++) {
			ctx.drawImage(enemy_sprite, enemy.arr[i].src_x, enemy.arr[i].src_y, enemy.costume.width, enemy.costume.height, enemy.arr[i].x, enemy.arr[i].y, enemy.width, enemy.height);
		}
	},

	create() {
		enemy.arr.push({
			src_x: enemy.costume.x[parseInt(Math.random() * 3)],
			src_y: enemy.costume.y[parseInt(Math.random() * 3)],
			x: randomRange(0, canvas.width - enemy.width),
			y: -enemy.height
		});

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
		if(enemyIndex <= enemy.arr.length / 2) {
	    		for(let i = enemyIndex; i > 0; i--) {
	      			enemy.arr[i] = enemy.arr[i - 1];
	    		}
	    
	    		enemy.arr.shift();
	  	}
	  	else {
			for(let i = enemyIndex; i < enemy.arr.length - 1; i++) {
				enemy.arr[i] = enemy.arr[i + 1];
			}

			enemy.arr.pop();
	  	}
	}
};

const game = {
	draw() {
		background.draw();
		bullet.draw();
		player.draw();
		enemy.draw();
	}
};

function randomRange(min, max) {
	return Math.random() * (max - min + 1) + min;
}

function main() {
	game.draw();

	enemy.move();
	bullet.move();
	background.slide();

	for(let i = 0; i < bullet.arr.length; i++) {
		for(let j = 0; j < enemy.arr.length; j++) {
			if(bullet.touchesEnemy(i, j)) {
				bullet.delete(i);
				enemy.delete(j);
				i--;
				break;
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
