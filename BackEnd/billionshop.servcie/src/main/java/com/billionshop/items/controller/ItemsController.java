package com.billionshop.items.controller;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.billionshop.items.entity.ItemsEntity;
import com.billionshop.items.model.BarcodeRequest;
import com.billionshop.items.model.BarcodeResponse;
import com.billionshop.items.model.FindItemByShopIdResponse;
import com.billionshop.items.model.FindItemsListResponse;
import com.billionshop.items.model.FindItemsResponse;
import com.billionshop.items.model.ItemIdResponse;
import com.billionshop.items.model.FindItemsSellByShopIdResponse;
import com.billionshop.items.model.ItemCodeResponse;
import com.billionshop.items.model.ItemsPutInsertRequest;
import com.billionshop.items.model.ItemsPutUpdateRequest;
import com.billionshop.items.model.ItemsResponse;
import com.billionshop.items.model.NotiDetailResponse;
import com.billionshop.items.model.NotiHeaderResponse;
import com.billionshop.items.service.ItemsService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/items")
@Api(value = "items", description = "items Service", tags = { "items" })
public class ItemsController {
	
	@Autowired
	private ItemsService itemsService;
	
	@ApiOperation(value = "Find Item by Data",response = FindItemsResponse.class)
	@GetMapping(value = "/findItems",produces = {"application/json"})
	public List<Map<String, String>> findItemBydata(@RequestParam String data,@RequestParam Integer shopId)throws ParseException
	{
		return itemsService.findItemBydata(data,shopId);
	}
	
	@ApiOperation(value = "Find Items by shopId",response = FindItemByShopIdResponse.class)
	@GetMapping(value = "/findItemByShopId",produces = {"application/json"})
	public List<Map<String, String>> findItemByShopId(@RequestParam Integer shopId)throws ParseException
	{
		return itemsService.findItemByShopId(shopId);
	}
	
	@ApiOperation(value = "Find Items Sell by shopId",response = FindItemsSellByShopIdResponse.class)
	@GetMapping(value = "/findItemSellByShopId",produces = {"application/json"})
	public List<Map<String, String>> findItemSellByShopId(@RequestParam Integer shopId)throws ParseException
	{
		return itemsService.findItemSellByShopId(shopId);
	}
	
	@ApiOperation(value = "Find Barcode Item by ItemId",response = BarcodeResponse.class)
	@GetMapping(value = "/findBarcodeItemByItemId",produces = {"application/json"})
	public List<Map<String, String>> findBarcodeItemByItemId(@RequestParam Integer itemId)throws ParseException
	{
		return itemsService.findBarcodeItemByItemId(itemId);
	}
	
	@ApiOperation(value = "Find Last Items Code ",response = ItemCodeResponse.class)
	@GetMapping(value = "/findLastItemId",produces = {"application/json"})
	public List<Map<String, String>> findLastItemId()throws ParseException
	{
		return itemsService.findLastItemId();
	}
	
	@ApiOperation(value = "Insert Item",response = ItemIdResponse.class)
	@PutMapping(value = "/InsertItm", produces = {"application/json"})
	public List<Map<String, String>> InsertItm(HttpServletRequest request,
			@RequestBody ItemsPutInsertRequest itemsPutInsertRequest
			) throws ParseException {
		 return itemsService.InsertItm(itemsPutInsertRequest);
	}
	
	@ApiOperation(value = "Update Item By Id")
	@PutMapping(value="/UpdateItmById",produces = {"application/json"})
	public void UpdateItmById(
			HttpServletRequest request,
			@RequestBody ItemsPutUpdateRequest itemsPutUpdateRequest
			) throws ParseException {
	 itemsService.UpdateItmById(itemsPutUpdateRequest);	
	}
	
