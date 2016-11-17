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
	
	<script type="text/javascript">
	</script>
  </head>
  
  <body style="border-right:1px solid #A0B4DC;">
    <!-- main-left -->
    <div class='card-holder'>
    	<!-- 部门管理 -->
    	<c:if test="${user.role == '1' }">
    		<div class='card-wrapper'>
			    <a class="card_hover" href="${ctx }/dept/queryAllDepts.do" target="main">
			      <div class='card bg-01'>
			        <span class='card-content'>部门管理</span>
			      </div>
			    </a>
		  	</div>
    	</c:if>
    	<!-- 部门管理 end-->
    	
    	<!-- 预算项管理 -->
		  <div class='card-wrapper'>
		    <a href='${ctx }/item/findAll.do' target="main">
		      <div class='card bg-02'>
		        <span class='card-content'>预算项管理</span>
		      </div>
		    </a>
		  </div>
		  <!-- 预算项管理 end-->
		  
		  <div class='card-wrapper'>
		    <a href='${ctx }/costtotal/show.do' target="main">
		      <div class='card bg-03'>
		        <span class='card-content'>费用汇总</span>
		      </div>
		    </a>
		  </div>
		  
		  <c:if test="${user.role != '1' }">
			  <div class='card-wrapper'>
			    <a href='${ctx }/datain/show.do' target="main">
			      <div class='card bg-04'>
			        <span class='card-content'>数据管理</span>
			      </div>
			    </a>
			  </div>
		  </c:if>
		  <div class='card-wrapper'>
		    <a href='${ctx }/charts/show.do' target="main">
		      <div class='card bg-05'>
		        <span class='card-content'>图表展示</span>
		      </div>
		    </a>
		  </div>
		  
		  <!-- 公告通知 -->
		  <div class='card-wrapper'>
		    <a href='${ctx }/advert/showad.do' target="main">
		      <div class='card bg-06'>
		        <span class='card-content'>公告通知</span>
		      </div>
		    </a>
		  </div>
		  <!-- 公告通知 end-->
		  
		  <!-- 帮助页面 -->
		  <div class='card-wrapper'>
		    <a href='${ctx }/help/show.do' target="main">
		      <div class='card bg-06' style="background:#814463;">
		        <span class='card-content'>帮助页面</span>
		      </div>
		    </a>
		  </div>
		  <!-- 帮助页面 end-->
	</div>
  </body>
</html>
