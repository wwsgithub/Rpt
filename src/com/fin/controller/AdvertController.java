package com.fin.controller;

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

import com.fin.entity.AdvertModel;
import com.fin.entity.DataResult;
import com.fin.service.AdvertService;

/**
 * 公告通知controller
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/advert")
public class AdvertController {

	@Autowired
	private AdvertService advertservice;
	
	/**
	 * 请求所有公告
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/showad.do")
	public ModelAndView findAll(HttpServletRequest request,HttpServletResponse response){
		ModelAndView mav = new ModelAndView();
		List<AdvertModel> adverts = advertservice.findAll();
		mav.addObject("adverts", adverts);
		mav.setViewName("main");
		return mav;
	}
	
	/**
	 * 新增公告
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/save.do")
	@ResponseBody
	public DataResult save(HttpServletRequest request,HttpServletResponse response){
		DataResult result = new DataResult();
		
		String tilte = request.getParameter("title");
		String content = request.getParameter("content");
		String istop = request.getParameter("istop");
		Map<String, String> map = new HashMap<String, String>();
		map.put("title", tilte);
		map.put("content", content);
		map.put("istop", istop);
		
		try {
			advertservice.insert(map);
			result.setMsg("保存成功");
			result.setStatus(0);
		} catch (Exception e) {
			e.printStackTrace();
			result.setMsg("保存失败");
			result.setStatus(1);
		}
		return result;
	}
}
