package com.fin.service;

import java.util.List;

import com.fin.entity.Item;

/**
 * 项目表的service
 * @author Administrator
 *
 */
public interface ItemService {

	/**
	 * 查询全部项目
	 * @return
	 */
	public List<Item> findALl();
	
	/**
	 * 获取部门号对应的预算项
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
	 * 更新预算项
	 * @param item
	 */
	public void update(Item item);
	
	/**
	 * 新增
	 * @param item
	 */
	public void insert(Item item);
	
	/**
	 * 删除
	 * @param item
	 */
	public void remove(Item item);
}
