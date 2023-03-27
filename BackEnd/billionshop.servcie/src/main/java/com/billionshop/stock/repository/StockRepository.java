package com.billionshop.stock.repository;

import javax.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.billionshop.stock.entity.StockEntity;

@Repository
@Transactional
public interface StockRepository extends JpaRepository<StockEntity, Integer> {

	@Modifying
	@Query(value = StockRepoQuery.updateBalance, nativeQuery = true)
	public void updateBalance(Integer st_sh_id, Integer st_itm_id, Integer st_balance);

	@Modifying
	@Query(value = StockRepoQuery.insertBalance, nativeQuery = true)
	public void insertBalance(Integer forward, Integer balance, long sale, String user,Integer shopId,Integer itemId);
	
	@Query(value = StockRepoQuery.findStockItmDataById)
	public List<Map<String, String>> findStockItmDataById(Integer st_sh_id, Integer st_itm_id);
	
	@Query(value = StockRepoQuery.findStockBalance)
	public Integer findStockBalance(Integer st_sh_id, Integer st_itm_id);

	@Query(value = StockRepoQuery.findSadIdBySaCode)
	public Integer findSadIdBySadCode(Integer sa_sh_id, String sa_code) ;

	@Query(value = StockRepoQuery.findStockReportById)
	public List<Map<String, String>> findStockReportById(Integer st_sh_id);

	@Query(value = StockRepoQuery.findStockReportByData)
	public List<Map<String, String>> findStockReportByData(String data, Integer st_sh_id);

	@Query(value = StockRepoQuery.findStockAdjustHeadAllByShopId)
	public List<Map<String, String>> findStockAdjustHeadAllByShopId(Integer shopId);
	
	@Modifying
	@Query(value = StockRepoQuery.insertStockAdjustHeader, nativeQuery = true)
	public void insertStockAdjustHeader(String saCode, String username,String ucreate,String uupdate, String reason,String note, Integer shopId);

	@Modifying
	@Query(value = StockRepoQuery.insertStockAdjustDetail, nativeQuery = true)
	public void insertStockAdjustDetail(Integer quantity, String username,Integer itmId,Integer saId);
	
	@Query(value = StockRepoQuery.findSaIdBySaCode)
	public Integer findSaIdBySaCode(Integer sa_sh_id, String sa_code) ;
	
	@Modifying
	@Query(value = StockRepoQuery.updateStockAadjust, nativeQuery = true)
	public void updateStockAadjust(Integer quantity,Integer itmId);
	
	@Query(value = StockRepoQuery.findStockBalanceForward)
	public Integer findStockBalanceForward(Integer st_sh_id, Integer st_itm_id);
	
	@Modifying
	@Query(value = StockRepoQuery.insertStockMovement, nativeQuery = true)
	public void insertStockMovement(Integer balanceForward, Integer balance,String type,long quantity, String effect, String username, Integer itmId, Integer shopId, Integer transactionId,float price);

	@Query(value = StockRepoQuery.findStockAdjustHeadBySaId)
	public List<Map<String, String>> findStockAdjustHeadBySaId(Integer saId, Integer shopId);

	@Query(value = StockRepoQuery.findStockAdjustDetailBySaId)
	public List<Map<String, String>> findStockAdjustDetailBySaId(Integer saId);

	@Query(value = StockRepoQuery.findStockAdjustByData)
	public List<Map<String, String>> findStockAdjustByData(String data, Integer shopId);
	
	@Query(value = StockRepoQuery.findListMovementByshopId, nativeQuery = true)
	public List<Map<LocalDateTime, String>> findListMovementByshopId(LocalDateTime dateTo,LocalDateTime dateFrom,Integer shopId);
	
	@Query(value = StockRepoQuery.findListMovementByData, nativeQuery = true)
	public List<Map<LocalDateTime, String>> findListMovementByData(String data,LocalDateTime dateTo,LocalDateTime dateFrom,Integer shopId);
	
	@Query(value = StockRepoQuery.findHeaderMovementByshopId, nativeQuery = true)
	public List<Map<String, String>> findHeaderMovementByshopId(Integer shopId,String smDate,Integer itmId);
	
	@Query(value = StockRepoQuery.findDetailMovementByshopId, nativeQuery = true)
	public List<Map<String, String>> findDetailMovementByshopId(Integer shopId,String smDate,Integer itmId);
	
	@Query(value = StockRepoQuery.findMovementByDate, nativeQuery = true)
	public List<Map<String, String>> findMovementByDate(String dateFrom,String dateTo,Integer shopId);
}
