package com.billionshop.login.entity;

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
@Table(name = "bss_shop", schema="public")
public class ShopEntity {
	
	@Id
	@Column(name="sh_id")
	@SequenceGenerator(name = "shop_seq", schema = "public" , sequenceName = "shop_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "shop_seq")
	private Integer sh_id;
	
	@Column(name="sh_code")
	private String sh_code;
	
	@Column(name="sh_name")
	private String sh_name;
	
	@Column(name="sh_create_by")
	private String sh_create_by;
	
	@Column(name="sh_create_date")
	private LocalDateTime sh_create_date;
	
	@Column(name="sh_update_by")
	private String us_update_by;
	
	@Column(name="sh_update_date")
	private LocalDateTime sh_update_date;
	
}