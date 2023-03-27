package com.billionshop.sell.model;
import lombok.Data;
@Data
public class SellResponse {
	Integer id;
	String itemcode;
	String itemname;
	String statusitem;
	String img;
	String itemcapacity;
	String itemunit;
	String itemprice;
	String barcode;
	Integer stockItem;
}
