package com.billionshop.items.repository;

public class ItemsRepoQuery {
	public static final String findItemBydata  = "select IE.itm_id as Id,IE.itm_code as itemCode , IE.itm_name as itemName ,pd.pmdtbdedesc as statusitem ,IE.itm_img_path as img,IE.itm_capacity as itemCapacity , IE.itm_unit as itemUnit from bss_item IE  \r\n"
			+ "left join bss_barcode bb ON bb.bc_itm_id = IE.itm_id \r\n"
			+ "left join prmtbldtl pd on pd.pmdtbdentcd = IE.itm_status \r\n"
			+ "group by IE.itm_id,IE.itm_code,IE.itm_name ,pd.pmdtbdtbno,pd.pmdtbdedesc \r\n"
			+ "having (pd.pmdtbdtbno = 100) and (IE.itm_code like %:data% OR IE.itm_name like %:data% OR pd.pmdtbdedesc like %:data% OR IE.itm_unit like %:data% OR CAST(IE.itm_capacity as varchar(10)) like %:data%)and IE.itm_sh_id = :shopId \r\n"
			+ "order by pd.pmdtbdedesc asc";
	
	public static final String findItemByBarcode = "select IE.itm_id as Id,IE.itm_code as itemCode , IE.itm_name as itemName ,pd.pmdtbdedesc as statusitem , IE.itm_img_path as img, bb.bc_code as barcode ,IE.itm_capacity as itemCapacity , IE.itm_unit as itemUnit from bss_item IE  \r\n"
			+ "left join bss_barcode bb ON bb.bc_itm_id = IE.itm_id \r\n"
			+ "left join prmtbldtl pd on pd.pmdtbdentcd = IE.itm_status \r\n"
			+ "group by IE.itm_id,IE.itm_code,IE.itm_name ,pd.pmdtbdtbno,pd.pmdtbdedesc,bb.bc_code \r\n"
			+ "having (pd.pmdtbdtbno = 100) and (bb.bc_code = :data) and IE.itm_sh_id = :shopId \r\n"
			+ "order by pd.pmdtbdedesc asc";
	
		public static final String findItemByShopId = "select IE.itmid as id,IE.itm_code as itemcode , IE.itm_name as itemname ,pd.pmdtbdedesc as statusitem , IE.itm_img_path as img ,IE.itm_capacity as itemcapacity , IE.itm_unit as itemunit FROM ItemsEntity IE \r\n"
				+ "left join ParameterDetailEntity pd on pd.pmdtbdentcd = IE.itm_status \r\n"
				+ "group by IE.itmid,IE.itm_code,IE.itm_name ,pd.pmdtbdtbno,pd.pmdtbdedesc \r\n"
				+ "having (pd.pmdtbdtbno = 100) and IE.itm_sh_id = :shopId \r\n"
				+ "order by pd.pmdtbdedesc asc";

		public static final String findItemSellByShopId = "select IE.itmid as id,IE.itm_code as itemcode , IE.itm_name as itemname, IE.itm_img_path as img ,IE.itm_capacity as itemcapacity , IE.itm_unit as itemunit FROM ItemsEntity IE \r\n"
				+ " where IE.itm_sh_id = :shopId and IE.itm_status = '1'";
		
		public static final String findBarcodeItemByItemId = "select bb.bc_type as barcodeType,bb.bc_code as dataBarcode from BarcodeEntity bb \r\n"
				+ "where bb.bc_itm_id = :itemId";
	
