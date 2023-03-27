package com.billionshop.stock.model;
import lombok.Data;

@Data
public class StockMoveRequest {
	String dateFrom;
    String dateTo;
    Integer shopId;
}
