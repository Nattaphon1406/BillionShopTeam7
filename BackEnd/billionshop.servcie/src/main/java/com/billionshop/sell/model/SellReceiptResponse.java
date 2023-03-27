package com.billionshop.sell.model;
import lombok.Data;

@Data
public class SellReceiptResponse {
	String shopName;
	String rcCode;
	Double totalPrice;
	Double cash;
	Double change;
	String createDate;
}
