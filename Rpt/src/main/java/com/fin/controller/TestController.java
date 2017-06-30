package com.fin.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicHeader;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.fin.entity.AdvertModel;
import com.fin.entity.DataResult;

/**
 * 测试 controller
 * @author 26046
 *
 */
@Controller
@RequestMapping("/test")
public class TestController {

	@RequestMapping("/test.do")
	public DataResult findAll(HttpServletRequest request,HttpServletResponse response){
		DataResult result = new DataResult();
		
		try {
			HttpPost httpPost = new HttpPost("http://interface.1hai.cn/api/Session");
			httpPost.addHeader(HTTP.CONTENT_TYPE, "application/json");
			JSONObject param = new JSONObject();
			param.put("loginName", "132");
            param.put("password", "1352");
            param.put("IP", "1654");
			StringEntity sEntity = new StringEntity(param.toJSONString(), "UTF-8");
			sEntity.setContentType("text/json");
			sEntity.setContentEncoding(new BasicHeader(HTTP.CONTENT_TYPE, "application/json"));
			httpPost.setEntity(sEntity);
			HttpResponse res = new DefaultHttpClient().execute(httpPost);
			String resp = EntityUtils.toString(res.getEntity(), "UTF-8");
			System.out.println(resp);
			result.setData(resp);
		} catch (UnsupportedEncodingException e) {  
            e.printStackTrace();  
        } catch (ClientProtocolException e) {  
            e.printStackTrace();  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
        return result;  
	}
}
