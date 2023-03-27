package com.billionshop.login.repository;

public class ManageUserRepoQuery {
	
	public static final String findUserByShopId  = "SELECT UE.us_first_name AS us_first_name , UE.us_last_name AS us_last_name , UE.us_email AS us_email , UE.us_tel AS us_tel , pd.pmdtbdedesc AS us_permission , UE.us_id AS us_id FROM bss_user UE \r\n"
			+ "left join prmtbldtl pd on pd.pmdtbdentcd = UE.us_permission \r\n"
			+ "where (UE.us_sh_id = :shId) and (pd.pmdtbdtbno = 200) \r\n"
			+ "group by UE.us_id,UE.us_first_name, UE.us_last_name ,UE.us_email ,UE.us_tel , pd.pmdtbdtbno , pd.pmdtbdedesc \r\n"
			+ "order by pd.pmdtbdedesc asc";
	
	public static final String findUserByData = "SELECT us_first_name AS us_first_name,us_last_name AS us_last_name,us_email AS us_email,us_tel AS us_tel,pd.pmdtbdedesc AS us_permission, us_id AS us_id \r\n"
			+ "FROM bss_user UE \r\n"
			+ "left join prmtbldtl pd on pd.pmdtbdentcd = UE.us_permission \r\n"
			+ "WHERE us_sh_id = :shId and (us_first_name = :data or us_last_name = :data or us_email = :data or us_tel = :data or pd.pmdtbdedesc = :data) and (pd.pmdtbdtbno = 200) \r\n"
			+ "group by UE.us_id,UE.us_first_name, UE.us_last_name ,UE.us_email ,UE.us_tel , pd.pmdtbdtbno , pd.pmdtbdedesc \r\n"
			+ "order by pd.pmdtbdedesc asc";
	
	public static final String DeleteUserById  = "DELETE FROM bss_user \r\n"
			+ "WHERE us_id = :us_id";
	
	public static final String DeleteAllUserById  = "DELETE FROM bss_user \r\n"
			+ "WHERE NOT us_permission = 'own' AND us_sh_id = :us_sh_id AND NOT us_id = :us_id";
}
