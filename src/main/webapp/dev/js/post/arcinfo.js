//mock模拟数据
Mock.mock("http://localhost:8080/lfcfront/postDetail",{
	"postId|5":{
						"title":"陆鹰前端社区文章标题",
						"author":"王飞飞",
						"time":"2016年12月01日 18:00",
						"content|11":"本站的各项电子服务的所有权和运作权归本站。本站提供的服务将完全按照其发布的服务条款和操作规则严格执	行。您同意所有本站发布的服务条款和操作规则的约定.",
						"comments":{
							"commentsList":[
								{"id":"112"},
								{"comment":"今天星期五,这里是评论内容,今天星期五,这里是评论内容.因此我们就会看到很多开源软件其实都成了“版本帝”。"},
								{"c_author":"王飞飞"},
								{"c_time":"2016年12月02日 18:00"},
								{"postId":"110"}
							]
						}
					}
});
//文章详情部分
$(document).ready(function(){
	//handlebars解析数据得到回调函数
	var sour1 = $("#arclist").html();
	var sour2 = $("#author").html()
	var template1 = Handlebars.compile(sour1);
	var template2 = Handlebars.compile(sour2);
	//Ajax获取mock模拟数据.
	var param = {
		id:$.getParameter("id")
	};
	$.ajax({
		type:"post",
		url:"http://localhost:8080/lfcfront/postDetail",
		data:param,
		async:true,
		dataType:"json",
		success:function(res){
			if(res){
				console.log(res);
				//利用handlebars回调函数解析数据渲染到页面
				var htmlstr1  = template1(res);
				var htmlstr2  = template2(res);
				$(".arc_list").html(htmlstr1);
				$(".author").html(htmlstr2);
			}else{
				alert("没有相关信息");
			}
		}
	});
});
