package com.billionshop.items.model;

import lombok.Data;
@Data
public class ItemsPutUpdateRequest{
	Integer itm_id;
	String itm_name;
	Double itm_capacity;
	Integer itm_price;
	Integer itm_cost;
	Integer itm_min_quantity;
	Integer itm_order_quantity;
	Integer itm_purchase_frequency;
	String itm_unit;
	String itm_status;
	String itm_order_unit;
	String itm_sell_unit;
	String itm_img_path;
	String itm_update_by;
}