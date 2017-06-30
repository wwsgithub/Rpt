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

	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/layer/layer.js"></script>
	
	<script type="text/javascript">
		function exit_confirm(){
			if(confirm("确定退出吗？")){
				return true;
			}
			return false;
		}
	</script>
  </head>
  
  <body>
  	<!-- logo -->
    <div id="logo">
    	<div>
    		<span style="color:#00A2CA;"><font>财务预算管理系统</font></span>
    	</div>
    	<div id="logo_right">
    		<div>
    			欢迎您！${user.name }
    		</div>
    		<a id="pwd_change" class="modifypwd" href="${ctx }/user/changepwd.do" target="main">
	    		<i></i>
	    		修改密码
    		</a>
    		&nbsp;&nbsp;
    		<a id="login_out" class="login_out" href="${ctx }/user/logout.do" target="_top" onclick="return exit_confirm();">
    			<i class="login_out_icon"></i>
    			退出登录
    		</a>
    	</div>
    </div>
  </body>
</html>
