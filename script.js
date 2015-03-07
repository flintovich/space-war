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
	pandoraRoration();
}

function pandoraRoration(){
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
	if(app.pandora.moving.move && app.pandora.moving.right){
		app.pandora.speed += 0.04;
		app.pandora.ang += app.pandora.speed;
	}
	// Нажата клавиша вправо
	if(app.pandora.moving.move && app.pandora.moving.left){
		app.pandora.speed -= 0.04;
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
		var px = 300, py = innerHeight - 64; // the objects center x and y
		var radius = ry - py; // the difference in y positions or the radius

		var dx = rx + (rx - 64) * Math.sin(angle); // the draw x
		var dy = ry - (ry - 64) * Math.cos(angle) ; // the draw y

		game.save();
		game.translate(dx, dy);
		game.rotate(angle);
		game.translate(-dx, -dy);
		game.drawImage(myImage, dx - myImage.width / 2, dy - myImage.height / 2);
		game.restore();
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

function initKeyEvents(){
	document.onkeydown = function(e){
		var keycode;
		if(window.event) {
			keycode = window.event.keyCode;
		} else if(e){
			keycode = e.which;
		}

		// car speed
		if(keycode == 38){
			//alert(1);
		} else if(keycode == 40){

		}
		// turn car
		if(keycode == 37){
			app.pandora.moving.left = false;
			app.pandora.moving.right = true;

			app.pandora.moving.move = true;
		}
		if(keycode == 39){
			app.pandora.moving.right = false;
			app.pandora.moving.left = true;

			app.pandora.moving.move = true;
		}
	};

	document.onkeyup = function(e){
		var keycode;
		if (window.event) {
			keycode = window.event.keyCode;
		} else if(e){
			keycode = e.which;
		}

		// speed up
		if(keycode == 38){
		}
		// speed down
		if(keycode == 40){
		}
		// turn left stop
		if(keycode == 37){
			app.pandora.moving.move = false;
		}
		// turn right stop
		if(keycode == 39){
			app.pandora.moving.move = false;
		}
	};
}
