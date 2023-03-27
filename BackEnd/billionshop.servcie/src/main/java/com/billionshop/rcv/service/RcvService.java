package com.billionshop.rcv.service;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.billionshop.parameters.repository.ParametersRepository;
import com.billionshop.pco.repository.PcoRepository;
import com.billionshop.rcv.entity.RcvHeadEntity;
import com.billionshop.rcv.model.GenRcvHeadRequest;
import com.billionshop.rcv.model.RcvPutDetailRequest;
import com.billionshop.rcv.model.RcvPutHeadRequest;
import com.billionshop.rcv.repository.RcvRepository;
import com.billionshop.stock.repository.StockRepository;
import com.billionshop.items.repository.ItemsRepository;

@Service
public class RcvService {
	@Autowired
	RcvRepository rcvRepository;
	@Autowired
	ParametersRepository parametersRepository;
	@Autowired
	PcoRepository pcoRepository;
	@Autowired
	ItemsRepository itemsRepository;
	@Autowired
	StockRepository stockRepository;
	
	public List<Map<String, String>> findDetailRcvById(Integer riId) {
		List<Map<String, String>> results = rcvRepository.findDetailRcvById(riId);
		return results;
	}

	public List<Map<String, String>> findHeadRcvById(Integer riId) {
		List<Map<String, String>> results = rcvRepository.findHeadRcvById(riId);
		return results;
	}

	public List<Map<String, String>> findPoByData(Integer shopId, String data) throws ParseException {

		List<Map<String, String>> results;

		if (data == "") {
			results = rcvRepository.findPoByShopId(shopId);

		} else {
			results = rcvRepository.findPoByData(shopId, data);
		}
		return results;
	}

	public List<Map<String, String>> findRcvByData(Integer shopId, String data) {
		List<Map<String, String>> results = rcvRepository.findRcvByData(data, shopId);
		return results;
	}

	public List<Map<String, String>> findHeadRcvAllById(Integer shopId) {
		List<Map<String, String>> results = rcvRepository.findHeadRcvAllById(shopId);
		return results;
	}

	public List<Map<String, String>> GenRcvCode() {
		Long code = parametersRepository.findLastCode("2", 600);
		if (parametersRepository.findLastCode("2", 600) == null) {
			code = (long) 1;
		} else {
			code += 1;
		}

		String gencode = String.valueOf(code);
		Integer num = parametersRepository.findCodeDigit("2", 600) - (gencode.length());
		for (int i = 0; i < num; i++) {
			gencode = "0" + gencode;
		}
		List<Map<String, String>> result = new ArrayList<Map<String, String>>();
		Map<String, String> map = new HashMap<String, String>();
		map.put("RcvCode", gencode);
		result.add(map);
		return result;
	}

	public List<Map<String, Integer>> insertRcvHead(RcvPutHeadRequest rcvPutHeadRequest) throws ParseException {
		Integer rcvId = rcvRepository.findRcvIdByRcvCode(rcvPutHeadRequest.getRi_code());
		Long code = parametersRepository.findLastCode("2", 600);
		Integer poId = rcvRepository.findPcoIdbyRcvCode(rcvPutHeadRequest.getRi_code(),rcvPutHeadRequest.getShopId());
		if (code == null) {
			code = (long) 1;
		} else {
			code += 1;
		}
		String rcv = rcvPutHeadRequest.getRi_status().toString();
		if (rcvId == null) {
			RcvHeadEntity phe = new RcvHeadEntity();
			phe.setRi_code(rcvPutHeadRequest.getRi_code());
			phe.setRi_date(LocalDateTime.now());
			phe.setRi_gen_user(rcvPutHeadRequest.getRi_gen_user());
			phe.setRi_create_by(rcvPutHeadRequest.getRi_create_by());
			phe.setRi_update_by(rcvPutHeadRequest.getRi_update_by());
			phe.setRi_status(rcvPutHeadRequest.getRi_status().toString());
			phe.setRi_create_date(LocalDateTime.now());
			phe.setRi_update_date(LocalDateTime.now());
			phe.setRi_sh_id(rcvPutHeadRequest.getShopId());
			phe.setRi_po_id(rcvPutHeadRequest.getPoId());
			rcvRepository.save(phe);
			parametersRepository.updateLastCode("2", 600, code);
		} else if (rcvId != null && rcv.equals("1")) {
			rcvRepository.updateRcvHead(rcvId, rcvPutHeadRequest.getRi_status().toString(), LocalDateTime.now(), rcvPutHeadRequest.getRi_update_by());
		}
		if (rcv.equals("2")) {
			if(poId == null) {
				poId = rcvPutHeadRequest.getPoId();
			}
			rcvRepository.updateRcvHead(rcvId, "2", LocalDateTime.now(), rcvPutHeadRequest.getRi_update_by());
			pcoRepository.updatePoHead(poId,"3", LocalDateTime.now(),rcvPutHeadRequest.getRi_update_by());
		}
		rcvId = rcvRepository.findRcvIdByRiCode(rcvPutHeadRequest.getRi_code());
		List<Map<String, Integer>> result = new ArrayList<Map<String, Integer>>();
		Map<String, Integer> map = new HashMap<String, Integer>();
		map.put("rcvId", rcvId);
		result.add(map);
		return result;
	}

