var pagination = pagination || {}; (function() {
    function Pagination() {}
    Pagination.prototype = {
        render: function(obj) {
            this._wrapid = '#' + obj.wrapid; //分页容器的id
            this._total = obj.total; //总条数
            this._pagesize = obj.pagesize; //每页显示的条数
            this._currentPage = obj.currentPage; //当前页
            this._cb = obj.onPagechange; //当前点击页码
            if (obj.btnCount < 5) {
                obj.btnCount = 5;
            } else if (obj.btnCount % 2 == 0) {
                obj.btnCount = obj.btnCount + 1;
            }
            this._btnsValue = obj.btnCount ? obj.btnCount: 7;
            this._halfbtns = parseInt((this._btnsValue - 3) / 2);
            this._btnNum = obj.total / obj.pagesize > parseInt(obj.total / obj.pagesize) ? parseInt(obj.total / obj.pagesize) + 1 : parseInt(obj.total / obj.pagesize);
        },
        bindEvent: function() {
            var that = this;
            $(that._wrapid).on('click', '.pg-num', function() {
                that._currentPage = parseInt($(this).text());
                that._cb(that._currentPage);
                isshowMore.call(that);
            });
            $(that._wrapid).on('click', '#pagination-prev', function() {
                if ($(this).hasClass('pg-disabled')) {
                    return;
                }
                that._currentPage--;
                $('#pagination-next').hasClass('pg-disabled') && $('#pagination-next').removeClass('pg-disabled');
                if (that._currentPage == 1) {
                    $('#pagination-prev').addClass('pg-disabled');
                } else {
                    $('#pagination-prev').removeClass('pg-disabled');
                }
                that._cb(that._currentPage);
                isshowMore.call(that);
            });
            $(that._wrapid).on('click', '#pagination-next', function() {
                if ($(this).hasClass('pg-disabled')) {
                    return;
                }
                that._currentPage++;
                $('#pagination-prev').hasClass('pg-disabled') && $('#pagination-prev').removeClass('pg-disabled');
                if (that._currentPage == that._btnNum) {
                    $('#pagination-next').addClass('pg-disabled');
                } else {
                    $('#pagination-next').removeClass('pg-disabled')
                }
                that._cb(that._currentPage);
                isshowMore.call(that);
            });
            $(that._wrapid).on('click', '#jump-btn', function() {
				var jumptext = $("#jump-text");
				that._currentPage = parseInt(jumptext.val().replace(/\D/g, ''));
				if (that._currentPage >= 1 && that._currentPage <= that._btnNum) {
				    that._cb(that._currentPage);
				    isshowMore.call(that);
				}
			});
            isshowMore.call(this);
            function isshowMore() {
                if (this._btnNum <= this._btnsValue) {
                    creatBtns.call(this, 'none')
                } else {
                    if (this._currentPage <= (this._btnsValue - 1 - this._halfbtns)) {
                        creatBtns.call(this, 'after');
                    } else if (this._currentPage >= this._btnNum - 1 - this._halfbtns) {
                        creatBtns.call(this, 'before')
                    } else {
                        creatBtns.call(this, 'all')
                    }
                }
            }
            function creatBtns(ismorePosition) {
                var html = '';
                var ismore = '<li class="pg-ellipsis">...</li>';
                var firstbtn = '<li class="pg-num pg-btn" data-num="1">1</li>';
                var lastbtn = '<li class="pg-num pg-btn" data-num=' + this._btnNum + '>' + this._btnNum + '</li>';
                var prevbtn = '<span class="pg-btn" id="pagination-prev">上一页</span>';
                var nextbtn = '<span class="pg-btn" id="pagination-next">下一页</span>';
                var jumptext = '<input class="pg-btn" id="jump-text" type="text" />';
                var jumpbtn = '<span class="pg-btn" id="jump-btn">GO</span>';
                var jump = '<span class="jump-wrap">到第 ' + jumptext + ' 页 ' + jumpbtn + ' </span>';
                if (this._currentPage == 1) {
                    firstbtn = '<li class="pg-num pg-btn pg-current" data-num="1">1</li>';
                    prevbtn = '<span class="pg-btn pg-disabled" id="pagination-prev">上一页</span>'
                }
                if (this._currentPage == this._btnNum) {
                    lastbtn = '<li class="pg-num pg-btn pg-current" data-num=' + this._btnNum + '>' + this._btnNum + '</li>';
                    nextbtn = '<span class="pg-btn pg-disabled" id="pagination-next">下一页</span>'
                }
                if (ismorePosition == 'none') {
                    for (var i = 1; i <= this._btnNum; i++) {
                        if (i == this._currentPage) {
                            html += '<li class="pg-num pg-btn pg-current" data-num=' + i + '>' + i + '</li>';
                        } else {
                            html += '<li class="pg-num pg-btn" data-num=' + i + '>' + i + '</li>';
                        }
                    }
                }
                if (ismorePosition == "after") {
                    for (var i = 1; i <= this._btnsValue - 1; i++) {
                        if (i == this._currentPage) {
                            html += '<li class="pg-num pg-btn pg-current" data-num=' + i + '>' + i + '</li>';
                        } else {
                            html += '<li class="pg-num pg-btn" data-num=' + i + '>' + i + '</li>';
                        }
                    }
                    html = html + ismore + lastbtn;
                }
                if (ismorePosition == "before") {
                    html = html + firstbtn + ismore;
                    for (var i = this._btnNum - (this._btnsValue - 2); i <= this._btnNum; i++) {
                        if (i == this._currentPage) {
                            html += '<li class="pg-num pg-btn pg-current" data-num=' + i + '>' + i + '</li>';
                        } else {
                            html += '<li class="pg-num pg-btn" data-num=' + i + '>' + i + '</li>';
                        }
                    }
                }
                if (ismorePosition == "all") {
                    var halfnum = parseInt((this._btnsValue - 3) / 2);
                    html += firstbtn + ismore;
                    for (var i = (this._currentPage - halfnum); i <= this._currentPage + halfnum + ((this._btnsValue - 3) % 2); i++) {
                        if (i == this._currentPage) {
                            html += '<li class="pg-num pg-btn pg-current" data-num=' + i + '>' + i + '</li>'
                        } else {
                            html += '<li class="pg-num pg-btn" data-num=' + i + '>' + i + '</li>'
                        }
                    }
                    html += ismore + lastbtn;
                }
                $(this._wrapid).html(prevbtn + '<ul class="pagination-wrap">' + html + '</ul>' + nextbtn + jump);
            }
        },
        init: function(paginationObj) {
            this.render(paginationObj);
            this.bindEvent();
        }
    }
    pagination.init = function(paginationObj) {
        return new Pagination().init(paginationObj)
    }
})()