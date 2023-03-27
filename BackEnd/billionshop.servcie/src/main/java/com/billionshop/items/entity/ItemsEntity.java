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
@Table(name = "bss_item",schema="public")
public class ItemsEntity {

	@Id
	@Column(name="itm_id")
	@SequenceGenerator(name = "item_seq", schema = "public" , sequenceName = "item_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "item_seq")
	private Integer itmid;
	
	@Column(name="itm_code")
	private String itm_code;
	
	@Column(name="itm_name")
	private String itm_name;
	
	@Column(name="itm_price")
	private Float itm_price;
	
	@Column(name="itm_capacity")
	private Float itm_capacity;
	
	@Column(name="itm_unit")
	private String itm_unit;
	
	@Column(name="itm_status")
	private String itm_status;
	
	@Column(name="itm_min_quantity")
	private Integer itm_min_quantity;
	
	@Column(name="itm_cost")
	private Float itm_cost;
	
	@Column(name="itm_order_quantity")
	private Integer itm_order_quantity;
	
	@Column(name="itm_category")
	private String itm_category;
	
	@Column(name="itm_purchase_frequency")
	private Integer itm_purchase_frequency;
	
	@Column(name="itm_order_unit")
	private String itm_order_unit;
	
	@Column(name="itm_sell_unit")
	private String itm_sell_unit;
	
	@Column(name="itm_img_path")
	private String itm_img_path;
	
	@Column(name="itm_create_by")
	private String itm_create_by;
	
	@Column(name="itm_create_date")
	private String itm_create_date;
	
	@Column(name="itm_update_by")
	private String itm_update_by;
	
	@Column(name="itm_update_date")
	private String itm_update_date;
	 
	@Column(name="itm_sh_id")
	private Integer itm_sh_id;
	

}
