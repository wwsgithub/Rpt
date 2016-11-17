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
	<script type="text/javascript" src="js/layer/layer.js"></script>
	<script type="text/javascript" src="js/jquery.form.js"></script>
	
	<style type="text/css">
		
	</style>
	
	<script type="text/javascript">
		function deptlist_click(ah){
			var deptno = $(ah).parent().attr("title");
			$.ajax({
				url:"${ctx}/item/getByDeptno.do",
				type:'post',
				data:{"deptno":deptno},
				dataType:"json",
				success:function(result){
					var items = result.data;
					var sli = "";
					if(items.length != 0){
						for(var i = 0;i<items.length;i++){
							sli += "<li title='"+items[i].itemno+"' style='margin-top:10px;cursor:pointer;' onclick='javascript:itemli_click(this);'>"+items[i].itemname+"</li>";
						}
					}else{
						layer.tips('当前部门暂无项目可以查看', ah, {
						  tips: 3
						});
					}
					var $sli = $(sli);
					$("#itemlists ul").empty();
					$("#itemlists ul").append($sli);
				},
				error:function(){
					layer.tips('加载异常，请稍候再试', ah, {
					  tips: 3
					});
				}
			});
		}
		
		function itemli_click(ah){
			$("#modify_btn").show();
			$("#del_btn").show();
			
			$("#item_form").show();
			$("#item_form_add").hide();
			
			var itemno = $(ah).attr("title");
			//发送ajax请求，获取点击item项的信息
			$.ajax({
				url:"${ctx}/item/getByItemno.do",
				type:"post",
				data:{"itemno":itemno},
				dataType:"json",
				success:function(result){
					var item = result.data;
					//初始化item detail
					$("#itemno_span").text(item.itemno);
					$("#itemname_span").text(item.itemname);
					$("#deptno_span").text(item.deptno);
					$("#costtype_span").text(item.costtype=='0'?"变动费用":"固定费用");
					
					//向input中存值
					$("#itemno_input").val($("#itemno_span").text());
					$("#itemname_input").val($("#itemname_span").text());
					$("#deptno_input").val($("#deptno_span").text());
					$("#costtype_input").val(item.costtype);
					
					//span出现，input隐藏，保存按钮隐藏
					$("#item_form").find(".span-text").show();
					$("#item_form").find(".input-text").hide();
					$("#item_form").find(".save_btn").hide();
				},
				error:function(){
					layer.tips('加载预算项异常，请稍候再试',ah,{
						tips:3
					});
				}
			});
		}
		
		$(function(){
			var role = '${user.role}';
			//如果是部门负责人，item列表提前加载
			if(role == '0'){
				deptlist_click("#emp_dept");
			}
		});
		
		//点击修改按钮
		function edit(){
			//保存按钮出现
			$("#item_form").find('.save-btn').show();
			
			$("#item_form").find(".span-text").hide();
			$("#item_form").find(".input-text").show();
		}
		
		//点击保存按钮
		function save_btn(ah,type){
			if("modify" == type){
				var itemname = $("#itemname_input").val();
				var costtype = $("#costtype_input").val();
				
				if(itemname == "" || itemname == null){
					layer.tips('项目名称不能为空','#itemname_input',{
						tips:2
					});
					return ;
				}
				if(costtype == "" || costtype == null){
					layer.tips("项目类型不能为空","#costtype_input",{
						tips:2
					});
					return ;
				}
				$(ah).parent().ajaxSubmit({
					url:"${ctx}/item/update.do",
					type:"post",
					dataType:"json",
					success:function(result){
						layer.tips(result.msg, ah, {
						  tips: 3
						});
						setTimeout(function (){
							window.location.href = "${ctx}/item/findAll.do";
						},1000);
					},
					error:function(){
						alert("加载信息异常，请稍候再试");
					}
				});
			}else if("add" == type){
				var itemno = $("#itemno_input_add").val();
				var itemname = $("#itemname_input_add").val();
				
				//判断项目编号和项目名称是否为空
				if(itemno == "" || itemno == null){
					layer.tips("项目编号不能为空","#itemno_input_add",{
						tips:2
					});
					return;
				}
				if(itemname == "" || itemname == null){
					layer.tips("项目名称不能为空","#itemname_input_add",{
						tips:2
					});
					return;
				}
				//项目编号唯一性检查
				if(itemno_check("itemno_input_add")){
					return;
				}
				$("#item_form_add").ajaxSubmit({
					url:"${ctx}/item/save.do",
					type:"post",
					datatype:"json",
					success:function(result){
						layer.tips(result.msg,ah,{
							tips:2
						});
						setTimeout(function (){
							window.location.href="${ctx}/item/findAll.do";
						},1000);
					},
					error:function(){
						alert("保存异常，请稍候再试");
					}
				});
			}
		}
		
		//新增add
		function add(){
			$("#item_form").hide();
			$("#item_form_add").show();
			
			//清空原来新增form的值
			$("#itemno_input_add").val("");
			$("#itemname_input_add").val("");
			$("#costtype_input_add").val("0");
		}
		
		//项目编号唯一性检查
		function itemno_check(id){
			var isfind = false;
			var itemno = $("#"+id).val();
			if(itemno == "" || itemno == null){
				layer.tips("项目编号不能为空","#"+id,{
					tips:2
				});
				return;
			}
			$.ajax({
				url:"${ctx}/item/getByItemno.do",
				type:"post",
				data:{"itemno":itemno},
				async:false,
				datatype:"json",
				success:function(result){
					if(result.data != null){
						isfind = true;
						layer.tips("该项目编号已存在","#"+id,{
							tips:2
						});
					}
				},
				error:function(){
					alert("加载异常，请稍候再试");
				}
			});
			return isfind;
		}
		
		//删除方法
		function del(){
			if(confirm("确定删除吗？")){
				$("#item_form").ajaxSubmit({
					url:"${ctx}/item/remove.do",
					type:"post",
					datatype:"json",
					async:false,
					success:function(result){
						alert(result.msg);
						window.location.href="${ctx}/item/findAll.do";
					},
					error:function(){
						alert("删除异常，请稍候再试");
					}
				});
			}
		}
	</script>
  </head>
  
  <body>
	<h3 class="h4-title">预算项管理</h3>
	<div class="main_item">
		<h4 class="h4-title" style="margin-top:5px;">部门：</h4>
		<label style="font-size:medium;margin-left:10px;">部门名称：</label>
		
		<!-- 管理员 -->
		<c:if test="${user.role == '1' }">
			<ul id="dept_ul">
				<c:forEach items="${depts }" var="dept">
					<li title="${dept.deptno }">
						<a onclick="javascript:deptlist_click(this);">${dept.deptname }</a>
					</li>
				</c:forEach>
			</ul>
		</c:if>
		
		<!-- 部门责任人 -->
		<c:if test="${user.role == '0' }">
			<c:forEach items="${depts }" var="dept">
				<c:if test="${dept.deptno == user.departmentno }">
					<label style="font-size:medium;margin-left:10px;" title="${dept.deptno }"><label id="emp_dept">${dept.deptname }</label></label>
				</c:if>
			</c:forEach>
		</c:if>
	</div>
	
	<!-- 预算项list -->
	<div id="itemlists" style="margin-top:20px;width:40%;background:#FBF5E8;float:left;">
		<ul>
			
		</ul>
	</div>
	<!-- 预算项list end-->
	
	<!-- 预算项detail -->
	<div id="itemlists_detail" style="margin-top:20px;width:50%;background:#F7EED6;float:left;border-radius:0 8px 8px 0;">
		
		<!-- 管理员不对项目进行维护 -->
		<c:if test="${user.role == '0' }">
			<!-- 增删改 -->
			<a id="modify_btn" title="修改" class="edit-a h" href="javascript:void(0);" onclick="javascript:edit();"><i class="icon-edite"></i></a>
			<a id="add_btn" title="增加" class="add-a" href="javascript:void(0);"><i class="icon-add-orange" onclick="javascript:add();"></i></a>
			<a id="del_btn" title="删除" class="remove-a h" href="javascript:void(0);" onclick="del();"><i class="icon-deleta-orange"></i></a>
			<!-- 增删改 end -->
		</c:if>
		
		<form id="item_form">
			<!-- 保存 -->
			<a style="display:none;" class="save-btn" href="javascript:void(0);" onclick="save_btn(this,'modify');">保存</a>
			<!-- 保存 end-->
			
			<table style="margin:0 auto;margin-top:15%;margin-bottom: 15%;">
				<tr>
					<td class="td-text">项目编号：</td>
					<td>
						<span id="itemno_span" class="span-text">无</span>
						<input name="itemno" type="text" class="input-text h" id="itemno_input" readonly="readonly" title="编号不允许修改">
					</td>
				</tr>
				<tr>
					<td class="td-text">项目名称：</td>
					<td>
						<span id="itemname_span" class="span-text">无</span>
						<input name="itemname" type="text" class="input-text h" id="itemname_input" style="width:220px">
					</td>
				</tr>
				<tr>
					<td class="td-text">所属部门编号：</td>
					<td>
						<span id="deptno_span" class="span-text">无</span>
						<input name="deptno" type="text" class="input-text h" id="deptno_input" readonly="readonly" title="所属部门编号不允许修改">
					</td>
				</tr>
				<tr>
					<td class="td-text">项目类型：</td>
					<td>
						<span id="costtype_span" class="span-text">无</span>
						<!-- <input name="costtype" type="text" class="input-text h" id="costtype_input"> -->
						<select name="costtype" class="input-text h" id="costtype_input">
							<option value="0">变动费用</option>
							<option value="1">固定费用</option>
						</select>
					</td>
				</tr>
			</table>
		</form>
		
		<!-- 用于新增的隐藏form -->
		<form id="item_form_add" class="h">
			<!-- 保存 -->
			<a class="save-btn s" href="javascript:void(0);" onclick="save_btn(this,'add');">保存</a>
			<!-- 保存 end-->
			
			<table style="margin:0 auto;margin-top:15%;margin-bottom: 15%;">
				<tr>
					<td class="td-text">项目编号：</td>
					<td>
						<input name="itemno" type="text" class="input-text s" id="itemno_input_add" onkeyup="value=value.replace(/[^\d]/g,'');" onblur="javascript:itemno_check('itemno_input_add');">
					</td>
				</tr>
				<tr>
					<td class="td-text">项目名称：</td>
					<td>
						<input name="itemname" type="text" class="input-text s" id="itemname_input_add" style="width:220px">
					</td>
				</tr>
				<tr>
					<td class="td-text">所属部门编号：</td>
					<td>
						<input name="deptno" type="text" class="input-text s" id="deptno_input_add" readonly="readonly" value="${user.departmentno }">
					</td>
				</tr>
				<tr>
					<td class="td-text">项目类型：</td>
					<td>
						<!-- <input name="costtype" type="text" class="input-text s" id="costtype_input"> -->
						<select name="costtype" class="input-text s" id="costtype_input_add">
							<option value="0">变动费用</option>
							<option value="1">固定费用</option>
						</select>
					</td>
				</tr>
			</table>
		</form>
		<!-- 用于新增的隐藏form end-->
	</div>
	<!-- 预算项detail end-->
  </body>
</html>