	public boolean rcvDetail(RcvPutDetailRequest rcvPutDetailRequest,String checkSave) throws ParseException {
		Integer results = rcvRepository.findRcvDetailByCode(rcvPutDetailRequest.getRi_code(),
				rcvPutDetailRequest.getRid_itm_id());
		Integer rcvId = rcvRepository.findRcvIdByRiCode(rcvPutDetailRequest.getRi_code());

		Integer itmId = rcvPutDetailRequest.getRid_itm_id();
		String userName = rcvPutDetailRequest.getRid_update_by();
		Integer quantity = rcvPutDetailRequest.getRid_receive_quantity() * rcvPutDetailRequest.getRid_receive_quantity_per_unit();
		Integer shopId = itemsRepository.findShopByItmId(itmId);
		Integer balance = stockRepository.findStockBalance(shopId, itmId);
		if (results == null) {
			 insertRcvDetail(rcvPutDetailRequest,checkSave);
		} else if (results != null) {
			 updateRcvDetail(rcvPutDetailRequest,checkSave);
		}
		Integer balanceForward = stockRepository.findStockBalanceForward(shopId, itmId);
		if(balance == null) {
			balance = 0;
		}
		if(balanceForward == null) {
			balanceForward = 0;
		}
		balance =  balance + quantity;
		stockRepository.insertStockMovement(balanceForward, balance, "1", quantity, "1", userName, itmId, shopId, rcvId,0);
		return true;
	}

	public void insertRcvDetail(RcvPutDetailRequest rcvPutDetailRequest,String checkSave) throws ParseException {
		Integer rcvID = rcvRepository.findRcvIdByRcvCode(rcvPutDetailRequest.getRi_code());

		rcvRepository.insertRcvDetail(
				rcvPutDetailRequest.getRid_receive_quantity_per_unit(),
				rcvPutDetailRequest.getRid_receive_quantity(),
				rcvPutDetailRequest.getRid_itm_sell_unit(),
				rcvPutDetailRequest.getRid_order_unit(),
				rcvPutDetailRequest.getRid_purchase_price(),
				rcvPutDetailRequest.getRid_create_by(),
				LocalDateTime.now(),
				rcvPutDetailRequest.getRid_create_by(),
				LocalDateTime.now(),
				rcvPutDetailRequest.getRid_itm_id(),
				rcvID);
		if(checkSave.equals("confirm") ) {
			ArrayList<Float> arr = new ArrayList<Float>();
			arr.add(rcvPutDetailRequest.getShop_id().floatValue());
			arr.add(rcvPutDetailRequest.getRid_itm_id().floatValue());
			arr.add(rcvPutDetailRequest.getRid_receive_quantity_per_unit().floatValue());
			arr.add(rcvPutDetailRequest.getRid_receive_quantity().floatValue());
			arr.add(rcvPutDetailRequest.getRid_purchase_price());
			updateItemCostStock(arr,rcvPutDetailRequest);
		}

		
	}

