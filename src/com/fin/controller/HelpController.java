package com.fin.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * 帮助页面Controller
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/help")
public class HelpController {

	/**
	 * 跳转help页面
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/show.do")
	public ModelAndView show(HttpServletRequest request,HttpServletResponse response){
		ModelAndView mav = new ModelAndView("help");
		return mav;
	}
}
