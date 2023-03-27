package com.billionshop.report.model;
import lombok.Data;

@Data
public class ReportSaleRequest {
	String dateFrom;
	String dateTo;
	Integer shopId;
	String data;
}
