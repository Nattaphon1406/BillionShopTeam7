package com.billionshop.sell.repository;

public class SellRepoQuery {
	public static final String findItemByShopId = "select IE.itmid as id,IE.itm_code as itemcode , IE.itm_name as itemname ,pd.pmdtbdedesc as statusitem , IE.itm_img_path as img ,IE.itm_capacity as itemcapacity , IE.itm_unit as itemunit ,IE.itm_price as itemprice ,bs.st_balance as stockItem FROM ItemsEntity IE \r\n"
			+ "left join ParameterDetailEntity pd on pd.pmdtbdentcd = IE.itm_status \r\n"
			+ "left join StockEntity bs on bs.st_itm_id = IE.itmid \r\n"
			+ "group by IE.itmid,IE.itm_code,IE.itm_name ,pd.pmdtbdtbno,pd.pmdtbdedesc,bs.st_itm_id,bs.st_balance \r\n"
			+ "having (pd.pmdtbdtbno = 100) and IE.itm_sh_id = :shopId and IE.itm_status = '1' and bs.st_balance >= 1 \r\n"
			+ "order by pd.pmdtbdedesc asc";
	
	public static final String findItemByBarcode = "select IE.itmid as id,IE.itm_code as itemcode , IE.itm_name as itemname ,pd.pmdtbdedesc as statusitem , IE.itm_img_path as img ,IE.itm_capacity as itemcapacity , IE.itm_unit as itemunit ,IE.itm_price as itemprice,bs.st_balance as stockItem,be.bc_code as barcode FROM ItemsEntity IE \r\n"
			+ "left join ParameterDetailEntity pd on pd.pmdtbdentcd = IE.itm_status \r\n"
			+ "left join BarcodeEntity be on be.bc_itm_id = IE.itmid \r\n"
			+ "left join StockEntity bs on bs.st_itm_id = IE.itmid \r\n"			
			+ "group by IE.itmid,IE.itm_code,IE.itm_name ,pd.pmdtbdtbno,pd.pmdtbdedesc,be.bc_id,bs.st_itm_id,bs.st_balance \r\n"
			+ "having (pd.pmdtbdtbno = 100) and IE.itm_sh_id = :shopId and IE.itm_status = '1' and be.bc_code = :data and bs.st_balance >= 1 \r\n"
			+ "order by pd.pmdtbdedesc asc";
	
	public static final String findItemByData = "select IE.itm_id as id,IE.itm_code as itemcode , IE.itm_name as itemname ,pd.pmdtbdedesc as statusitem , IE.itm_img_path as img ,IE.itm_capacity as itemcapacity , IE.itm_unit as itemunit ,IE.itm_price as itemprice,bs.st_balance as stockItem FROM bss_item IE \r\n"
			+ "left join prmtbldtl pd on pd.pmdtbdentcd = IE.itm_status \r\n"
			+ "left join bss_stock bs on bs.st_itm_id = IE.itm_id \r\n"
			+ "group by IE.itm_id,IE.itm_code,IE.itm_name ,pd.pmdtbdtbno,pd.pmdtbdedesc,bs.st_itm_id,bs.st_balance \r\n"
			+ "having (pd.pmdtbdtbno = 100) and IE.itm_sh_id = :shopId and IE.itm_status = '1' and bs.st_balance >= 1 and (IE.itm_code like %:data% or IE.itm_name like %:data% or IE.itm_name like %:data% or cast( IE.itm_capacity as varchar(10)) like %:data% or IE.itm_unit like %:data% ) \r\n"
			+ "order by pd.pmdtbdedesc asc";
	
	public static final String InsertHeaderPayment = "insert into bss_receipt"
			+ "(rc_code,rc_total_price,rc_change,rc_cash,rc_create_by,"
			+ "rc_update_by,rc_sh_id)"
			+ "values(:rc_code,:rc_total,:rc_change,:rc_cash,:userName,:userName,:shopId)";
	
	public static final String InsertDetailPayment = "insert into bss_receipt_detail"
			+ "(rd_itm_name,rd_capacity,rd_itm_quatity,rd_capacity_unit,rd_itm_unit,rd_create_by,rd_update_by,rd_itm_id,rd_rc_id)"
			+ "values(:rd_itm_name,:rd_capacity,:rd_itm_quatity,:rd_capacity_unit,:rd_itm_unit,:userName,:userName,:rd_itm_id,:rcId)";
	
	public static final String findCodeREC = "select max(rhe.rc_code) as code from ReceiptHeaderEntity rhe \r\n"
			+ "where rhe.rc_sh_id = :shopId";
	
	public static final String findIdREC = "select rhe.rc_id as id from ReceiptHeaderEntity rhe \r\n"
			+ "where rhe.rc_sh_id = :shopId and rhe.rc_code = :code";
	
	public static final String findRecHeader = "select bs.sh_name as shopName,br.rc_code as rcCode, br.rc_total_price as totalPrice,br.rc_cash as cash,br.rc_change as change,br.rc_create_date as createDate\r\n"
			+ "from ReceiptHeaderEntity br \r\n"
			+ "left join ShopEntity bs on bs.sh_id = br.rc_sh_id \r\n"
			+ "where br.rc_sh_id = :shopId and br.rc_id = :rcId\r\n"
			+ "group by bs.sh_name ,br.rc_code ,br.rc_total_price ,br.rc_cash ,br.rc_change ,br.rc_create_date";

	public static final String findRecDetail = "select brd.rd_itm_name as itemname, bi.itm_price as itemprice, brd.rd_capacity as itemcapacity, \r\n"
			+ "brd.rd_capacity_unit as itemcapunit, brd.rd_itm_quatity as numberItem, brd.rd_itm_unit as itemunit, bi.itm_price*brd.rd_itm_quatity as totalPrice \r\n"
			+ "from ReceiptDetailEntity brd \r\n"
			+ "left join ItemsEntity bi on bi.itmid = brd.rd_itm_id \r\n"
			+ "where brd.rd_rc_id = :rcId \r\n"
			+ "group by brd.rd_itm_name,bi.itm_price,brd.rd_capacity,brd.rd_capacity_unit,brd.rd_itm_quatity,brd.rd_itm_unit";
	
	public static final String UpdateStock = "UPDATE bss_stock\r\n"
			+ "SET st_balance_forward = :tmBalanceForward,"
			+ "st_balance = st_balance - (SELECT rd_itm_quatity FROM bss_receipt_detail WHERE rd_itm_id = :rd_itm_id AND rd_rc_id = :rcId) \r\n"
			+ "WHERE st_itm_id = :rd_itm_id";
}
