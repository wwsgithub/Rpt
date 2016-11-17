package com.fin.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fin.entity.DataResult;
import com.fin.entity.Dept;
import com.fin.service.DeptService;

/**
 * 部门controller
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/dept")
public class DeptController {

	@Autowired
	private DeptService deptservice;
	
	/**
	 * 根据部门号查询单个部门
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/queryByDeptno.do")
	@ResponseBody
	public DataResult loadByDeptno(HttpServletRequest request,HttpServletResponse response){
		DataResult result = new DataResult();
		
		String deptno = request.getParameter("deptno");
		Dept d = new Dept();
		d.setDeptno(deptno);
		Dept dept = deptservice.findByDeptno(d);
		
		result.setData(dept);
		
		return result;
	}
	
	/**
	 * 加载所有部门的方法
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/queryAllDepts.do")
	public ModelAndView loadAllDepts(HttpServletRequest request,HttpServletResponse response){
		ModelAndView mav = new ModelAndView("/main_dept");
		List<Dept> depts = deptservice.loadAllDepts();
		mav.addObject("depts", depts);
		return mav;
	}
	
	/**
	 * 新增的方法
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/save.do")
	@ResponseBody
	public DataResult save(HttpServletRequest request,HttpServletResponse response,Dept dept){
		DataResult result = new DataResult();
		try {
			deptservice.insert(dept);
			System.out.println("add--"+dept.getDeptno());
			System.out.println(dept.getDeptname());
			System.out.println(dept.getEmpname());
			result.setStatus(0);
			result.setMsg("插入成功");
		} catch (Exception e) {
			e.printStackTrace();
			result.setStatus(1);
			result.setMsg("插入失败");
		}
		return result;
	}
	
	/**
	 * 更新
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/update.do")
	@ResponseBody
	public DataResult update(HttpServletRequest request,HttpServletResponse response,Dept dept){
		DataResult result = new DataResult();
		try {
			deptservice.update(dept);
			System.out.println(dept.getDeptname());
			System.out.println(dept.getEmpname());
			result.setStatus(0);
			result.setMsg("修改成功");
		} catch (Exception e) {
			e.printStackTrace();
			result.setStatus(1);
			result.setMsg("修改失败");
		}
		return result;
	}
	/**
	 * 删除的方法
	 * @param request
	 * @param response
	 * @param dept
	 * @return
	 */
	@RequestMapping("/remove.do")
	@ResponseBody
	public DataResult remove(HttpServletRequest request,HttpServletResponse response ,Dept dept){
		DataResult result = new DataResult();
		
		System.out.println(dept.getDeptno());
		System.out.println(dept.getDeptname());
		System.out.println(dept.getEmpname());
		try {
			deptservice.remove(dept);
			result.setStatus(0);
			result.setMsg("删除成功");
		} catch (Exception e) {
			e.printStackTrace();
			result.setStatus(0);
			result.setMsg("删除失败");
		}
		return result;
	}
	
}
