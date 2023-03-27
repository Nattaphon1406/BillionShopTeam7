package com.billionshop.items.entity;

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
@Table(name = "bss_barcode",schema="public")
public class BarcodeEntity{
	@Id
	@Column(name="bc_id")
	@SequenceGenerator(name = "barcode_seq", schema = "public" , sequenceName = "barcode_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "barcode_seq")
	private Integer bc_id;
	
	@Column(name="bc_code")
	private String bc_code;
	
	@Column(name="bc_type")
	private String bc_type;
	
	@Column(name="bc_create_by")
	private String bc_create_by;
	
	@Column(name="bc_create_date")
	private String bc_create_date;
	
	@Column(name="bc_update_by")
	private String bc_update_by;
	
	@Column(name="bc_update_date")
	private String bc_update_date;
	
	@Column(name="bc_itm_id")
	private Integer bc_itm_id;
	
} 