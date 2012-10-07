jQuery(i18n(function($, that){
	
	that.init();

	that.on('change', function(){
		that.update('.i18n', 'i18n');
	});

	$.get('pictures.json', function(data){
		var picwall = new PicWall($('#foxmosa-gallery'), data),
		timer;
	
		function autoChange(){
			picwall.change();
			setTimeout(autoChange, 5000);
		};

		autoChange();

	});

	(function(baseurl){
		var canvas = $("#foxmosa-run")[0],
		ctx = canvas.getContext("2d"),
		x = 215, y = 0, speed = 50, index = 0, len = 20,
		images = [], timer;

		function preload(){
			var counter = 1;
			for(var i = 0; i < len; i++){
				var img = $('<img>').attr('src', baseurl + (i + 1) + '.png').on('load', function(){
					if(len === counter){
						complete();
					}
					counter++;
				}).error(function(){
					alert('圖片預載失敗');
				});

				images.push(img[0]);
			}
		};

		function complete(){
			timer = setInterval(update, speed);
		};

		function update(){
			ctx.clearRect( 0, 0, canvas.width, canvas.height);
			//console.log(images[index].src);
			ctx.drawImage(images[index], x, y, 340, 192);
			index = index === len - 1? 0: index + 1;
		};
		
		preload();
	})('images/run/');

}));
