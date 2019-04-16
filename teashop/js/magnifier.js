; (function($, window, document, undefined) {
    var Magnifier = function(elem) {
        var self = this;
        this.$elem = elem;
        this.$smallBox = this.$elem.find('.pic');
        this.$smallBox_pic = this.$smallBox.find('img');
        this.$smallBox_mask = this.$smallBox.find('.cover');
        this.$thumbnailBox = this.$elem.find('.thumbnail-box');
        this.$thumbnailBox_prev = this.$thumbnailBox.find('.btn-prev');
        this.$thumbnailBox_next = this.$thumbnailBox.find('.btn-next');
        this.$thumbnailBox_wrapper = this.$thumbnailBox.find('.small_pic');
        this.$thumbnailBox_item = this.$thumbnailBox_wrapper.find('li');
        this.$thumbnailBox_pic = this.$thumbnailBox.find('img');
        this.$bigBox = this.$elem.find('.big_box');
        this.$bigBox_pic = this.$bigBox.find('img');
    };
    Magnifier.prototype = {
        moveBigPic: function() {
            var scaleX = this.$smallBox_mask.position().left / (this.$smallBox.width() - this.$smallBox_mask.width());
            var scaleY = this.$smallBox_mask.position().top / (this.$smallBox.height() - this.$smallBox_mask.height());
            var scroll_l = scaleX * (this.$bigBox_pic.width() - this.$bigBox.width());
            var scroll_t = scaleY * (this.$bigBox_pic.height() - this.$bigBox.height());
            this.$bigBox.scrollLeft(scroll_l).scrollTop(scroll_t);
        },
        changeSrouce: function(index, cur_src) {
            this.$smallBox_pic.attr('src', cur_src);
            this.$bigBox_pic.attr('src', 'images/tea/tea_' + "3" + (index + 1) + '.jpg');
        },
        setMask: function() {
            var mask_w = this.$smallBox.width() / (this.$bigBox_pic.width() / this.$bigBox.width());
            var mask_h = this.$smallBox.height() / (this.$bigBox_pic.height() / this.$bigBox.height());
            this.$smallBox_mask.css({
                width: mask_w,
                height: mask_h
            });
        },
        inital: function() {
            var self = this;
            this.$thumbnailBox_next.click(function() {
                var ov_pic = self.$thumbnailBox_item.length - 4;
                var ov_dis = ov_pic * 105;
                if (ov_pic > 0) {
                    self.$thumbnailBox_wrapper.animate({
                        marginLeft: -ov_dis
                    });
                }
                self.$thumbnailBox_next.addClass("disabled");
                self.$thumbnailBox_prev.removeClass("disabled");
            });
            this.$thumbnailBox_prev.click(function() {
                self.$thumbnailBox_wrapper.animate({
                    marginLeft: 0
                });
                self.$thumbnailBox_prev.addClass("disabled");
                self.$thumbnailBox_next.removeClass("disabled");
            });
            this.$thumbnailBox_item.mouseover(function() {
                var cur_src = $(this).attr('data-src');
                self.$thumbnailBox_item.removeClass('item-cur');
                $(this).addClass('item-cur');
                self.changeSrouce($(this).index(), cur_src);
            });
            this.$smallBox.hover(function() {
                self.$bigBox.show();
                self.$smallBox_mask.show();
                self.setMask();
                $(this).mousemove(function(ev) {
                    var oEvent = ev || window.event;
                    var offset_pos = {
                        left: oEvent.clientX - $(this).offset().left - self.$smallBox_mask.width() / 2,
                        top: oEvent.clientY - $(this).offset().top - self.$smallBox_mask.height() / 2 + $(window).scrollTop()
                    };
                    if (offset_pos.left < 0) {
                        offset_pos.left = 0;
                    } else if (offset_pos.left > $(this).width() - self.$smallBox_mask.width()) {
                        offset_pos.left = $(this).width() - self.$smallBox_mask.width();
                    }
                    if (offset_pos.top < 0) {
                        offset_pos.top = 0;
                    } else if (offset_pos.top > $(this).height() - self.$smallBox_mask.height()) {
                        offset_pos.top = $(this).height() - self.$smallBox_mask.height();
                    }
                    self.$smallBox_mask.css(offset_pos);
                    self.moveBigPic();
                });
            },
            function() {
                self.$smallBox_mask.hide();
                self.$bigBox.hide();
            });
        },
        constructor: Magnifier
    };
    $.fn.magnifier = function() {
        var magnifier = new Magnifier(this);
        return magnifier.inital();
    };
})(jQuery, window, document);

