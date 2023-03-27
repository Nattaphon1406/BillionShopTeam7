package com.billionshop.rcv.repository;

public class RcvRepoQuery {
	
	public static final String findHeadRcvById = "SELECT ri.ri_id AS riId, ri.ri_code AS riCode, to_char(ri.ri_date, 'DD/MM/YYYY') AS riDate, ri.ri_gen_user AS riGenUser, pco.po_code AS poCode, pd.pmdtbdedesc AS riStatus \r\n"
			+ "FROM RcvHeadEntity ri \r\n"
			+ "LEFT JOIN ParameterDetailEntity pd on pd.pmdtbdentcd = ri.ri_status \r\n"
			+ "LEFT JOIN PcoHeadEntity pco on pco.po_id = ri.ri_po_id \r\n"
			+ "WHERE ri.ri_id = :riId \r\n"
			+ "AND (pd.pmdtbdtbno = 400) \r\n"
			+ "GROUP BY ri.ri_id, pco.po_id, pd.pmdtbdedesc"; 

	public static final String findDetailRcvById = "SELECT rid.rid_id as rid_id, rid.rid_receive_quantity as rid_receive_quantity, \r\n"
			+ "rid.rid_purchase_price as rid_purchase_price, rid.rid_quantity_per_unit as rid_quantity_per_unit, rid.rid_order_unit as rid_order_unit, \r\n"
			+ "rid.rid_item_unit as rid_item_unit, ie.itmid as itm_id, ie.itm_name AS itm_name,ie.itm_code AS itm_code, \r\n"
			+ "ie.itm_unit AS itm_unit, ie.itm_capacity AS itm_capacity \r\n"
			+ "FROM RcvDetailEntity rid\r\n"
			+ "LEFT JOIN RcvHeadEntity ri on ri.ri_id = rid.rid_ri_id \r\n"
			+ "LEFT JOIN ParameterDetailEntity pd on pd.pmdtbdentcd = ri.ri_status \r\n"
			+ "LEFT JOIN ItemsEntity ie on ie.itmid = rid.rid_itm_id\r\n"
			+ "WHERE rid.rid_ri_id = :riId \r\n"
			+ "AND (pd.pmdtbdtbno = 400) \r\n"
			+ "GROUP BY ri.ri_id, rid.rid_id, ie.itmid, pd.pmdtbdedesc";
	
	public static final String findPoByShopId = "SELECT phe.po_id AS poId,phe.po_code AS poCode, "
			+ "to_char(phe.po_date,'DD/MM/YYYY') AS poDate,phe.po_gen_user AS poGenUser,pd.pmdtbdedesc AS poStatus \r\n"
			+ "FROM PcoHeadEntity phe \r\n"
			+ "LEFT JOIN ParameterDetailEntity pd on pd.pmdtbdentcd = phe.po_status \r\n"
			+ "left join RcvHeadEntity rih on rih.ri_po_id = phe.po_id \r\n"
			+ "where phe.po_status = '2' and phe.po_sh_id = :shopId AND pd.pmdtbdtbno = 300 and (rih.ri_po_id = null) \r\n"
			+ "GROUP BY phe.po_id,pd.pmdtbdedesc \r\n"
			+ "ORDER BY phe.po_code desc \r\n";
	
	public static final String findPoByData = "SELECT phe.po_id AS poId,phe.po_code AS poCode,"
			+ "to_char(phe.po_date,'DD/MM/YYYY') AS poDate,phe.po_gen_user AS poGenUser,pd.pmdtbdedesc AS poStatus \r\n"
			+ "FROM PcoHeadEntity phe \r\n"
			+ "LEFT JOIN ParameterDetailEntity pd on pd.pmdtbdentcd = phe.po_status \r\n"
			+ "left join RcvHeadEntity rih on rih.ri_po_id = phe.po_id \r\n"
			+ "WHERE phe.po_sh_id = :shopId AND (phe.po_code like %:data% OR to_char(phe.po_date,'DD/MM/YYYY') like %:data% OR phe.po_gen_user like %:data%) \r\n"
			+ "AND (pd.pmdtbdtbno = 300) AND phe.po_status = '2' and (rih.ri_po_id = null) \r\n"
			+ "GROUP BY phe.po_id,pd.pmdtbdedesc \r\n"
			+ "ORDER BY phe.po_code desc \r\n";

