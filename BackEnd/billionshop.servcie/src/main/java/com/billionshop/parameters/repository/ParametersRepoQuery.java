package com.billionshop.parameters.repository;

public class ParametersRepoQuery {
	public static final String findLastCode = "select pde.pmdtbdv1 from ParameterDetailEntity pde \r\n"
			+ "where pde.pmdtbdtbno = :bno and pde.pmdtbdentcd = :dentcd";
	
	public static final String findCodeDigit = "select pde.pmdtbdv2 from ParameterDetailEntity pde \r\n"
			+ "where pde.pmdtbdtbno = :bno and pde.pmdtbdentcd = :dentcd";

	public static final String updateLastCode = "update prmtbldtl set pmdtbdv1 = :lastcode "
			+ "where pmdtbdtbno = :bno and pmdtbdentcd = :dentcd";
	
	public static final String findPrefix = "select pde.pmdtbdtxtv1 from ParameterDetailEntity pde \r\n"
			+ "where pde.pmdtbdtbno = :bno and pde.pmdtbdentcd = :dentcd";
	
	public static final String findReasonAll = "select p.pmdtbdedesc as reason, p.pmdtbdentcd as id from ParameterDetailEntity p \r\n"
			+ "where p.pmdtbdtbno = 900 \r\n"
			+ "order by p.pmdtbdentcd asc";
}
