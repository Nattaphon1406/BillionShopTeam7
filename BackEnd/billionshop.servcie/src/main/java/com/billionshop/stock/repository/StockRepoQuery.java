package com.billionshop.stock.repository;

public class StockRepoQuery {

	public static final String updateBalance = "UPDATE bss_stock \r\n"
			+"set st_balance = st_balance+:st_balance,st_balance_forward = st_balance \r\n"
			+"where st_sh_id =:st_sh_id and st_itm_id = :st_itm_id";
	
	public static final String insertBalance = "Insert into bss_stock(st_balance_forward,st_balance,st_sale,st_create_by,st_update_by,st_sh_id,st_itm_id)"
			+ "values("
			+ ":forward,"
			+ ":balance,"
			+ ":sale,"
			+ ":user,"
			+ ":user,"
			+ ":shopId,"
			+ ":itemId)";
	
	public static final String findStockItmDataById = "SELECT st.st_id as st_id, st.st_balance_forward as st_balance_forward, st.st_balance as st_balance, \r\n"
			+"st.st_date as st_date, st.st_sale as st_sale, st.st_sh_id as st_sh_id,st.st_itm_id as st_itm_id \r\n"
			+"FROM StockEntity st \r\n"
			+"WHERE st.st_sh_id = :st_sh_id \r\n"
			+"AND st.st_itm_id = :st_itm_id";
	
	public static final String findStockBalance = "SELECT st.st_balance as st_balance \r\n"
			+"FROM StockEntity st \r\n"
			+"WHERE st.st_sh_id = :st_sh_id \r\n"
			+"AND st.st_itm_id = :st_itm_id";

	public static final String findSadIdBySaCode = "SELECT sa.sa_id as sa_id, sa.sa_code as sa_code, sa.sa_date as sa_date, sa.sa_gen_user as sa_gen_user, \r\n"
			+"sa.sa_reason as sa_reason, sa.sa_note as sa_note, sa.sa_sh_id as sa_sh_id \r\n"
			+"FROM StockAdjustHeadEntity sa \r\n"
			+"WHERE sa.sa_code = :sa_code \r\n"
			+"AND sa.sa_sh_id = :sa_sh_id";

	public static final String findStockReportById = "SELECT itm.itmid AS itm_id, itm.itm_code AS itm_code,itm.itm_name AS itm_name,itm.itm_capacity AS itm_capacity, \r\n"
			+"itm.itm_unit AS itm_unit, itm.itm_min_quantity AS itm_min_quantity, itm.itm_sell_unit AS itm_sell_unit,st.st_balance AS st_balance, st.st_sh_id AS st_sh_id,st.st_itm_id AS st_itm_id \r\n"
			+"FROM ItemsEntity itm \r\n"
			+"LEFT JOIN StockEntity st \r\n"
			+"ON itm.itmid = st.st_itm_id \r\n"
			+"WHERE st.st_sh_id =:st_sh_id";

	public static final String findStockReportByData = "SELECT itm.itmid AS itm_id, itm.itm_code AS itm_code,itm.itm_name AS itm_name,itm.itm_capacity AS itm_capacity, \r\n"
			+"itm.itm_unit AS itm_unit, itm.itm_min_quantity AS itm_min_quantity, itm.itm_sell_unit AS itm_sell_unit,st.st_balance AS st_balance, st.st_sh_id AS st_sh_id \r\n"
			+ "FROM ItemsEntity itm \r\n"
			+ "LEFT JOIN StockEntity st \r\n"
			+ "ON itm.itmid = st.st_itm_id \r\n"
			+ "GROUP BY itm.itmid,itm.itm_code,st.st_sh_id, st.st_balance \r\n"
			+ "HAVING st.st_sh_id =:st_sh_id AND (itm.itm_code like %:data% OR itm.itm_name like %:data%) \r\n"
			+ "ORDER BY itm.itm_code DESC";

	public static final String findStockAdjustHeadAllByShopId = "select sa.sa_id as saId, sa.sa_code as saCode, to_char(sa.sa_date, 'DD/MM/YYYY') as saDate, sa.sa_gen_user as saGenUser, pd.pmdtbdedesc AS saReason\r\n"
			+ "from StockAdjustHeadEntity sa\r\n"
			+ "LEFT JOIN ParameterDetailEntity pd on pd.pmdtbdentcd = sa.sa_reason\r\n"
			+ "WHERE sa.sa_sh_id = :shopId\r\n"
			+ "AND (pd.pmdtbdtbno = 900)\r\n"
			+ "GROUP BY sa.sa_id, pd.pmdtbdedesc\r\n"
			+ "ORDER BY sa.sa_code desc";
	
