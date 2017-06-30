package com.fin.service;

import java.util.List;
import java.util.Map;

import com.fin.entity.DataDetailModel;

/**
 * 数据datadetailService
 * @author Administrator
 *
 */
public interface DataDetailService {

	/**
	 * 按照月加载数据
	 * @return
	 */
	public List<DataDetailModel> queryByMonth(Map<String, String> map);
	
	/**
	 * 根据部门号和年月获取数据（sum）
	 * @param map
	 * @return
	 */
	public List<DataDetailModel> queryByDeptnoAndMonth(Map<String, String> map);
	
	/**
	 * 根据年份加载数据
	 * @param map
	 * @return
	 */
	public List<DataDetailModel> queryByYear(Map<String, String> map);
	
	/**
	 * 根据部门号和年月获取数据
	 * @param map
	 * @return
	 */
	public List<DataDetailModel> queryByDeptnoAndDate(Map<String, String> map);
	
	/**
	 * 根据项目号和年月查找
	 * @param map
	 * @return
	 */
	public DataDetailModel findByItemnoAndDate(DataDetailModel data);
	
	/**
	 * 新增
	 * @param model
	 */
	public void save(DataDetailModel model);
	
	/**
	 * 更新
	 * @param model
	 */
	public void update(DataDetailModel model);
}
