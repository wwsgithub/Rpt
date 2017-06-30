package com.fin.dao;

import java.util.List;
import java.util.Map;

import com.fin.entity.DataDetailModel;

/**
 * DataDetailDAO
 * @author Administrator
 *
 */
public interface DataDetailDAO {

	/**
	 * 按照月份查询数据
	 * @return
	 */
	public List<DataDetailModel> queryByMonth(Map<String, String> map);
	
	/**
	 * 加载指定年月下的部门详细信息（sum）
	 * @param map
	 * @return
	 */
	public List<DataDetailModel> getByDeptnoAndMonth(Map<String, String> map);
	
	/**
	 * 按照年查询数据
	 * @param map
	 * @return
	 */
	public List<DataDetailModel> queryByYear(Map<String, String> map);
	
	/**
	 * 加载指定年月下的部门详细信息
	 * @param map
	 * @return
	 */
	public List<DataDetailModel> getByDeptnoAndDate(Map<String, String> map);
	
	/**
	 * 根据项目编号和时间查找
	 * @param map
	 * @return
	 */
	public DataDetailModel getByItemnoAndDate(DataDetailModel data);
	
	/**
	 * 新增
	 * @param model
	 */
	public void insert(DataDetailModel model);
	
	/**
	 * 更新
	 * @param model
	 */
	public void update(DataDetailModel model);
}
