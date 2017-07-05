package br.com.myseries.model;

import javax.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;

@Transactional
public interface CriticaDao extends CrudRepository<Critica, Long>{

}
