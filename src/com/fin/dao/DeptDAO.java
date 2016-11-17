package com.fin.dao;

import java.util.List;

import com.fin.entity.Dept;

/**
 * DeptDAO
 * @author Administrator
 *
 */
public interface DeptDAO {

	/**
	 * 加载所有部门信息
	 * @return
	 */
	public List<Dept> findAll();
	
	/**
	 * 根据部门号查找
	 * @param deptno
	 * @return
	 */
	public Dept findByDeptno(Dept d);
	
	/**
	 * 更新
	 * @param dept
	 */
	public void update(Dept dept);
	
	/**
	 * 插入
	 * @param dept
	 */
	public void insert(Dept dept);
	
	/**
	 * 删除
	 * @param dept
	 */
	public void remove(Dept dept);
}
