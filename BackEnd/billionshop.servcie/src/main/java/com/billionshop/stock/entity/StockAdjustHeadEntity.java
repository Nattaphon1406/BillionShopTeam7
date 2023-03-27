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
@Table(name = "bss_stock_adjust_header", schema="public")
public class StockAdjustHeadEntity {
	@Id
	@Column(name="sa_id")
	@SequenceGenerator(name = "adj_seq", schema = "public" , sequenceName = "adj_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "adj_seq")
	private Integer sa_id;
	
	@Column(name="sa_code")
	private String sa_code;
	
	@Column(name="sa_date")
	private LocalDateTime sa_date;
	
	@Column(name="sa_gen_user")
	private String sa_gen_user;
	
	@Column(name="sa_reason")
	private String sa_reason;
	
	@Column(name="sa_note")
	private String sa_note;
	
	@Column(name="sa_create_by")
	private String sa_create_by;
	
	@Column(name="sa_create_date")
	private LocalDateTime sa_create_date;
	
	@Column(name="sa_update_by")
	private String sa_update_by;
	
	@Column(name="sa_update_date")
	private LocalDateTime sa_update_date;
	
	@Column(name="sa_sh_id")
	private Integer sa_sh_id;
}
