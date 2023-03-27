package com.billionshop.items.service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import com.billionshop.util.BeanUtils;

import com.billionshop.items.entity.ItemsEntity;
import com.billionshop.items.model.BarcodeRequest;
import com.billionshop.items.model.ItemsPutInsertRequest;
import com.billionshop.items.model.ItemsPutUpdateRequest;
import com.billionshop.items.repository.ItemsRepository;
import com.billionshop.parameters.repository.ParametersRepository;

@Service
public class ItemsService {
	@Autowired
	ItemsRepository itemRepository;
	@Autowired
	ParametersRepository parametersRepository;
	
	
	public List<Map<String, String>> findItemBydata(String data,Integer shopId) throws ParseException{
		List<Map<String, String>> result = itemRepository.findItemByBarcode(data,shopId);
		if(result.isEmpty()) {
			result = itemRepository.findItemBydata(data,shopId);
		}
		return result;
	}
	
	public List<Map<String, String>> findItemByShopId(Integer shopId) throws ParseException{
		List<Map<String, String>> result = itemRepository.findItemByShopId(shopId);
		return result;
	}
	
	public List<Map<String, String>> findItemSellByShopId(Integer shopId) throws ParseException{
		List<Map<String, String>> result = itemRepository.findItemSellByShopId(shopId);
		return result;
	}
	
	public List<Map<String, String>> findBarcodeItemByItemId(Integer itemId) throws ParseException{
		List<Map<String, String>> result = itemRepository.findBarcodeItemByItemId(itemId);
		return result;
	}
	
	public List<Map<String, String>> InsertItm(ItemsPutInsertRequest itemsPutInsertRequest) throws ParseException{
				itemRepository.InsertItm( 
				itemsPutInsertRequest.getItm_code(),
				itemsPutInsertRequest.getItm_name(), 
				itemsPutInsertRequest.getItm_capacity(),
				itemsPutInsertRequest.getItm_price(), 
				itemsPutInsertRequest.getItm_cost(), 
				itemsPutInsertRequest.getItm_min_quantity(), 
				itemsPutInsertRequest.getItm_order_quantity(), 
				itemsPutInsertRequest.getItm_purchase_frequency(), 
				itemsPutInsertRequest.getItm_unit(),
				itemsPutInsertRequest.getItm_status(),
				itemsPutInsertRequest.getItm_order_unit(),
				itemsPutInsertRequest.getItm_sell_unit(), 
				itemsPutInsertRequest.getItm_img_path(),
				itemsPutInsertRequest.getItm_create_by(), 
				itemsPutInsertRequest.getItm_update_by(), 
				itemsPutInsertRequest.getItm_sh_id());
				List<Map<String, String>> result = 	itemRepository.findItemIdByItemCode(itemsPutInsertRequest.getItm_sh_id(), itemsPutInsertRequest.getItm_code());
				parametersRepository.updateLastCode("1", 800, Long.valueOf(itemsPutInsertRequest.getItm_code()));
			return result;
	}
	public void UpdateItmById(ItemsPutUpdateRequest itemsPutUpdateRequest) throws ParseException {
		itemRepository.UpdateItmById(
				itemsPutUpdateRequest.getItm_id(),
				itemsPutUpdateRequest.getItm_name(),
				itemsPutUpdateRequest.getItm_price(),
				itemsPutUpdateRequest.getItm_capacity(),
				itemsPutUpdateRequest.getItm_unit(),
				itemsPutUpdateRequest.getItm_status(),
				itemsPutUpdateRequest.getItm_min_quantity(),
				itemsPutUpdateRequest.getItm_cost(),
				itemsPutUpdateRequest.getItm_sell_unit(),
				itemsPutUpdateRequest.getItm_order_quantity(),
				itemsPutUpdateRequest.getItm_order_unit(),
				itemsPutUpdateRequest.getItm_purchase_frequency(),
				itemsPutUpdateRequest.getItm_update_by(),
				itemsPutUpdateRequest.getItm_img_path());
	}
	
	
	public void UpdateItm(
			Integer itm_id, 
			String itm_name, 
			Integer itm_capacity,
			Integer itm_price,
			Integer itm_cost,
			Integer itm_min_quantity,
			Integer itm_order_quantity,
			Integer itm_purchase_frequency,
			String itm_unit,
			String itm_order_unit,
			String itm_sell_unit,
			String itm_update_by,
			String itm_status
			) throws ParseException{
		 itemRepository.UpdateItm(itm_id, 
				itm_name, 
				itm_capacity, 
itm_price, itm_cost, itm_min_quantity, itm_order_quantity, itm_purchase_frequency, itm_unit, itm_order_unit, itm_sell_unit, itm_update_by, itm_status);
				
	}
	
