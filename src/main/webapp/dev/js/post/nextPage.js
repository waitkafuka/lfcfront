var data={
    id: $.getParameter("id")
};
$.ajax({
    url: 'http://222.88.71.16:8067/lfcfront/postDetail',
    dataType: 'json',
    type:'post',
    data:data,
    success: function (data) {
        console.log(data);
        if (data) {
            for (var i = 0; i < data.pre_post.length; i++) {
                $(".nextPage>ul>li:first-child>a").html(data.pre_post[0].title);
            }
            for (var i = 0; i < data.next_post.length; i++) {
                $(".nextPage>ul>li:last-child>a").html(data.next_post[0].title);
            }
        }
    }
});