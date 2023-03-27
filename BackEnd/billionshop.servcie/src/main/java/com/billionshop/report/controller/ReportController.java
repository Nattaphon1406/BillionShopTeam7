package com.billionshop.report.controller;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.billionshop.pco.model.FindItemIdResponse;
import com.billionshop.report.model.ReportRequest;
import com.billionshop.report.model.ReportResponse;
import com.billionshop.report.model.ReportSaleRequest;
import com.billionshop.report.service.ReportService;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/report")
@Api(value = "report", description = "report Service", tags = {"report"})
public class ReportController {
	@Autowired
	private ReportService reportService;
	
	@ApiOperation(value = "Show Sales Report By Id", response = ReportResponse.class)
	@GetMapping(value = "/findSalesReportById", produces = { "application/json" })
	public List<ReportResponse> findSaleReportById(HttpServletRequest request,
			@RequestParam Integer shopId) throws ParseException{
		return reportService.findSaleReportById(shopId);
	}
	
	@ApiOperation(value = "Find Sales Report by Data", response = ReportResponse.class)
	@PostMapping(value = "/findSalesReportByData", produces = { "application/json" })
	public List<Map<String, String>> findSaleReportByData(@RequestBody ReportSaleRequest reportSaleRequest)
			throws ParseException {
		return reportService.findSaleReportByData(reportSaleRequest);
	}
	
	@ApiOperation(value = "Find Sales Report by Barcode ", response = FindItemIdResponse.class)
	@GetMapping(value = "/findSalesReportByBarcode", produces = { "application/json" })
	public List<Map<String, String>> findSalesReportByBarcode(@RequestParam String itmBarcode,@RequestParam Integer shopId)
			throws ParseException {
		return reportService.findSalesReportByBarcode(itmBarcode,shopId);
	}
}
