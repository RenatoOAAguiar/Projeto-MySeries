package br.com.myseries.model;

import javax.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;

@Transactional
public interface UsuarioDao extends CrudRepository<Usuario, Long>{

}