	public void updateRcvDetail(RcvPutDetailRequest rcvPutDetailRequest,String checkSave) throws ParseException {
		Integer rcvID = rcvRepository.findRcvIdByRcvCode(rcvPutDetailRequest.getRi_code());

		rcvRepository.updateRcvDetail(
				rcvPutDetailRequest.getRid_receive_quantity(),
				rcvPutDetailRequest.getRid_purchase_price(),
				rcvPutDetailRequest.getRid_update_by(),
				LocalDateTime.now(),
				rcvPutDetailRequest.getRid_itm_id(),
				rcvID);
		if(checkSave.equals("confirm")) {
			ArrayList<Float> arr = new ArrayList<Float>();
			arr.add(rcvPutDetailRequest.getShop_id().floatValue());
			arr.add(rcvPutDetailRequest.getRid_itm_id().floatValue());
			arr.add(rcvPutDetailRequest.getRid_receive_quantity_per_unit().floatValue());
			arr.add(rcvPutDetailRequest.getRid_receive_quantity().floatValue());
			arr.add(rcvPutDetailRequest.getRid_purchase_price());
			updateItemCostStock(arr,rcvPutDetailRequest);
		}

	}

	public List<Map<String, String>> findDetailPcoByCode(Integer poId) {
		List<Map<String, String>> results = pcoRepository.findDetailPoByPoId(poId);
		return results;
	}

	public boolean deleteRcvDetail(Integer rid_itm_id, String ri_code) {
		Integer rid_id = rcvRepository.findRcvDetailByCode(ri_code, rid_itm_id);
		rcvRepository.deleteRcvDetail(rid_id);
		return true;
	}

	public GenRcvHeadRequest genRcvHead() throws ParseException {
		GenRcvHeadRequest phe = new GenRcvHeadRequest();
		Long code = parametersRepository.findLastCode("2", 600);

		if (code == null) {
			code = (long) 1;
		} else {
			code += 1;
		}

		String gencode = String.valueOf(code);
		Integer num = parametersRepository.findCodeDigit("2", 600) - (gencode.length());
		for (int i = 0; i < num; i++) {
			gencode = "0" + gencode;
		}
		String riCode = parametersRepository.findPrefix("2", 600) + gencode;

		phe.setRiCode(riCode);

		String dateNow = LocalDateTime.now().toString();
		String y = dateNow.substring(0, 4);
		String m = dateNow.substring(5, 7);
		String d = dateNow.substring(8, 10);
		String date = d + '/' + m + '/' + y;

		phe.setRiDate(date);

		return phe;
	}
	
	public boolean updateItemCostStock(ArrayList<Float> arr,RcvPutDetailRequest rcvPutDetailRequest)throws ParseException {
		// index 0 = shop_id , index 1 = item_id , index 2 = receive_quantity_per_unit, index 3 = receive_quantity, index 4 = purchase_price  
		Integer St_Balance = stockRepository.findStockBalance(arr.get(0).intValue(), arr.get(1).intValue());
		float itm_cost = itemsRepository.findItemCost(arr.get(1).intValue());
		float cost = 0;
		float psv = 0;
		Integer Balance = arr.get(2).intValue() * arr.get(3).intValue();
		if(St_Balance != null) {
			stockRepository.updateBalance(
			arr.get(0).intValue(), 
			arr.get(1).intValue(), 
			(Balance));
		}else {
			
			Integer shopId = rcvPutDetailRequest.getShop_id();
			Integer itemId = rcvPutDetailRequest.getRid_itm_id();
			String user = rcvPutDetailRequest.getRid_create_by();
			long sale = (long)itemsRepository.findItemPrice(itemId);
			stockRepository.insertBalance(0, Balance, sale,user ,shopId, itemId);
		}
		St_Balance = stockRepository.findStockBalance(arr.get(0).intValue(), arr.get(1).intValue());
		if(itm_cost == 0) {
			cost = arr.get(4) / Balance;
		}else {
			psv = itm_cost * St_Balance;
			cost = (psv + arr.get(4)) / (St_Balance + Balance);
		}
		itemsRepository.insertCost(cost,arr.get(1).intValue());

		return true;
	}

}
