package com.billionshop.pco.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.text.ParseException;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.billionshop.parameters.repository.ParametersRepository;
import com.billionshop.pco.entity.PcoHeadEntity;
import com.billionshop.pco.model.GenPcoHeadRequest;
import com.billionshop.pco.model.ItemInfoGoodsPco;
import com.billionshop.pco.model.PcoPutDetailRequest;
import com.billionshop.pco.model.PcoPutHeadRequest;
import com.billionshop.pco.model.PcoRequest;
import com.billionshop.pco.repository.PcoRepository;

@Service
public class PcoService {

	@Autowired
	PcoRepository pcoRepository;
	@Autowired
	ParametersRepository parametersRepository;
	@Autowired
	PcoRepository pcoRe;

	public List<Map<String, String>> findPoByShopId(Integer shopId, String searchInStatus) throws ParseException {

		List<Map<String, String>> results;
		String statusRcv = "rcv";

		if (searchInStatus.equals(statusRcv)) {
			results = pcoRepository.findPoInRcvByShopId(shopId);
			return results;
		} else {
			results = pcoRepository.findPoByShopId(shopId);
			return results;
		}
	}

	public List<Map<String, String>> findDetailPoByPoId(Integer poId) throws ParseException {

		List<Map<String, String>> results = pcoRepository.findDetailPoByPoId(poId);
		return results;
	}

	public List<Map<String, String>> findPoByData(String data, Integer shopId) throws ParseException {
		List<Map<String, String>> results = pcoRepository.findPoByData(data, shopId);
		return results;
	}

	public boolean createPO(PcoRequest pcoRequest) {
		if (pcoRequest.getStatus() == "Manual") {
			return true;
		} else if (pcoRequest.getStatus() == "Auto") {
			return true;
		}
		return false;

	}

	public GenPcoHeadRequest genPoHead() throws ParseException {
		GenPcoHeadRequest phe = new GenPcoHeadRequest();
		Long code = parametersRepository.findLastCode("1", 600);
		
		if(code == null) {
			code = (long) 1;
		}else {
			code += 1;
		}
		
		String gencode = String.valueOf(code);
		Integer num = parametersRepository.findCodeDigit("1", 600)-(gencode.length());
		for(int i=0;i<num;i++) {
			gencode = "0"+gencode;
		}
		String poCode = parametersRepository.findPrefix("1", 600)+gencode;
		
		phe.setPoCode(poCode);

		String dateNow = LocalDateTime.now().toString();
		String y = dateNow.substring(0, 4);
		String m = dateNow.substring(5, 7);
		String d = dateNow.substring(8, 10);
		String date = d + '/' + m + '/' + y;

		phe.setPoDate(date);
		
		return phe;

	}

	public List<ItemInfoGoodsPco> genPOAuto(Integer shopId) throws ParseException {
		List<Map<String, Integer>> goodsInteger = pcoRepository.genPOAutoInteger(shopId);
		Map<String, String> infoGoods = null;
		List<ItemInfoGoodsPco> itmInfoGoods = new ArrayList<ItemInfoGoodsPco>();

		Integer order_Quantity;
		Integer minimum_Quantity;
		Integer stock_Quantity;
		Integer sales_month;
		Integer order_Frequency;
		Integer order_Pack = null;
		Integer quantity_Per_Order_Unit;

		for (int i = 0; i < goodsInteger.size(); i++) {
			ItemInfoGoodsPco itemInfo = new ItemInfoGoodsPco();

			minimum_Quantity = goodsInteger.get(i).get("min_quantity");
			stock_Quantity = goodsInteger.get(i).get("balance");
			sales_month = goodsInteger.get(i).get("amount");
			order_Frequency = goodsInteger.get(i).get("purchase_frequency");
			quantity_Per_Order_Unit = goodsInteger.get(i).get("order_quantity");

			if (stock_Quantity != null) {
				order_Quantity = ((minimum_Quantity - stock_Quantity) + (sales_month * order_Frequency));
				order_Pack = order_Quantity / quantity_Per_Order_Unit;

				infoGoods = pcoRepository.getInfoGoods(goodsInteger.get(i).get("id"));

				itemInfo.setItm_id(Integer.valueOf(infoGoods.get("id")));
				itemInfo.setItm_name(infoGoods.get("name"));
				itemInfo.setItm_code(infoGoods.get("code"));
				itemInfo.setItm_capacity(Float.valueOf(infoGoods.get("capacity")));
				itemInfo.setItm_unit(infoGoods.get("unit"));
				itemInfo.setItm_quantity_per_unit(Integer.valueOf(infoGoods.get("order_quantity")));
				itemInfo.setItm_order_unit(infoGoods.get("order_unit"));
				itemInfo.setItm_order_Pack(order_Pack);
				itemInfo.setItm_sell_unit(infoGoods.get("sell_unit"));

				itmInfoGoods.add(itemInfo);
			}
		}
		// - ดูว่าอันไหนน้อยกว่าจำนวนขั้นต่ำ
		// - สถานะจำหน่าย

		return itmInfoGoods;
	}

