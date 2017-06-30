package com.fin.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * 数据展示主体页面：
 * top/left/main
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/index")
public class IndexController {

	@RequestMapping("/index.do")
	public ModelAndView index(HttpServletResponse response,HttpServletRequest request){
		System.out.println("index");
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/show");
		return mav;
	}
	
	@RequestMapping("/top.do")
	public ModelAndView top(HttpServletResponse response,HttpServletRequest request){
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/top");
		return mav;
	}
	
	@RequestMapping("/left.do")
	public ModelAndView left(HttpServletRequest request,HttpServletResponse response){
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/left");
		return mav;
	}
	
	@RequestMapping("/main.do")
	public ModelAndView main(HttpServletRequest request,HttpServletResponse response){
		ModelAndView mav = new ModelAndView();
		mav.setViewName("redirect:/advert/showad.do");
		return mav;
	}
}
