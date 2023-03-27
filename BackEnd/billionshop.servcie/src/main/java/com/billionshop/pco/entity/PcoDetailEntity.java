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
@Table(name = "bss_purchase_order_detail",schema="public")
public class PcoDetailEntity {

	@Id
	@Column(name="pod_id")
	@SequenceGenerator(name = "pod_seq", schema = "public" , sequenceName = "pod_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pod_seq")
	private Integer pod_id;
	
	@Column(name="pod_quantity_per_unit")
	private Integer pod_quantity_per_unit;
	
	@Column(name="pod_order_quantity")
	private Integer pod_order_quantity;
	
	@Column(name="pod_item_unit")
	private String pod_item_unit;
	
	@Column(name="pod_order_unit")
	private String pod_order_unit;
	
	@Column(name="pod_create_by")
	private String pod_create_by;
	
	@Column(name="pod_create_date")
	private LocalDateTime pod_create_date;
	
	@Column(name="pod_update_by")
	private String pod_update_by;
	
	@Column(name="pod_update_date")
	private LocalDateTime pod_update_date;
	
	@Column(name="pod_itm_id")
	private Integer pod_itm_id;
	
	@Column(name="pod_po_id")
	private Integer pod_po_id;
	
}
