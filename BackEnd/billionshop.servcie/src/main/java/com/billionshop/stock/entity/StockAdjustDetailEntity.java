package com.billionshop.stock.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "bss_stock_adjust_detail",schema="public")
public class StockAdjustDetailEntity {
	@Id
	@Column(name="sad_id")
	@SequenceGenerator(name = "adj_detail_seq", schema = "public" , sequenceName = "adj_detail_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "adj_detail_seq")
	private Integer sad_id;
	
	@Column(name="sad_quantity")
	private Integer sad_quantity;
	
	@Column(name="sad_create_by")
	private String sad_create_by;
	
	@Column(name="sad_create_date")
	private LocalDateTime sad_create_date;
	
	@Column(name="sad_update_by")
	private String sad_update_by;
	
	@Column(name="sad_update_date")
	private LocalDateTime sad_update_date;
	
	@Column(name="sad_itm_id")
	private Integer sad_itm_id;
	
	@Column(name="sad_sa_id")
	private Integer sad_sa_id;
}
