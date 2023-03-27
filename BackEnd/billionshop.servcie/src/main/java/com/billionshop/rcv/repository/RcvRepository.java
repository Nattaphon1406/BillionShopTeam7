package com.billionshop.rcv.repository;

import javax.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.billionshop.rcv.entity.RcvHeadEntity;

@Repository
@Transactional
public interface RcvRepository extends JpaRepository<RcvHeadEntity, Integer> {

	@Query(value = RcvRepoQuery.findDetailRcvById)
	public List<Map<String, String>> findDetailRcvById(@Param("riId") Integer riId);

	@Query(value = RcvRepoQuery.findHeadRcvById)
	public List<Map<String, String>> findHeadRcvById(@Param("riId") Integer riId);

	@Query(value = RcvRepoQuery.findPoByShopId)
	public List<Map<String, String>> findPoByShopId(@Param("shopId") Integer shopId);

	@Query(value = RcvRepoQuery.findPoByData)
	public List<Map<String, String>> findPoByData(@Param("shopId") Integer shopId, @Param("data") String data);

	@Query(value = RcvRepoQuery.findRcvByData)
	public List<Map<String, String>> findRcvByData(@Param("data") String data, @Param("shopId") Integer shopId);

	@Query(value = RcvRepoQuery.findHeadRcvAllById)
	public List<Map<String, String>> findHeadRcvAllById(Integer shopId);

	@Query(value = RcvRepoQuery.findRcvIdByRcvCode)
	public Integer findRcvIdByRcvCode(String ri_code);

	@Modifying
	@Query(value = RcvRepoQuery.insertRcvDetail, nativeQuery = true)
	public void insertRcvDetail(
			Integer rid_quantity_per_unit,
			Integer rid_receive_quantity,
			String rid_item_unit,
			String rid_order_unit, 
			Float rid_purchase_price,
			String rid_create_by,
			LocalDateTime now,
			String rid_update_by,
			LocalDateTime now2,
			Integer rid_itm_id,
			Integer rid_ri_id);

	@Modifying
	@Query(value = RcvRepoQuery.updateRcvDetail, nativeQuery = true)
	public void updateRcvDetail(
			Integer rid_receive_quantity,
			Float rid_purchase_price,
			String rid_update_by,
			LocalDateTime now,
			Integer rid_itm_id,
			Integer rid_ri_id);

	@Query(value = RcvRepoQuery.findRcvDetailByCode)
	public Integer findRcvDetailByCode(
			String ri_code,
			Integer rid_itm_id);

	@Modifying
	@Query("delete from RcvDetailEntity where rid_id = :rid_id")
	public void deleteRcvDetail(Integer rid_id);

	@Query(value = RcvRepoQuery.findRcvIdByRiCode)
	public Integer findRcvIdByRiCode(String ri_code);

	@Modifying
	@Query("update RcvHeadEntity set ri_update_date = :now, ri_status = :riStatus, ri_update_by = :ri_update_by where ri_id = :riId")
	public void updateRcvHead(Integer riId, String riStatus, LocalDateTime now, String ri_update_by);

	@Query(value = RcvRepoQuery.findPcoIdbyRcvCode)
	public Integer findPcoIdbyRcvCode(String ri_code, Integer shopId);

	

}
