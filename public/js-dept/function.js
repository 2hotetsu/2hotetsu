$(function(){
	// マウスオーバー
		var postfix = '_ov';
		$('#nav a img').not('[src*="'+ postfix +'."]').each(function() {
			var img = $(this);
			var src = img.attr('src');
			var src_on = src.substr(0, src.lastIndexOf('.'))
			+ postfix
			+ src.substring(src.lastIndexOf('.'));
			$('<img>').attr('src', src_on);
			img.hover(function() {
			img.attr('src', src_on);
			}, function() {
			img.attr('src', src);
			});
		});
	// ページトップ
		$(".pagetop a,.smenu li a").click(function(){
      		var speed = 900;// ミリ秒
     		var href= $(this).attr("href");
     		var target = $(href == "#" || href == "" ? 'html' : href);
     		var position = target.offset().top;
      		$('html, body').animate({scrollTop:position}, speed, 'swing');
     		return false;
		})
	// ナビ固定
		var nav    = $('.smenu'),
		    offset = nav.offset();

		$(window).scroll(function () {
		  if($(window).scrollTop() > offset.top - 20) {
		    nav.addClass('fixed');
		  } else {
		    nav.removeClass('fixed');
		  }
		});
	// メイン画像
		$(function() {
		$('.pix_diapo').diapo({
		fx:'Available effects:random,simpleFade', 
		pagination:false,
		thumbs:false,
		loader:'none',
		commands:false,
		gridDifference:100,
		transPeriod:3000,
		time:800,
		});
 		});


});


