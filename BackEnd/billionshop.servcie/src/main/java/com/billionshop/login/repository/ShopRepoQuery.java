package com.billionshop.login.repository;

public class ShopRepoQuery {

	public static final String findShopId = "SELECT sh_id AS shopId\r\n"
			+ "FROM ShopEntity \r\n"
			+ "WHERE sh_code = :sh_code";
	
	public static final String findLastedShopId = "SELECT max(sh_id) AS shopId\r\n"
			+ "	FROM ShopEntity";
	
//	public static final String findShopCode = "SELECT sh_code AS shopCode\r\n"
//			+ "FROM ShopEntity \r\n"
//			+ "Order By sh_code DESC\r\n"
//			+ "Limit 1";

}
