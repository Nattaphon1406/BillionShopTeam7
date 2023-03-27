package com.billionshop.stock.model;

import lombok.Data;

@Data
public class InsertStockAdjustDetailRequest {
	String saGenUser;
	Integer saQuantity;
	Integer itmId;
}
