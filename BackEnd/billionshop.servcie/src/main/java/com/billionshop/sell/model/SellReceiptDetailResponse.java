package com.billionshop.sell.model;
import lombok.Data;
@Data

public class SellReceiptDetailResponse {
	String itemname;
	Double itemprice;
	Double itemcapacity;
	String itemcapunit;
	Integer numberItem;
	String itemunit;
	Double totalPrice;
}
