var app = {
	ctx : function(elem){
		var canvas = document.getElementById(elem);
		return canvas.getContext('2d');
	},
	rand : function(min, max){
		min = parseInt(min);
		max = parseInt(max);
		return Math.floor( Math.random() * (max - min + 1)) + min;
	},
	addText : function(ctx,text,x,y,size){
		ctx.font = size+'px Verdana';
		ctx.fillStyle = "#eee";
		ctx.fillText(text,x,y, 150);
		ctx.textAlign = "left";
		ctx.textBaseline = "bottom";
	},
	// create circle
	circle: function(ctx, x, y, radius, r, g, b, transparent){
		ctx.beginPath();
		ctx.fillStyle = 'rgba('+r+', '+g+', '+b+', .'+transparent+')';
		ctx.arc(x, y, radius, 0, Math.PI*2, true);
		ctx.shadowColor = '#CB00FF';
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 7;
		ctx.closePath();
		ctx.fill();
	},
	// create circle line
	circleLine: function(ctx, x, y, radius, r, g, b, transparent){
		ctx.beginPath();
		ctx.strokeStyle = '#fff';
		ctx.arc(x, y, radius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.stroke();
	},
	sprite : function(){
		var sprite = new Image();
		sprite.src = 'images/sprite.png';
		return sprite;
	},
	// Pandora
	pandora: {
		ang : 0,
		speed: 0.5,
		moving: {
			move: false,
			left: false,
			right: true
		}
	}
};