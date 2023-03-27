package com.billionshop.rcv.controller;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.billionshop.rcv.model.GenRcvHeadRequest;
import com.billionshop.rcv.model.RcvIdResponse;
import com.billionshop.rcv.model.RcvPutDetailRequest;
import com.billionshop.rcv.model.RcvPutHeadRequest;
import com.billionshop.rcv.model.RcvResponse;
import com.billionshop.rcv.model.ShowpcoResponreceipt;
import com.billionshop.rcv.service.RcvService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/rcv")
@Api(value = "rcv", description = "rcv Service", tags = { "rcv" })
public class RcvController {
	@Autowired
	private RcvService rcvService;

	@ApiOperation(value = "Find Receivec Head All by Id", response = RcvResponse.class)
	@GetMapping(value = "/findHeadRcvAllById", produces = { "application/json" })
	public List<Map<String, String>> findHeadRcvAllById(HttpServletRequest request,
			@RequestParam Integer shopId) throws ParseException {
		return rcvService.findHeadRcvAllById(shopId);
	}

	@ApiOperation(value = "Find Receivec Head by Id", response = RcvResponse.class)
	@GetMapping(value = "/findHeadRcvById", produces = { "application/json" })
	public List<Map<String, String>> findHeadRcvById(HttpServletRequest request,
			@RequestParam Integer riId) throws ParseException {
		return rcvService.findHeadRcvById(riId);
	}

	@ApiOperation(value = "Find Receive Detail by Id", response = RcvResponse.class)
	@GetMapping(value = "/findDetailRcvById", produces = { "application/json" })
	public List<Map<String, String>> findDetailRcvById(HttpServletRequest request,
			@RequestParam Integer riId) throws ParseException {
		return rcvService.findDetailRcvById(riId);
	}

	@ApiOperation(value = "Find Purchase Order by Data", response = ShowpcoResponreceipt.class)
	@GetMapping(value = "/findPoByData", produces = { "application/json" })
	public List<Map<String, String>> findPoByData(HttpServletRequest request,
			@RequestParam Integer shopId, String searchInrcv) throws ParseException {
		return rcvService.findPoByData(shopId, searchInrcv);
	}

	@ApiOperation(value = "Find Receive by Data", response = ShowpcoResponreceipt.class)
	@GetMapping(value = "/findRcvByData", produces = { "application/json" })
	public List<Map<String, String>> findPoByData(@RequestParam String data, @RequestParam Integer shopId)
			throws ParseException {
		return rcvService.findRcvByData(shopId, data);
	}

	@ApiOperation(value = "Insert Receive Head", response = RcvIdResponse.class)
	@PutMapping(value = "/insertReceiveHead", produces = { "application/json" })
	public List<Map<String, Integer>> insertRcvHead(HttpServletRequest request,
			@RequestBody RcvPutHeadRequest RcvPutHeadRequest) throws ParseException {
		return rcvService.insertRcvHead(RcvPutHeadRequest);
	}

	@ApiOperation(value = "Includes the functionality of the Receive details.", response = ShowpcoResponreceipt.class)
	@PutMapping(value = "/rcvDetail", produces = { "application/json" })
	public boolean rcvDetail(HttpServletRequest request,
			@RequestBody RcvPutDetailRequest RcvPutDetailRequest,@RequestParam String checkSave)
			throws ParseException {
		return rcvService.rcvDetail(RcvPutDetailRequest,checkSave);
	}

	@ApiOperation(value = "Find Purchase Order Detail by Code", response = RcvResponse.class)
	@GetMapping(value = "/findDetailPcoByCode", produces = { "application/json" })
	public List<Map<String, String>> findDetailPcoByCode(HttpServletRequest request,
			@RequestParam Integer poId) throws ParseException {
		return rcvService.findDetailPcoByCode(poId);
	}

	@ApiOperation(value = "Delete Receive Detail")
	@DeleteMapping(value = "/deleteRcvDetail")
	public boolean deleteRcvDetail(HttpServletRequest request,
			@RequestParam Integer rid_itm_id, @RequestParam String ri_code) throws ParseException {
		return rcvService.deleteRcvDetail(rid_itm_id, ri_code);
	}

	@ApiOperation(value = "Gen Receive inventory Head", response = GenRcvHeadRequest.class)
	@GetMapping(value = "/genRcvHead", produces = { "application/json" })
	public GenRcvHeadRequest genRcvHead() throws ParseException {
		return rcvService.genRcvHead();
	}
	
}