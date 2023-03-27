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
@Table(name = "bss_stock", schema="public")
public class StockEntity {
	@Id
	@Column(name="st_id")
	@SequenceGenerator(name = "stock_seq", schema = "public" , sequenceName = "stock_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stock_seq")
	private Integer st_id;
	
	@Column(name="st_balance_forward")
	private Integer st_balance_forward;
	
	@Column(name="st_balance")
	private Integer st_balance;
	
	@Column(name="st_date")
	private LocalDateTime st_date;
	
	@Column(name="st_sale")
	private float st_sale;
	
	@Column(name="st_create_by")
	private String st_create_by;
	
	@Column(name="st_create_date")
	private LocalDateTime st_create_date;
	
	@Column(name="st_update_by")
	private String st_update_by;
	
	@Column(name="st_update_date")
	private LocalDateTime st_update_date;

	@Column(name="st_sh_id")
	private Integer st_sh_id;
	
	@Column(name="st_itm_id")
	private Integer st_itm_id;
}
