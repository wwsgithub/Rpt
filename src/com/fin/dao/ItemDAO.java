package com.fin.dao;

import java.util.List;

import com.fin.entity.Item;

public interface ItemDAO {

	/**
	 * 查找所有的项目
	 * @return
	 */
	public List<Item> findAll();
	
	/**
	 * 获取对应部门号的预算项
	 * @param deptno
	 * @return
	 */
	public List<Item> getByDeptno(String deptno);
	
	/**
	 * 获取指定编号的item
	 * @param itemno
	 * @return
	 */
	public Item getByItemno(String itemno);
	
	/**
	 * 修改预算项
	 * @param item
	 */
	public void modify(Item item);
	
	/**
	 * 新增
	 * @param item
	 */
	public void save(Item item);
	
	/**
	 * 删除
	 * @param item
	 */
	public void remove(Item item);
}
