package com.billionshop.sell.model;

import lombok.Data;
@Data
public class SellPaymentRequest {
	Double totalPrice;
	Double cash;
	Double change;
	String createBy;
	String updateBy;
	Integer shId;
}
