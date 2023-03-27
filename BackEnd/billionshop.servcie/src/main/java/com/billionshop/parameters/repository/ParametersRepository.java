package com.billionshop.parameters.repository;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.billionshop.parameters.entity.ParameterHeaderEntity;


@Repository
@Transactional
public interface ParametersRepository extends JpaRepository<ParameterHeaderEntity, Integer>{

	@Modifying
	@Query(value = ParametersRepoQuery.updateLastCode,nativeQuery = true)
	public void updateLastCode(@Param("dentcd") String dentcd,@Param("bno") Integer bno,Long lastcode);
	
	@Query(value = ParametersRepoQuery.findLastCode)
	public Long findLastCode(@Param("dentcd") String dentcd,@Param("bno") Integer bno);
	
	@Query(value = ParametersRepoQuery.findCodeDigit)
	public Integer findCodeDigit(@Param("dentcd") String dentcd,@Param("bno") Integer bno);
	
	@Query(value = ParametersRepoQuery.findPrefix)
	public String findPrefix(@Param("dentcd") String dentcd,@Param("bno") Integer bno);
	
	@Query(value = ParametersRepoQuery.findReasonAll)
	public List<Map<String, String>> findReasonAll();
}
