package com.billionshop.items.model;

import lombok.Data;
@Data
public class FindItemsListResponse {
	Integer itm_id;
	String itm_code;
	String itm_name;
	String img;
	Double itm_capacity;
	String itm_unit;
	Integer itm_quantity_per_unit;
	String itm_order_unit;
	String itm_sell_unit;
	Integer itm_stock;
}