	public static final String InsertItm = "insert into bss_item("
			+ " itm_code,"
			+ " itm_name, "
			+ " itm_capacity,"
			+ "	itm_price,"
			+ "	itm_cost,"
			+ "	itm_min_quantity,"
			+ "	itm_order_quantity,"
			+ "	itm_purchase_frequency,"
			+ "	itm_unit,"
			+ "	itm_order_unit,"
			+ "	itm_sell_unit,"
			+ "	itm_img_path,"
			+ " itm_create_by,"
			+ " itm_update_by,"
			+ " itm_status,"
			+ " itm_category,"
			+ " itm_sh_id)"
			+ " values("
			+ " :itm_code,"
			+ " :itm_name, "
			+ " :itm_capacity,"
			+ "	:itm_price,"
			+ "	:itm_cost,"
			+ "	:itm_min_quantity,"
			+ "	:itm_order_quantity,"
			+ "	:itm_purchase_frequency,"
			+ "	:itm_unit,"
			+ "	:itm_order_unit,"
			+ "	:itm_sell_unit,"
			+ "	:itm_img_path,"
			+ " :itm_create_by,"
			+ " :itm_update_by,"
			+ " :itm_status,"
			+ " ' ',"
			+ " :itm_sh_id)";
			
	
	public static final String UpdateItmByid = "update bss_item \r\n"
			+ " set itm_name = :itm_name, \r\n"
			+ "	itm_price = :itm_price, \r\n"
			+ "	itm_capacity = :itm_capacity, \r\n"
			+ "	itm_unit = :itm_unit, \r\n"
			+ "	itm_status = :itm_status, \r\n"
			+ "	itm_min_quantity = :itm_min_quantity,\r\n"
			+ "	itm_cost = :itm_cost,\r\n"
			+ "	itm_sell_unit = :itm_sell_unit, \r\n"
			+ "	itm_order_quantity = :itm_order_quantity, \r\n"
			+ "	itm_order_unit = :itm_order_unit, \r\n"
			+ "	itm_purchase_frequency = :itm_purchase_frequency, \r\n"
			+ "	itm_update_by = :itm_update_by, \r\n"
			+ " itm_img_path = :itm_img_path \r\n"
			+ " where itm_id = :itm_id \r\n";

	
	public static final String UpdateItm = "update bss_item \r\n"
			+ "set itm_name = :itm_name,"
			+ "itm_capacity = :itm_capacity,"
			+ "itm_price = :itm_price,"
			+ "itm_cost = :itm_cost,"
			+ "itm_min_quantity = :itm_min_quantity,"
			+ "itm_order_quantity = :itm_order_quantity,"
			+ "itm_purchase_frequency = :itm_purchase_frequency,"
			+ "itm_unit = :itm_unit,"
			+ "itm_order_unit = :itm_order_unit,"
			+ "itm_sell_unit = :itm_sell_unit,"
			+ "itm_update_by = :itm_update_by,"
			+ "itm_status = :itm_status \r\n"
			+ "where itm_id = :itm_id";

	public static final String findLastItemId = "SELECT max(itm_code) AS itmCode \r\n"
			+ "FROM ItemsEntity";
	
	public static final String findItemByshop = "SELECT bi.itm_code AS itmCode, \r\n"
			+ "bi.itm_name as itmName, bi.itm_capacity as capAmount, bi.itm_unit as capUnit,  \r\n"
			+ "bs.st_balance as itmAmount, bi.itm_sell_unit as itmSellUnit \r\n"
			+ "FROM StockEntity bs \r\n"
			+ "LEFT JOIN ItemsEntity bi on bs.st_itm_id = bi.itmid \r\n"
			+ "WHERE bs.st_sh_id = :sh_id and bi.itm_status = '1' \r\n"
			+ "GROUP BY bi.itm_code, bi.itm_name, bi.itm_capacity, bi.itm_unit , \r\n"
			+ "bs.st_balance, bi.itm_sell_unit, bs.st_itm_id, bi.itm_min_quantity, bi.itm_order_quantity \r\n"
			+ "HAVING bs.st_balance/bi.itm_order_quantity < bi.itm_min_quantity/bi.itm_order_quantity \r\n"
			+ "OR bs.st_balance = 0 \r\n"
			+ "ORDER BY bs.st_itm_id ASC";
	
