package com.billionshop.pco.repository;

public class PcoRepoQuery {
	public static final String findPoByShopId = "SELECT phe.po_id AS poId,phe.po_code AS poCode,"
			+ "to_char(phe.po_date,'DD/MM/YYYY') AS poDate,phe.po_gen_user AS poGenUser,pd.pmdtbdedesc AS poStatus \r\n"
			+ "FROM PcoHeadEntity phe \r\n"
			+ "LEFT JOIN ParameterDetailEntity pd on pd.pmdtbdentcd = phe.po_status \r\n"
			+ "WHERE phe.po_sh_id = :shopId \r\n"
			+ "AND (pd.pmdtbdtbno = 300) \r\n"
			+ "GROUP BY phe.po_id,pd.pmdtbdedesc,pd.pmdtbdentcd \r\n"
			+ "ORDER BY pd.pmdtbdentcd asc,phe.po_code desc \r\n";

	public static final String findDetailPoByPoId = "SELECT pde.pod_quantity_per_unit AS itm_quantity_per_unit,pde.pod_order_quantity AS itm_order_quantity,"
			+ "pde.pod_item_unit AS itm_unit,pde.pod_order_unit AS itm_order_unit,ie.itm_name AS itm_name,ie.itm_code AS itm_code,"
			+ "ie.itm_unit AS itm_unit,ie.itm_capacity AS itm_capacity,ie.itm_sell_unit AS itm_sell_unit,"
			+ "pde.pod_itm_id AS itm_id \r\n"
			+ "FROM PcoDetailEntity pde \r\n"
			+ "LEFT JOIN ItemsEntity ie on ie.itmid = pde.pod_itm_id \r\n"
			+ "WHERE pde.pod_po_id = :poId \r\n"
			+ "GROUP BY pde.pod_id,ie.itmid \r\n";

	public static final String findPoByData = "SELECT phe.po_id AS poId,phe.po_code AS poCode,"
			+ "to_char(phe.po_date,'DD/MM/YYYY') AS poDate,phe.po_gen_user AS poGenUser,pd.pmdtbdedesc AS poStatus \r\n"
			+ "FROM PcoHeadEntity phe \r\n"
			+ "LEFT JOIN ParameterDetailEntity pd on pd.pmdtbdentcd = phe.po_status \r\n"
			+ "WHERE phe.po_sh_id = :shopId AND (phe.po_code like %:data% OR to_char(phe.po_date,'DD/MM/YYYY') like %:data% OR phe.po_gen_user like %:data% OR pd.pmdtbdedesc like %:data%) \r\n"
			+ "AND (pd.pmdtbdtbno = 300) \r\n"
			+ "GROUP BY phe.po_id,pd.pmdtbdedesc \r\n"
			+ "ORDER BY phe.po_code desc \r\n";

	public static final String genPOAutoInteger = "select it.itmid as id, it.itm_min_quantity as min_quantity, it.itm_order_quantity as order_quantity, \r\n"
			+ "bs.st_balance as balance, it.itm_purchase_frequency as purchase_frequency, CAST(sum(sm.sm_amount * sm.sm_quantity)AS int) as amount\r\n"
			+ "from ItemsEntity it \r\n"
			+ "left join StockEntity bs on bs.st_itm_id = it.itmid \r\n"
			+ "left join StockMovementEntity sm on sm.sm_itm_id = it.itmid \r\n"
			+ "where it.itm_sh_id = :shopId and it.itm_status = '1' and sm.sm_create_date > current_date - 30\r\n"
			+ "GROUP BY id, min_quantity, order_quantity, balance, purchase_frequency \r\n"
			+ "HAVING bs.st_balance/it.itm_order_quantity < it.itm_min_quantity/it.itm_order_quantity \r\n"
			+ "OR bs.st_balance = 0";

	public static final String getInfoGoods = "select CAST(it.itmid AS text) as id, it.itm_code as code, it.itm_name as name, CAST(it.itm_capacity AS text) as capacity, it.itm_unit as unit, CAST(it.itm_order_quantity AS text) as order_quantity, it.itm_order_unit as order_unit, it.itm_sell_unit as sell_unit\r\n"
			+ "from ItemsEntity it \r\n"
			+ "where it.itmid = :goodsId";
	
