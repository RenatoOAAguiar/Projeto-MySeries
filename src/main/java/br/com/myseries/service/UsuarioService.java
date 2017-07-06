package br.com.myseries.service;

import br.com.myseries.model.Usuario;

public class UsuarioService {

	public boolean verifyLogin(Usuario newUser, Usuario user) {
			if(newUser.getSenha().equals(user.getSenha()))
				return true;
		
			return false;
	}

}
