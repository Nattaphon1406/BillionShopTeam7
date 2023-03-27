package com.billionshop.sell.repository;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.billionshop.sell.entity.ReceiptDetailEntity;
import com.billionshop.sell.entity.ReceiptHeaderEntity;

@Repository
@Transactional
public interface SellRepository extends JpaRepository<ReceiptDetailEntity, Integer> {

	@Query(value = SellRepoQuery.findItemByShopId)
	public List<Map<String, String>> findItemByShopId(@Param("shopId") Integer shopId);
	
	@Query(value = SellRepoQuery.findItemByData,nativeQuery = true)
	public List<Map<String, String>> findItemByData(@Param("shopId") Integer shopId,@Param("data") String data);
	
	@Query(value = SellRepoQuery.findItemByBarcode)
	public List<Map<String, String>> findItemByBarcode(@Param("shopId") Integer shopId,@Param("data") String data);
	
	@Query(value = SellRepoQuery.findCodeREC)
	public List<Map<String, String>> findCodeREC(@Param("shopId") Integer shopId);
	
	@Query(value = SellRepoQuery.findIdREC)
	public List<Map<String, String>> findIdREC(@Param("shopId") Integer shopId,String code);
	
	@Modifying
	@Query(value = SellRepoQuery.InsertHeaderPayment,nativeQuery = true)
	public void InsertHeaderPayment(@Param("rc_code") String rc_code,@Param("rc_total") Double rc_total,@Param("rc_change") Double rc_change,@Param("rc_cash") Double rc_cash,@Param("userName") String userName,@Param("shopId") Integer shopId);
	
	@Modifying
	@Query(value = SellRepoQuery.InsertDetailPayment,nativeQuery = true)
	public void InsertDetailPayment(@Param("rd_itm_name") String rd_itm_name,
			@Param("rd_capacity") Double rd_capacity,
			@Param("rd_itm_quatity") Integer rd_itm_quatity,
			@Param("rd_capacity_unit") String rd_capacity_unit,
			@Param("rd_itm_unit") String rd_itm_unit,
			@Param("userName") String userName,
			@Param("rd_itm_id") Integer rd_itm_id,
			@Param("rcId") Integer rcId);
	
	@Modifying
	@Query(value=SellRepoQuery.UpdateStock,nativeQuery=true)
	public void UpdateStock(@Param("rd_itm_id") Integer rd_itm_id, @Param("tmBalanceForward") Integer tmBalanceForward,
			@Param("rcId") Integer rcId);
	
	@Query(value= SellRepoQuery.findRecHeader)
	public List<Map<String, String>> findRecHeader(@Param("shopId") Integer shopId,@Param("rcId") Integer rcId);
	
	@Query(value= SellRepoQuery.findRecDetail)
	public List<Map<String, String>> findRecDetail(@Param("rcId") Integer rcId);
	
	
}