	public static final String getPoId = "SELECT max(phe.po_id) AS poId \r\n"
			+ "FROM PcoHeadEntity phe\r\n";
	
	public static final String findPoInRcvByShopId = "SELECT phe.po_id AS poId,phe.po_code AS poCode,"
			+ "to_char(phe.po_date,'DD/MM/YYYY') AS poDate,phe.po_gen_user AS poGenUser,pd.pmdtbdedesc AS poStatus \r\n"
			+ "FROM PcoHeadEntity phe \r\n"
			+ "LEFT JOIN ParameterDetailEntity pd on pd.pmdtbdentcd = phe.po_status \r\n"
			+ "left join RcvHeadEntity rih on rih.ri_po_id = phe.po_id \r\n"
			+ "WHERE phe.po_sh_id = :shopId and phe.po_status = '2' \r\n"
			+ "AND (pd.pmdtbdtbno = 300)and (rih.ri_po_id = null) \r\n"
			+ "GROUP BY phe.po_id,pd.pmdtbdedesc \r\n"
			+ "ORDER BY phe.po_code desc \r\n";

	public static final String findPoIdByPoCode = "SELECT po_id AS poId "
			+ "FROM PcoHeadEntity \r\n"
			+ "WHERE po_code = :po_code \r\n";
	
	public static final String insertPoDetail = "INSERT INTO bss_purchase_order_detail("
			+ "pod_quantity_per_unit,"
			+ "pod_order_quantity,"
			+ "pod_item_unit,"
			+ "pod_order_unit,"
			+ "pod_create_by,"
			+ "pod_create_date,"
			+ "pod_update_by,"
			+ "pod_update_date,"
			+ "pod_itm_id,"
			+ "pod_po_id)"
			+ "VALUES("
			+ ":pod_order_quantity_per_unit,"
			+ ":pod_order_quantity,"
			+ ":pod_itm_unit,"
			+ ":pod_order_unit,"
			+ ":pod_create_by,"
			+ ":pod_create_date,"
			+ ":pod_update_by,"
			+ ":pod_update_date,"
			+ ":pod_itm_id,"
			+ ":pod_po_id"
			+ ") \r\n";

	public static final String updatePoDetail = "UPDATE bss_purchase_order_detail \r\n"
			+ "set pod_order_quantity = :pod_order_quantity,  \r\n"
			+ "pod_update_by = :pod_update_by, \r\n"
			+ "pod_update_date = :pod_update_date \r\n"
			+ "where pod_po_id = :pod_po_id and pod_itm_id = :pod_itm_id \r\n";

	public static final String findPoDetailByCode = "SELECT pod.pod_id as podId \r\n"
			+ "from PcoDetailEntity pod \r\n"
			+ "LEFT join PcoHeadEntity poh on poh.po_code = :po_code \r\n"
			+ "where pod.pod_itm_id = :pod_itm_id and poh.po_id = pod.pod_po_id";

	public static final String findItmInPoByBarcode = "SELECT itm.itm_id AS itmId \r\n"
			+ "FROM bss_item itm \r\n"
			+ "LEFT JOIN bss_barcode bc ON bc.bc_itm_id = itm.itm_id \r\n"
			+ "WHERE bc.bc_code = :itmBarcode and itm.itm_sh_id = :shopId \r\n";

	public static final String findPoHeadByPoId = "SELECT phe.po_id AS poId,phe.po_code AS poCode,"
			+ "to_char(phe.po_date,'DD/MM/YYYY') AS poDate,phe.po_gen_user AS poGenUser,pd.pmdtbdedesc AS poStatus \r\n"
			+ "FROM PcoHeadEntity phe \r\n"
			+ "LEFT JOIN ParameterDetailEntity pd on pd.pmdtbdentcd = phe.po_status \r\n"
			+ "WHERE (pd.pmdtbdtbno = 300) AND phe.po_id = :poId \r\n";
	
}