	@ApiOperation(value = "Update Item" ,response = ItemsResponse.class)
	@PutMapping(value = "/UpdateItm", produces = {"application/json"})
	public void UpdateItm(
			@RequestParam Integer itm_id,
			@RequestParam String itm_name,
			@RequestParam Integer itm_capacity,
			@RequestParam Integer itm_price,
			@RequestParam Integer itm_cost,
			@RequestParam Integer itm_min_quantity,
			@RequestParam Integer itm_order_quantity,
			@RequestParam Integer itm_purchase_frequency,
			@RequestParam String itm_unit,
			@RequestParam String itm_order_unit,
			@RequestParam String itm_sell_unit,
			@RequestParam String itm_update_by,
			@RequestParam String itm_status
			) throws ParseException {
		 itemsService.UpdateItm(itm_id, 
				itm_name, 
				itm_capacity, 
				itm_price, 
				itm_cost, 
				itm_min_quantity, 
				itm_order_quantity, 
				itm_purchase_frequency, 
				itm_unit, 
				itm_order_unit, 
				itm_sell_unit, 
				itm_update_by, 
				itm_status) ;
	}
	
	@ApiOperation(value = "Find Item by shop",response = NotiDetailResponse.class)
	@GetMapping(value= "/findItemsByShop",produces = {"application/json"})
	public List<Map<String, String>> findItemByshop(Integer sh_id) throws ParseException
	{
		return itemsService.findItemByshop(sh_id);
	}
	
	@ApiOperation(value = "Find Noti by shop",response = NotiHeaderResponse.class)
	@GetMapping(value= "/findNotiByShop",produces = {"application/json"})
	public List<Map<String, String>> findNotiByshop(Integer sh_id) throws ParseException
	{
		return itemsService.findNotiByshop(sh_id);
	}
	
	@ApiOperation(value = "Find Item by Id" ,response = ItemsResponse.class)
	@GetMapping(value= "/findItemsById",produces = {"application/json"})
	public List<Map<String, String>> findItemById(@RequestParam Integer itm_id) throws ParseException
	{
		return itemsService.findItemById(itm_id);
	}
	
	@ApiOperation(value = "Find BarcodeBss",response = BarcodeResponse.class)
	@GetMapping(value= "/findBarcodeBss",produces = {"application/json"})
	public List<Map<String, String>> findBarcodeBSS(Integer shopId,String barcodeType) throws ParseException
	{
		return itemsService.findBarcodeBSS(shopId,barcodeType);
	}
	
	@ApiOperation(value = "Add Barcode")
	@PutMapping(value="/AddBarcode")
	public void addBarcode(HttpServletRequest request,
			@RequestBody BarcodeRequest barcodeRequest,@RequestParam String itemCode,@RequestParam String userName) throws ParseException {
		itemsService.putBarcode(barcodeRequest,itemCode,userName);
		
	}
	
	@ApiOperation(value = "Delete Barcode")
	@DeleteMapping(value="/DeleteBarcode")
	public void deleteBarcode(String itemBarcode,@RequestParam String itemCode) throws ParseException {
		itemsService.removeBarcode(itemBarcode,itemCode);
		
	}
	
	
	@ApiOperation(value = "Find Items List By Data",response = FindItemsListResponse.class)
	@GetMapping(value= "/findItemListByData",produces = {"application/json"})
	public List<Map<String, String>> findItemListByData(@RequestParam Integer shopId,@RequestParam String data) throws ParseException
	{
		return itemsService.findItemListByData(shopId,data);
	}
	
	@ApiOperation(value = "Find Items List By ShopID",response = FindItemsListResponse.class)
	@GetMapping(value= "/findItemListByShopId",produces = {"application/json"})
	public List<Map<String, String>> findItemListByShopId(@RequestParam Integer shopId) throws ParseException
	{
		return itemsService.findItemListByShopId(shopId);
	}
	
	@ApiOperation(value = "Find Items List By Barcode",response = FindItemsListResponse.class)
	@GetMapping(value= "/findItemListByBarcode",produces = {"application/json"})
	public List<Map<String, String>> findItemListByBarcode(@RequestParam Integer shopId,@RequestParam String data) throws ParseException
	{
		return itemsService.findItemListByBarcode(shopId,data);
	}
	
}
