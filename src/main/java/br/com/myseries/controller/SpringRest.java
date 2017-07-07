package br.com.myseries.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

	@RequestMapping("/listaCriticaFiltro")
	@ResponseBody
	public String listaCriticaFiltro(@RequestBody String pesquisa) {
		List<Critica> listaCritica = new ArrayList<Critica>();
		Gson gson = new Gson();
		try {
			for (Critica critica : criticaDao.findBySerie(pesquisa)) {
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
	public ResponseEntity<Critica> cadastroCritica(@RequestBody Critica critica) {
		try {
			if (critica != null) {
				Usuario usuario = new Usuario();
				usuario = usuarioDao.findOne(critica.getUsuario().getId());
				critica.setUsuario(usuario);
				criticaDao.save(critica);
			}
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			return new ResponseEntity<Critica>(HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<Critica>(HttpStatus.OK);
	}

	@RequestMapping("/abrirCritica/{id}")
	@ResponseBody
	public String abrirCritica(@PathVariable Long id) {
		Critica critica = null;
		Gson gson = new Gson();
		try {
			if (id != null) {
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
	public ResponseEntity<Critica> alterarCritica(@RequestBody Critica critica) {
		try {
			if (critica != null) {
				Usuario usuario = new Usuario();
				usuario = usuarioDao.findOne(critica.getUsuario().getId());
				critica.setUsuario(usuario);
				criticaDao.save(critica);
			}
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			return new ResponseEntity<Critica>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Critica>(HttpStatus.OK);
	}

	@RequestMapping("/excluirCritica/{id}")
	@ResponseBody
	public ResponseEntity<Critica> excluirCritica(@PathVariable Long id) {
		try {
			criticaDao.delete(id);
			;
		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			return new ResponseEntity<Critica>(HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<Critica>(HttpStatus.OK);
	}
}