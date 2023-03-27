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
@Table(name = "prmtblhdr",schema="public")
public class ParameterHeaderEntity {

	@Id
	@Column(name="pmhtbhtbno")
	private Integer pmhtbhtbno;
	
	@Column(name="pmhtbhacces")
	private Integer pmhtbhacces;
	
	@Column(name="pmhtbhedesc")
	private String pmhtbhedesc;
	
	@Column(name="pmhtbhldesc")
	private String pmhtbhldesc;
	
	@Column(name="pmhcmnt")
	private String pmhcmnt;
	
	@Column(name="pmhcredat")
	private String pmhcredat;
	
	@Column(name="pmhcreusr")
	private String pmhcreusr;
	
	@Column(name="pmhupddat")
	private String pmhupddat;
	
	@Column(name="pmhupdusr")
	private String pmhupdusr;
	
	@Column(name="pmheopdat")
	private String pmheopdat;
	
	@Column(name="pmhtbhsys")
	private Integer pmhtbhsys;
	
	@Column(name="pmhcreprg")
	private String pmhcreprg;
	
	@Column(name="pmhupdprg")
	private String pmhupdprg;
	
	
}
