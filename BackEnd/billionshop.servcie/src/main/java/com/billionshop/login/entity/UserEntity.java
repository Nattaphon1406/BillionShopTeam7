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
@Table(name = "bss_user", schema="public")
public class UserEntity {
	
	@Id
	@Column(name="us_id")
	@SequenceGenerator(name = "user_seq", schema = "public" , sequenceName = "user_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
	private Integer us_id;
	
	@Column(name="us_user_name")
	private String us_user_name;
	
	@Column(name="us_pass_word")
	private String us_pass_word;
	
	@Column(name="us_first_name")
	private String us_first_name;
	
	@Column(name="us_last_name")
	private String us_last_name;
	
	@Column(name="us_email")
	private String us_email;
	
	@Column(name="us_tel")
	private String us_tel;
	
	@Column(name="us_permission")
	private String us_permission;
	
	@Column(name="us_create_by")
	private String us_create_by;
	
	@Column(name="us_create_date")
	private LocalDateTime us_create_date;
	
	@Column(name="us_update_by")
	private String us_update_by;
	
	@Column(name="us_update_date")
	private LocalDateTime us_update_date;
	
	@Column(name="us_sh_id")
	private Integer us_sh_id;

	
}