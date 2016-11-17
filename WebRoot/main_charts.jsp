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
    <link rel="stylesheet" href="css/main_charts.css" type="text/css" />

	<script type="text/javascript" src="js/jquery.min.js"></script>
	
	<style type="text/css">
		.p-text{
		    font-size: 14px;
		    color: #000000;
		    line-height: 24px;
		    text-align: center;
		}
		html,body{
            background: #eceeef;
        }
	</style>
	
	<script type="text/javascript">
	</script>
	
	<script>
        $(function(){
        	var budgets;
        	
            function humanPiechart(){
            	var sdata = [];
            	
            	
            	$.ajax({
            		url:"${ctx}/charts/getMonthBudget.do",
            		type:"post",
            		datatype:"json",
            		async:false,
            		success:function(result){
            			budgets = result.data;
            			for(var i = 0;i<budgets.length;i++){
            				sdata.push({value:(budgets[i].budget==null?0:budgets[i].budget),name:budgets[i].deptname});
            			}
            		},
            		error:function(){
            			
            		}
            	});

                var option = {
                    title:{
                        text:'预算比例',
                        left:'center',
                        top:'center',
                        textStyle:{
                            fontSize:'14',
                            fontWeight:'normal'
                        }
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    color:['#4d82e6','#a69def','#d6b4f6','#f3b770','#d3ab0b','#009e96','#4db2e6','#A0B4DC','#4B7D74','#82DE8B','#3399FF','#DD5044'],
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            hoverAnimation:true,
                            radius : ['40%','65%'],
                            center: ['50%', '50%'],
                            label:{
                                normal:{
                                    formatter:function(params){
                                        //console.log(params);
                                        return params.data.name+' '+params.percent+'%'
                                    }
                                },
                                emphasis:{

                                }
                            },
                            data:sdata
                        }
                    ]
                };
                var myChart01 = echarts.init(document.getElementById('humanPieChart'));
                myChart01.setOption(option,true);
                return myChart01;
            }
            var chartBar02 = humanPiechart();

			var sdata_value = [];
			var sdata_name = [];
			for(var i = 0;i<budgets.length;i++){
   				sdata_value.push((budgets[i].budget==null?0:budgets[i].budget));
   				sdata_name.push(budgets[i].deptname);
   			}

            //humanLineChart
            function humanLineChart(){
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },

                    grid: {
                        top:10,
                        left: '3%',
                        right: '20',
                        bottom: '0',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        show:false,
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#3b4555',
                                width: 1,
                                type: 'dashed'
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#2a68ab',
                                width: 1,
                                type: 'solid'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#000000',
                                fontSize: '14',
                                fontFamily: "微软雅黑"
                            }
                        },
                        data: sdata_name
                    },
                    color:['#5f8fea'],
                    series: [
                        {
                            name: '预算值统计',
                            type: 'bar',
                            barWidth:16,
                            label: {
                                normal: {
                                    show: true,
                                    formatter:function (params) {
                                        return params.data;
                                    },
                                    textStyle:{
                                        color:'#333333',
                                        fontSize:14
                                    },
                                    position: 'right'
                                }
                            },
                            data: sdata_value
                        }
                    ]
                };
                var myChart01 = echarts.init(document.getElementById('humanLineChart'));
                myChart01.setOption(option,true);
                return myChart01;
            }
            var chartBar03 = humanLineChart();

			var newdata = [];
			for(var i = 0;i<budgets.length;i++){
   				newdata.push({value:(budgets[i].budget==null?0:budgets[i].budget),name:budgets[i].deptname});
   			}
			function newChart(){
				option = {
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        x: 'left',
				        data:sdata_name
				    },
				    series: [
				        {
				            name:'访问来源',
				            type:'pie',
				            selectedMode: 'single',
				            radius: [0, '30%'],
				
				            label: {
				                normal: {
				                    position: 'inner'
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            data:[
				                {value:335, name:'直达', selected:true},
				                {value:679, name:'营销广告'},
				                {value:1548, name:'搜索引擎'}
				            ]
				        },
				        {
				            name:'访问来源',
				            type:'pie',
				            radius: ['40%', '55%'],
				
				            data:newdata
				        }
				    ]
				};
				var newChart = echarts.init(document.getElementById('newChart'));
                newChart.setOption(option,true);
                return newChart;
			}
			var newChart = newChart();
			
            $(window).resize(function(){
                chartBar02.resize();
                chartBar03.resize();
                newChart.resize();
            });

        });
    </script>
  </head>
  
  <body>
  	<div style="margin:0 auto;margin-top:5%;margin-right:10%;">
        <!--图表统计管理 start-->
        <div class="mod-box" style="height:420px;">
            <h4 class="mod-title"><span><i class="icon-human"></i>图表统计管理</span></h4>
            <div class="mod-content">
                <div class="human-box">
                	<div class="number-statistic-box">
                        <p class="p-time">当前月：</p>
                        <i>${now}</i>
                    </div>
                    <div class="chart-box">
                        <div  class="chart-01">
                            <div id="humanPieChart" style="width: 100%; height: 150%;"></div>
                        </div>
                        <div  class="chart-02">
                            <div id="humanLineChart" style="width: 100%; height: 150%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div  class="chart-01">
            <div id="newChart" style="width: 100%; height: 100%;"></div>
        </div>
        <!--图表统计管理 end-->
     </div>
  </body>
  <script src="js/echarts.min.js"></script>
</html>
