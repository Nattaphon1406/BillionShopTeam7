package com.billionshop.report.model;

import lombok.Data;

@Data
public class ReportResponse {
	Integer itm_sell_quantity;
	Float itm_capacity;
	String itm_sales;
	Float itm_sales_all;
	String itm_name;
	String itm_code;
	String itm_unit;
	String itm_sell_unit;

}
