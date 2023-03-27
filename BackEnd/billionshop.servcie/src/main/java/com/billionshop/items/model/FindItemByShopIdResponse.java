package com.billionshop.items.model;
import lombok.Data;
@Data
public class FindItemByShopIdResponse {
	Integer id;
	String itemcode;
	String itemname;
	String statusitem;
	String img;
	String itemcapacity;
	String itemunit;
//	String barcode;
}
