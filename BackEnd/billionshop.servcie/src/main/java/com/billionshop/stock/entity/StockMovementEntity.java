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
@Table(name = "bss_stock_movement", schema="public")
public class StockMovementEntity {
	@Id
	@Column(name="sm_id")
	@SequenceGenerator(name = "stock_movement_seq", schema = "public" , sequenceName = "stock_movement_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stock_movement_seq")
	private Integer sm_id;
	
	@Column(name="sm_balance_forward")
	private Integer sm_balance_forward;
	
	@Column(name="sm_balance")
	private Integer sm_balance;
	
	@Column(name="sm_tranasation_type")
	private String sm_tranasation_type;
	
	@Column(name="sm_date")
	private LocalDateTime sm_date;
	
	@Column(name="sm_quantity")
	private Integer sm_quantity;
	
	@Column(name="sm_effect")
	private String sm_effect;
	
	@Column(name="sm_create_by")
	private String sm_create_by;
	
	@Column(name="sm_create_date")
	private LocalDateTime sm_create_date;
	
	@Column(name="sm_update_by")
	private String sm_update_by;
	
	@Column(name="sm_update_date")
	private LocalDateTime sm_update_date;

	@Column(name="sm_itm_id")
	private Integer sm_itm_id;
	
	@Column(name="sm_sh_id")
	private Integer sm_sh_id;
	
	@Column(name="sm_transaction_id")
	private Integer sm_transaction_id;

	@Column(name="sm_amount")
	private float sm_amount;
}
