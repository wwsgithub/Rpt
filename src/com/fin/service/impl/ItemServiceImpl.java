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
	
	@Override
	public List<Item> findALl() {
		return itemdao.findAll();
	}

	@Override
	public List<Item> getByDeptno(String deptno) {
		return itemdao.getByDeptno(deptno);
	}

	@Override
	public Item getByItemno(String itemno) {
		return itemdao.getByItemno(itemno);
	}

	@Override
	public void update(Item item) {
		itemdao.modify(item);
	}

	@Override
	public void insert(Item item) {
		itemdao.save(item);
	}

	@Override
	public void remove(Item item) {
		itemdao.remove(item);
	}
}
