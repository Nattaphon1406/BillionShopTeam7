package com.billionshop.stock.model;

import lombok.Data;

@Data
public class StockRequest {
	Integer st_balance_forward;
	Integer st_balance;
	float st_sale;
	String st_create_by;
	String st_update_by;
	Integer st_sh_id;
	Integer st_itm_id;
}
