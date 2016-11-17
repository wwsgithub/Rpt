package com.fin.controller;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fin.entity.DataDetailModel;
import com.fin.service.DataDetailService;

/**
 * 导出ExcelController
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/export")
public class ExportController {

	@Autowired
	private DataDetailService datadetailservice;
	
	/**
	 * 导出
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("/export.do")
	public void export(HttpServletRequest request,HttpServletResponse response) throws IOException{
		String ym = request.getParameter("ym");
		String date = request.getParameter("date");
		
		List<DataDetailModel> lists;
		
		if("0".equals(ym)){//月度表格
			Map<String, String> map = new HashMap<String, String>();
			map.put("date", date);
			
			lists = datadetailservice.queryByMonth(map);
		
		
		String path = request.getSession().getServletContext().getRealPath("/");
		path = path.replace("\\", "/");
		path += "excel/temp.xls";
		
		HSSFWorkbook wb = null;
		try {
			wb = new HSSFWorkbook(new FileInputStream(path));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		HSSFSheet sheet = wb.getSheetAt(0);
		
		HSSFRow row = sheet.getRow(0);
		for(int i = 0;i<lists.size();i++){
			DataDetailModel model = lists.get(i);
			row = sheet.createRow(i+1);
			
			double budget = model.getBudget()==null?0:model.getBudget();
			double fin_refer = model.getFinance_refer()==null?0:model.getFinance_refer();
			double per_refer = model.getPersonal_refer()==null?0:model.getPersonal_refer();
			row.createCell(0).setCellValue(model.getDeptname());
			row.createCell(1).setCellValue(model.getEmpname());
			row.createCell(2).setCellValue(budget);
			row.createCell(3).setCellValue(fin_refer);
			row.createCell(4).setCellValue(per_refer);
			row.createCell(5).setCellValue(per_refer+fin_refer);
			row.createCell(6).setCellValue(budget-fin_refer-per_refer);
		}
		
		response.setHeader("Cache-Control", "no-store");
		response.setHeader("Pragma", "no-cache");
		response.setDateHeader("Expires", 0);
		OutputStream out = null;
		
		out = response.getOutputStream();
		response.addHeader("Content-Disposition", "attachment;filename="+new String("月报表".getBytes("gb2312"),"ISO-8859-1")+ ".xls");
		response.setContentType("application/msexcel;charset=GBK");
		wb.write(out);
		
		}else{//年度表格
			Map<String, String> map = new HashMap<String, String>();
			map.put("date", date);
			
			lists = datadetailservice.queryByYear(map);
			
			String path = request.getSession().getServletContext().getRealPath("/");
			path = path.replace("\\", "/");
			path += "excel/temp_year.xls";
			
			HSSFWorkbook wb = null;
			try {
				wb = new HSSFWorkbook(new FileInputStream(path));
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			HSSFSheet sheet = wb.getSheetAt(0);
			
			HSSFRow row = sheet.getRow(0);
			for(int i = 0;i<lists.size();i++){
				DataDetailModel model = lists.get(i);
				row = sheet.createRow(i+1);
				
				double budget = model.getBudget()==null?0:model.getBudget();
				double fin_refer = model.getFinance_refer()==null?0:model.getFinance_refer();
				double per_refer = model.getPersonal_refer()==null?0:model.getPersonal_refer();
				row.createCell(0).setCellValue(model.getRecordtimestring());
				row.createCell(1).setCellValue(budget);
				row.createCell(2).setCellValue(fin_refer);
				row.createCell(3).setCellValue(per_refer);
				row.createCell(4).setCellValue(per_refer+fin_refer);
				row.createCell(5).setCellValue(budget-fin_refer-per_refer);
			}
			
			response.setHeader("Cache-Control", "no-store");
			response.setHeader("Pragma", "no-cache");
			response.setDateHeader("Expires", 0);
			OutputStream out = null;
			
			out = response.getOutputStream();
			response.addHeader("Content-Disposition", "attachment;filename="+new String("年报表".getBytes("gb2312"),"ISO-8859-1")+ ".xls");
			response.setContentType("application/msexcel;charset=GBK");
			wb.write(out);
		}
	}
}
