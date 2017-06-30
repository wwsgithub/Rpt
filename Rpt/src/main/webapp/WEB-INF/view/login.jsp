<%@page import="com.fin.entity.User"%>
<%@page import="java.lang.*"%>
<%@ include file="/taglibs.jsp"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
<head>
	<base href="<%=basePath%>">
	
	<title>登录页面</title>
	
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<meta charset="utf-8">
	
	<link rel="stylesheet" type="text/css" href="css/login_styles.css">
	<!-- 引入jquery -->
	<script src="js/jquery.min.js" type="text/javascript"></script>
	
	<script type="text/javascript">
		$(function(){
			//登录框得到焦点
			$("#password").focus(function(){
				$("#left_hand").animate({
					left: "150",
					top: " -38"
				},{step: function(){
					if(parseInt($("#left_hand").css("left"))>140){
						$("#left_hand").attr("class","left_hand");
					}
				}}, 2000);
				$("#right_hand").animate({
					right: "-64",
					top: "-38px"
				},{step: function(){
					if(parseInt($("#right_hand").css("right"))> -70){
						$("#right_hand").attr("class","right_hand");
					}
				}}, 2000);
			});
			
			//失去焦点
			$("#password").blur(function(){
				$("#left_hand").attr("class","initial_left_hand");
				$("#left_hand").attr("style","left:100px;top:-12px;");
				$("#right_hand").attr("class","initial_right_hand");
				$("#right_hand").attr("style","right:-112px;top:-12px");
			});
			
		    //新闻点击
		    
		    //登录按钮点击
		    $('#login_btn').click(function(){
		    	//先进行账号和密码框的验证，验证通过之后，取出帐号密码发送请求
		    	var username = $('#username').val().trim();
				var password = $('#password').val().trim();
				var isOk = true;
				if(username=="" || password==""){
					isOk = false;
					alert("用户名和密码不能为空");
				}
		    	if(isOk){
		    		$.ajax({
			    		url:"${ctx}/user/login.do",
			    		type:"post",
			    		data:{"username":username,"password":password},
			    		dataType:"json",
			    		success:function(result){
			    			if(result.status == 2 || result.status == 1){
			    				alert(result.msg);
			    			}else{
			    				//登录成功
			    				console.log('${ctx}');
			    				window.location.href = "${ctx}/user/show.do";
			    			}
			    		},
			    		error:function(){
			    			alert("登录出现异常");
			    		}
		    		});
		    	}
		    	/* if(isOk){
		    		$("#submitform").submit();
		    	} */
		    });
		});
		
		function forgetpwd(){
			alert("扣工资了啊！再想想。。请联系管理员试试");
		}
		
		$(document).keypress(function(e) {  
			// 回车键事件  
			if(e.which == 13) {
				$('#login_btn').click();
			}  
	   	});
	</script>
</head>

<body>
	<!-- 背景音乐
	<audio id="bgmusic" loop="loop" autoplay="autoplay">
		<source src="./music/bg.mp3" type="audio/mpeg"></source>
	</audio> 
	-->
	<div class="top_div">
    	<!-- 导航Logo -->
		<div id="logo">
			<ul id="logo_ul">
				<li><a onclick="location.reload();">首页</a></li>
				<li><a id="logo_news" href="${ctx }/finance_sina/finance_sina.html" target="_blank">财务新闻</a></li>
				<li><a id="logo_knowledge">财务小知识</a></li>
			</ul>
		</div>
		<font style="font-size:50px;">财务预算管理系统</font>
	</div>
	
	<!-- main -->
	<div style="background: rgb(255, 255, 255); margin: -100px auto auto; 
		border: 1px solid rgb(231, 231, 231); border-image: none; 
		width: 400px; height: 200px; text-align: center;">
		<div style="width: 165px; height: 96px; position: absolute;">
			<div class="tou"></div>
			<div class="initial_left_hand" id="left_hand"></div>
			<div class="initial_right_hand" id="right_hand"></div>
		</div>
		<form action="${ctx }/user/login.do" id="submitform" method="post">
			<P style="padding: 30px 0px 10px; position: relative;">
				<span class="u_logo"></span> 
				<input id="username" name="username" class="ipt" type="text" placeholder="请输入用户名或邮箱">
			</P>
			<P style="position: relative;">
				<span class="p_logo"></span> 
				<input class="ipt" id="password" name="password" type="password" placeholder="请输入密码">
			</P>
		</form>
		
		<div style="height: 50px; line-height: 50px; margin-top: 30px; 
			border-top-color: rgb(231, 231, 231); border-top-width: 1px; 
			border-top-style: solid;">
			<P style="margin: 0px 35px 20px 45px;">
				<span style="float: left;">
					<a style="color: rgb(204, 204, 204);" href="javascript:forgetpwd();">忘记密码?</a>
				</span> 
				<span style="float: right;">
					<!-- <a style="color: rgb(204, 204, 204); margin-right: 10px;" href="">注册</a> -->
					<a id="login_btn" style="background:rgb(0,142,173);padding:7px 10px; 
						border-radius: 4px;border: 1px solid rgb(26,117,152); 
						border-image: none;color:rgb(255,255,255);font-weight:bold;"
						>登录
					</a> 
				</span>
			</P>
		</div>
	</div>
	
	<div style="text-align:center;">
		<p style="margin-top:10px;">
			来源:<a href="./jsust.html" target="_blank">江苏科技大学</a>
		</p>
	</div>
</body>
</html>
