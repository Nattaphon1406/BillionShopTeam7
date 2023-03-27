package com.billionshop.login.model;

import lombok.Data;

@Data
public class ShowUserResponse {
	Integer us_id;
	String us_first_name;
	String us_last_name;
	String us_email;
	String us_tel;
	String us_permission;
}
