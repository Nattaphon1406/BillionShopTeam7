package com.billionshop.items.repository;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.billionshop.items.entity.ItemsEntity;
//import com.billionshop.login.entity.ShopEntity;

@Repository
@Transactional
public interface ItemsRepository extends JpaRepository<ItemsEntity, Integer> {
	public ItemsEntity findByItmid(@Param("itmid") Integer itmid);

	@Query(value = ItemsRepoQuery.findItemBydata, nativeQuery = true)
	public List<Map<String, String>> findItemBydata(@Param("data") String data, @Param("shopId") Integer shopId);

	@Query(value = ItemsRepoQuery.findItemByBarcode, nativeQuery = true)
	public List<Map<String, String>> findItemByBarcode(@Param("data") String data, @Param("shopId") Integer shopId);
	
	@Query(value = ItemsRepoQuery.findItemByShopId)
	public List<Map<String, String>> findItemByShopId(@Param("shopId") Integer shopId);

	@Query(value = ItemsRepoQuery.findItemSellByShopId)
	public List<Map<String, String>> findItemSellByShopId(@Param("shopId") Integer shopId);
	
	@Query(value = ItemsRepoQuery.findBarcodeItemByItemId)
	public List<Map<String, String>> findBarcodeItemByItemId(@Param("itemId") Integer itemId);

	@Modifying
	@Query(value = ItemsRepoQuery.InsertItm, nativeQuery = true)
	public void InsertItm(
			String itm_code, 
			String itm_name,
			Double itm_capacity, 
			Integer itm_price,
			Integer itm_cost, 
			Integer itm_min_quantity,
			Integer itm_order_quantity,
			Integer itm_purchase_frequency, 
			String itm_unit,
			String itm_status, 
			String itm_order_unit,
			String itm_sell_unit, 
			String itm_img_path,
			String itm_create_by, 
			String itm_update_by,
			Integer itm_sh_id);

	@Modifying
	@Query(value = ItemsRepoQuery.UpdateItmByid, nativeQuery = true)
	public void UpdateItmById(
			Integer itm_id,
			String itm_name,
			Integer itm_price,
			Double itm_capacity,
			String itm_unit,
			String itm_status,
			Integer itm_min_quantity,
			Integer itm_cost,
			String itm_sell_unit,
			Integer itm_order_quantity,
			String itm_order_unit,
			Integer itm_purchase_frequency,
			String itm_update_by,
			String itm_img_path);
			
	
	@Modifying
	@Query(value = ItemsRepoQuery.UpdateItm, nativeQuery = true)
	public void UpdateItm(@Param("itm_id") Integer itm_id, 
			@Param("itm_name") String item_name, 
			@Param("itm_capacity") Integer itm_capacity,
			@Param("itm_price") Integer itm_price, 
			@Param("itm_cost") Integer itm_cost,
			@Param("itm_min_quantity") Integer itm_min_quantity,
			@Param("itm_order_quantity") Integer itm_order_quantity,
			@Param("itm_purchase_frequency") Integer itm_purchase_frequency, 
			@Param("itm_unit") String itm_unit,
			@Param("itm_order_unit") String itm_order_unit, 
			@Param("itm_sell_unit") String itm_sell_unit,
			@Param("itm_update_by") String itm_update_by,
			@Param("itm_status") String itm_status);

	@Query(value = ItemsRepoQuery.findLastItemId)
	public List<Map<String, String>> findLastItemId();

	@Query(value = ItemsRepoQuery.findItemByshop)
	public List<Map<String, String>> findItemByshop(Integer sh_id);

	@Query(value = ItemsRepoQuery.findNotiByshop)
	public List<Map<String, String>> findNotiByshop(Integer sh_id);
	
	@Query(value = ItemsRepoQuery.findItemId, nativeQuery = true)
	public List<Map<String, String>> findItemId(Integer itm_id);

	@Modifying
	@Query(value = ItemsRepoQuery.InsertBarcode,nativeQuery = true)
	public void InsertBarcode(String barcode,String typeBarcode,String itemCode,String userName);
	
	@Modifying
	@Query(value = ItemsRepoQuery.deleteBarcode,nativeQuery = true)
	public void deleteBarcode(String itemCode,String Barcode);
	
	@Query(value = ItemsRepoQuery.findBarcodeByItemCodeAndBarcode)
	public List<Map<String, String>> findBarcodeByItemCodeAndBarcode(String barcode,String itemCode);
		
	@Query(value = ItemsRepoQuery.findItemIdByItemCode)
	public List<Map<String, String>> findItemIdByItemCode(Integer shopId,String itmcode);
	
	@Query(value = ItemsRepoQuery.findItemListByShopId)
	public List<Map<String, String>> findItemListByShopId(Integer shopId);
	
	@Query(value = ItemsRepoQuery.findItemListByData)
	public List<Map<String, String>> findItemListByData(Integer shopId,String data);
	
	@Query(value = ItemsRepoQuery.findItemListByBarcode)
	public List<Map<String, String>> findItemListByBarcode(Integer shopId,String data);
	
	@Query(value = ItemsRepoQuery.findItemCost)
	public float findItemCost(Integer itm_id);
	
	@Modifying
	@Query(value = ItemsRepoQuery.insertCost,nativeQuery = true)
	public void insertCost(float cost,Integer itm_id);
	
	@Query(value = ItemsRepoQuery.findItemPrice)
	public long findItemPrice(Integer itm_id);
	
	@Query(value = ItemsRepoQuery.findShopByItmId)
	public Integer findShopByItmId(Integer itm_id);
	
	@Query(value = ItemsRepoQuery.findItemCodebyBarcode)
	public String findItemCodebyBarcode(String data,Integer shopId);
	
	@Query(value = ItemsRepoQuery.findPriceByItmId)
	public float findPriceByItmId(Integer itm_id);
	
}
