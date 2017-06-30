package com.fin.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fin.entity.DataDetailModel;
import com.fin.entity.DataResult;
import com.fin.entity.Dept;
import com.fin.service.DataDetailService;
import com.fin.service.DeptService;

/**
 * 费用汇总Controller
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/costtotal")
public class CostTotalController {
	
	@Autowired
	private DataDetailService datadetailservice;
	
	@Autowired
	private DeptService deptservice;
	
	/**
	 * 费用汇总展示页面
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/show.do")
	public ModelAndView show(HttpServletRequest request,HttpServletResponse response){
		ModelAndView mav = new ModelAndView("main_total");
		
		List<Dept> depts = deptservice.loadAllDepts();
		
		mav.addObject("depts", depts);
		
		//默认先加载当前月所有数据
		//获取当前月份
		Date now = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
		String date = sdf.format(now);
		
		mav.addObject("now", date);
		
		return mav;
	}
	
	/**
	 * 获取给定月份下各个部门的数据
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/queryByMonth.do")
	@ResponseBody
	public DataResult queryByMonth(HttpServletRequest request,HttpServletResponse response){
		DataResult result = new DataResult();
		
		String date = request.getParameter("date");
		System.out.println("date:"+date);
		Map<String, String> map = new HashMap<String, String>();
		map.put("date", date);
		
		List<DataDetailModel> datas = datadetailservice.queryByMonth(map);
		
		result.setData(datas);
		return result;
	}
	
	/**
	 * 点击表格加载详细数据--跳转子页面
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/detail_show.do")
	public ModelAndView detail(HttpServletRequest request,HttpServletResponse response){
		ModelAndView mav = new ModelAndView("dept_detail");
		
		String ym = request.getParameter("ym");
		String date = request.getParameter("date");
		String deptno = request.getParameter("deptno");
		
		System.out.println(date+"-----");
		System.out.println(deptno);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("date", date);
		map.put("deptno", deptno);
		
		if("0".equals(ym)){//月度
			List<DataDetailModel> lists = datadetailservice.queryByDeptnoAndMonth(map);
			mav.addObject("items", lists);
		}
		return mav;
	}
	
	/**
	 * 查询一年数据
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/queryByYear.do")
	@ResponseBody
	public DataResult queryByYear(HttpServletRequest request,HttpServletResponse response){
		DataResult result = new DataResult();
		
		String date = request.getParameter("date");
		System.out.println("date:"+date);
		Map<String, String> map = new HashMap<String, String>();
		map.put("date", date);
		
		List<DataDetailModel> lists = datadetailservice.queryByYear(map);
		result.setData(lists);
		
		return result;
	}
}
