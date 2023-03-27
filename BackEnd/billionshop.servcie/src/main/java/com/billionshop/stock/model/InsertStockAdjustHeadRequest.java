package com.billionshop.stock.model;

import lombok.Data;

@Data
public class InsertStockAdjustHeadRequest {
	String saGenUser;
	String saReason;
	String saNote;
	String saUserCreate;
    String saUserUpdate;
}
