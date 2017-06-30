package com.fin.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fin.dao.ItemDAO;
import com.fin.entity.Item;
import com.fin.service.ItemService;

@Service("itemService")
public class ItemServiceImpl implements ItemService{

	@Autowired
	private ItemDAO itemdao;
	
	public List<Item> findALl() {
		return itemdao.findAll();
	}

	public List<Item> getByDeptno(String deptno) {
		return itemdao.getByDeptno(deptno);
	}

	public Item getByItemno(String itemno) {
		return itemdao.getByItemno(itemno);
	}

	public void update(Item item) {
		itemdao.modify(item);
	}

	public void insert(Item item) {
		itemdao.save(item);
	}

	public void remove(Item item) {
		itemdao.remove(item);
	}
}
