package com.billionshop.sell.controller;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.billionshop.sell.model.RecCodeResponse;
import com.billionshop.sell.model.RecIdResponse;
import com.billionshop.sell.model.SellBucketRequest;
import com.billionshop.sell.model.SellPaymentRequest;
import com.billionshop.sell.model.SellResponse;
import com.billionshop.sell.model.SellReceiptResponse;
import com.billionshop.sell.service.SellService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/sell")
@Api(value = "sell", description = "sell Service", tags = { "sell" })
public class SellController {
	
	@Autowired
	private SellService sellService;
	
	@ApiOperation(value = "Find Items by shopId")
	@GetMapping(value = "/findItemByShopId",produces = {"application/json"})
	public List<Map<String, String>> findItemByShopId(@RequestParam Integer shopId)throws ParseException
	{
		return sellService.findItemByShopId(shopId);
	}
	
	@ApiOperation(value = "Find Items by Data",response = SellResponse.class)
	@GetMapping(value = "/findItemByData",produces = {"application/json"})
	public List<Map<String, String>> findItemByData(@RequestParam Integer shopId,@RequestParam String data)throws ParseException
	{
		return sellService.findItemByData(shopId,data);
	}
	
	@ApiOperation(value = "Insert Header Payment",response = RecIdResponse.class)
	@PutMapping(value = "/InsertHeaderPayment",produces = {"application/json"})
	public List<Map<String, String>> InsertHeaderPayment(HttpServletRequest request,@RequestBody SellPaymentRequest sellPaymentRequest )throws ParseException
	{
		return sellService.InsertHeaderPayment(sellPaymentRequest);
	}
	
	@ApiOperation(value = "Insert Detail Payment")
	@PutMapping(value = "/InsertDetailPayment",produces = {"application/json"})
	public void InsertDetailPayment(HttpServletRequest request,@RequestParam Integer rcId,@RequestParam String userName,@RequestBody SellBucketRequest sellBucketRequest)throws ParseException
	{
		 sellService.InsertDetailPayment(sellBucketRequest,userName,rcId);
	}

	@ApiOperation(value = "Find last Code rec",response = RecCodeResponse.class)
	@PostMapping(value = "/findlastcoderec",produces = {"application/json"})
	public List<Map<String, String>> findCodeREC(@RequestParam Integer shopId )throws ParseException
	{
		return sellService.findCodeREC(shopId);
	}
	
	@ApiOperation(value = "Find Id rec",response = RecIdResponse.class)
	@PostMapping(value = "/findIdrec",produces = {"application/json"})
	public List<Map<String, String>> findIdREC(@RequestParam Integer shopId,@RequestParam String rc_code)throws ParseException
	{
		return sellService.findIdREC(shopId,rc_code);
	}
	
	@ApiOperation(value="Find header rec", response=SellReceiptResponse.class)
	@GetMapping(value="/findRecHeader",produces = {"application/json"})
	public List<Map<String, String>> findRecHeader(@RequestParam Integer shopId,@RequestParam Integer rcId)throws ParseException
	{
		return sellService.findRecHeader(shopId, rcId);
	}
	
	@ApiOperation(value="Find detail rec", response=SellReceiptResponse.class)
	@GetMapping(value="/findRecDetail", produces = {"application/json"})
	public List<Map<String,String>> findRecDetail(@RequestParam Integer rcId)throws ParseException
	{
		return sellService.findRecDetail(rcId);
	}
	
}
