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
import com.fin.service.DataDetailService;

/**
 * 图表controller
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/charts")
public class ChartsController {

	@Autowired
	private DataDetailService datadetailservice;
	
	/**
	 * 展示页面
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/show.do")
	public ModelAndView show(HttpServletRequest request,HttpServletResponse response){
		ModelAndView mav = new ModelAndView("main_charts");
		
		//获取当前月份
		Date now = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
		String date = sdf.format(now);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("date", date);
		
		mav.addObject("now", date);
		return mav;
	}
	
	/**
	 * 获取月预算数据
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/getMonthBudget.do")
	@ResponseBody
	public DataResult getDataMonth(HttpServletRequest request,HttpServletResponse response){
		DataResult result = new DataResult();
		//获取当前月份
		Date now = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
		String date = sdf.format(now);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("date", date);

		List<DataDetailModel> datas = datadetailservice.queryByMonth(map);
		
		result.setData(datas);
		return result;
	}
}
