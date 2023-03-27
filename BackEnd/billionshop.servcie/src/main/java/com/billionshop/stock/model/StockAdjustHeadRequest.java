package com.billionshop.stock.model;

import lombok.Data;

@Data
public class StockAdjustHeadRequest {
	Integer saId;
	String saCode;
	String saDate;
	String saGenUser;
	String saReason;
}
