package com.billionshop.pco.model;


import lombok.Data;

@Data
public class PcoPutDetailRequest {
	Integer pod_order_quantity_per_unit;
	Integer pod_order_quantity;
	String itm_order_unit;
	String itm_unit;
	Integer pod_itm_id;
	String pod_Create_By;
	String pod_Update_By;
	String po_code;
	Integer shop_id;
}
