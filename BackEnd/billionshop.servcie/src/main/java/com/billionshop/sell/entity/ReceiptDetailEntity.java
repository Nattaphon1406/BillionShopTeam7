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
@Table(name = "bss_receipt_detail",schema="public")
public class ReceiptDetailEntity {

	@Id
	@Column(name="rd_id")
	@SequenceGenerator(name = "rec_detail_seq", schema = "public" , sequenceName = "rec_detail_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rec_detail_seq")
	private Integer rd_id;
	
	@Column(name="rd_code")
	private String rd_code;
	
	@Column(name="rd_itm_name")
	private String rd_itm_name;
	
	@Column(name="rd_capacity")
	private Double rd_capacity;
	
	@Column(name="rd_itm_quatity")
	private Integer rd_itm_quatity;
	
	@Column(name="rd_capacity_unit")
	private String rd_capacity_unit;
	
	@Column(name="rd_itm_unit")
	private String rd_itm_unit;
	
	@Column(name="rd_create_by")
	private String rd_create_by;
	
	@Column(name="rd_create_date")
	private String rd_create_date;
	
	@Column(name="rd_update_by")
	private String rd_update_by;
	
	@Column(name="rd_update_date")
	private String rd_update_date;
	
	@Column(name="rd_itm_id")
	private Integer rd_itm_id;
	
	@Column(name="rd_rc_id")
	private Integer rd_rc_id;
}
