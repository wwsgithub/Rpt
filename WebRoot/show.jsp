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
	
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/layer/layer.js"></script>
	
  </head>
  
  <frameset rows="80,*" cols="*" framespacing="0" frameborder="no" border="0">
  	<frame src="${ctx }/index/top.do" name="topFrame" scrolling="no" noresize="noresize" id="topFrame" title="topFrame">
  	<frameset cols="220,*" framespacing="0"  frameborder="no" border="0"  id="ba">
  		<frame src="${ctx }/index/left.do" name="leftFrame" scrolling="auto" noresize="noresize" id="leftFrame" title="leftFrame" /> 
  		<frame src="${ctx }/index/main.do" name="main" id="main" title="main" />
  	</frameset>
  </frameset>
  
  <body>
  	
  </body>
</html>