/*************
 * *买家评论图片预览
 * ***********/
(function($) {
    $.fn.commentImg = function(options) {
        var defaults = {
            activeClass: 'active',
            nextButton: '.view-next',
            prevButton: '.view-pre',
            imgNavBox: '.pic-view',
            imgViewBox: '.largeImg'
        };
        var opts = $.extend({},
        defaults, options);
        this.each(function() {
            var _this = $(this),
            imgNav = _this.find(opts.imgNavBox).children(),
            imgViewBox = _this.find(opts.imgViewBox),
            prevBtn = _this.find(opts.prevButton),
            nextBtn = _this.find(opts.nextButton),
            src = '',
            img = new Image();
            function setViewImg(viewSrc) {
                img.src = viewSrc;
                img.onload = function() {
                    var imageWidth = img.width;
                    var imageHeight = img.height;
                    imgViewBox.show(0,
                    function() {
                        $(this).find("img").attr('src', src);
                    });
                }
            }
            imgNav.on("click",
            function() {
                $(this).toggleClass(opts.activeClass).siblings().removeClass(opts.activeClass);
                if ($(this).hasClass(opts.activeClass)) {
                    src = $(this).attr('data-src');
                    setViewImg(src);
                } else {
                    imgViewBox.hide();
                }
            });
            imgViewBox.on("click",
            function() {
                imgNav.removeClass(opts.activeClass);
                $(this).hide();
            });
            prevBtn.hover(function() {
                var index = imgNav.index(_this.find(opts.imgNavBox).children("." + opts.activeClass));
                if (index < 1) {
                    $(this).css({
                        "cursor": "default"
                    })
                } else {
                    $(this).css({
                        "cursor": "url(images/icon/pre.ico),auto"
                    })
                }
            },
            function() {
                $(this).css({
                    "cursor": "default"
                })
            });
            nextBtn.hover(function() {
                var index = imgNav.index(_this.find(opts.imgNavBox).children("." + opts.activeClass));
                if (index >= imgNav.length - 1) {
                    $(this).css({
                    	"cursor": "default"
                	})
                } else {
                    $(this).css({
                        "cursor": "url(images/icon/next.ico),auto"
                    })
                }
            },
            function() {
                $(this).css({
                    "cursor": "default"
                })
            });
            prevBtn.on("click",
            function(e) {
                e.stopPropagation();
                var index = imgNav.index(_this.find(opts.imgNavBox).children("." + opts.activeClass));
                if (index > 0) {
                    index--;
                    imgNav.eq(index).toggleClass(opts.activeClass).siblings().removeClass(opts.activeClass);
                    src = imgNav.eq(index).attr('data-src');
                    setViewImg(src);
                }
                if (index <= 0) {
                    $(this).css({
                        "cursor": "default"
                    })
                }
            });
            nextBtn.on("click",
            function(e) {
                e.stopPropagation();
                var index = imgNav.index(_this.find(opts.imgNavBox).children("." + opts.activeClass));
                if (index < imgNav.length - 1) {
                    index++;
                    imgNav.eq(index).toggleClass(opts.activeClass).siblings().removeClass(opts.activeClass);
                    src = imgNav.eq(index).attr('data-src');
                    setViewImg(src);
                }
                if (index >= imgNav.length - 1) {
                    $(this).css({
                        "cursor": "default"
                    })
                }
            })
        })
    }
})(jQuery);