<%@page import="com.fin.entity.User"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/taglibs.jsp"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>财务预算管理系统</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<meta charset="utf-8">
	
	<link rel="stylesheet" type="text/css" href="css/list_styles.css">
	<link rel="stylesheet" type="text/css" href="css/main_list.css">
	<link rel="stylesheet" type="text/css" href="css/main_advert.css">
	<link rel="stylesheet" type="text/css" href="buttons/buttons.css" />

	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/layer/layer.js"></script>
	
	<style type="text/css">
		.p-text{
		    font-size: 14px;
		    color: #000000;
		    line-height: 24px;
		    text-align: center;
		}
		.input-text {
		    background: #ffffff;
		    border: 1px solid #c9c9c9;
		    height: 25px;
		    width: 200px;
		    padding-left: 5px;
		    border-radius: 5px;
		}
		.textarea-text{
			background: #ffffff;
		    border: 1px solid #c9c9c9;
		    padding-left: 5px;
		    border-radius: 5px;
		    margin-top:2%;
		}
		.sub {
		    width: 64px;
		    height: 30px;
		    line-height: 30px;
		    background: #f6710c;
		    text-align: center;
		    color: white
		    font-size: 14px;
		    border-radius: 3px;
		    float: right;
		    display: block;
		    margin-top: 15px;
		    margin-right: 20px;
		    text-decoration: none;
		}
		.h{
			display: none;
		}
	</style>
	
	<script type="text/javascript">
		function save_confirm(){
			var input_title = $("#input_title").val();
			var input_content = $("#input_content").val();
			var istop = $("#istop").val();
			if(input_title == ""){
				layer.tips("标题不能为空","#input_title",{
					tips:2
				});
				return;
			}
			if(input_content == ""){
				layer.tips("内容不能为空","#input_content",{
					tips:3
				});
				return;
			}
			$.ajax({
				url:"${ctx}/advert/save.do",
				type:"post",
				data:{"title":input_title,"content":input_content,"istop":istop},
				datatype:"json",
				success:function(result){
					layer.tips(result.msg,"#save_btn",{
						tips:1
					});
					setTimeout(function (){
						window.location.href = "${ctx}/advert/showad.do";
					},1000);
				},
				error:function(){
					alert("保存异常，请稍后再试");
				}
			});
		}
		
		//新增
		function add(){
			$("#insert_hid").show();
		}
		
		//取消
		function save_hide(){
			$("#insert_hid").hide();
		}
	</script>
  </head>
  
  <body>
	<!--通知公告 start-->
      <div class="mod-box" style="margin-top:5%;width:98%;">
          <h4 class="mod-title"><span class="name"><i class="icon-notice"></i>通知公告</span><a class="button small green" style="float:right;font-size: medium;" onclick="add();">新增</a> </h4>
          <div class="mod-content">
              <ul class="notice-list">
              		<c:forEach items="${adverts }" var="advert">
	              		<li class="list">
						    <div class="list-div">
						        <a class="name">${advert.title }</a>
						        <div class="right-tool">
						            <span class="span-time">${advert.starttime }</span>
						        </div>
						    </div>
						    <p class="p-text">
	                            <c:out value="${advert.content}" escapeXml="true"></c:out>
	                        </p>
						</li>
              		</c:forEach>
              		<li id="insert_hid" class="list h">
					        <a class="name">新增公告</a>
							<p class="p-text">
	                           	标题：<input id="input_title" class="input-text"><br>
				        		通知内容：<textarea id="input_content" rows="5" cols="100" class="textarea-text"></textarea><br>
				        		是否置顶：
				        		<select class="input-text" id="istop" style="width:50px;">
									<option value="0">否</option>
									<option value="1">是</option>
								</select><br>
				        		<a id="save_btn" class="sub" href="javascript:void(0);" onclick="save_confirm();" style="color:#eee;">保存</a>
				        		<a id="save_btn" class="sub" href="javascript:void(0);" onclick="save_hide();" style="color:#eee;">取消</a>
	                        </p>
              		</li>
              </ul>
          </div>
      </div>
      <!--通知公告 end-->
  </body>
</html>
