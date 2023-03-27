package com.billionshop.pco.controller;

import java.text.ParseException;
import java.util.*;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.billionshop.pco.model.ShowAllPcoResponse;
import com.billionshop.pco.model.GenPcoHeadRequest;
import com.billionshop.pco.model.FindItemIdResponse;
import com.billionshop.pco.model.FindPcoResponse;
import com.billionshop.pco.model.FindPoIdResponse;
import com.billionshop.pco.model.ItemInfoGoodsPco;
import com.billionshop.pco.model.PcoPutDetailRequest;
import com.billionshop.pco.model.PcoPutHeadRequest;
import com.billionshop.pco.model.PcoResponse;
import com.billionshop.pco.model.ShowDetailPcoResponse;
import com.billionshop.pco.service.PcoService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/pco")
@Api(value = "pco", description = "pco Service", tags = { "pco" })
public class PcoController {
	@Autowired
	private PcoService pcoService;

	@ApiOperation(value = "Show All Purchase Order by shopId", response = ShowAllPcoResponse.class)
	@GetMapping(value = "/findPoByShopId", produces = { "application/json" })
	public List<Map<String, String>> findPoByShopId(HttpServletRequest request,
			@RequestParam Integer shopId, String searchInStatus) throws ParseException {
		return pcoService.findPoByShopId(shopId, searchInStatus);
	}

	@ApiOperation(value = "Show Detail Purchase Order by poId", response = ShowDetailPcoResponse.class)
	@GetMapping(value = "/findDetailPoByPoId", produces = { "application/json" })
	public List<Map<String, String>> findDetailPoByPoId(@RequestParam Integer poId) throws ParseException {
		return pcoService.findDetailPoByPoId(poId);
	}

	@ApiOperation(value = "Gen Purchase Order Head", response = GenPcoHeadRequest.class)
	@GetMapping(value = "/genPoHead", produces = { "application/json" })
	public GenPcoHeadRequest genPoHead() throws ParseException {
		return pcoService.genPoHead();
	}

	@ApiOperation(value = "Gen Purchase Order Auto", response = PcoResponse.class)
	@GetMapping(value = "/genPOAuto", produces = { "application/json" })
	public List<ItemInfoGoodsPco> genPOAuto(HttpServletRequest request,
			@RequestParam Integer shopId) throws ParseException {
		return pcoService.genPOAuto(shopId);
	}

	@ApiOperation(value = "Find Purchase Order by Data", response = FindPcoResponse.class)
	@GetMapping(value = "/findPoByData", produces = { "application/json" })
	public List<Map<String, String>> findPoByData(@RequestParam String data, @RequestParam Integer shopId)
			throws ParseException {
		return pcoService.findPoByData(data, shopId);
	}

	@ApiOperation(value = "Insert Purchase Order Head", response = FindPoIdResponse.class)
	@PutMapping(value = "/insertPoHead", produces = { "application/json" })
	public List<Map<String, Integer>> insertPoHead(HttpServletRequest request,
			@RequestBody PcoPutHeadRequest pcoPutHeadRequest) throws ParseException {
		return pcoService.insertPoHead(pcoPutHeadRequest);
	}

	@ApiOperation(value = "Insert Purchase Order Detail")
	@PutMapping(value = "/insertPoDetail", produces = { "application/json" })
	public boolean insertPoDetail(HttpServletRequest request,
			@RequestBody PcoPutDetailRequest pcoPutDetailRequest) throws ParseException {
		return pcoService.insertPoDetail(pcoPutDetailRequest);
	}
	
	@ApiOperation(value = "Update Purchase Order Detail", response = PcoPutHeadRequest.class)
	@PutMapping(value = "/updatePoDetail", produces = { "application/json" })
	public boolean updatePoDetail(HttpServletRequest request,
			@RequestBody PcoPutDetailRequest pcoPutDetailRequest) throws ParseException {
		return pcoService.updatePoDetail(pcoPutDetailRequest);
	}

	@ApiOperation(value = "Delete Purchase Order Detail")
	@DeleteMapping(value = "/deletePoDetail")
	public boolean deletePoDetail(HttpServletRequest request,
			@RequestParam Integer pod_itm_id, @RequestParam String po_code) throws ParseException
	{
		return pcoService.deletePoDetail(pod_itm_id, po_code);
	}
	
	@ApiOperation(value = "Includes the functionality of the purchase order details.", response = PcoPutHeadRequest.class)
	@PutMapping(value = "/poDetail", produces = { "application/json" })
	public boolean poDetail(HttpServletRequest request,
			@RequestBody PcoPutDetailRequest pcoPutDetailRequest) throws ParseException {
		return pcoService.poDetail(pcoPutDetailRequest);
	}
	
	@ApiOperation(value = "Find Item in Purchase Order by Barcode ", response = FindItemIdResponse.class)
	@GetMapping(value = "/findItmInPoByBarcode", produces = { "application/json" })
	public List<Map<String, String>> findItmInPoByBarcode(@RequestParam String itmBarcode,@RequestParam Integer shopId)
			throws ParseException {
		return pcoService.findItmInPoByBarcode(itmBarcode,shopId);
	}
	
	@ApiOperation(value = "Find Purchase Order Header", response = FindPcoResponse.class)
	@GetMapping(value = "/FindPoHeader", produces = { "application/json" })
	public List<Map<String, String>> findPoHeadByPoId(HttpServletRequest request,
			@RequestParam Integer poId) throws ParseException
	{
		return pcoService.findPoHeadByPoId(poId);
	}
	
}