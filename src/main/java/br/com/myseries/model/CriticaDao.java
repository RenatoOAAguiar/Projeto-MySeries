package br.com.myseries.model;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

@Transactional
public interface CriticaDao extends CrudRepository<Critica, Long>{

	public List<Critica> findBySerie(String serie);
}
