package br.com.myseries.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import br.com.myseries.model.Critica;
import br.com.myseries.model.CriticaDao;
import br.com.myseries.model.Usuario;
import br.com.myseries.model.UsuarioDao;
import br.com.myseries.service.UsuarioService;

@Controller
@EnableAutoConfiguration
public class SpringRest {

	private static final Logger LOGGER = Logger.getLogger(SpringRest.class.getName());

	@Autowired
	private UsuarioDao usuarioDao;

	@Autowired
	private CriticaDao criticaDao;

	@RequestMapping("/teste")
	@ResponseBody
	public String home() {
		return "index";
	}

	@RequestMapping("/cadastroLogin")
	@ResponseBody
	public String cadastroLogin(@RequestBody Usuario usuario) {
		try {
			//UsuarioService usuarioService = new UsuarioService();
			if(usuario != null){
				usuarioDao.save(usuario);				
			}
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			return "{\"msg\" : \"Erro ao salvar o usuário\"}";
		}
		return "{\"msg\" : \"Usuário salvo com sucesso\"}";
	}

	@RequestMapping("/listaCritica")
	@ResponseBody
	public List<Critica> listaCritica() {
		List<Critica> listaCritica = new ArrayList<Critica>();
		try {
			for (Critica critica : criticaDao.findAll()) {
				listaCritica.add(critica);
			}
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
		}
		return listaCritica;
	}

	@RequestMapping("/cadastroCritica")
	@ResponseBody
	public String cadastroCritica(Critica critica) {
		try {
			criticaDao.save(critica);
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			return "Erro ao salvar a critica!";
		}
		return "Critica cadastrada com sucesso!";
	}

	@RequestMapping("/alterarCritica")
	@ResponseBody
	public String alterarCritica(Critica critica) {
		try {
			criticaDao.save(critica);
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			return "Erro ao alterar a critica!";
		}
		return "Critica alterada com sucesso!";
	}

	@RequestMapping("/excluirCritica")
	@ResponseBody
	public String excluirCritica(Critica critica) {
		try {
			criticaDao.delete(critica);
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			return "Erro ao deletar a critica!";
		}
		return "Critica deletada com sucesso!";
	}
}