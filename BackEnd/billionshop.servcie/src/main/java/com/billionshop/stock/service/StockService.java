package com.billionshop.stock.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.billionshop.parameters.repository.ParametersRepository;
import com.billionshop.stock.model.InsertStockAdjustDetailRequest;
import com.billionshop.stock.model.InsertStockAdjustHeadRequest;
import com.billionshop.stock.model.StockMoveRequest;
import com.billionshop.stock.repository.StockRepository;
import com.billionshop.items.repository.ItemsRepository;

@Service
public class StockService {
	@Autowired
	StockRepository stockRepository;
	@Autowired
	ParametersRepository parametersRepository;
	@Autowired
	ItemsRepository itemsRepository;

	public List<Map<String, String>> findStockItemDataById(Integer st_sh_id, Integer st_itm_id) {
		List<Map<String, String>> results = stockRepository.findStockItmDataById(st_sh_id,st_itm_id);
		return results;
	}

	public boolean updateStockBalance(Integer st_sh_id, Integer st_itm_id, Integer st_balance) {
		stockRepository.updateBalance(st_sh_id,st_itm_id,st_balance);
		return true;
	}
	
	public void InsertStockBalance(Integer forward, Integer balance, long sale, String user,Integer shopId,Integer itemId) {
		stockRepository.insertBalance(forward, balance, sale, user, shopId, itemId);
	}
 

	public List<Map<String, String>> findStockReportById(Integer shopId) {
		List<Map<String, String>> results = stockRepository.findStockReportById(shopId);
		return results;
	}

	public List<Map<String, String>> findStockReportByData(Integer shopId, String data) {
		List<Map<String, String>> results;
		
		if(itemsRepository.findItemCodebyBarcode(data, shopId).equals(null)) {
			results = stockRepository.findStockReportByData(data, shopId);
		}else {
			String itemCode = itemsRepository.findItemCodebyBarcode(data, shopId);
			results = stockRepository.findStockReportByData(itemCode, shopId);
		}
		
		return results;
	}

	public List<Map<String, String>> findStockAdjustHeadAllByShopId(Integer shopId) {
		List<Map<String, String>> results = stockRepository.findStockAdjustHeadAllByShopId(shopId);
		return results;
	}
	
	public List<Map<String, String>> findStockAdjustHeadBySaId(Integer saId, Integer shopId) {
		List<Map<String, String>> results = stockRepository.findStockAdjustHeadBySaId(saId, shopId);
		return results;
	}

	public List<Map<String, String>> findStockAdjustDetailBySaId(Integer saId) {
		List<Map<String, String>> results = stockRepository.findStockAdjustDetailBySaId(saId);
		return results;
	}

	public List<Map<String, String>> findStockAdjustByData(String data, Integer shopId) {
		List<Map<String, String>> results = stockRepository.findStockAdjustByData(data, shopId);
		return results;
	}
	
	public List<Map<String, String>> genCodeAdjustStock(){
		Long code = parametersRepository.findLastCode("4", 600);
		String saCode="";
		if (code == null) {
			code = (long) 1;
		} else {
			code += 1;
		}
		Integer digit = parametersRepository.findCodeDigit("4", 600)- String.valueOf(code).length();
		
		for(Integer i = 0;i<digit;i++) {
			saCode += "0";
		}
		saCode = saCode+String.valueOf(code);
		saCode = parametersRepository.findPrefix("4", 600)+ saCode;
		List<Map<String, String>> result = new ArrayList<Map<String, String>>();
		Map<String, String> map = new HashMap<String, String>();
		map.put("saCode",saCode);
		result.add(map);
		return result;
	}
	