	public List<Map<String, Integer>> insertPoHead(PcoPutHeadRequest pcoPutHeadRequest) throws ParseException{
		Integer poId = pcoRepository.findPoIdByPoCode(pcoPutHeadRequest.getPoCode());
		PcoHeadEntity phe = new PcoHeadEntity();
		Long code = parametersRepository.findLastCode("1", 600);
		
		if(code == null) {
			code = (long) 1;
		}else {
			code += 1;
		}
		
		if(poId == null) { 
			phe.setPo_code(pcoPutHeadRequest.getPoCode());
			phe.setPo_date(LocalDateTime.now());
			phe.setPo_gen_user(pcoPutHeadRequest.getPoGenUser());
			phe.setPo_create_by(pcoPutHeadRequest.getPoCreateBy());
			phe.setPo_update_by(pcoPutHeadRequest.getPoUpdateBy());
			phe.setPo_status(pcoPutHeadRequest.getPoStatus().toString());
			phe.setPo_create_date(LocalDateTime.now());
			phe.setPo_update_date(LocalDateTime.now());
			phe.setPo_sh_id(pcoPutHeadRequest.getShopId());
			
			pcoRepository.save(phe);
			parametersRepository.updateLastCode("1", 600, code);
		}else if(poId != null){
			pcoRepository.updatePoHead(poId, pcoPutHeadRequest.getPoStatus().toString(), LocalDateTime.now(), pcoPutHeadRequest.getPoUpdateBy());
		}
		poId = pcoRepository.findPoIdByPoCode(pcoPutHeadRequest.getPoCode());
		List<Map<String, Integer>> result = new ArrayList<Map<String, Integer>>();
		Map<String, Integer> map = new HashMap<String, Integer>();
		map.put("poId",poId);
		result.add(map);
		return result;
	}
	
	public boolean poDetail(PcoPutDetailRequest pcoPutDetailRequest) {
		Integer results = pcoRepository.findPoDetailByCode(pcoPutDetailRequest.getPo_code(), pcoPutDetailRequest.getPod_itm_id());

		if(results == null) {
			return insertPoDetail(pcoPutDetailRequest);
		}else if(results != null){
			return updatePoDetail(pcoPutDetailRequest);
		}
		
		return false;
	}

	public boolean insertPoDetail(PcoPutDetailRequest pcoPutDetailRequest) {
		Integer poId = pcoRepository.findPoIdByPoCode(pcoPutDetailRequest.getPo_code());

		pcoRepository.insertPoDetail(
				pcoPutDetailRequest.getPod_order_quantity_per_unit(),
				pcoPutDetailRequest.getPod_order_quantity(),
				pcoPutDetailRequest.getItm_unit(),
				pcoPutDetailRequest.getItm_order_unit(),
				pcoPutDetailRequest.getPod_Create_By(),
				LocalDateTime.now(),
				pcoPutDetailRequest.getPod_Update_By(),
				LocalDateTime.now(),
				pcoPutDetailRequest.getPod_itm_id(),
				poId
				);		
		return true;
	}

	public boolean updatePoDetail(PcoPutDetailRequest pcoPutDetailRequest) {
		Integer poId = pcoRepository.findPoIdByPoCode(pcoPutDetailRequest.getPo_code());

		pcoRepository.updatePoDetail(
				pcoPutDetailRequest.getPod_order_quantity(),
				pcoPutDetailRequest.getPod_Update_By(),
				LocalDateTime.now(),
				pcoPutDetailRequest.getPod_itm_id(),
				poId
				);
		return true;
	}

	public boolean deletePoDetail(Integer pod_itm_id, String po_code) {
		Integer podId = pcoRepository.findPoDetailByCode(po_code, pod_itm_id);
		pcoRepository.deletePoDetail(podId);
		return true;
	}
	
	public List<Map<String, String>> findItmInPoByBarcode(String itmBarcode,Integer shopId) {
		List<Map<String, String>> result = pcoRepository.findItmInPoByBarcode(itmBarcode,shopId);
		return result;
	}
	
	public List<Map<String, String>> findPoHeadByPoId(Integer poId) throws ParseException {

		List<Map<String, String>> results = pcoRepository.findPoHeadByPoId(poId);
		return results;
	}
	
}