	public static final String insertStockMovement = "INSERT INTO bss_stock_movement \r\n"
			+ "( sm_balance_forward, sm_balance, sm_transaction_type, sm_quantity, sm_effect, sm_create_by, sm_update_by, sm_itm_id, sm_sh_id, sm_transaction_id , sm_amount) \r\n"
			+ "VALUES(:balanceForward, :balance, :type, :quantity, :effect, :username, :username,  :itmId, :shopId, :transactionId,:price) \r\n";
	
	public static final String insertStockAdjustHeader = "INSERT INTO bss_stock_adjust_header \r\n"
			+ "(sa_code, sa_gen_user, sa_reason, sa_note, sa_create_by, sa_update_by, sa_sh_id) \r\n"
			+ "VALUES( :saCode, :username, :reason, :note, :ucreate, :uupdate, :shopId)";

	public static final String insertStockAdjustDetail = "INSERT INTO public.bss_stock_adjust_detail \r\n"
			+ "(sad_quantity, sad_create_by, sad_update_by,  sad_itm_id, sad_sa_id) \r\n"
			+ "VALUES( :quantity, :username, :username, :itmId, :saId)";
	
	public static final String findSaIdBySaCode = "SELECT sa.sa_id as sa_id \r\n"
			+"FROM StockAdjustHeadEntity sa \r\n"
			+"WHERE sa.sa_code = :sa_code \r\n"
			+"AND sa.sa_sh_id = :sa_sh_id";
	
	public static final String updateStockAadjust =  "UPDATE bss_stock \r\n"
			+"set st_balance = st_balance+(:quantity),st_balance_forward = st_balance \r\n"
			+"where st_itm_id = :itmId";
	
	public static final String findStockBalanceForward = "SELECT st.st_balance_forward as balanceForward \r\n"
			+"FROM StockEntity st \r\n"
			+"WHERE st.st_sh_id = :st_sh_id \r\n"
			+"AND st.st_itm_id = :st_itm_id";

	public static final String findStockAdjustHeadBySaId = "select sa.sa_id as saId, sa.sa_code as saCode,"
			+"to_char(sa.sa_date, 'DD/MM/YYYY') as saDate, sa.sa_gen_user as saGenUser, sa.sa_note as saNote,"
			+"pd.pmdtbdedesc AS saReason\r\n"
			+ "from StockAdjustHeadEntity sa\r\n"
			+ "LEFT JOIN ParameterDetailEntity pd on pd.pmdtbdentcd = sa.sa_reason\r\n"
			+ "WHERE sa.sa_sh_id = :shopId and sa.sa_id = :saId\r\n"
			+ "AND (pd.pmdtbdtbno = 900)\r\n"
			+ "GROUP BY sa.sa_id, pd.pmdtbdedesc\r\n"
			+ "ORDER BY sa.sa_code desc";

	public static final String findStockAdjustDetailBySaId = "select sad.sad_quantity as sadQuantity,"
			+ "itm.itm_code as itmCode, itm.itm_name as itmName, itm.itm_capacity as itmCapacity,"
			+ "itm.itm_unit as itmUnit, itm.itm_sell_unit as itmSellUnit\r\n"
			+ "from StockAdjustDetailEntity sad\r\n"
			+ "left join ItemsEntity itm on itm.itmid = sad.sad_itm_id\r\n"
			+ "where sad.sad_sa_id = :saId";

	public static final String findStockAdjustByData = "select sa.sa_id as saId, sa.sa_code as saCode,"
			+ "to_char(sa.sa_date, 'DD/MM/YYYY') as saDate, sa.sa_gen_user as saGenUser, pd.pmdtbdedesc AS saReason\r\n"
			+ "from StockAdjustHeadEntity sa\r\n"
			+ "LEFT JOIN ParameterDetailEntity pd on pd.pmdtbdentcd = sa.sa_reason\r\n"
			+ "WHERE sa.sa_sh_id = :shopId AND (sa.sa_code like %:data% OR to_char(sa.sa_date,'DD/MM/YYYY')"
			+ " like %:data% OR sa.sa_gen_user like %:data% OR pd.pmdtbdedesc like %:data%)\r\n"
			+ "AND (pd.pmdtbdtbno = 900)\r\n"
			+ "GROUP BY sa.sa_id, pd.pmdtbdedesc\r\n"
			+ "ORDER BY sa.sa_code desc";
	
