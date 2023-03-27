package com.billionshop.pco.model;

import lombok.Data;

@Data
public class FindPcoResponse {
	Integer poId;
	String poCode;
	String poDate;
	String poGenUser;
	String poStatus;
}
