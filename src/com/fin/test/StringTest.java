package com.fin.test;

import java.util.Date;
import java.util.Locale;

import org.junit.Test;

public class StringTest {
	/*
	String.format()用法
	 
	1、转换符
	%s: 字符串类型，如："ljq"
	%b: 布尔类型，如：true
	%d: 整数类型(十进制)，如：99
	%f: 浮点类型，如：99.99
	%%: 百分比类型，如：％
	%n: 换行符
	 */
	@Test
	public void test1(){
	 String str=null;
	    str=String.format("Hi, %s", "林计钦"); // 格式化字符串
	    System.out.println(str); // 输出字符串变量str的内容
	    System.out.printf("3>7的结果是：%b %n", 3>7);
	    System.out.printf("100的一半是：%d %n", 100/2);
	    System.out.printf("50元的书打8.5折扣是：%f 元%n", 50*0.85);
	    System.out.printf("上面的折扣是%d%% %n", 85);
	}
	/*
	2、常见日期时间格式化
	c: 包括全部日期和时间信息 星期六 十月 27 14:21:20 CST 2007
	F: "年-月-日"格式，如：2007-10-27
	D: "月/日/年"格式，如：10/27/07
	r: "HH:MM:SS PM"格式(12时制)，如：02:25:51 下午
	T: "HH:MM:SS"格式(24时制)，如：14:28:16
	R: "HH:MM"格式(24时制)，如：14:28
	 */
	@Test
	public void test2(){
	    Date date=new Date(); // 创建日期对象
	    System.out.printf("全部日期和时间信息：%tc%n", date);//格式化输出日期或时间
	    System.out.printf("年-月-日格式：%tF%n", date);
	    System.out.printf("月/日/年格式：%tD%n", date);
	    System.out.printf("HH:MM:SS PM格式(12时制)：%tr%n", date);
	    System.out.printf("HH:MM:SS格式(24时制)：%tT%n", date);
	    System.out.printf("HH:MM格式(24时制)：%tR%n", date);
	}
	/*
	3、格式化日期字符串
	b或者h: 月份简称，如
	中：十月
	英：Oct
	 
	B: 月份全称，如
	中：十月
	英：October
	  
	a: 星期的简称，如
	中：星期六
	英：Sat
	  
	A: 星期的全称，如：
	中：星期六
	英：Saturday
	 
	C: 年的前两位数字(不足两位前面补0)，如：20
	y: 年的后两位数字(不足两位前面补0)，如：07
	Y: 4位数字的年份(不足4位前面补0)，如：2007
	j: 一年中的天数(即年的第几天)，如：300 
	m: 两位数字的月份(不足两位前面补0)，如：10
	d: 两位数字的日(不足两位前面补0)，如：27
	e: 月份的日(前面不补0)，如：5
	 */
	@Test
	public void test3(){
	    Date date=new Date();                                                                             // 创建日期对象
	    String str=String.format(Locale.US,"英文月份简称：%tb",date);      // 格式化日期字符串
	    System.out.println(str);                                                                              // 输出字符串内容
	    System.out.printf("本地月份简称：%tb%n",date);
	    str=String.format(Locale.US,"英文月份全称：%tB",date);
	    System.out.println(str);
	    System.out.printf("本地月份全称：%tB%n",date);
	    str=String.format(Locale.US,"英文星期的简称：%ta",date);
	    System.out.println(str);
	    System.out.printf("本地星期的简称：%tA%n",date);
	    System.out.printf("年的前两位数字(不足两位前面补0)：%tC%n",date);
	    System.out.printf("年的后两位数字(不足两位前面补0)：%ty%n",date);
	    System.out.printf("一年中的天数(即年的第几天)：%tj%n",date);
	    System.out.printf("两位数字的月份(不足两位前面补0)：%tm%n",date);
	    System.out.printf("两位数字的日(不足两位前面补0)：%td%n",date);
	    System.out.printf("月份的日(前面不补0)：%te",date);
	}
	/*
	4、格式化时间字符串
	H: 2位数字24时制的小时(不足2位前面补0)，如：15
	I: 2位数字12时制的小时(不足2位前面补0)，如：03
	k: 2位数字24时制的小时(前面不补0)，如：15
	l: 2位数字12时制的小时(前面不补0)，如：3
	M: 2位数字的分钟(不足2位前面补0)，如：03
	S: 2位数字的秒(不足2位前面补0)，如：09
	L: 3位数字的毫秒(不足3位前面补0)，如：015
	N: 9位数字的毫秒数(不足9位前面补0)，如：562000000
	 
	p: 小写字母的上午或下午标记，如：
	中：下午
	英：pm
	  
	z: 相对于GMT的RFC822时区的偏移量，如：+0800
	Z: 时区缩写字符串，如：CST
	s: 1970-1-1 00:00:00 到现在所经过的秒数，如：1193468128
	Q: 1970-1-1 00:00:00 到现在所经过的毫秒数，如：1193468128984
	 
	 */
	@Test
	public void test4(){
	    Date date=new Date();                               // 创建日期对象
	    System.out.printf("2位数字24时制的小时(不足2位前面补0):%tH%n",date);
	    System.out.printf("2位数字12时制的小时(不足2位前面补0):%tI%n",date);
	    System.out.printf("2位数字24时制的小时(前面不补0):%tk%n",date);
	    System.out.printf("2位数字12时制的小时(前面不补0):%tl%n",date);
	    System.out.printf("2位数字的分钟(不足2位前面补0):%tM%n",date);
	    System.out.printf("2位数字的秒(不足2位前面补0):%tS%n",date);
	    System.out.printf("3位数字的毫秒(不足3位前面补0):%tL%n",date);
	    System.out.printf("9位数字的毫秒数(不足9位前面补0):%tN%n",date);
	    String str=String.format(Locale.US,"小写字母的上午或下午标记(英)：%tp",date);
	    System.out.println(str);                          // 输出字符串变量str的内容
	    System.out.printf ("小写字母的上午或下午标记(中)：%tp%n",date);
	    System.out.printf("相对于GMT的RFC822时区的偏移量:%tz%n",date);
	    System.out.printf("时区缩写字符串:%tZ%n",date);
	    System.out.printf("1970-1-1 00:00:00 到现在所经过的秒数：%ts%n",date);
	    System.out.printf("1970-1-1 00:00:00 到现在所经过的毫秒数：%tQ%n",date);
	}
}
