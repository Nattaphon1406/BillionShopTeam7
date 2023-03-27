package com.billionshop.rcv.model;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class RcvPutDetailRequest {
	Integer rid_receive_quantity_per_unit;
	Integer rid_receive_quantity;
	String rid_order_unit;
	Float rid_purchase_price;
	String rid_itm_sell_unit;
	Integer rid_itm_id;
	String rid_create_by;
	String rid_update_by;
	String ri_code;
	Integer shop_id;
}
