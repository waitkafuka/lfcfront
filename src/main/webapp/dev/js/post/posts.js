$.ajax({
	type: "post",
	url: "http://222.88.71.16:8067/lfcfront/myPost",
	async: true,
	data: {
		page_start: 1,
		page_capacity: 10,
	},
	success: function(data) {
		if(data)
			var postsCount = JSON.parse(data);		
		$(".pagelist").pagination({
			pageCount: Math.ceil(postsCount.totalCount/10),
			totalData:postsCount.totalCount,
			showData: 10,
			current: 1,
			prevContent: '<',
			nextContent: '>',
			activeCls: 'active',
			count: 3,
			coping: true,
			homePage: '首页',
			endPage: '尾页',
			callback: function(index) {
				$('.now').text(index);
				getData(index);
			},
			function(api) {
				$('.now').text(api.getCurrent());
			}

		});
	}

});

function getData(index) {
	$.ajax({
		type: "post",
		url: "http://222.88.71.16:8067/lfcfront/myPost",
		async: true,
		data: {
			page_start: index * 10,
			page_capacity: 10,
		},
		success: function(data) {
			if(data)
				var myPosts = JSON.parse(data);
			var postsList = myPosts.postList;
			$(".arc_list").remove();
			$.each(postsList, function(k, value) {
				var strings = /<img[^>]+>/g; //匹配img标签
				var str = value.content.match(strings); //返回匹配的img（是个数组）
				var truecontents = value.content; //去除img标签后的内容
				var pclassname = "nohaveimgp";
				if(str) {
					var stre = str[0]; //包裹img的div内容
					truecontents = value.content.replace(strings, "");
					pclassname = "haveimgp";
				} else {
					var stre = ""; //包裹img的div内容
				}
				var html = $('<div class="arc_list" postId=' + value.postId + '><h1><a href="arc_info.html" title="">' + value.title + '</a></h1><span>作者：<a href="search.html">' + value.author + '</a>   时间：' + value.time + '</span><div class="ifhaveimg">' + stre + '</div><p class=' + pclassname + '>' + truecontents + '</p><button><a href="arc_info.html">查看更多</a></button></div>');
				$(".pagelist").before(html);
				$(".posts_author").html(value.author);
				if(k > 9) {
					return false;
				}

			});
		}
	});
};