	public List<Map<String, String>> findLastItemId() {
//		List<Map<String, String>> result = itemRepository.findLastItemId();
		Long code = parametersRepository.findLastCode("1", 800);
		if(parametersRepository.findLastCode("1", 800) == null) {
			code = (long) 1;
		}else {
			code += 1;
		}

		String gencode = String.valueOf(code);
		Integer num = parametersRepository.findCodeDigit("1", 800)-(gencode.length());
		for(int i=0;i<num;i++) {
			gencode = "0"+gencode;
		}
		List<Map<String, String>> result = new ArrayList<Map<String, String>>();
		Map<String, String> map = new HashMap<String, String>();
		map.put("itmCode",gencode);
		result.add(map);
		return result;
	}

	public List<Map<String, String>> findItemByshop(Integer sh_id) throws ParseException{
		List<Map<String, String>> result = itemRepository.findItemByshop(sh_id);
		return result;
	}
	
	public List<Map<String, String>> findNotiByshop(Integer sh_id) throws ParseException{
		List<Map<String, String>> result = itemRepository.findNotiByshop(sh_id);
		return result;
	}
	
	public List<Map<String, String>> findItemById(Integer itm_id) throws ParseException{
		List<Map<String, String>> result = itemRepository.findItemId(itm_id);
		return result;
	}
	
	public void putBarcode(BarcodeRequest barcodeRequest,String itemCode,String userName) throws ParseException{
		String barcode="",type = "";
		List<Map<String, String>> checkBarcode;
		type = barcodeRequest.getBarcodeType().toString();
		barcode = barcodeRequest.getDataBarcode().toString();
		Integer checker;
			checkBarcode = itemRepository.findBarcodeByItemCodeAndBarcode(barcode, itemCode);
			checker = Integer.valueOf(type);
			if(checkBarcode.isEmpty()==true ) {
				itemRepository.InsertBarcode(barcode,type,itemCode,userName);
				if(checker == 2) {
					Long lastcode = Long.valueOf(barcodeRequest.getDataBarcode().substring(0, 12));
					parametersRepository.updateLastCode("2", 500,lastcode);
				}	
			}
	}
	
	public void removeBarcode(String itemBarcode,String itemCode) throws ParseException{

			itemRepository.deleteBarcode(itemCode,itemBarcode);

	}
	
	public List<Map<String, String>> findBarcodeBSS(Integer shopId,String barcodeType) {
		String lastcode = String.valueOf(parametersRepository.findLastCode("2", 500));
		if(parametersRepository.findLastCode("2", 500)==null) {
			lastcode = "1";
		}else {
			lastcode = String.valueOf(Long.valueOf(lastcode)+1);
		}
		Integer num = parametersRepository.findCodeDigit("2", 500)-(lastcode.length());
		for(int i=0;i<num;i++) {
			lastcode = "0"+lastcode;
		}
		
		List<Map<String, String>> result = new ArrayList<Map<String, String>>();
		Map<String, String> map = new HashMap<String, String>();
		map.put("dataBarcode",lastcode);
		map.put("barcodeType","2");
		result.add(map);
		return result;
	}
	
	public List<Map<String, String>> findItemListByShopId(Integer shopId){
		List<Map<String, String>> result = itemRepository.findItemListByShopId(shopId);
		 return result;
	}
	
	public List<Map<String, String>> findItemListByData(Integer shopId,String data){
		List<Map<String, String>> result = itemRepository.findItemListByData(shopId,data);
		 return result;
	}
	
	public List<Map<String, String>> findItemListByBarcode(Integer shopId,String data){
		List<Map<String, String>> result = itemRepository.findItemListByBarcode(shopId,data);
		 return result;
	}
	
}
