package com.billionshop.report.repository;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.billionshop.pco.repository.PcoRepoQuery;
import com.billionshop.sell.entity.ReceiptDetailEntity;

@Repository
@Transactional
public interface ReportRepository extends JpaRepository<ReceiptDetailEntity, Integer> {
	
	@Query(value = ReportRepoQuery.getInfoItemByShopId,nativeQuery = true)
	public List<Map<String, String>> getInfoItemByShopId(@Param("shopId") Integer shopId);
	
	@Query(value = ReportRepoQuery.getInfoItemByItmId,nativeQuery = true)
	public Map<String, String> getInfoItemByItmId(Integer itmId);
	
	@Query(value = ReportRepoQuery.findSaleReportByData,nativeQuery = true)
	public List<Map<String, String>> findSaleReportByData(@Param("data") String data, @Param("shopId") Integer shopId,@Param("dateFrom") String dateFrom,@Param("dateTo") String dateTo);
	
	@Query(value = ReportRepoQuery.findSalesReportByBarcode,nativeQuery = true)
	public List<Map<String, String>> findSalesReportByBarcode(@Param("itmBarcode") String itmBarcode,@Param("shopId") Integer shopId);
	
	@Query(value = ReportRepoQuery.findSaleReportByDate,nativeQuery = true)
	public List<Map<String, String>> findSaleReportByDate(@Param("shopId") Integer shopId,@Param("dateFrom") String dateFrom,@Param("dateTo") String dateTo);

}
