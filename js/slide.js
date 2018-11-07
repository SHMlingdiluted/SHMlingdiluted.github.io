/*************
 * 自动播放-带方向箭头#container
 ************/
window.onload = function() {
	var slide = $("#container"),
		  box = $("#slideBox"),
		items = $("#slideBox li"),
	 li_width = items.eq(0).width(),
	    cirle = $("#circle a"),
	  current = 0,
	   timmer = null,
	     size = cirle.size();
	   //size = cirle.length; //与上一句效果相同
	     
	     //定义一个鼠标滑过判断事件
	slide.hover(function() {
		clearInterval(timmer);
	}, function() {
		timmer = setInterval(slider,3000);
	});
	function slider() {
		current++;
		doSlider();
	}
	function doSlider() {
		//圆点按钮轮播
		$("#circle a").removeClass("active").eq(current%size).addClass("active");
		//图片轮播
		$("#slideBox").stop().animate({
			left: -(current + 1) * li_width
		}, 1000, function() {
			if (current == size) {
				current = 0;
				box.css("left", -(current + 1) * li_width + "px");
			}else if (current == -1) {
				current = size - 1;
				box.css("left", -(size) * li_width + "px");
			}
		});
	}
	timmer = setInterval(slider, 3000);
	
	//点击左箭头切换图片
	$(".prev").click(function() {
		current--;
		doSlider();
	});
	//点击右箭头切换图片
	$(".next").click(function() {
		current++;
		doSlider();
	});
	//点击圆点切换图片
	cirle.mouseover(function() {
		current = $(this).index();
		doSlider();
	});
}
