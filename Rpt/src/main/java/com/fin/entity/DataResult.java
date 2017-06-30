package com.fin.entity;

/**
 * 固定的结果格式
 * @author Administrator
 *
 */
public class DataResult {

	/**
	 * 状态
	 */
	private int status;
	/**
	 * 消息
	 */
	private String msg;
	/**
	 * 数据
	 */
	private Object data;
	
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
}
