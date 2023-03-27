package com.billionshop.stock.model;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class StockAdjustDetailRequest {
	Integer sad_id;
	Integer sad_quantity;
	Integer sad_itm_id;
	Integer sad_sa_id;
}
