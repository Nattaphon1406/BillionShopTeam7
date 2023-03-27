package com.billionshop.pco.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.billionshop.pco.entity.PcoHeadEntity;

import java.time.LocalDateTime;
import java.util.*;

@Repository
@Transactional
public interface PcoRepository extends JpaRepository<PcoHeadEntity, Integer> {

	@Query(value = PcoRepoQuery.findPoByShopId)
	public List<Map<String, String>> findPoByShopId(@Param("shopId") Integer shopId);

	@Query(value = PcoRepoQuery.findDetailPoByPoId)
	public List<Map<String, String>> findDetailPoByPoId(@Param("poId") Integer poId);

	@Query(value = PcoRepoQuery.findPoByData)
	public List<Map<String, String>> findPoByData(@Param("data") String data, @Param("shopId") Integer shopId);

	@Query(value = PcoRepoQuery.genPOAutoInteger)
	public List<Map<String, Integer>> genPOAutoInteger(@Param("shopId") Integer shopId);

	@Query(value = PcoRepoQuery.getInfoGoods)
	public Map<String, String> getInfoGoods(Integer goodsId);
	
	@Query(value= PcoRepoQuery.getPoId)
	public Integer getPoId();

	@Query(value = PcoRepoQuery.findPoInRcvByShopId)
	public List<Map<String, String>> findPoInRcvByShopId(@Param("shopId") Integer shopId);
	
	@Query(value = PcoRepoQuery.findPoIdByPoCode)
	public Integer findPoIdByPoCode(String po_code);

	@Modifying
	@Query(value = PcoRepoQuery.insertPoDetail,nativeQuery = true)
	public void insertPoDetail(
			Integer pod_order_quantity_per_unit,
			Integer pod_order_quantity,
			String pod_itm_unit,
			String pod_order_unit,
			String pod_create_by,
			LocalDateTime pod_create_date,
			String pod_update_by,
			LocalDateTime pod_update_date,
			Integer pod_itm_id,
			Integer pod_po_id
			);

	@Modifying
	@Query(value = PcoRepoQuery.updatePoDetail,nativeQuery = true)
	public void updatePoDetail(
			Integer pod_order_quantity,
			String pod_update_by,
			LocalDateTime pod_update_date,
			Integer pod_itm_id,
			Integer pod_po_id
			);

	@Modifying
	@Query("delete from PcoDetailEntity where pod_id = :podId")
	public void deletePoDetail(Integer podId);

	@Query(value = PcoRepoQuery.findPoDetailByCode)
	public Integer findPoDetailByCode(String po_code, Integer pod_itm_id);

	@Modifying
	@Query("UPDATE PcoHeadEntity set po_update_date = :now, po_status = :poStatus, po_update_by = :po_update_by where po_id = :poId")
	public void updatePoHead(Integer poId, String poStatus, LocalDateTime now, String po_update_by);
	
	@Query(value = PcoRepoQuery.findItmInPoByBarcode,nativeQuery = true)
	public List<Map<String, String>> findItmInPoByBarcode(@Param("itmBarcode") String itmBarcode,@Param("shopId") Integer shopId);

	@Query(value = PcoRepoQuery.findPoHeadByPoId)
	public List<Map<String, String>> findPoHeadByPoId(@Param("poId") Integer poId);
	
}

