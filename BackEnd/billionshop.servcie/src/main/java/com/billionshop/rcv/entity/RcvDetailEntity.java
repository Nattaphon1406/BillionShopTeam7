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
@Table(name = "bss_receive_inventory_detail",schema="public")
public class RcvDetailEntity {
	@Id
	@Column(name="rid_id")
	@SequenceGenerator(name = "rid_seq", schema = "public" , sequenceName = "rid_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rid_seq")
	private Integer rid_id;
	
	@Column(name="rid_receive_quantity")
	private Integer rid_receive_quantity;
	
	@Column(name="rid_purchase_price")
	private String rid_purchase_price;
	
	@Column(name="rid_quantity_per_unit")
	private String rid_quantity_per_unit;
	
	@Column(name="rid_item_unit")
	private String rid_item_unit;
	
	@Column(name="rid_order_unit")
	private String rid_order_unit;
	
	@Column(name="rid_create_by")
	private String rid_create_by;
	
	@Column(name="rid_create_date")
	private LocalDateTime rid_create_date;
	
	@Column(name="rid_update_by")
	private String rid_update_by;
	
	@Column(name="rid_update_date")
	private LocalDateTime rid_update_date;
	
	@Column(name="rid_itm_id")
	private Integer rid_itm_id;
	
	@Column(name="rid_ri_id")
	private Integer rid_ri_id;
}