	public static final String findNotiByshop = "SELECT COUNT(bi.itmid) AS numberNotiList \r\n"
			+ "FROM StockEntity bs \r\n"
			+ "LEFT JOIN ItemsEntity bi on bs.st_itm_id = bi.itmid \n"
			+ "WHERE bs.st_sh_id = :sh_id and bi.itm_status = '1' \n"
			+ "AND (bs.st_balance/bi.itm_order_quantity < bi.itm_min_quantity/bi.itm_order_quantity \n"
			+ "OR bs.st_balance = 0)";
	
	public static final String findItemId = "SELECT itm_id, \r\n"
			+ "itm_code,\r\n"
			+ "itm_name, \r\n"
			+ "itm_price, \r\n"
			+ "itm_capacity, \r\n"
			+ "itm_unit,itm_status, \r\n"
			+ "itm_min_quantity, \r\n"
			+ "itm_cost, \r\n"
			+ "itm_order_quantity, \r\n"
			+ "itm_category, \r\n"
			+ "itm_purchase_frequency, \r\n"
			+ "itm_order_unit, \r\n"
			+ "itm_sell_unit, \r\n"
			+ "itm_img_path, \r\n"
			+ "itm_update_by, \r\n"
			+ "itm_update_date, \r\n"
			+ "itm_sh_id \r\n"
			+ "FROM bss_item \r\n"
			+ "WHERE itm_id = :itm_id \r\n";  
	
	public static final String deleteBarcode = "Delete From bss_barcode where bc_itm_id = (select ie.itm_id as itemId from bss_item ie where ie.itm_code = :itemCode) and bc_code = :Barcode";
	
	public static final String findBarcodeByItemCodeAndBarcode = "select bb.bc_id from BarcodeEntity bb \r\n"
			+ "left join ItemsEntity ie on ie.itmid = bb.bc_itm_id \r\n"
			+ "where (ie.itm_code = :itemCode) and (bb.bc_code = :barcode)";
	
	public static final String InsertBarcode = "Insert into bss_barcode("
			+ "bc_code,"
			+ "bc_type,"
			+ "bc_create_by,"
			+ "bc_update_by,"
			+ "bc_itm_id)"
			+ " VALUES (:barcode,:typeBarcode,:userName,:userName,(select ie.itm_id as itemId from bss_item ie where ie.itm_code = :itemCode))";
	
	public static final String findBarcodeBSS = "select bb.bc_code as dataBarcode,bb.bc_type as barcodeType from bss_barcode bb \r\n"
			+ "left join bss_item bi on bi.itm_id = bb.bc_itm_id \r\n"
			+ "where bi.itm_sh_id  = :shopId and bb.bc_type = :barcodeType \r\n"
			+ "order by dataBarcode desc \r\n"
			+ "limit 1";
	
	public static final String findItemIdByItemCode = "select ie.itmid as itemId from ItemsEntity ie \r\n"
			+ "where ie.itm_sh_id = :shopId and ie.itm_code = :itmcode";
	
	public static final String findItemListByShopId ="select IE.itmid as itm_id,IE.itm_code as itm_code , IE.itm_name as itm_name ,IE.itm_order_unit as itm_order_unit , IE.itm_img_path as img ,IE.itm_capacity as itm_capacity, "
			+ "IE.itm_unit as itm_unit ,IE.itm_order_quantity as itm_quantity_per_unit ,IE.itm_sell_unit AS itm_sell_unit, "
			+ "bs.st_balance as itm_stock "
			+ "FROM ItemsEntity IE \r\n"
			+ "left join ParameterDetailEntity pd on pd.pmdtbdentcd = IE.itm_status \r\n"
			+ "left join StockEntity bs on bs.st_itm_id = IE.itmid \r\n"
			+ "group by IE.itmid,IE.itm_code,IE.itm_name,pd.pmdtbdtbno,pd.pmdtbdedesc,bs.st_balance \r\n"
			+ "having (pd.pmdtbdtbno = 100) and IE.itm_sh_id = :shopId and IE.itm_status = '1' \r\n"
			+ "order by pd.pmdtbdedesc asc";
	
