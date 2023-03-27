package com.billionshop.stock.controller;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.billionshop.pco.model.FindPcoResponse;
import com.billionshop.stock.model.InsertStockAdjustDetailRequest;
import com.billionshop.stock.model.InsertStockAdjustHeadRequest;
import com.billionshop.stock.model.ReasonResponse;
import com.billionshop.stock.model.StockMoveRequest;
import com.billionshop.stock.model.StockMoveResponse;
import com.billionshop.stock.model.StockRequest;
import com.billionshop.stock.model.StockResponse;
import com.billionshop.stock.service.StockService;
import com.billionshop.stock.model.MovementListResponse;
import com.billionshop.stock.model.ShowDetailMovementResponse;
import com.billionshop.stock.model.ShowHeaderMovementResponse;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/stock")
@Api(value = "stock", description = "stock Service", tags = { "stock" })
public class StockController {
	@Autowired
	private StockService stockService;
	
	@ApiOperation(value = "Find Stock Adjust Head All By ShopId", response = StockResponse.class)
	@GetMapping(value = "/findStockAdjustHeadAllByShopId", produces = { "application/json" })
	public List<Map<String, String>> findStockAdjustHeadAllByShopId(HttpServletRequest request,
			@RequestParam Integer shopId) throws ParseException {
		return stockService.findStockAdjustHeadAllByShopId(shopId);
	}
	
	@ApiOperation(value = "Find Stock Adjust Head By SaId", response = StockResponse.class)
	@GetMapping(value = "/findStockAdjustHeadBySaId", produces = { "application/json" })
	public List<Map<String, String>> findStockAdjustHeadBySaId(HttpServletRequest request,
			@RequestParam Integer saId, @RequestParam Integer shopId) throws ParseException {
		return stockService.findStockAdjustHeadBySaId(saId, shopId);
	}
	
	@ApiOperation(value = "Find Stock Adjust by Data", response = FindPcoResponse.class)
	@GetMapping(value = "/findStockAdjustByData", produces = { "application/json" })
	public List<Map<String, String>> findStockAdjustByData(@RequestParam String data, @RequestParam Integer shopId)
			throws ParseException {
		return stockService.findStockAdjustByData(data, shopId);
	}
	
	@ApiOperation(value = "Find Stock Adjust Detail By SaId", response = StockResponse.class)
	@GetMapping(value = "/findStockAdjustDetailBySaId", produces = { "application/json" })
	public List<Map<String, String>> findStockAdjustDetailBySaId(HttpServletRequest request,
			@RequestParam Integer saId) throws ParseException {
		return stockService.findStockAdjustDetailBySaId(saId);
	}

	@ApiOperation(value = "Find Stock Item Data by Id", response = StockResponse.class)
	@GetMapping(value = "/findStockItemDataById", produces = { "application/json" })
	public List<Map<String, String>> findDetailRcvById(HttpServletRequest request,
			@RequestParam Integer st_sh_id, Integer st_itm_id) throws ParseException {
		return stockService.findStockItemDataById(st_sh_id,st_itm_id);
	}
	
	@ApiOperation(value = "Update Stock Balance", response = StockRequest.class)
	@PutMapping(value = "/updateStockBalance", produces = { "application/json" })
	public boolean updateStockBalance(HttpServletRequest request,
			@RequestParam Integer st_sh_id, Integer st_itm_id, Integer st_balance) throws ParseException {
		return stockService.updateStockBalance(st_sh_id, st_itm_id, st_balance);
	}
	
	@ApiOperation(value = "Find Stock Report by Id", response = StockResponse.class)
	@GetMapping(value = "/findStockReportById", produces = { "application/json" })
	public List<Map<String, String>> findStockReportById(HttpServletRequest request,
			@RequestParam Integer shopId) throws ParseException {
		return stockService.findStockReportById(shopId);
	}
	
	@ApiOperation(value = "Find Stock Report by Data", response = StockResponse.class)
	@GetMapping(value = "/findStockReportByData", produces = { "application/json" })
	public List<Map<String, String>> findStockReportByData(@RequestParam String data, @RequestParam Integer shopId)
			throws ParseException {
		return stockService.findStockReportByData(shopId, data);
	}
	
	@ApiOperation(value = "Insert Stock Adjust Header")
	@PutMapping(value = "/InsertStockAdjustHeader", produces = { "application/json" })
	public List<Map<String, Integer>> InsertStockAdjustHeader(HttpServletRequest request,
			@RequestBody InsertStockAdjustHeadRequest insertStockAdjustHeadRequest, @RequestParam Integer shopId)
			throws ParseException {
		 return stockService.insertStockAdjustHeader(insertStockAdjustHeadRequest,shopId);
	}
	
	@ApiOperation(value = "Insert Stock Adjust Detail")
	@PutMapping(value = "/InsertStockAdjustDetail", produces = { "application/json" })
	public void InsertStockAdjustHeader(HttpServletRequest request,
			@RequestBody InsertStockAdjustDetailRequest insertStockAdjustDetailRequest, @RequestParam Integer saId,@RequestParam Integer shopId)
			throws ParseException {
		 stockService.insertStockAdjustDetail(insertStockAdjustDetailRequest,saId,shopId);
	}
	
	@ApiOperation(value = "GenCodeAdjustStock")
	@GetMapping(value = "/GenCodeAdjustStock", produces = { "application/json" })
	public List<Map<String, String>> genCodeAdjustStock()
			throws ParseException {
		return stockService.genCodeAdjustStock();
	}
	
	@ApiOperation(value = "Find All Reason", response = ReasonResponse.class)
	@GetMapping(value = "/FindAllReason", produces = { "application/json" })
	public List<Map<String, String>> findAllReason()
			throws ParseException {
		return stockService.findAllReason();
	}
	
	@ApiOperation(value = "Show List MovementList by Id", response = MovementListResponse.class)
	@GetMapping(value = "/listMovementListbyId", produces = { "application/json" })
	public List<Map<LocalDateTime, String>> findListMovementByshopId(@RequestParam String data,@RequestParam String sm_date,@RequestParam Integer shopId) 
			throws ParseException {
		return stockService.findListMovementByshopId(data,sm_date,shopId);
	}
	
	@ApiOperation(value = "Show HeaderMoveMent by shopId", response = ShowHeaderMovementResponse.class)
	@GetMapping(value = "/ShowHeaderMovement", produces = { "application/json" })
	public List<Map<String, String>> findHeaderMovementByshopId(@RequestParam Integer shopId,@RequestParam String smDate,@RequestParam Integer itmId) 
			throws ParseException {
		return stockService.findHeaderMovementByshopId(shopId,smDate,itmId);
	}
	
	@ApiOperation(value = "Show DetailMoveMent by shopId", response = ShowDetailMovementResponse.class)
	@GetMapping(value = "/ShowDetailMovement", produces = { "application/json" })
	public List<Map<String, String>> findDetailMovementByshopId(@RequestParam Integer shopId,@RequestParam String smDate,@RequestParam Integer itmId) 
			throws ParseException {
		return stockService.findDetailMovementByshopId(shopId,smDate,itmId);
	}
	
	@ApiOperation(value = "Show MoveMent by date", response = StockMoveResponse.class)
	@PostMapping(value = "/ShowMovement", produces = { "application/json" })
	public List<Map<String, String>> findAllMovementByshopId(@RequestBody StockMoveRequest stockMoveRequest) 
			throws ParseException {
		return stockService.findAllMovementByshopId(stockMoveRequest);
	}
}