	public List<Map<String, Integer>> insertStockAdjustHeader(InsertStockAdjustHeadRequest insertStockAdjustHeadRequest,Integer shopId) {
		String username = insertStockAdjustHeadRequest.getSaGenUser();
		String reason = insertStockAdjustHeadRequest.getSaReason();
		String note = insertStockAdjustHeadRequest.getSaNote();
		String ucreate = insertStockAdjustHeadRequest.getSaUserCreate();
		String uupdate = insertStockAdjustHeadRequest.getSaUserUpdate();
		Long code = parametersRepository.findLastCode("4", 600);
		String saCode="";
		if (code == null) {
			code = (long) 1;
		} else {
			code += 1;
		}
		parametersRepository.updateLastCode("4", 600, code);
		Integer digit = parametersRepository.findCodeDigit("4", 600)- String.valueOf(code).length();
		
		for(Integer i = 0;i<digit;i++) {
			saCode += "0";
		}
		saCode = saCode+String.valueOf(code);
		saCode = parametersRepository.findPrefix("4", 600)+ saCode;
		
		stockRepository.insertStockAdjustHeader(saCode,username,ucreate,uupdate,reason,note,shopId);
		Integer saId = stockRepository.findSaIdBySaCode(shopId, saCode);
		List<Map<String, Integer>> result = new ArrayList<Map<String, Integer>>();
		Map<String, Integer> map = new HashMap<String, Integer>();
		map.put("saId",saId);
		result.add(map);
		return result;
	}
	
	public void insertStockAdjustDetail(InsertStockAdjustDetailRequest insertStockAdjustDetailRequest,Integer saId,Integer shopId) {
		String username = insertStockAdjustDetailRequest.getSaGenUser();
		Integer quantity = insertStockAdjustDetailRequest.getSaQuantity();
		Integer itmId = insertStockAdjustDetailRequest.getItmId();
		Integer balance = stockRepository.findStockBalance(shopId, itmId);
		balance =  balance + quantity;
		stockRepository.updateStockAadjust(quantity, itmId);
		stockRepository.insertStockAdjustDetail(quantity,username,itmId,saId);
		Integer balanceForward = stockRepository.findStockBalanceForward(shopId, itmId);
		if(quantity < 0) {
			stockRepository.insertStockMovement(balanceForward, balance, "3", quantity*-1, "2", username, itmId, shopId, saId,0);
		}else {
			stockRepository.insertStockMovement(balanceForward, balance, "3", quantity, "1", username, itmId, shopId, saId,0);
		}
	}

	public List<Map<String, String>> findAllReason() {
		return parametersRepository.findReasonAll();
	}
	
	public List<Map<LocalDateTime, String>> findListMovementByshopId(String data,String sm_date,Integer shopId) {
		String smdate = sm_date + "T23:59:59";
		String smDate = sm_date + "T00:00:00";
		String code = itemsRepository.findItemCodebyBarcode(data, shopId);
		if(code != null) {
			data = code;
		}
		DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
		LocalDateTime dateTo = LocalDateTime.parse(smdate, formatter);
		LocalDateTime dateFrom = LocalDateTime.parse(smDate, formatter);
		List<Map<LocalDateTime, String>> results;
		if(data == "") {
			results = stockRepository.findListMovementByshopId(dateTo,dateFrom,shopId);
		}else {
			results = stockRepository.findListMovementByData(data,dateTo,dateFrom,shopId);
		}
		
		return results;
	}
	
	public List<Map<String, String>> findHeaderMovementByshopId(Integer shopId,String smDate,Integer itmId) {
		List<Map<String, String>> results = stockRepository.findHeaderMovementByshopId(shopId,smDate,itmId);
		return results;
		}
	
	public List<Map<String, String>> findDetailMovementByshopId(Integer shopId,String smDate,Integer itmId) {
	List<Map<String, String>> results = stockRepository.findDetailMovementByshopId(shopId,smDate,itmId);
	return results;
	}
	
	public List<Map<String, String>> findAllMovementByshopId(StockMoveRequest stockMoveRequest) {
		String dateFrom = stockMoveRequest.getDateFrom();
		String dateTo = stockMoveRequest.getDateTo();
		Integer shopId = stockMoveRequest.getShopId();
		List<Map<String, String>> results = stockRepository.findMovementByDate(dateFrom,dateTo,shopId);
		return results;
		}
}
