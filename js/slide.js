/*************
 * 自动播放-带方向箭头#container
 ************/
window.onload = function() {
	var slide = $("#container"),
		  box = $("#slideBox"),
		items = $("#slideBox li"),
	 li_width = items.eq(0).width(),
	    cirle = $("#circle span"),
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
		$("#circle span").removeClass("active").eq(current%size).addClass("active");
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
};

/*************
 * 楼层导轨
 ************/
function LiftEffect(json) {
	var array = [];
	for(var i =0; i<json.target.length;i++) {
		var t = $(json.target[i]).offset().top; //offset()偏移坐标
		array.push(t);//数组中添加新元素(array里面添加t)
	}
	
	function Selected(index) {
		$(json.control2).children().eq(index).addClass(json.current).siblings().removeClass(json.current);
	}
	
	$(window).on("scroll",Check);
	
	function Check() {
		var wst = $(window).scrollTop();//窗口的垂直滚动条位置
		if(wst >=$(json.target[0]).offset().top-200) {//滚动条位置大于等于.f1的偏移坐标top值减去100
			$(json.control1).fadeIn(500); //.lift-nav淡入
		}else {
			$(json.control1).fadeOut(500);
		}
		var key = 0;
		var	flag = true;
		for(var i=0; i<array.length; i++) {
			key++;
			if(flag) {
				if(wst >=array[array.length-key]-300) {
					var index = array.length-key;
					flag = false;
				}else {
					flag = true;
				}
			}
		}
		Selected(index);
	}
	
	$(json.control2).children().on("click", function() {
		$(window).off("scroll");
		var index = $(this).index();
		Selected(index);
		
		var flag =true;
		for(var i=0; i<array.length; i++) {
			if(flag) {
				if(index == i) {
					$("html,body").stop().animate({
						"scrollTop": array[i]
					},500,function() {
						$(window).on("scroll",Check);
					});
					flag = false;
				}else {
					flag = true;
				}
			}
		}
	});
}