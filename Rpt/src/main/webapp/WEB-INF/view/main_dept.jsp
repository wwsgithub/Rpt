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

	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/layer/layer.js"></script>
	<script type="text/javascript" src="js/jquery.form.js"></script>
	
	<style type="text/css">
		#dept_div li:hover{
			color:blue;
		}
		.input-text{
			display:none;
			background: #ffffff;
		    border: 1px solid #c9c9c9;
		    height: 25px;
		    width: 100px;
		    padding-left: 5px;
		    border-radius: 5px;
		}
		.td-text{
			text-align:right;
		}
		td{
			padding: 6px 5px 6px 0;
		}
		.h{
			display: none;
		}
		.s{
			display: block;
		}
	</style>
	<script type="text/javascript">
		function click_li(ah){
			//修改、删除按钮出现，新增按钮消失
			$("#modify_btn").show();
			$("#del_btn").show();
			$("#add_btn").hide();
			
			$("#dept_form").show();
			$("#form_add").hide();
			
			var deptno = $(ah).attr("title");
			
			$.ajax({
				url:"${ctx}/dept/queryByDeptno.do",
				type:"post",
				data:{"deptno":deptno},
				dateType:"json",
				success:function(result){
					var dept = result.data;
					$("#deptno_span").text(dept.deptno);
					$("#deptname_span").text(dept.deptname);
					$("#empname_span").text(dept.empname);
					$("#deptno_input").val($("#deptno_span").text());
					$("#deptname_input").val($("#deptname_span").text());
					$("#empname_input").val($("#empname_span").text());
					
					$("#dept_form").find(".span-text").show();
					$("#dept_form").find(".input-text").hide();
					$("#dept_form").find(".save-btn").hide();
				},
				error:function(){
					alert("加载异常");
				}
			});
			
			$("#dept_detail").show();
		}
		
		//点击修改按钮
		function edit(){
			//保存按钮出现
			$("#dept_form").find('.save-btn').show();
			
			$("#deptno_input").val($("#deptno_span").text());
			$("#deptname_input").val($("#deptname_span").text());
			$("#empname_input").val($("#empname_span").text());
		
			$("#dept_form").find(".span-text").hide();
			$("#dept_form").find(".input-text").show();
		}
		
		//检查部门号唯一性
		function checkDeptno(id){
			var isfind = false;
			var deptno = $("#"+id).val();
			if(deptno == "" || deptno == null){
				layer.tips('部门号不能为空', '#'+id, {
				  tips: 2
				});
				return;
			}
			$.ajax({
				url:"${ctx}/dept/queryByDeptno.do",
				type:"post",
				data:{"deptno":deptno},
				async:false,
				datatype:"json",
				success:function(result){
					var dept = result.data;
					if(dept != null){
						isfind = true;
						layer.tips('已存在相应的部门号', '#'+id, {
						  tips: 2
						});
					}
				},
				error:function(){
					alert("加载异常，请稍候再试");
				}
			});
			return isfind;
		}
		
		//保存
		function save_confirm(ah,type){
			if("modify" == type){//修改
				//判断部门名称负责人姓名是否为空
				var deptname = $("#deptname_input").val();
				var empname = $("#empname_input").val();
				
				if(deptname == "" || deptname == null){
					layer.tips('部门名称不能为空', '#deptname_input', {
					  tips: 2
					});
					return;
				}
				if(empname == "" || empname == null){
					layer.tips('负责人不能为空', '#empname_input', {
					  tips: 2
					});
					return;
				}
				$("#dept_form").ajaxSubmit({
				    url: '${ctx}/dept/update.do',
				    type:"post",
				    async:false,
				    dataType:"json",
				    success:function(result) {
				       	layer.tips(result.msg, ah, {
						  tips: 2
						});
						setTimeout(function (){
							window.location.href = "${ctx}/dept/queryAllDepts.do";
						},1000);
				    },
				    error:function(){
						alert("加载信息异常，请刷新后重试");
				    }
				});
			}else if("add" == type){//新增
				var deptno = $("#deptno_input_add").val();
				var deptname = $("#deptname_input_add").val();
				var empname = $("#empname_input_add").val();
			
				if(deptno == "" || deptno == null){
					layer.tips('部门号不能为空', '#deptno_input_add', {
					  tips: 2
					});
					return;
				}
				if(deptname == "" || deptname == null){
					layer.tips('部门名称不能为空', '#deptname_input_add', {
					  tips: 2
					});
					return;
				}
				if(empname == "" || empname == null){
					layer.tips('负责人不能为空', '#empname_input_add', {
					  tips: 2
					});
					return;
				}
				//部门号唯一性检查
				if(checkDeptno("deptno_input_add")){
					 return;
				}
				$("#form_add").ajaxSubmit({
				    url: '${ctx}/dept/save.do',
				    type:"post",
				    async:false,
				    dataType:"json",
				    success:function(result) {
				       	layer.tips(result.msg, ah, {
						  tips: 2
						});
						setTimeout(function (){
							window.location.href = "${ctx}/dept/queryAllDepts.do";
						},1000);
				    },
				    error:function(){
						alert("加载信息异常，请刷新后重试");
				    }
				});
			}
		}
		
		//部门新增方法
		function add(){
			$("#dept_form").hide();
			$("#form_add").show();
		}
		
		function remove_confirm(){
			if(confirm("确定删除吗？")){
				$("#dept_form").ajaxSubmit({
					url:"${ctx}/dept/remove.do",
					type:"post",
					async:false,
					dataType:"json",
					success:function(result){
						alert(result.msg);
						window.location.href = "${ctx}/dept/queryAllDepts.do";
					},
					error:function(){
						alert("信息异常，请刷新后重试");
					}
				});
			}
		}
	</script>
  </head>
  
  <body>
  	<h3 class="h4-title">部门管理</h3>
	<!-- main-body -->
	<div id="main_div">
		<h4 class="h4-title">当前所有部门：</h4>
		
		<div id="dept_div" style="width:15%;height:80%;margin-left:20%;background:#FBF5E8;float:left;border-radius:5px 0 0 5px;">
			<ul style="">
				<c:forEach items="${depts }" var="dept">
					<li style="margin-top:10px;cursor:pointer;" onclick="javascript:click_li(this);" title="${dept.deptno }">
						${dept.deptname }
					</li>
				</c:forEach>
			</ul>
		</div>
		
		<div id="dept_detail" style="width:40%;height:80%;background:#FFD3D6;float:left;">
			<!-- 修改、新增、删除 -->
			<a id="modify_btn" title="修改" class="edit-a h" href="javascript:void(0);" onclick="javascript:edit();"><i class="icon-edite"></i></a>
			<a id="add_btn" title="增加" class="add-a" href="javascript:void(0);"><i class="icon-add-orange" onclick="javascript:add();"></i></a>
			<a id="del_btn" title="删除" class="remove-a h" href="javascript:void(0);" onclick="remove_confirm();"><i class="icon-deleta-orange"></i></a>
			<!-- 修改、新增、删除 end -->
			
			<form id="dept_form">
				<!-- 保存 -->
				<a style="display:none;" class="save-btn" href="javascript:void(0);" onclick="save_confirm(this,'modify');">保存</a>
				<!-- 保存 end-->
				
				<table style="margin:0 auto;margin-top:23%;" id="tab_edit">
					<tr>
						<td class="td-text">部门号：</td>
						<td>
							<span id="deptno_span" class="span-text">无</span>
							<input name="deptno" type="text" class="input-text" id="deptno_input" readonly="readonly" title="部门号不允许修改">
						</td>
					</tr>
					<tr>
						<td class="td-text">部门名称：</td>
						<td>
							<span id="deptname_span" class="span-text">无</span>
							<input name="deptname" type="text" class="input-text" id="deptname_input">
						</td>
					</tr>
					<tr>
						<td class="td-text">负责人：</td>
						<td>
							<span id="empname_span" class="span-text">无</span>
							<input name="empname" type="text" class="input-text" id="empname_input">
						</td>
					</tr>
				</table>
			</form>
			
			<form id="form_add" class="h">
			
				<a class="save-btn s" href="javascript:void(0);" onclick="save_confirm(this,'add');">保存</a>
				
				<!-- 用于新增的隐藏table -->
				<table style="margin:0 auto;margin-top:23%;" id="tab_add">
					<tr>
						<td class="td-text">部门号：</td>
						<td>
							<input name="deptno" type="text" class="input-text s" id="deptno_input_add" onblur="checkDeptno('deptno_input_add');" onkeyup="value=value.replace(/[^\d]/g,'');">
						</td>
					</tr>
					<tr>
						<td class="td-text">部门名称：</td>
						<td>
							<input name="deptname" type="text" class="input-text s" id="deptname_input_add">
						</td>
					</tr>
					<tr>
						<td class="td-text">负责人：</td>
						<td>
							<input name="empname" type="text" class="input-text s" id="empname_input_add">
						</td>
					</tr>
				</table>
				<!-- 用于新增的隐藏table end-->
			</form>
		</div>
	</div>
  </body>
</html>