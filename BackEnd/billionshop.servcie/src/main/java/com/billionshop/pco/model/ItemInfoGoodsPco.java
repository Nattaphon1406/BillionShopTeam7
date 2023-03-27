package com.billionshop.pco.model;

import lombok.Data;

@Data
public class ItemInfoGoodsPco {
	Integer itm_id;
	String itm_name;
	String itm_code;
	Float itm_capacity;
	String itm_unit;
	Integer itm_quantity_per_unit;
	String itm_order_unit;
	Integer itm_order_Pack;
	String itm_sell_unit;
	Integer itm_order_quantity;

}
