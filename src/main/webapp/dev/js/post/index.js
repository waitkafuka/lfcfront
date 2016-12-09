$(function() {
	//时间戳转换为时间格式
    Handlebars.registerHelper("prettifyDate", function(timestamp) {
        return new Date(parseInt(timestamp) ).toLocaleString().replace(/:\d{1,2}$/,' ');
    });
    //过滤图片
	Handlebars.registerHelper('getText',function (content) {
        var strings = /<img[^>]+>/g;// 匹配img标签
		var truecontents = content;// 去除img标签后的内容
        return truecontents;
    });
	//获得图片地址
    Handlebars.registerHelper('getImg',function (content) {
        var strings = /<img[^>]+>/g;// 匹配img标签
         var str = content.match(strings);// 返回匹配的img（是个数组）取第一个
        if(str){
            return str[0];
        }
    });
	var pages = 1;// 定义当前是第几页
	var maxpages = 1;// 记录最大页数
	onloadData(1, 10);
	// 封装
	function onloadData(targetIndex, numbers) {
		pages = targetIndex;
		$.ajax({
			//url : "http://localhost:8080/lfcfront/postList",
			url : "http://222.88.71.16:8067/lfcfront/postList",
			dataType : "json",
			async : true,
			type : "GET",
			data : {
				page_start : targetIndex,// 开始页数
				page_capacity : numbers
			// 查询条数
			},
			success : function(jsons) {
				var postList = jsons.postList;
				var template = Handlebars.compile($('#artList').html());
				var html = template(postList);
				$('.arc_list').html(html);
			},
			error : function() {
				console.log("错误");
			}
		});
	}
	//删除
	$(document).on('click','.delBtn',function () {
		var con =  confirm();
		if(con){
            $(this).parent().remove();
		}

    });
	$('.pagelist').pagination({
        //pageCount: Math.ceil(postsList.length / 10),
        pageCount: 10,
        totalData: 100,
        showData: 10,
        current: 1,
        prevContent: '<',
        nextContent: '>',
        activeCls: 'active',
        count: 3,
        coping: true,
        homePage: '首页',
        endPage: '尾页',
        callback:function(index){
             var currentIndex = index.getCurrent();
            onloadData(currentIndex,10);
        }
	});
// 	// 首次页面加载进来显示的是第一页数据
//
// 	//
// 	// 创建列表项
// 	function createDiv(id, title, tag, content, author, time) {
// 		var strings = /<img[^>]+>/g;// 匹配img标签
// 		var str = content.match(strings);// 返回匹配的img（是个数组）
// 		var truecontents = content;// 去除img标签后的内容
// 		var pclassname = "nohaveimgp";
// 		// console.log(str);
// 		if (str != null) {
// 			// console.log(str[0]);
// 			var stre = str[0];// 包裹img的div内容
// 			truecontents = content.replace(strings, "");
// 			pclassname = "haveimgp";
// 		} else {
// 			var stre = "";// 包裹img的div内容
// 		}
// 		var html = $('<div class="arc_list" postId='
// 				+ id
// 				+ '><h1><a href="arc_info.html?id='+id+'" title="">'
// 				+ title
// 				+ '</a></h1><span>作者：<a href="search.html">'
// 				+ author
// 				+ '</a>   时间：'
// 				+ time
// 				+ '</span><div class="ifhaveimg">'
// 				+ stre
// 				+ '</div><p class='
// 				+ pclassname
// 				+ '>'
// 				+ truecontents
// 				+ '</p><button><a href="arc_info.html?id='+id+'">查看更多</a></button><button class="deletes">删除</button></div>');
// 		$(".content_left").prepend(html);
// 		// var h= html.height();
// 		// html.height(0);//设置动画的初始值为0
// 		// html.animate({
// 		// height:h//动画终止的地方
// 		// },300);
// 		// 删除
// 		// html.find(".deletes").click(function() {
// 		// html.animate({
// 		// height: 0
// 		// }, "slow", function() {
// 		// $(this).remove();
// 		// });
// 		// });
// 	}
//
//
// 	$(document).on("click", ".topPages", function() {
// 		// console.log(pages);
// 		if (pages < 2) {
//
// 		} else {
// 			onloadData(pages - 1, 10);
// 		}
// 	});
// 	$(document).on("click", ".nextPages", function() {
//
// 		// console.log(maxpages);
// 		if (pages >= maxpages) {
//
// 		} else {
// 			onloadData(parseInt(pages) + 1, 10);
// 		}
// 	});
//
// 	// 分页-展示页isu
// 	$(document).on("click", ".pagelist>ul li a", function(event) {
// 		var target = $(event.target); // 获取当前点击的节点
// 		var targetIndex = target.attr("indexs"); // 获取点击页码的索引值
// 		onloadData(targetIndex, 10);
// 		// alert(targetIndex);
// 	});
//
// 	function getPageCount(targetIndex, numbers) {
// 		$
// 				.ajax({
// 					url : "http://222.88.71.16:8067/lfcfront/postList",
// 					type : "get",
// 					dataType : "json",
// 					data : {
// 						page_start : targetIndex,// 开始页数
// 						page_capacity : numbers
// 					// 查询条数
// 					},
// 					success : function(data) {
// 						var cents = data.totalCount;
// 						maxpages = Math.ceil(cents / numbers);
// 						// console.log(maxpages);// if(data.err == 0) {
// 						$(".pagelist>ul li").remove(); // 初始化
// 						// alert(data.countpage);
// 						var astart = $('<li><a href="javascript:void(0)" indexs=1>首页</a></li>');
// 						$(".pagelist>ul").append(astart);
// 						var atop = $('<div class="topPages"><a href="javascript:void(0)" class="toppage"><i class="iconfont icon-iconfonti2-copy"></i></a></div>');
// 						$(".pagelist>ul").append(atop);
//
// 						for (var i = 0; i < maxpages; i++) {
// 							var aObj = $('<li><a href="javascript:void(0)" indexs='
// 									+ (i + 1) + '>' + (i + 1) + '</a></li>');
// 							$(".pagelist>ul").append(aObj);
// 						}
// 						var anext = $('<div class="nextPages"><a href="javascript:void(0)" class="nextpage"><i class="iconfont icon-iconfonti2"></i></a></div>');
// 						$(".pagelist>ul").append(anext);
// 						var aend = $('<li><a href="javascript:void(0)" indexs='
// 								+ i + '>尾页</a></li>');
// 						$(".pagelist>ul").append(aend);
// 						// 当前页加active
// 						$(".pagelist>ul li").eq(targetIndex).addClass("cur");
// 						// }
// 					}
// 				});
// 	}
//
});

