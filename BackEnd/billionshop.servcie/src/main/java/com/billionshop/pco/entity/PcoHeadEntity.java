package com.billionshop.pco.entity;

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
@Table(name = "bss_purchase_order_header", schema="public")
public class PcoHeadEntity {
	@Id
	@Column(name="po_id")
	@SequenceGenerator(name = "po_seq", schema = "public" , sequenceName = "po_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "po_seq")
	private Integer po_id;
	
	@Column(name="po_code")
	private String po_code;
	
	@Column(name="po_date")
	private LocalDateTime po_date;
	
	@Column(name="po_status")
	private String po_status;
	
	@Column(name="po_gen_user")
	private String po_gen_user;
	
	@Column(name="po_create_by")
	private String po_create_by;
	
	@Column(name="po_create_date")
	private LocalDateTime po_create_date;
	
	@Column(name="po_update_by")
	private String po_update_by;
	
	@Column(name="po_update_date")
	private LocalDateTime po_update_date;
	
	@Column(name="po_sh_id")
	private Integer po_sh_id;
}
