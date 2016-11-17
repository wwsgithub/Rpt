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
import com.fin.entity.Item;
import com.fin.service.DeptService;
import com.fin.service.ItemService;

/**
 * 预算项controller
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/item")
public class ItemController {

	@Autowired
	private ItemService itemservice;
	
	@Autowired
	private DeptService deptservice;
	
	/**
	 * 查询全部预算项的方法
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/findAll.do")
	public ModelAndView findAll(HttpServletRequest request, HttpServletResponse response){
		ModelAndView mav = new ModelAndView("/main_item");
		List<Item> itemList = itemservice.findALl();
		mav.addObject("itemlist", itemList);
		System.out.println(itemList.size());
		List<Dept> depts = deptservice.loadAllDepts();
		mav.addObject("depts", depts);
		System.out.println(depts.size());
		return mav;
	}
	
	/**
	 * 通过部门号获取对应的预算项
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/getByDeptno.do")
	@ResponseBody
	public DataResult getByDeptno(HttpServletRequest request,HttpServletResponse response){
		DataResult result = new DataResult();
		
		String deptno = request.getParameter("deptno");
		List<Item> items = itemservice.getByDeptno(deptno);
		
		result.setData(items);
		return result;
	}
	
	/**
	 * 获取指定项目编号的项目
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/getByItemno.do")
	@ResponseBody
	public DataResult findOneByItemno(HttpServletRequest request,HttpServletResponse response){
		DataResult result = new DataResult();
		
		String itemno = request.getParameter("itemno");
		Item item = itemservice.getByItemno(itemno);
		
		result.setData(item);
		return result;
	}
	
	/**
	 * 修改预算项信息
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/update.do")
	@ResponseBody
	public DataResult update(HttpServletRequest request,HttpServletResponse response,Item item){
		DataResult result = new DataResult();
		try {
			System.out.println(item.getItemname());
			System.out.println(item.getCosttype());
			itemservice.update(item);
			result.setMsg("修改成功");
			result.setStatus(0);
		} catch (Exception e) {
			e.printStackTrace();
			result.setStatus(1);
			result.setMsg("修改失败");
		}
		return result;
	}
	
	/**
	 * 新增保存的方法
	 * @param request
	 * @param response
	 * @param item
	 * @return
	 */
	@RequestMapping("/save.do")
	@ResponseBody
	public DataResult save(HttpServletRequest request,HttpServletResponse response,Item item){
		DataResult result = new DataResult();
		try {
			System.out.println(item.getCosttype()+"--costtype");
			System.out.println(item.getDeptno());
			System.out.println(item.getId());
			System.out.println(item.getItemname());
			System.out.println(item.getItemno()+"--itemno");
			
			itemservice.insert(item);
			result.setMsg("保存成功");
			result.setStatus(0);
		} catch (Exception e) {
			e.printStackTrace();
			result.setMsg("保存失败");
			result.setStatus(1);
		}
		return result;
	}
	
	/**
	 * 删除方法
	 * @param request
	 * @param response
	 * @param item
	 * @return
	 */
	@RequestMapping("/remove.do")
	@ResponseBody
	public DataResult remove(HttpServletRequest request,HttpServletResponse response,Item item){
		DataResult result = new DataResult();
		try {
			itemservice.remove(item);
			result.setStatus(0);
			result.setMsg("删除成功");
		} catch (Exception e) {
			e.printStackTrace();
			result.setStatus(1);
			result.setMsg("删除失败");
		}
		return result;
	}
}
