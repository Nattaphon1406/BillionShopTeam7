package com.billionshop.sell.model;

import lombok.Data;
@Data
public class SellBucketRequest {
	Integer id;
	String itemcode;
	String itemname;
	String img;
	Double itemprice;
	Double itemcapacity;
	String itemunit;
	Integer numberItem;
	Integer stockItem;
}