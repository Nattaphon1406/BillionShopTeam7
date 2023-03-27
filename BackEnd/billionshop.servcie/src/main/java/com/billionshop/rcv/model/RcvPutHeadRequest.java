package com.billionshop.rcv.model;

import lombok.Data;

@Data
public class RcvPutHeadRequest {
	String ri_code;
	String ri_status;
	String ri_gen_user;
	String ri_create_by;
	String ri_update_by;
	Integer shopId;
	Integer poId;

}