	public static final String findRcvByData = "SELECT rih.ri_id AS riId, rih.ri_code AS riCode, \r\n"
			+ "to_char(rih.ri_date ,'DD/MM/YYYY') AS riDate, rih.ri_gen_user AS riGenUser, pd.pmdtbdedesc AS riStatus,po.po_code AS poCode \r\n"
			+ "FROM RcvHeadEntity rih \r\n"
			+ "LEFT JOIN ParameterDetailEntity pd on pd.pmdtbdentcd = rih.ri_status \r\n"
			+ "LEFT JOIN PcoHeadEntity po on po.po_id = rih.ri_po_id \r\n"
			+ "WHERE rih.ri_sh_id = :shopId AND (rih.ri_code like %:data% OR to_char(rih.ri_date, 'DD/MM/YYYY') like %:data% OR rih.ri_gen_user like %:data% OR pd.pmdtbdedesc like %:data% OR po.po_code like %:data%) \r\n"
			+ "AND (pd.pmdtbdtbno = 400) \r\n"
			+ "GROUP BY rih.ri_id, po.po_id,pd.pmdtbdedesc \r\n"
			+ "ORDER BY pd.pmdtbdedesc DESC,rih.ri_code DESC";

	public static final String findHeadRcvAllById = "SELECT ri.ri_id AS riId, ri.ri_code AS riCode, to_char(ri.ri_date, 'DD/MM/YYYY') AS riDate, ri.ri_gen_user AS riGenUser, pco.po_code AS poCode, pd.pmdtbdedesc AS riStatus \r\n"
			+ "FROM RcvHeadEntity ri \r\n"
			+ "LEFT JOIN ParameterDetailEntity pd on pd.pmdtbdentcd = ri.ri_status \r\n"
			+ "LEFT JOIN PcoHeadEntity pco on pco.po_id = ri.ri_po_id \r\n"
			+ "WHERE ri.ri_sh_id = :shopId \r\n"
			+ "AND (pd.pmdtbdtbno = 400) \r\n"
			+ "GROUP BY ri.ri_id, pco.po_id, pd.pmdtbdedesc \r\n"
			+ "ORDER BY pd.pmdtbdedesc DESC,ri.ri_code DESC";
	
	public static final String insertRcvDetail = "INSERT INTO bss_receive_inventory_detail("
			+ "rid_receive_quantity,"
			+ "rid_purchase_price,"
			+ "rid_quantity_per_unit,"
			+ "rid_order_unit,"
			+ "rid_item_unit,"
			+ "rid_create_by,"
			+ "rid_create_date,"
			+ "rid_update_by,"
			+ "rid_update_date,"
			+ "rid_itm_id,"
			+ "rid_ri_id)"
			+ "VALUES("
			+ ":rid_receive_quantity,"
			+ ":rid_purchase_price,"
			+ ":rid_quantity_per_unit,"
			+ ":rid_order_unit,"
			+ ":rid_item_unit,"
			+ ":rid_create_by,"
			+ ":now,"
			+ ":rid_update_by,"
			+ ":now2,"
			+ ":rid_itm_id,"
			+ ":rid_ri_id"
			+ ") \r\n";

	public static final String updateRcvDetail = "UPDATE bss_receive_inventory_detail \r\n"
			+ "set rid_receive_quantity = :rid_receive_quantity,  \r\n"
			+ "rid_purchase_price = :rid_purchase_price, \r\n"
			+ "rid_update_by = :rid_update_by, \r\n"
			+ "rid_update_date = :now \r\n"
			+ "where rid_ri_id = :rid_ri_id and rid_itm_id = :rid_itm_id \r\n";
	
	public static final String findRcvIdByRcvCode = "SELECT ri.ri_id AS riId \r\n"
			+ "FROM RcvHeadEntity ri \r\n"
			+ "WHERE ri.ri_code = :ri_code";
	
	public static final String findRcvDetailByCode = "SELECT rid.rid_id as ridId \r\n"
			+ "from RcvDetailEntity rid \r\n"
			+ "LEFT join RcvHeadEntity rih on rih.ri_code = :ri_code \r\n"
			+ "where rid.rid_itm_id = :rid_itm_id and rih.ri_id = rid.rid_ri_id";

	public static final String findRcvIdByRiCode = "SELECT ri_id AS riId "
			+ "FROM RcvHeadEntity \r\n"
			+ "WHERE ri_code = :ri_code \r\n";
	
	public static final String findPcoIdbyRcvCode = "SELECT ri.ri_po_id "
			+ "FROM RcvHeadEntity ri \r\n"
			+ "WHERE ri.ri_code = :ri_code and ri.ri_sh_id = :shopId";
	
	
}
