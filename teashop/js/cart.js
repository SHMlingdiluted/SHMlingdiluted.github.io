$(function () {
	//数量减
	$(".minus").click(function () {
		var n = $(this).parent().find(".num");
		n.val(parseInt(n.val()) - 1 ); // parseInt()返回整数
		if(n.val() <= 1) {
			n.val(1);
		}
		var $priceTotalObj = $(this).parents('.goods_list').find('.p_total'), //同样商品的总价
        	$price = $(this).parents('.goods_list').find('.p_price').html(),  //单价
        	$priceTotal = n.val()*parseFloat($price.substring(1)); //总价=数量*单价  parseFloat()返回浮点数(有小数点)
        if (n.val() >= 1) {
        	n.val(n.val());
        	$priceTotalObj.html('¥' + $priceTotal);
        }
		TotalPrice();
	});
	
	//数量加
	$(".plus").click(function () {
		var n = $(this).parent().find(".num");
		n.val(parseInt(n.val()) + 1);
		//$(this).siblings(".minus").removeClass("disabled");
		var $priceTotalObj = $(this).parents('.goods_list').find('.p_total'), //同样商品的总价
        	$price = $(this).parents('.goods_list').find('.p_price').html(),  //单价
        	$priceTotal = n.val()*parseFloat($price.substring(1)); //总价=数量*单价
		$priceTotalObj.html('¥' + $priceTotal);	
		TotalPrice();
	});
	
	//输入数量
	$(".num").keyup(function () {
		var $count = 0,
			$priceTotalObj = $(this).parents('.goods_list').find('.p_total'), //同样商品的总价
        	$price = $(this).parents('.goods_list').find('.p_price').html(),  //单价
        	$priceTotal = 0; //
        if ($(this).val()=='') {
        	$(this).val(1);
        }
        $(this).val($(this).val().replace(/\D|^0/g,''));
        $count = $(this).val();
        $priceTotal = $count*parseFloat($price.substring(1));
        $(this).attr('value',$count);
        $priceTotalObj.html('¥' + $priceTotal);
        TotalPrice();
	})
	
	//单选按钮 closest()返回祖先元素
	$(".check").click(function () {
		var pro1 = $(this).closest(".cart_container").find(".check"); //获取所有商品
		var pro2 = $(this).closest(".cart_container").find(".check:checked"); //获取所有被选中的商品
		if (pro1.length == pro2.length) {
			//选中商品等于所有商品
			$(".check-all").prop("checked", true);//全选按钮被选中
			TotalPrice();
		} else{
			$(".check-all").prop("checked", false);//全选按钮不被选中
			TotalPrice();
		}
	})
	
	//点击全选按钮
	$(".check-all").click(function () {
		if ($(this).prop("checked") == true) {
			$(".check,.check-all").prop("checked", true);
			TotalPrice();
		} else {
			$(".check,.check-all").prop("checked", false);
			TotalPrice();
		}
	});	
	
	//删除商品
	var $lists = null;
    var $order_content = '';
    $('.p_action .delete').click(function () {
        $lists = $(this).parents('.goods_list');
        $order_content = $lists.parents('.c_content');
        $('.coverBg,.pop-up').fadeIn(300);
    });
    //关闭弹窗
    $('.close-popup,.btn-cancel').click(function () {
    	$('.coverBg,.pop-up').fadeOut(300);
    })
    //确定删除按钮，
    $('.btn-confirm').click(function () {
    	$lists.remove();
    	if ($order_content.html().trim()==null || $order_content.html().trim().length ==0) {
    		$order_content.parents('.cart_container').remove();
    		$('.shoppingcart_empty').show();
    	}
    	$('.coverBg,.pop-up').fadeOut(300);
    	TotalPrice();
    });
    //删除选中商品-------有错误
    $('.operation').click(function () {
    	if ($('.piece_num').html() != 0) {
    		var con = confirm('确定删除所选商品吗？');
    		if (con) {
    			if ($('.check:checked')) {
    				$('.check:checked').parents('.goods_list').remove();
    			}else if ($('.check-all:checked')) {
    				$('.cart_container').remove();
    				$('.shoppingcart_empty').show();
    			}
    		}
    	}else {
    		alert('请选择商品！')
    	}
    	TotalPrice();
    })
	
	
	//计算总价
	function TotalPrice () {
		var total_money = 0;
        var total_count = 0;
        var calBtn = $('.btn-area a');
        $(".check").each(function () {
        	if ($(this).is(':checked')) {
        		var goods = parseFloat($(this).parents(".goods_list").find(".p_total").html().substring(1));
        		var num = parseFloat($(this).parents(".goods_list").find('.num').val());
        		total_money += goods;
        		total_count += num;
        	}
        });
        
        $(".total_text").html('¥' + total_money);
        $(".piece_num").html(total_count);
        
        if (total_money!=0 && total_count!=0) {//金额数量不为0时
        	if (calBtn.hasClass('disabled')) {
        		calBtn.removeClass('disabled')
        	}
        }else {//金额数量为0时
        	if (!calBtn.hasClass('disabled')) {
        		calBtn.addClass('disabled');
        	}
        }
	}
});
