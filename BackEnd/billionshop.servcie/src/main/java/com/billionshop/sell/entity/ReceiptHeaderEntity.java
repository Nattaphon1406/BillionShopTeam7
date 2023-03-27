package com.billionshop.sell.entity;

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
@Table(name = "bss_receipt",schema="public")
public class ReceiptHeaderEntity {

	@Id
	@Column(name="rc_id")
	@SequenceGenerator(name = "rec_seq", schema = "public" , sequenceName = "rec_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rec_seq")
	private Integer rc_id;
	
	@Column(name="rc_code")
	private String rc_code;
	
	@Column(name="rc_gen_date")
	private String rc_gen_date;
	
	@Column(name="rc_total_price")
	private Double rc_total_price;
	
	@Column(name="rc_change")
	private Double rc_change;
	
	@Column(name="rc_cash")
	private Double rc_cash;
	
	@Column(name="rc_create_by")
	private String rc_create_by;
	
	@Column(name="rc_create_date")
	private String rc_create_date;
	
	@Column(name="rc_update_by")
	private String rc_update_by;
	
	@Column(name="rc_update_date")
	private String rc_update_date;
	
	@Column(name="rc_sh_id")
	private Integer rc_sh_id;
}
