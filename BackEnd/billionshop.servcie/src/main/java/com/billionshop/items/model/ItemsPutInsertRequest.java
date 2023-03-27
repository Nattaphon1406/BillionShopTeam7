package com.billionshop.items.model;

import lombok.Data;
@Data
public class ItemsPutInsertRequest{
	String itm_code;
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
	String itm_create_by;
	String itm_update_by;
	Integer itm_sh_id;

}