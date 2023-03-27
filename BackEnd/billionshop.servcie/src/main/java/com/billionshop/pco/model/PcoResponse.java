package com.billionshop.pco.model;

import lombok.Data;

@Data
public class PcoResponse {
	
	Integer[] pod_quantity_per_unit;
	Integer[] pod_order_quantity;
	String[] pod_item_unit;
	String[] pod_order_unit;
	Integer[] pod_itm_id;
	
}
