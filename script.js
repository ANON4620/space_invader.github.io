const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const bg = document.getElementById("background");
const player_sprite = document.getElementById("player-sprite");
const bullet_sprite = document.getElementById("bullet-sprite");
const enemy_sprite = document.getElementById("enemy-spritesheet");
const spark_sprite = document.getElementById("spark-spritesheet");

canvas.width = window.innerWidth - 2;
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

	move() {
		if(background.y >= canvas.height) {
			background.y = 0;
		}
		else {
			background.y += 0.5;
		}
	}
};

const player = {
	x: null,
	y: null,
	width: 50,
	height: 40,

	draw() {
		ctx.drawImage(player_sprite, player.x, player.y, player.width, player.height);
	},

	restrictPlayArea() {
		if(player.x < 0) {
			player.x = 0;
		}

		if((player.x + player.width) > canvas.width) {
			player.x = canvas.width - player.width;
		}
	}
};

const bullet = {
	arr: [],
	width: 10,
	height: (player.height / 2) + 10,
	speed: 10,
	creation_delay: 250,
	spark: {
		src_x: [0, 230, 495],
		src_y: 0,
		src_width: 200,
		src_height: 200,
		width: 30,
		height: 30
	},

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
			bullet.arr[i].y -= bullet.speed;
		}

		if((bullet.arr[0].y + bullet.height) < 0) {
			bullet.delete(0);
		}
	},

	hitSpark(bulletIndex) {
		ctx.drawImage(spark_sprite, bullet.spark.src_x[parseInt(Math.random() * bullet.spark.src_x.length)], bullet.spark.src_y, bullet.spark.src_width, bullet.spark.src_height, bullet.arr[bulletIndex].x - 7, bullet.arr[bulletIndex].y - (bullet.spark.height / 2), bullet.spark.width, bullet.spark.height);
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
	width: 60,
	height: 50,
	creation_delay: 1000,
	costume: {
		src_x: [15, 460, 900, 1330, 1830],
		src_y: [0, 380, 785, 1185],
		src_width: 450,
		src_height: 360
	},

	draw() {
		for(let i = 0; i < enemy.arr.length; i++) {
			ctx.drawImage(enemy_sprite, enemy.arr[i].src_x, enemy.arr[i].src_y, enemy.costume.src_width, enemy.costume.src_height, enemy.arr[i].x, enemy.arr[i].y, enemy.width, enemy.height);
		}
	},

	create() {
		enemy.arr.push({
			src_x: enemy.costume.src_x[parseInt(Math.random() * enemy.costume.src_x.length)],
			src_y: enemy.costume.src_y[parseInt(Math.random() * enemy.costume.src_y.length)],
			x: randomRange(0, canvas.width - enemy.width),
			y: -enemy.height,
			speed: randomRange(1, 2)
		});

		if(game.stop)
			return;

		setTimeout(() => {
			requestAnimationFrame(enemy.create);
		}, enemy.creation_delay);
	},

	move() {
		// if no more enemies left in array then exit function
		if(enemy.arr.length === 0) {
			return;
		}

		for(let i = 0; i < enemy.arr.length; i++) {
			enemy.arr[i].y += enemy.arr[i].speed;
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
	stop: false,

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
	background.move();

	for(let i = 0; i < bullet.arr.length; i++) {
		for(let j = 0; j < enemy.arr.length; j++) {
			if(bullet.touchesEnemy(i, j)) {
				bullet.hitSpark(i);
				bullet.delete(i);
				enemy.delete(j);
				i--;
				break;
			}
		}
	}

	if(game.stop)
		return;

	requestAnimationFrame(main);
}


player.x = (canvas.width / 2) - (player.width / 2);
player.y = canvas.height - (player.height + 30);
enemy.create();
main();
