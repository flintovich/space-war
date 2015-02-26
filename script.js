window.onload = function(){
	initCreateStars();
	initSpaceship();
	initKeyEvents();
	rotateImage(gameApp.ang);


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
	var game = gameApp.ctx('game');

	if(gameApp.moving.right){
		gameApp.ang = gameApp.ang + 1;
		rotateImage(gameApp.ang);
	}
	if(gameApp.moving.left){
		gameApp.ang = gameApp.ang - 1;
		rotateImage(gameApp.ang);
	}
}

function rotateImage(angle){
	// regular rotation about point
	var myImage = new Image();
	var game = gameApp.ctx('game');
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
	var game = gameApp.ctx('game');
	var widthTexture = innerWidth;
	var heightTexture = innerHeight;

	game.canvas.width = widthTexture;
	game.canvas.height = heightTexture;

	var redCar = new Image();
	redCar.src = 'images/pandora.png';

	redCar.onload = function(){
		//game.rotate(20*Math.PI/180);
		//game.drawImage(redCar, widthTexture / 2 - redCar.width / 2, heightTexture - 150);
	}

}

function initCreateStars(){
	var texture = gameApp.ctx('texture');
	var widthTexture = innerWidth;
	var heightTexture = innerHeight;

	texture.canvas.width = widthTexture;
	texture.canvas.height = heightTexture;


	createStars(500);
	function createStars(amount){
		for(var i = 0; i < amount; i++){
			gameApp.circle(texture, gameApp.rand(1,widthTexture),gameApp.rand(1,heightTexture), gameApp.rand(1,2), gameApp.rand(200,255),gameApp.rand(200,255),gameApp.rand(200,255), 99);
		}
	}
}

function initKeyEvents(){
	var game = gameApp.ctx('game');

	// keyboard ---------------------
	document.onkeydown = function (e) {
		var keycode;
		if (window.event) {
			keycode = window.event.keyCode;
		} else if (e) {
			keycode = e.which;
		}

		// car speed
		if(keycode == 38){
			//alert(1);
		} else if(keycode == 40){

		}
		// turn car
		if(keycode == 37){
			gameApp.moving.right = true;
		}
		if(keycode == 39){
			gameApp.moving.left = true;
		}
	};

	document.onkeyup = function (e) {
		var keycode;
		if (window.event) {
			keycode = window.event.keyCode;
		} else if (e){
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
			gameApp.moving.right = false;
		}
		// turn right stop
		if(keycode == 39){
			gameApp.moving.left = false;
		}
	};
}
