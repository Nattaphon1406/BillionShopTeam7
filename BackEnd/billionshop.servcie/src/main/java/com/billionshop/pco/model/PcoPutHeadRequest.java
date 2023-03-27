package com.billionshop.pco.model;

import lombok.Data;

@Data
public class PcoPutHeadRequest {
	String poCode;
	String poStatus;
	String poGenUser;
	String poCreateBy;
	String poUpdateBy;
	Integer shopId;
}
