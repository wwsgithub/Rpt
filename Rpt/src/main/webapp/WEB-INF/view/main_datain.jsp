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
		.p-text{
		    font-size: 14px;
		    color: #000000;
		    line-height: 24px;
		    text-align: center;
		}
		.show_btn{
			width: 64px;
		    height: 30px;
		    line-height: 30px;
		    background: #f6710c;
		    text-align: center;
		    color: #fff;
		    font-size: 14px;
		    border-radius: 3px;
		    display: block;
		    text-decoration: none;
		    margin-left:20px;
		    margin-bottom: 15px;
		    margin-top:10px;
		}
		table{
			font-size: 16px;
		    margin: 0 auto;
		    border-spacing: 2pt;
		    border-collapse: separate;
		    margin-top:20px;
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
		table.hovertable td input{
			width:80px;
			height:20px;
			border-radius:6px;
			border:1px solid #A9A9A9;
			text-align:center;
			background-color:#F4F4F4;
		}
	</style>
	
	<script type="text/javascript">
		function insert_confirm(){
			var date = $("#date_choose_month").val();
			var deptno = "${user.departmentno}";
			
			//日期不为空
			if(date == "" || date == null){
				layer.tips("日期不能为空","#date_choose_month",{
					tips:3
				});
				return;
			}
			
			//遍历表格获得数据，发送更新请求
			$("#datain_tab tr:gt(0)").each(function(){
				var itemno = $(this).children().eq(1).text();
				var budget = $(this).children().eq(2).children().val();
				var finance_refer = $(this).children().eq(3).children().val();
				var personal_refer = $(this).children().eq(4).children().val();
				$.ajax({
					url:"${ctx}/datain/saveOrUpdate.do",
					type:"post",
					data:{"itemno":itemno,"deptno":deptno,"budget":budget,"finance_refer":finance_refer,"personal_refer":personal_refer,"recordtime":date+"-01"},
					async:false,
					datatype:"json",
					success:function(result){
						
					},
					error:function(){
						alert("数据库异常，请稍候再试");
					}
				});			
			});
			
			window.location.href="${ctx}/datain/show.do";
		}
		
		$(function(){
			//日期控件显示当前时间
			$("#date_choose_month").val("${now}");
		});
		
		//日期控件值改变
		function date_change(){
			var date = $("#date_choose_month").val();
			var deptno = "${user.departmentno}";
			$.ajax({
				url:"${ctx}/datain/getItem.do",
				type:"post",
				data:{"date":date,"deptno":deptno},
				datatype:"json",
				success:function(result){
					var list = result.data;
					if(list.length==0){
						alert("加载数据失败，请检查日期格式");
					}else{
						$("#datain_tab").empty();
						var str_tr = "<tr><th>项目名称</th><th>项目编号</th><th>预算</th><th>财务凭证</th><th>人工凭证</th></tr>";
						
						var budget;
						var finance_refer;
						var personal_refer;
						//遍历数据，生成表格
						for(var i = 0;i<list.length;i++){
							budget = list[i].budget==null?0:list[i].budget;
							finance_refer = list[i].finance_refer==null?0:list[i].finance_refer;
							personal_refer = list[i].personal_refer==null?0:list[i].personal_refer;
							str_tr += "<tr><td>"+list[i].itemname+"</td><td>"+list[i].itemno+"</td><td><input type='text' value='"+budget+"'></td><td><input type='text' value='"+finance_refer+"'></td><td><input type='text' value='"+personal_refer+"'></td></tr>";
						}
						var $str_tr = $(str_tr);
						$("#datain_tab").append($str_tr);
					}
				},
				error:function(){
					alert("加载数据信息异常，请稍候再试");
				}
			});
		}
	</script>
  </head>
  
  <body>
  	<div class="main_item" style="min-height:60px;">
		<label class="h4-title" style="margin-top:5px;">部门：
			<c:if test="${user.role == '0' }">
				<c:forEach items="${depts }" var="dept">
					<c:if test="${dept.deptno == user.departmentno }">
						<label style="font-size:medium;margin-left:10px;" title="${dept.deptno }"><label id="emp_dept">${dept.deptname }</label></label>
					</c:if>
				</c:forEach>
			</c:if>
		</label><br>
		
  		<a style="margin-left:5%;display: inline-block;" class="show_btn" href="javascript:void(0);" onclick="insert_confirm();">保存</a>
		<span style="font-size:medium;margin-left:15%;">请选择日期：</span>
		<input class="input-text" type="text" id="date_choose_month" onclick="WdatePicker({dateFmt:'yyyy-MM'});" onchange="date_change();">
	</div>
	
	<!-- 录入数据的表格 -->
	<div>
		<table id="datain_tab" class="hovertable">
			<tr>
				<th>项目名称</th>
				<th>项目编号</th>
				<th>预算</th>
				<th>财务凭证</th>
				<th>人工凭证</th>
			</tr>
			<c:forEach items="${lists }" var="d">
				<tr>
					<td>${d.itemname }</td>
					<td>${d.itemno }</td>
					<td><input type="text" value="${d.budget==null?0:d.budget}"></td>
					<td><input type="text" value="${d.finance_refer==null?0:d.finance_refer }"></td>
					<td><input type="text" value="${d.personal_refer==null?0:d.personal_refer }"></td>
				</tr>
			</c:forEach>
		</table>
	</div>
	<!-- 录入数据的表格 end-->
  </body>
</html>
