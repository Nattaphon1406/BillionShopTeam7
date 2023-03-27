package com.billionshop.report.service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.billionshop.items.repository.ItemsRepository;
import com.billionshop.report.model.ReportRequest;
import com.billionshop.report.model.ReportResponse;
import com.billionshop.report.model.ReportSaleRequest;
import com.billionshop.report.repository.ReportRepository;

@Service
public class ReportService {
	@Autowired
	ReportRepository reportRepository;
	@Autowired
	ItemsRepository itemsRepository;
	
	public List<ReportResponse> findSaleReportById(Integer shopId) {
		List<Map<String, String>> reportItems = reportRepository.getInfoItemByShopId(shopId);
		Map<String, String> infoItems = new HashMap<>();
		List<ReportResponse> listReportItems = new ArrayList<ReportResponse>();
		Integer itemSellQuantity;
		String itemSales;
		Float itemSalesAll = 0.00f;
		
		for(int i = 0; i < reportItems.size(); i++) {
		 itemSellQuantity = Integer.valueOf(reportItems.get(i).get("itm_sell_quantity"));
		 Integer itmId = Integer.valueOf(reportItems.get(i).get("itm_id"));
		 itemSales = reportItems.get(i).get("itm_sales");
	 	 infoItems = reportRepository.getInfoItemByItmId(itmId);
		 ReportResponse rpItm = new ReportResponse();
		 
				itemSalesAll += Float.valueOf(itemSales);

				rpItm.setItm_capacity(Float.valueOf(infoItems.get("itm_capacity")));
				rpItm.setItm_code(infoItems.get("itm_code"));
				rpItm.setItm_name(infoItems.get("itm_name"));
				rpItm.setItm_sales(itemSales);
				rpItm.setItm_sell_quantity(itemSellQuantity);
				rpItm.setItm_unit(infoItems.get("itm_unit"));
				rpItm.setItm_sell_unit(infoItems.get("itm_sell_unit"));
				rpItm.setItm_sales_all(itemSalesAll);
				listReportItems.add(rpItm);
			}
		return listReportItems;
	}
	
	public List<Map<String, String>> findSaleReportByData(ReportSaleRequest reportSaleRequest) {
		String data = reportSaleRequest.getData();
		Integer shopId = reportSaleRequest.getShopId();
		String dateFrom = reportSaleRequest.getDateFrom();
		String dateTo = reportSaleRequest.getDateTo();
		List<Map<String, String>> results ;
		String barcode = itemsRepository.findItemCodebyBarcode(data, shopId);
		if(barcode != null) {
			data = barcode;
		}
		if(data != "") {
			results = reportRepository.findSaleReportByData(data, shopId,dateFrom,dateTo);
		}else {
			results = reportRepository.findSaleReportByDate(shopId,dateFrom,dateTo);
		}
		return results;
	}
	
	public List<Map<String, String>> findSalesReportByBarcode(String itmBarcode,Integer shopId) {
		List<Map<String, String>> result = reportRepository.findSalesReportByBarcode(itmBarcode,shopId);
		return result;
	}
	
}
