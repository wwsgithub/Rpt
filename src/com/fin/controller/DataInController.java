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
import com.fin.entity.User;
import com.fin.service.DataDetailService;
import com.fin.service.DeptService;

/**
 * 数据录入Controller
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/datain")
public class DataInController {

	@Autowired
	private DeptService deptservice;
	
	@Autowired
	private DataDetailService datadetailservice;
	
	/**
	 * 加载数据录入页面
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/show.do")
	public ModelAndView show(HttpServletRequest request,HttpServletResponse response){
		ModelAndView mav = new ModelAndView("main_datain");
		Map<String, String> map = new HashMap<String, String>();
		
		User user = (User)request.getSession().getAttribute("user");
		String deptno = user.getDepartmentno();
		//获取当前时间
		Date now = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
		String date = sdf.format(now);
		
		map.put("date", date);
		map.put("deptno", deptno);
		
		//加载部门
		List<Dept> depts = deptservice.loadAllDepts();
		//加载表格数据
		List<DataDetailModel> lists = datadetailservice.queryByDeptnoAndDate(map);
		
		mav.addObject("depts", depts);
		mav.addObject("lists", lists);
		mav.addObject("now", date);
		return mav;
	}
	
	/**
	 * 获取给定部门和年月下的项目
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/getItem.do")
	@ResponseBody
	public DataResult getItems(HttpServletRequest request,HttpServletResponse response){
		DataResult result = new DataResult();
		
		String deptno = request.getParameter("deptno");
		String date = request.getParameter("date");
		Map<String, String> map = new HashMap<String, String>();
		map.put("deptno", deptno);
		map.put("date", date);
		
		List<DataDetailModel> lists = datadetailservice.queryByDeptnoAndDate(map);
		
		result.setData(lists);
		return result;
	}
	
	/**
	 * 保存或更新的方法
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/saveOrUpdate.do")
	@ResponseBody
	public DataResult saveOrUpdate(HttpServletRequest request,HttpServletResponse response){
		DataResult result = new DataResult();
		
		DataDetailModel data = new DataDetailModel();
		data.setItemno(Integer.parseInt(request.getParameter("itemno")));
		data.setDeptno(Integer.parseInt(request.getParameter("deptno")));
		data.setBudget(Double.parseDouble(request.getParameter("budget")));
		data.setFinance_refer(Double.parseDouble(request.getParameter("finance_refer")));
		data.setPersonal_refer(Double.parseDouble(request.getParameter("personal_refer")));
		data.setRecordtimestring(request.getParameter("recordtime"));
		
		System.out.println(data.toString());
		
		DataDetailModel model = datadetailservice.findByItemnoAndDate(data);
		if(model == null){//插入
			try {
				datadetailservice.save(data);
				result.setMsg("插入成功");
				result.setStatus(0);
			} catch (Exception e) {
				e.printStackTrace();
				result.setMsg("插入失败");
				result.setStatus(1);
			}
		}else{//更新
			try {
				datadetailservice.update(data);
				result.setMsg("更新成功");
				result.setStatus(0);
			} catch (Exception e) {
				e.printStackTrace();
				result.setMsg("更新失败");
				result.setStatus(1);
			}
		}
		return result;
	}
}
