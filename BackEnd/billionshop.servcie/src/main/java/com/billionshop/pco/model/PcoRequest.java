package com.billionshop.pco.model;

import lombok.Data;

@Data
public class PcoRequest {
	String po_code;
	String po_date;
	String po_status;
	String po_gen_user;
	String po_create_by;
	Integer sh_id;
	Integer[] pod_quantity_per_unit;
	Integer[] pod_order_quantity;
	String[] pod_item_unit;
	String[] pod_order_unit;
	Integer[] pod_itm_id;
	String status;
	
}
