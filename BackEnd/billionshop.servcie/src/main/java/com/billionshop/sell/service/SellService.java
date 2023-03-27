package com.billionshop.sell.service;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.billionshop.items.repository.ItemsRepository;
import com.billionshop.parameters.repository.ParametersRepository;
import com.billionshop.sell.model.SellBucketRequest;
import com.billionshop.sell.model.SellPaymentRequest;
import com.billionshop.sell.repository.SellRepository;
import com.billionshop.stock.repository.StockRepository;

@Service
public class SellService {
	@Autowired
	SellRepository sellRepository;
	
	@Autowired
	ParametersRepository parametersRepository;

	@Autowired
	StockRepository stockRepository;
	
	@Autowired
	ItemsRepository itemRepository;
	
	public List<Map<String, String>> findItemByShopId(Integer shopId) throws ParseException{
		List<Map<String, String>> result = sellRepository.findItemByShopId(shopId);
		return result;
	}
	
	public List<Map<String, String>> findItemByData(Integer shopId,String data) throws ParseException{
		List<Map<String, String>> result = sellRepository.findItemByBarcode(shopId,data);
		if(result.isEmpty()) {
			result = sellRepository.findItemByData(shopId,data);
		}
		return result;
	}
	
	public List<Map<String, String>> InsertHeaderPayment(SellPaymentRequest sellPaymentRequest) throws ParseException{
		Double rc_total,rc_change,rc_cash;
		Integer shopId = sellPaymentRequest.getShId();
		String rc_code = "1",dentcd = "3";
		String userName = sellPaymentRequest.getCreateBy();
		rc_change = sellPaymentRequest.getChange() ;
		rc_total = sellPaymentRequest.getTotalPrice();
		rc_cash = sellPaymentRequest.getCash();
		Integer bno = 600;
		Long lastcode = (long) 1,docNumber;
		if(parametersRepository.findLastCode(dentcd, bno) != null) {
			docNumber =  (long) parametersRepository.findLastCode(dentcd, bno).intValue()+1;
			lastcode = docNumber;
			rc_code = String.valueOf(docNumber);
			docNumber = (long) parametersRepository.findCodeDigit(dentcd, bno)-rc_code.length();
			for(int i=0;i<docNumber;i++) {
				rc_code = '0'+rc_code;
			}
		}else {
			
			docNumber = (long) parametersRepository.findCodeDigit(dentcd, bno)-1;
			for(int i=0;i<docNumber;i++) {
				rc_code = '0'+rc_code;
			}
		}
		
		parametersRepository.updateLastCode(dentcd, bno, lastcode);
		sellRepository.InsertHeaderPayment(rc_code,rc_total,rc_change,rc_cash,userName,shopId);
		List<Map<String, String>> result =  sellRepository.findIdREC(shopId, rc_code);
		return result;
	}
	
	public void InsertDetailPayment(SellBucketRequest sellBucketRequest,String userName,Integer rcId)throws ParseException{
		Double rd_capacity;
		Integer rd_itm_quatity,rd_itm_id;
		String rd_itm_name,rd_capacity_unit;
		rd_itm_name = sellBucketRequest.getItemname();
		rd_capacity = sellBucketRequest.getItemcapacity();
		rd_itm_quatity = sellBucketRequest.getNumberItem();
		rd_capacity_unit = sellBucketRequest.getItemunit();
		rd_itm_id = sellBucketRequest.getId();
		Integer shopId = itemRepository.findShopByItmId(rd_itm_id);
		Integer balance = stockRepository.findStockBalance(shopId, rd_itm_id);
		Integer tmBalanceForward = balance;
		sellRepository.InsertDetailPayment(rd_itm_name, rd_capacity, rd_itm_quatity, rd_capacity_unit, rd_itm_name, userName, rd_itm_id, rcId);		
		sellRepository.UpdateStock(rd_itm_id,tmBalanceForward, rcId);
		Integer balanceForward = stockRepository.findStockBalanceForward(shopId, rd_itm_id);
		balance =  balance + (rd_itm_quatity*-1);
		float price = itemRepository.findPriceByItmId(rd_itm_id);
		stockRepository.insertStockMovement(balanceForward, balance, "2", rd_itm_quatity, "2", userName, rd_itm_id, shopId, rcId,price);
	}
	
	public List<Map<String, String>> findCodeREC(Integer shopId) throws ParseException{
		List<Map<String, String>> result = sellRepository.findCodeREC(shopId);
		return result;			
	}
	
	public List<Map<String, String>> findIdREC(Integer shopId, String rc_code) throws ParseException{
		List<Map<String, String>> result = sellRepository.findIdREC(shopId, rc_code);
		return result;			
	}
	public List<Map<String, String>> findRecHeader(Integer shopId, Integer rcId)throws ParseException{
		List<Map<String, String>> result = sellRepository.findRecHeader(shopId,rcId);
		return result;
	}
	public List<Map<String, String>> findRecDetail(Integer rcId)throws ParseException{
		List<Map<String, String>> result = sellRepository.findRecDetail(rcId);
		return result;
	}
}
