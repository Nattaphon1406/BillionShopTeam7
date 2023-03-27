package com.billionshop.parameters.entity;

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
@Table(name = "prmtbldtl",schema="public")
public class ParameterDetailEntity {

	@Id
	@Column(name="pmdtbdtbno")
	private Integer pmdtbdtbno;
	

	@Column(name="pmdtbdentcd")
	private String pmdtbdentcd;
	
	@Column(name="pmdtbdedesc")
	private String pmdtbdedesc;
	
	@Column(name="pmdtbdldesc")
	private Float pmdtbdldesc;
	
	@Column(name="pmdtbdacces")
	private Float pmdtbdacces;
	
	@Column(name="pmdcmnt")
	private String pmdcmnt;
	
	@Column(name="pmdcredat")
	private String pmdcredat;
	
	@Column(name="pmdcreusr")
	private Integer pmdcreusr;
	
	@Column(name="pmdupddat")
	private Float pmdupddat;
	
	@Column(name="pmdupdusr")
	private Integer pmdupdusr;
	
	@Column(name="pmdeopdat")
	private String pmdeopdat;
	
	@Column(name="pmdtbdtxtv1")
	private String pmdtbdtxtv1;
	
	@Column(name="pmdtbdtxtv2")
	private String pmdtbdtxtv2;
	
	@Column(name="pmdtbdtxtv3")
	private String pmdtbdtxtv3;
	
	@Column(name="pmdtbdtxtv4")
	private String pmdtbdtxtv4;
	
	@Column(name="pmdtbdtxtv5")
	private String pmdtbdtxtv5;
	
	@Column(name="pmdtbdv1")
	private Integer pmdtbdv1;
	
	@Column(name="pmdtbdv2")
	private Integer pmdtbdv2;
	
	@Column(name="pmdtbdv3")
	private String pmdtbdv3;
	
	@Column(name="pmdtbdv4")
	private String pmdtbdv4;
	
	@Column(name="pmdtbdv5")
	private String pmdtbdv5;
	
	@Column(name="pmdcreprg")
	private String pmdcreprg;
	
	@Column(name="pmdupdprg")
	private String pmdupdprg;
	
}
