package br.com.myseries.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import br.com.myseries.model.Critica;
import br.com.myseries.model.CriticaDao;
import br.com.myseries.model.Usuario;
import br.com.myseries.model.UsuarioDao;
import br.com.myseries.service.UsuarioService;
import br.com.myseries.util.ResponseUtil;

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

	@RequestMapping("/login")
	@ResponseBody
	public Usuario login(@RequestBody Usuario usuario) {
		Usuario user = null;
		try {
			if (usuario != null) {
				user = usuarioDao.findByLogin(usuario.getLogin());
				UsuarioService service = new UsuarioService();
				if (service.verifyLogin(usuario, user)) {
					user.setSenha(null);
					return user;
				} else {
					throw new Exception();
				}
			}
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
		}
		return null;
	}

	@RequestMapping("/cadastroLogin")
	@ResponseBody
	public String cadastroLogin(@RequestBody Usuario usuario) {
		try {
			if (usuario != null) {
				usuarioDao.save(usuario);
			}
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			return ResponseUtil.formatResponse("Erro ao salvar o usuário");
		}
		return ResponseUtil.formatResponse("Usuário salvo com sucesso");
	}

	@RequestMapping("/listaCritica")
	@ResponseBody
	public String listaCritica() {
		List<Critica> listaCritica = new ArrayList<Critica>();
		Gson gson = new Gson();
		try {
			for (Critica critica : criticaDao.findAll()) {
				critica.setNomeUsuario(usuarioDao.findOne(critica.getUsuario().getId()).getNome());
				critica.setUsuario(null);
				listaCritica.add(critica);
			}
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
		}
		String result = gson.toJson(listaCritica);
		return result;
	}

	@RequestMapping("/cadastroCritica")
	@ResponseBody
	public String cadastroCritica(@RequestBody Critica critica) {
		try {
			if(critica != null){
				criticaDao.save(critica);
			}
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			return "Erro ao salvar a critica!";
		}
		return "Critica cadastrada com sucesso!";
	}
	
	@RequestMapping("/abrirCritica/{id}")
	@ResponseBody
	public String abrirCritica(@PathVariable Long id) {
		Critica critica = null;
		Gson gson = new Gson();
		try {
			if(id != null){
				critica = criticaDao.findOne(id);
				critica.setNomeUsuario(usuarioDao.findOne(critica.getUsuario().getId()).getNome());
				critica.setUsuario(null);
			}
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
		}
		String result = gson.toJson(critica);
		return result;
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