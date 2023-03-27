package com.billionshop.pco.model;

import lombok.Data;

@Data
public class ShowDetailPcoResponse {
	String poCode;
	String poDate;
	String poGenUser;
	String poStatus;
	String itm_code;
	String itm_name;
	String itm_unit;
	Integer itmCapacity;
	Integer itm_quantity_per_unit;
	Integer itm_order_quantity;
	String itm_order_unit;
	String sell_unit;
	Integer itm_id;
}