	public static final String findItemListByData ="select IE.itmid as itm_id,IE.itm_code as itm_code , IE.itm_name as itm_name ,IE.itm_order_unit as itm_order_unit , IE.itm_img_path as img ,IE.itm_capacity as itm_capacity, "
			+ "IE.itm_unit as itm_unit ,IE.itm_order_quantity as itm_quantity_per_unit ,IE.itm_sell_unit AS itm_sell_unit, "
			+ "bs.st_balance as itm_stock "
			+ "FROM ItemsEntity IE \r\n"
			+ "left join ParameterDetailEntity pd on pd.pmdtbdentcd = IE.itm_status \r\n"
			+ "left join StockEntity bs on bs.st_itm_id = IE.itmid \r\n"
			+ "group by IE.itmid,IE.itm_code,IE.itm_name,pd.pmdtbdtbno,pd.pmdtbdedesc,bs.st_balance \r\n"
			+ "having (pd.pmdtbdtbno = 100) and IE.itm_sh_id = :shopId and IE.itm_status = '1' and (IE.itm_code like %:data% OR IE.itm_name like %:data%) \r\n"
			+ "order by pd.pmdtbdedesc asc";

	public static final String findItemListByBarcode ="select IE.itmid as itm_id,IE.itm_code as itm_code , IE.itm_name as itm_name ,IE.itm_order_unit as itm_order_unit , IE.itm_img_path as img ,IE.itm_capacity as itm_capacity , IE.itm_unit as itm_unit ,IE.itm_order_quantity as itm_quantity_per_unit ,IE.itm_sell_unit AS itm_sell_unit ,bs.st_balance as itm_stock FROM ItemsEntity IE \r\n"
			+ "left join ParameterDetailEntity pd on pd.pmdtbdentcd = IE.itm_status \r\n"
			+ "left join BarcodeEntity bb ON bb.bc_itm_id = IE.itmid \r\n"
			+ "left join StockEntity bs on bs.st_itm_id = IE.itmid \r\n"
			+ "group by IE.itmid,IE.itm_code,IE.itm_name,pd.pmdtbdtbno,pd.pmdtbdedesc,bb.bc_code,bs.st_balance \r\n"
			+ "having (pd.pmdtbdtbno = 100) and IE.itm_sh_id = :shopId and IE.itm_status = '1' and bb.bc_code = :data \r\n"
			+ "order by pd.pmdtbdedesc asc";

	public static final String findItemCost = "SELECT IE.itm_cost as itm_cost \r\n"
			+"FROM ItemsEntity IE \r\n"
			+"WHERE IE.itmid = :itm_id";
	
	public static final String insertCost = "UPDATE bss_item \r\n"
			+"SET itm_cost = :cost \r\n"
			+ "WHERE itm_id = :itm_id \r\n";
	
	public static final String findItemPrice = "SELECT IE.itm_price as itm_price \r\n"
			+"FROM ItemsEntity IE \r\n"
			+"WHERE IE.itmid = :itm_id";
	
	public static final String findShopByItmId = "SELECT IE.itm_sh_id as shopId \r\n"
			+"FROM ItemsEntity IE \r\n"
			+"WHERE IE.itmid = :itm_id";
	
	public static final String findItemCodebyBarcode = "SELECT IE.itm_code as itmCode \r\n"
			+ "FROM ItemsEntity IE \r\n"
			+ "left join ParameterDetailEntity pd on pd.pmdtbdentcd = IE.itm_status \r\n"
			+ "left join BarcodeEntity bb ON bb.bc_itm_id = IE.itmid \r\n"
			+ "group by IE.itm_code,pd.pmdtbdedesc ,pd.pmdtbdtbno ,IE.itm_sh_id ,IE.itm_status ,bb.bc_code  \r\n"
			+ "having (pd.pmdtbdtbno = 100) and IE.itm_sh_id = :shopId and IE.itm_status = '1' and bb.bc_code = :data \r\n"
			+ "order by pd.pmdtbdedesc asc";
	
	public static final String findPriceByItmId = "SELECT IE.itm_price \r\n"
			+"FROM ItemsEntity IE \r\n"
			+"WHERE IE.itmid = :itm_id";
}
	
