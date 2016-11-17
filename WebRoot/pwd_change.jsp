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

	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/layer/layer.js"></script>
	
	<style type="text/css">
		.back{
			width:40%;
			height:300px;
			margin:0 auto;
			background: #F7EED6;
			text-align: center;
			margin-top:10%;
			border-radius:10px;
		}
		.p-text{
		    font-size: 14px;
		    color: #000000;
		    line-height: 24px;
		    text-align: center;
		}
		.input-text{
			background: #ffffff;
		    border: 1px solid #c9c9c9;
		    height: 25px;
		    width: 100px;
		    padding-left: 5px;
		    border-radius: 5px;
		}
		.p{
			line-height:60px;
		}
		.sub {
		    width: 64px;
		    height: 30px;
		    line-height: 30px;
		    background: #f6710c;
		    text-align: center;
		    color: #fff;
		    font-size: 14px;
		    border-radius: 3px;
		    float: right;
		    display: block;
		    margin-top: 15px;
		    margin-right: 20px;
		    text-decoration: none;
		}
		#sub:hover{
			cursor:pointer;
		}
	</style>
	
	<script type="text/javascript">
		function checkpwd(){
			var password = "${user.password}";
			var pwd_orignal = $("#pwd_orignal").val();
			if(password != pwd_orignal){
				layer.tips("密码验证错误，请重试","#pwd_orignal",{
					tips:2
				});
				return false;
			}
			return true;
		}
		
		function isblank(ah){
			if($(ah).val() == "" || $(ah).val() == null){
				layer.tips("不能为空",ah,{
					tips:2
				});
				return true;
			}
			return false;
		}
		
		function newpwd_confirm(ah){
			if(isblank(ah)){
				return;
			}
			var one = $("#pwd_new").val();
			var two = $("#pwd_new_confirm").val();
			if(one != two){
				layer.tips("两次密码不一致",ah,{
					tips:2
				});
				return false;
			}
			return true;
		}
		
		function pwd_sub(){
			if(checkpwd() == false){
				return;
			}
			if(isblank("#pwd_new") == true){
				return;
			}
			if(!newpwd_confirm("#pwd_new_confirm")){
				return;
			}
			var username = "${user.username}";
			var password = $("#pwd_new_confirm").val();
			$.ajax({
				url:"${ctx}/user/updatepwd.do",
				type:"post",
				data:{"username":username,"password":password},
				datatype:"json",
				async:false,
				success:function(result){
					layer.tips(result.msg,"#sub",{
						tips:2
					});
					if(result.status == 0){
						setTimeout(function (){
							parent.window.location.href = "${ctx}/login.jsp";
						},1000);
					}
				},
				error:function(){
					alert("修改异常，请稍候再试");
				}
			});
		}
	</script>
  </head>
  
  <body>
  	<div class="back">
  		<span class="p">亲爱的${user.name }你好!<br>您的帐号是：${user.username }</span><br>
	  	<label style="line-height:35px;">输入原密码：</label><input type="password" class="input-text" id="pwd_orignal" onblur="checkpwd();"><br>
	  	<label style="line-height:35px;">输入新密码：</label><input type="password" class="input-text" id="pwd_new" onblur="isblank(this);"><br>
	  	<label style="line-height:35px;">确认新密码：</label><input type="password" class="input-text" id="pwd_new_confirm" onblur="newpwd_confirm(this);"><br>
	  	<a class="sub" id="sub" onclick="pwd_sub();">提交</a>
  	</div>
  </body>
</html>