	public static final String findListMovementByshopId = "select DISTINCT ON(bsm.sm_itm_id) cast(bsm.sm_date as date), bsm.sm_itm_id, bi.itm_code, \r\n"
			+ "bi.itm_name, bi.itm_capacity, bi.itm_unit, bsm.sm_balance, bi.itm_sell_unit \r\n"
			+"from bss_stock_movement bsm \r\n" 
			+"left join bss_item bi on bi.itm_id = bsm.sm_itm_id \r\n"
			+"where bsm.sm_date <= :dateTo and bsm.sm_date >= :dateFrom and bsm.sm_sh_id = :shopId \r\n"
			+ "ORDER BY bsm.sm_itm_id ASC,bsm.sm_date DESC";
	
	public static final String findListMovementByData = "select DISTINCT ON(bsm.sm_itm_id) cast(bsm.sm_date as date), bsm.sm_itm_id, bi.itm_code, \r\n"
			+ "bi.itm_name, bi.itm_capacity, bi.itm_unit, bsm.sm_balance, bi.itm_sell_unit \r\n"
			+"from bss_stock_movement bsm \r\n" 
			+"left join bss_item bi on bi.itm_id = bsm.sm_itm_id \r\n"
			+"where bsm.sm_date <= :dateTo and bsm.sm_date >= :dateFrom and bsm.sm_sh_id = :shopId and (bi.itm_code like %:data% OR bi.itm_name like %:data% ) \r\n"
			+ "ORDER BY bsm.sm_itm_id ASC,bsm.sm_date DESC";
	
	public static final String findHeaderMovementByshopId = "select sm_date ,itm_code as itmcode ,itm_name as itmname ,itm_capacity as itmcapacity ,itm_unit as itmunit,sm_balance_forward as smbalanceforward \r\n"
			+ ",sm_balance as smbalance ,itm_sell_unit as itmsellunit \r\n"
			+ "from bss_stock_movement bsm \r\n"
			+ "left join bss_item bi ON bsm.sm_itm_id = bi.itm_id \r\n"
			+ "where bsm.sm_sh_id = :shopId and (to_char(bsm.sm_date ,'YYYY-MM-DD') = :smDate) and (bi.itm_id = :itmId) \r\n"
			+ "group by  bsm.sm_id,bsm.sm_date ,bi.itm_code ,bi.itm_name ,bi.itm_capacity ,bi.itm_unit,bsm.sm_balance_forward ,bsm.sm_balance,bi.itm_sell_unit \r\n"
			+ "order by bsm.sm_id DESC";
			
	public static final String findDetailMovementByshopId = "select p2.pmdtbdedesc as effect ,sm_quantity as quantity ,itm_unit as itmunit,p.pmdtbdedesc as transaction_type,itm_sell_unit as itmsellunit \r\n"
			+ "from bss_stock_movement bsm \r\n"
			+ "left join bss_item bi ON bsm.sm_itm_id = bi.itm_id \r\n"
			+ "left join prmtbldtl p2 on p2.pmdtbdentcd = bsm.sm_effect \r\n"
			+ "left join prmtbldtl p on p.pmdtbdentcd = bsm.sm_transaction_type \r\n"
			+ "where bsm.sm_sh_id = :shopId and (p2.pmdtbdtbno = 1100) and (p.pmdtbdtbno = 1000) and (CAST(bsm.sm_date as varchar(10))= :smDate) and (bi.itm_id = :itmId) \r\n"
			+ "group by  p2.pmdtbdedesc,p.pmdtbdedesc, bsm.sm_transaction_type ,bsm.sm_quantity,bi.itm_unit,bi.itm_sell_unit \r\n";
	
	public static final String findMovementByDate = "SELECT (to_char(bsm.sm_date ,'YYYY-MM-DD')) AS dateMovement,COUNT(distinct bsm.sm_itm_id) as numType \r\n"
			+ "FROM bss_stock_movement bsm \r\n"
			+ "WHERE bsm.sm_sh_id =:shopId AND (to_char(bsm.sm_date ,'YYYY-MM-DD') BETWEEN :dateFrom AND :dateTo ) \r\n"
			+ "GROUP BY dateMovement \r\n"
			+ "ORDER BY dateMovement desc, numType desc \r\n ";
}
