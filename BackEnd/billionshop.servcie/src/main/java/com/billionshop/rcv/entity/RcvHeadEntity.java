package com.billionshop.rcv.entity;

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
@Table(name = "bss_receive_inventory_header", schema="public")
public class RcvHeadEntity {
	@Id
	@Column(name="ri_id")
	@SequenceGenerator(name = "ri_seq", schema = "public" , sequenceName = "ri_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ri_seq")
	private Integer ri_id;
	
	@Column(name="ri_code")
	private String ri_code;
	
	@Column(name="ri_date")
	private LocalDateTime ri_date;
	
	@Column(name="ri_status")
	private String ri_status;
	
	@Column(name="ri_gen_user")
	private String ri_gen_user;
	
	@Column(name="ri_create_by")
	private String ri_create_by;
	
	@Column(name="ri_create_date")
	private LocalDateTime ri_create_date;
	
	@Column(name="ri_update_by")
	private String ri_update_by;
	
	@Column(name="ri_update_date")
	private LocalDateTime ri_update_date;

	@Column(name="ri_po_id")
	private Integer ri_po_id;
	
	@Column(name="ri_sh_id")
	private Integer ri_sh_id;
}
