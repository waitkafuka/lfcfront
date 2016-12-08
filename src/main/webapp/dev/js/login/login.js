
$(document).ready(function () {

  Mock.mock("http://localhost:8080/lfcfront/login",{
    'state' : 0
  });
  
  $("#submitBtn").click(function () {
    var userName = $('#username').val();
    var userPwd = $('#password').val();
    var data = { 
      username: $('#username').val(), 
      password: $('#password').val()
    };
    if (!userName) {
      alert("用户名不能为空！");
    }
    else if (!userPwd) {
      alert("密码不能为空！");
    }
    else {
      //提交数据给Login.ashx页面处理 
      $.ajax({
        url: 'http://222.88.71.16:8067/lfcfront/login',
        dataType:'json',
        data:data,
        type:'post'
      }).done(function(data, status, xhr){
        var state = data.state;
        console.log(state);
        if(state === 0) {
          location.href = "../post/index.html";
        }else if(state === 1){
          alert("用户名或密码错误");
        }else if(state === -1){
          alert("系统错误");
        }
      });
    }
  });
 
  $(document).keypress(function (e) {
    // 回车键事件
    if (e.which == 13) {
      $("#submitBtn").click();
    }
  });
});