package br.com.myseries.service;

import java.lang.reflect.Field;

import br.com.myseries.model.Usuario;

public class UsuarioService {

	public boolean validar(Usuario usuario) {
		Field[] fields = usuario.getClass().getDeclaredFields();
		return verificarNull(fields);
	}

	private boolean verificarNull(Field[] fields) {
		boolean valido = true;
		for (Field field : fields) {
			if (field.getName().equals("dataNasc"))
				continue;
			if (field.equals("") || field == null) {
				valido = false;
				break;
			}
		}
		return valido;
	}

}
