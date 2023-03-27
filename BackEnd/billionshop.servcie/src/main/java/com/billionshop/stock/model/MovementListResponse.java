package com.billionshop.stock.model;
import lombok.Data;

@Data
public class MovementListResponse {
	String sm_date;
	Integer sm_itm_id;
	String itm_code;
    String itm_name;
    Integer itm_capacity;
    String itm_unit;
    Integer sm_balance;
    String itm_sell_unit;
}
