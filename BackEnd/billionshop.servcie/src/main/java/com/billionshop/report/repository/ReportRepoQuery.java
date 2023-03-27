package com.billionshop.report.repository;

public class ReportRepoQuery {

	public static final String getInfoItemByShopId = "SELECT CAST(itm.itm_id AS text) AS itm_id, \r\n"
			+ "CASE \r\n"
			+ "WHEN itm_id = itm_id THEN CAST(sum(sm.sm_amount)*sum(sm.sm_quantity) AS text) \r\n"
			+ "END AS itm_sales,\r\n"
			+ "CASE \r\n"
			+ "WHEN itm_id = itm_id THEN CAST(sum(sm.sm_quantity) AS text) \r\n"
			+ "END AS itm_sell_quantity\r\n"
			+ "FROM bss_stock_movement sm\r\n"
			+ "LEFT JOIN bss_item itm ON itm.itm_id = sm.sm_itm_id \r\n"
			+ "WHERE  sm.sm_sh_id  = :shopId AND to_char(sm.sm_date ,'DD/MM/YYYY') =  to_char(CURRENT_DATE,'DD/MM/YYYY') AND sm.sm_transaction_type = '2'\r\n"
			+ "GROUP BY itm.itm_id \r\n"
			+ "ORDER BY itm.itm_code ASC";
	
	public static final String getInfoItemByItmId = "SELECT CAST(itm.itm_id AS text) AS itm_id, itm.itm_code AS itm_code, itm.itm_name AS itm_name,"
			+ "itm.itm_unit AS itm_unit, itm.itm_sell_unit AS itm_sell_unit, CAST(itm.itm_capacity AS text) AS itm_capacity\r\n"
			+ "FROM bss_item itm \r\n"
			+ "WHERE itm.itm_id = :itmId";
	
	public static final String findSaleReportByData = "SELECT itm.itm_id AS itm_id, itm.itm_code AS itm_code,itm.itm_name AS itm_name, \r\n"
			+ "itm.itm_unit AS itm_unit, itm.itm_sell_unit AS itm_sell_unit, itm.itm_capacity AS itm_capacity, \r\n"
			+ "CASE \r\n"
			+ "WHEN itm_id = itm_id THEN CAST(sum(sm.sm_amount)*sum(sm.sm_quantity) AS text) \r\n"
			+ "END AS itm_sales,\r\n"
			+ "CASE \r\n"
			+ "WHEN itm_id = itm_id THEN CAST(sum(sm.sm_quantity) AS text) \r\n"
			+ "END AS itm_sell_quantity\r\n"
			+ "FROM bss_stock_movement sm\r\n"
			+ "LEFT JOIN bss_item itm ON itm.itm_id = sm.sm_itm_id \r\n"
			+ "WHERE itm.itm_sh_id =:shopId AND (itm.itm_code LIKE %:data% OR itm.itm_name LIKE %:data%) \r\n"
			+ "AND (to_char(sm.sm_date ,'YYYY-MM-DD') BETWEEN :dateFrom AND :dateTo) AND sm.sm_transaction_type = '2' \r\n"
			+ "GROUP BY itm.itm_id,itm.itm_code, sm.sm_transaction_type \r\n"
			+ "ORDER BY itm.itm_code ASC";
	
	public static final String findSalesReportByBarcode = "SELECT itm.itm_id AS itm_id, itm.itm_code AS itm_code,itm.itm_name AS itm_name, \r\n"
			+ "itm.itm_unit AS itm_unit, itm.itm_sell_unit AS itm_sell_unit, itm.itm_capacity AS itm_capacity, bc.bc_code AS itm_barcode, \r\n"
			+ "CASE \r\n"
			+ "WHEN itm_id = itm_id THEN CAST(sum(sm.sm_amount)*sum(sm.sm_quantity) AS text) \r\n"
			+ "END AS itm_sales,\r\n"
			+ "CASE \r\n"
			+ "WHEN itm_id = itm_id THEN CAST(sum(sm.sm_quantity) AS text) \r\n"
			+ "END AS itm_sell_quantity\r\n"
			+ "FROM bss_stock_movement sm\r\n"
			+ "LEFT JOIN bss_item itm ON itm.itm_id = sm.sm_itm_id \r\n"
			+ "LEFT JOIN bss_barcode bc ON bc.bc_id = itm.itm_id \r\n"
			+ "WHERE bc.bc_code = :itmBarcode AND itm.itm_sh_id = :shopId AND sm.sm_transaction_type = '2'\r\n"
			+ "GROUP BY itm.itm_id, itm.itm_code, bc.bc_code, sm.sm_transaction_type \r\n"
			+ "ORDER BY itm.itm_code ASC";
	
	public static final String findSaleReportByDate = "SELECT itm.itm_id AS itm_id, itm.itm_code AS itm_code,itm.itm_name AS itm_name, \r\n"
			+ "itm.itm_unit AS itm_unit, itm.itm_sell_unit AS itm_sell_unit, itm.itm_capacity AS itm_capacity, \r\n"
			+ "CASE \r\n"
			+ "WHEN itm_id = itm_id THEN CAST(sum(sm.sm_amount)*sum(sm.sm_quantity) AS text) \r\n"
			+ "END AS itm_sales,\r\n"
			+ "CASE \r\n"
			+ "WHEN itm_id = itm_id THEN CAST(sum(sm.sm_quantity) AS text) \r\n"
			+ "END AS itm_sell_quantity \r\n"
			+ "FROM bss_stock_movement sm \r\n"
			+ "LEFT JOIN bss_item itm ON itm.itm_id = sm.sm_itm_id \r\n"
			+ "WHERE itm.itm_sh_id =:shopId AND (to_char(sm.sm_date ,'YYYY-MM-DD') BETWEEN :dateFrom AND :dateTo) AND sm.sm_transaction_type = '2'\r\n"
			+ "GROUP BY itm.itm_id, itm.itm_code, sm.sm_transaction_type \r\n"
			+ "ORDER BY itm.itm_code ASC";
}
