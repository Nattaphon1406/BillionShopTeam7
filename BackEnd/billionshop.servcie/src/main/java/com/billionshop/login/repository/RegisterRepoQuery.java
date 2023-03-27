package com.billionshop.login.repository;

public class RegisterRepoQuery {
	
	public static final String findUserById  = "SELECT us_user_name AS UserID\r\n"
			+ "FROM UserEntity \r\n"
			+ "WHERE us_user_name = :us_user_name";

	
	public static final String finduserpass  = "SELECT ue.us_id as us_id , ue.us_user_name AS us_user_name, ue.us_pass_word As us_pass_word, "
			+ "ue.us_first_name AS us_first_name, ue.us_last_name AS us_last_name, ue.us_permission As us_permission, se.sh_id as sh_id, "
			+ "se.sh_name As sh_name, ue.us_email as us_email \r\n"
            + "FROM UserEntity ue \r\n"
            + "Join ShopEntity se on ue.us_sh_id = se.sh_id \r\n"
            + "WHERE ue.us_user_name = :us_user_name and ue.us_pass_word = :us_pass_word";

} 
