package com.fin.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fin.entity.DataResult;
import com.fin.entity.User;
import com.fin.service.UserService;

/**
 * 用户Controller
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/user")
public class UserController {

	@Resource
	private UserService userService;
	
	/**
	 * 登录页面检查
	 * @param request
	 * @param response
	 */
	@RequestMapping("/login.do")
	@ResponseBody
	public DataResult login(HttpServletRequest request,
			HttpServletResponse response){
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		DataResult result = userService.checkLogin(username, password);
		request.getSession().setAttribute("user", (User)result.getData());
		
		return result;
	}
	
	/**
	 * 退出登录
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/logout.do")
	public ModelAndView log(HttpServletRequest request,HttpServletResponse response){
		ModelAndView mav = new ModelAndView();
		mav.setViewName("login");
		return mav;
	}
	
	/**
	 * 修改密码页面请求
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/changepwd.do")
	public ModelAndView changePwd(HttpServletRequest request,HttpServletResponse response){
		ModelAndView mav = new ModelAndView("pwd_change");
		return mav;
	}
	
	/**
	 * 修改密码
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/updatepwd.do")
	@ResponseBody
	public DataResult updatePwd(HttpServletRequest request,HttpServletResponse response){
		DataResult result = new DataResult();
		
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		Map<String, String> map = new HashMap<String, String>();
		map.put("username", username);
		map.put("password", password);
		
		try {
			userService.modifyPwd(map);
			result.setMsg("修改成功");
			result.setStatus(0);
		} catch (Exception e) {
			e.printStackTrace();
			result.setMsg("修改失败");
			result.setStatus(1);
		}
		return result;
	}
}
