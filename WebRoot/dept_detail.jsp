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
	<link rel="stylesheet" type="text/css" href="css/common.css">

	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/WdatePicker.js"></script>
	<script type="text/javascript" src="js/layer/layer.js"></script>
	
	<style type="text/css">
		table{
			font-size: 16px;
		    margin: 0 auto;
		    border-spacing: 2pt;
		    border-collapse: separate;
		    width:80%;
		    margin-bottom:20px;
		}
		table.hovertable {
			color:#333333;
			border-width: 1px;
			border-color: #999999;
			border-collapse: collapse;
		}
		table.hovertable th {
			background-color:#c3dde0;
			border-width: 1px;
			padding: 8px;
			border-style: solid;
			border-color: #a9c6c9;
		}
		table.hovertable tr {
			background-color:#d4e3e5;
		}
		table.hovertable td {
			border-width: 1px;
			padding: 8px;
			border-style: solid;
			border-color: #a9c6c9;
		}
		th,td{
			width: 100px;
		}
		#total_tab tr:hover{
			background-color: #EBEE55;
			cursor:pointer;
		}
	</style>
	
	<script type="text/javascript">
	</script>
  </head>
  
  <body>
  	<table class="hovertable">
  		<tr>
  			<th>项目名称</th>
	  		<th>预算</th>
	  		<th>财务凭证</th>
	  		<th>人工凭证</th>
	  		<th>凭证合计</th>
	  		<th>对比</th>
  		</tr>
  		<c:forEach items="${items }" var="item">
  			<tr>
  				<td>${item.itemname }</td>
  				<td>${item.budget }</td>
  				<td>${item.finance_refer }</td>
  				<td>${item.personal_refer }</td>
  				<td>${item.finance_refer + item.personal_refer }</td>
  				<td>${item.budget - item.finance_refer - item.personal_refer}</td>
  			</tr>
  		</c:forEach>
  	</table>
  </body>
</html>
