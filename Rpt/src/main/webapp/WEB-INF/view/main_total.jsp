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
		.h{
			display:none;
		}
		.s{
			display:block;
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
		th,td{
			width: 100px;
		}
		#total_tab tr:hover{
			background-color: #EBEE55;
			cursor:pointer;
		}
		#export_excel:hover{
			background-color:#41FF30;
			cursor:pointer;
		}
	</style>
	
	<script type="text/javascript">
		$(function(){
			var now = "${now}";
			$("#date_choose_month").val(now);
			
			$.ajax({
				url:"${ctx}/costtotal/queryByMonth.do",
				type:"post",
				data:{"date":"${now}","ym":"0"},
				datatype:"json",
				async:false,
				success:function(result){
					var list = result.data;
					
					if(list.length == 0){
						var str_tr = "<caption>暂无数据</caption>";
						var $str_tr = $(str_tr);
						$("#total_tab").empty();
						$("#total_tab").append($str_tr);
					}else{
						var str_tr = "<tr><th>部门</th><th>责任人</th><th>预算</th><th>财务凭证</th><th>人工凭证</th><th>凭证合计</th><th>对比</th></tr>";
						var total_refer;
						var compare;
						for(var i = 0;i<list.length;i++){
							total_refer = list[i].finance_refer + list[i].personal_refer;
							compare = list[i].budget - total_refer;
							str_tr += "<tr onclick='dept_detail(this);' title='"+list[i].deptno+"'><td>"+list[i].deptname+"</td><td>"+list[i].empname+"</td><td>"+list[i].budget+"</td><td>"+list[i].finance_refer+"</td><td>"+list[i].personal_refer+"</td><td>"+total_refer+"</td><td>"+compare+"</td></tr>";
						}
						var $str_tr = $(str_tr);
						$("#total_tab").empty();
						$("#total_tab").append($str_tr);
					}
				},
				error:function(){
					alert("查询异常，请稍候再试");
				}
			});
		});
	
		function show_click(){
			//获取维度
			var ym = $("#yearOrMonth").val();
			
			if("0" == ym){					//月度
				var date = $("#date_choose_month").val();
				if(date == "" || date == null){
					layer.tips("请选择日期","#date_choose_month",{
						tips:2
					});
					return;
				}
				$.ajax({
					url:"${ctx}/costtotal/queryByMonth.do",
					type:"post",
					data:{"date":date,"ym":ym},
					datatype:"json",
					async:false,
					success:function(result){
						var list = result.data;
						
						if(list.length == 0){
							var str_tr = "<caption>暂无数据</caption>";
							var $str_tr = $(str_tr);
							$("#total_tab").empty();
							$("#total_tab").append($str_tr);
						}else{
							var str_tr = "<tr><th>部门</th><th>责任人</th><th>预算</th><th>财务凭证</th><th>人工凭证</th><th>凭证合计</th><th>对比</th></tr>";
							var total_refer;
							var compare;
							var budget;
							var finance_refer;
							var personal_refer;
							for(var i = 0;i<list.length;i++){
								budget = list[i].budget==null?0:list[i].budget;
								finance_refer = list[i].finance_refer==null?0:list[i].finance_refer;
								personal_refer = list[i].personal_refer==null?0:list[i].personal_refer;
								total_refer = list[i].finance_refer + list[i].personal_refer;
								compare = list[i].budget - total_refer;
								str_tr += "<tr onclick='dept_detail(this);' title='"+list[i].deptno+"'><td>"+list[i].deptname+"</td><td>"+list[i].empname+"</td><td>"+budget+"</td><td>"+finance_refer+"</td><td>"+personal_refer+"</td><td>"+total_refer+"</td><td>"+compare+"</td></tr>";
							}
							var $str_tr = $(str_tr);
							$("#total_tab").empty();
							$("#total_tab").append($str_tr);
						}
					},
					error:function(){
						alert("查询异常，请稍候再试");
					}
				});
			}else if("1" == ym){			//年度
				var date = $("#date_choose_year").val();
				if(date == "" || date == null){
					layer.tips("请选择日期","#date_choose_year",{
						tips:2
					});
					return;
				}
				$.ajax({
					url:"${ctx}/costtotal/queryByYear.do",
					type:"post",
					data:{"date":date},
					datatype:"json",
					async:false,
					success:function(result){
						var list = result.data;
						
						if(list.length == 0){
							var str_tr = "<caption>暂无数据</caption>";
							var $str_tr = $(str_tr);
							$("#total_tab").empty();
							$("#total_tab").append($str_tr);
						}else{
							var str_tr = "<tr><th>日期</th><th>预算</th><th>财务凭证</th><th>人工凭证</th><th>凭证合计</th><th>对比</th></tr>";
							var total_refer;
							var compare;
							for(var i = 0;i<list.length;i++){
								total_refer = list[i].finance_refer + list[i].personal_refer;
								compare = list[i].budget - total_refer;
								str_tr += "<tr style='cursor:auto'><td>"+list[i].recordtimestring+"</td><td>"+list[i].budget+"</td><td>"+list[i].finance_refer+"</td><td>"+list[i].personal_refer+"</td><td>"+total_refer+"</td><td>"+compare+"</td></tr>";
							}
							var $str_tr = $(str_tr);
							$("#total_tab").empty();
							$("#total_tab").append($str_tr);
						}
					},
					error:function(){
						alert("加载年份数据异常，请稍候再试");
					}
				});
			}
		}
		
		function dept_detail(ah){
			var deptno = $(ah).attr("title");
			//获取维度
			var ym = $("#yearOrMonth").val();
			var date_input_id = ym=="0"?"date_choose_month":"date_choose_year";
			var date = $("#"+date_input_id).val();
			layer.open({
				type : 2,
				skin : 'layer-ext-moon',
				title : '详细信息',
				shadeClose : true,
				maxmin : true, //开启最大化最小化按钮
				area : [ '80%', '80%' ],
				content : "${ctx}/costtotal/detail_show.do?ym="+ym+"&date="+date+"&deptno="+deptno //iframe的url
			});
		}
		
		//维度改变，时间控件改变
		function date_input_change(){
			var ym = $("#yearOrMonth").val();
			if("0" == ym){
				$("#date_choose_month").css("display","inline-block");
				$("#date_choose_year").css("display","none");
			}else if("1" == ym){
				$("#date_choose_month").css("display","none");
				$("#date_choose_year").css("display","inline-block");
			}
		}
		
		//导出Excel表格
		function export_excel(){
			var tab = document.getElementById("total_tab");
			var length = tab.rows.length;
			if(length == 0){
				layer.tips("当前暂无表格数据，无法导出Excel",tab,{
					tips:2
				});
				return;
			}
			
			//获取维度
			var ym = $("#yearOrMonth").val();
			
			if("0" == ym){					//月度
				var date = $("#date_choose_month").val();
				window.location.href = "${ctx}/export/export.do?date="+date+"&ym="+ym;
			}else if("1" == ym){			//年度
				var date = $("#date_choose_year").val();
				window.location.href = "${ctx}/export/export.do?date="+date+"&ym="+ym;
			}			
		}
	</script>
  </head>
  
  <body>
	<h3 class="h4-title">费用汇总</h3>
	<div id="export_excel" style="margin-left:20px;background:#AA7A53;border-radius:3px;color:white;font-size: x-small;width:60px;height:25px;text-align: center;line-height: 25px;" onclick="javascript:export_excel();">导出Excel</div>
	<div class="main_item">
		<div style="margin-top:15px;">
			<label style="margin-left:5%;">请选择维度：</label>
			<select id="yearOrMonth" class="input-text" style="width:80px" onchange="date_input_change();">
				<option value="0">月度</option>
				<option value="1">年度</option>
			</select>
			<span style="font-size:medium;margin-left:15%;">请选择日期：</span>
			<input style="display: inline-block;" class="input-text" type="text" id="date_choose_month" onclick="WdatePicker({dateFmt:'yyyy-MM'});">
			<input style="display: none;" class="input-text" type="text" id="date_choose_year" onclick="WdatePicker({dateFmt:'yyyy'});">
			
			<a style="margin-left:5%;" class="show_btn" href="javascript:void(0);" onclick="show_click();">查看</a>
		</div>
	</div>
	
	<div>
		<table id="total_tab" class="hovertable">
			
		</table>
	</div>
  </body>
</html>
