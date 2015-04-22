window.onload = function(){
	initCreateStars();
	initSpaceship();
	initKeyEvents();
	rotateImage(app.pandora.ang);

	(function animationLoop(){
		loop();
		requestAnimationFrame(animationLoop,'#game');
	})();
};

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	function( callback ){
		window.setTimeout(callback, 1000 / 60);
	};
})();

function loop(){
	pandoraRotation();
}

function pandoraRotation(){
	// Уменшение скорости при ненажатых клавишах, ограничение скорости
	if(app.pandora.speed > 0.1 && !app.pandora.moving.move){
		app.pandora.speed -= 0.01;
	} else if(app.pandora.speed < 0.1 && !app.pandora.moving.move){
		app.pandora.speed += 0.01;
	} else if(app.pandora.speed >= 2){
		app.pandora.speed = 2;
	} else if(app.pandora.speed <= -2){
		app.pandora.speed = -2;
	}

	// Нажата клавиша влево
	if(app.pandora.moving.move && app.pandora.moving.right) {
		if (app.pandora.speed < 0.1){
			app.pandora.speed += 0.07;
		} else {
			app.pandora.speed += 0.02;
		}
		app.pandora.ang += app.pandora.speed;
	}
	// Нажата клавиша вправо
	if(app.pandora.moving.move && app.pandora.moving.left){
		if (app.pandora.speed > 0.1){
			app.pandora.speed -= 0.07;
		} else {
			app.pandora.speed -= 0.02;
		}

		app.pandora.ang += app.pandora.speed;
	}

	// Автоматическое доскроливание при отжатых клавишах
	if(!app.pandora.moving.move){
		app.pandora.ang += app.pandora.speed;
	}
	rotateImage(app.pandora.ang);
}

function rotateImage(angle){
	// regular rotation about point
	var myImage = new Image();
	var game = app.ctx('game');
	var ang = angle;

	var widthTexture = innerWidth;
	var heightTexture = innerHeight;

	myImage.onload = function() {
		game.clearRect(0,0,widthTexture,heightTexture);

		// regular rotation about a point
		var angle = ang * Math.PI / 180; // 124 degrees angle of rotation in radians
		var rx = innerWidth / 2, ry = innerHeight / 2; // the rotation x and y
		var dx = rx + (rx - 64) * Math.sin(angle); // the draw x
		var dy = ry - (ry - 64) * Math.cos(angle) ; // the draw y

		game.save();
		game.translate(dx, dy);
		game.rotate(angle);
		game.translate(-dx, -dy);
		game.drawImage(myImage, dx - myImage.width / 2, dy - myImage.height / 2);
		game.restore();
		app.pandora.x = dx;
		app.pandora.y = dy;
	};
	myImage.src = 'images/pandora.png';
}

function initSpaceship(){
	var game = app.ctx('game');
	var pandora = new Image();

	game.canvas.width = innerWidth;
	game.canvas.height = innerHeight;

	pandora.src = 'images/pandora.png';
}

function initCreateStars(){
	var texture = app.ctx('texture');
	var widthTexture = innerWidth;
	var heightTexture = innerHeight;

	texture.canvas.width = widthTexture;
	texture.canvas.height = heightTexture;

	createStars(500);
	function createStars(amount){
		for(var i = 0; i < amount; i++){
			app.circle(texture, app.rand(1,widthTexture),app.rand(1,heightTexture), app.rand(1,2), app.rand(200,255),app.rand(200,255),app.rand(200,255), 99);
		}
	}
}

function startFire(ctx, x1, y1, x2, y2){
	var x1 = x1;
	var x2 = x2;
	moveFire();
	function moveFire(){
		if(x2 > x1){
			if(x1 <= x2){
				app.pandora.x = app.pandora.x + 10;
				x1 = app.pandora.x;
				app.circle(ctx, app.pandora.x, y1, 4, 204, 0, 0, 99);
				moveFire();
			}
		}
		//app.circle(ctx, x1, y1, 4, 204, 0, 0, 99);
	}
}

function initKeyEvents(){
	var game = app.ctx('game');
	var texture = app.ctx('texture');

	document.onkeydown = function(e){
		var keyCode;
		if(window.event) {
			keyCode = window.event.keyCode;
		} else if(e){
			keyCode = e.which;
		}

		switch (keyCode){
			// turn pandora
			case 37:
				app.pandora.moving.left = false;
				app.pandora.moving.right = true;

				app.pandora.moving.move = true;
				break;
			// turn pandora
			case 39:
				app.pandora.moving.right = false;
				app.pandora.moving.left = true;

				app.pandora.moving.move = true;
				break;
			case 32:
				// fire

				var h = innerHeight;
				var width = innerWidth;
				var x1 = app.pandora.x;
				var y1 = app.pandora.y;
				var x2 = width - x1;
				var y2 = h - y1;

				//app.circle(texture, x1, y1, 4, 204, 0, 0, 99);
				//app.line(texture, x1, y1, x2, y2);
				startFire(texture, x1, y1, x2, y2);
				break;
		}
	};

	document.onkeyup = function(e){
		var keyCode;
		if (window.event) {
			keyCode = window.event.keyCode;
		} else if(e){
			keyCode = e.which;
		}

		switch (keyCode){
			// turn left stop
			case 37:
				app.pandora.moving.move = false;
				break;
			// turn right stop
			case 39:
				app.pandora.moving.move = false;
				break;
		}
	};
}
