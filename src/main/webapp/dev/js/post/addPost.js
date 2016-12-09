$(function(){
    // 发帖标签数组
    globalFinalTag=[];
    // 发帖标签转为内容
    globalFinalTagTxt="";
    // 发帖标题
    globalTitle="";
    //发帖内容
    globalTxtarr='';
    // 标签颜色
    var tagsBg=[0,1,2,3,4,5,6];
    //点击添加按钮可以标签
    $(document).on("click","#addTagBtn",function(){
        var $txtTag=$("#txtTag");
        var $boxTag=$("#boxTag");
        tagValue=$txtTag.val();
        if(!tagValue.trim()){
            openPop({"content":"请输入标签！"});
        }
        var tagValues="";
        var tagValues=tagValue.replace(/，/g, ",");
    //获取到的标签
    var stillTag=tagValues.split(",");
    if(stillTag[stillTag.length-1]==""){
      stillTag.pop();
    }
    stillTag=stillTag.arrNoRepeat();
    $.each(stillTag,function(index,val){
      $boxTag.append("<span class=tagbg"+(index%tagsBg.length)+"><a href='#'>"+val+"</a><d class='close'>&#10006;</span></span>");
    });
        // 点添加后清空输入框
        $txtTag.val("");
        // 输入标签个数的限制
        if($("span",$boxTag).length>14){
           openPop({"content":"您最多可以输入15个标签,超出会被截掉！"});
           $("#boxTag span:gt(14)").hide();
       }
   });
    // 回车可以添加标签
    $("#txtTag").on('keydown',function (e) {
        if(e.which==13){
            $("#addTagBtn").trigger('click');
        }
    })
  // 删除标签
   $(document).on("click","#boxTag .close",function () {
     $(this).parent().remove();
 })
  // 点提交
  $("#getTextarea").on("click",function(){
    $(".edittag-top1").slideUp(300);
    $(".tag-tip").slideUp(300);
     // 获取标题
        var globalTitle=$("#postTitle").val();
    // 获取发帖内容
      var globalTxtarr =UE.getEditor('container').getContent();
      $("#boxTag>span").each(function () {
         $(this).children(".close").remove();
         globalFinalTag.push($(this).children("a").html());
         globalFinalTag=globalFinalTag.arrNoRepeat();
     });
      // 获取发帖标签
      globalFinalTagTxt=globalFinalTag.join(",");
      var param = {
      title:globalTitle,
      tag:globalFinalTagTxt,
      content:globalFinalTag
      };
    // 发送Ajax请求：
     $.ajax({
        url: 'http://222.88.71.16:8067/lfcfront/addPost',
        data:param,
        type:'post',
        dataType:'json'}).done(function(data, status, xhr){
            if(data){
    //如果标题，内容和标签任一为空
    if($("#postTitle").val().trim()=="" || globalTxtarr.trim()=="" || globalFinalTagTxt==""){
        openPop({"content":"标题，内容和标签都不能为空！"});
    }
    else{
        //判断发表状态state
        if(formatData.state===0){
           openPop({"content":"发表成功！"});
       }
       else if(formatData.state===1){
           openPop({"content":"文章包含敏感词汇，不能发表！"});
       }
       else{
           openPop({"content":"系统错误！"});
       }

   }

}

});

  });
// 关闭弹窗
$(".pop-close").on("click",function () {
    $(".pop-mask").fadeOut(300);
    
})


});
//数组去重
Array.prototype.arrNoRepeat = function(){
 var res = [this[0]];
 for(var i = 1; i < this.length; i++){
  var repeat = false;
  for(var j = 0; j < res.length; j++){
   if(this[i] == res[j]){
    repeat = true;
    break;
}
}
if(!repeat){
   res.push(this[i]);
}
}
return res;
}
// 打开弹窗并改变内容
function openPop(obj) {
    $(".pop-mask").fadeIn(300);
    $(".pop-content p").html(obj.content);
}
