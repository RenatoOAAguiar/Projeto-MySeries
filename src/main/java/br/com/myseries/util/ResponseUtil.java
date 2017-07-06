package br.com.myseries.util;

public class ResponseUtil {

	public static String formatResponse(String conteudo) {

		return "{\"msg\" : \"" + conteudo + "\"}";
	}

}
