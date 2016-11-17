package com.fin.test;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.apache.commons.codec.digest.DigestUtils;

public class MD5Test {

	public static void main(String[] args) {
		String md5 = DigestUtils.md5Hex("1");
		System.out.println(md5);
	}
}
