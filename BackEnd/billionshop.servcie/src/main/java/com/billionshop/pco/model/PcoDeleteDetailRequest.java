package com.billionshop.pco.model;

import lombok.Data;

@Data
public class PcoDeleteDetailRequest {
	Integer pod_itm_id;
	String po_code;
}
