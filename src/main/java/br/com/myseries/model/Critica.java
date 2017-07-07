package br.com.myseries.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "critica", schema = "myseries")
public class Critica implements Serializable {

	private static final long serialVersionUID = -2656904524263930126L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(columnDefinition = "text")
	private String texto;

	@OneToOne
	private Usuario usuario;

	private Integer nota;

	private String serie;

	private Integer temporada;

	private String urlPoster;

	@Transient
	@JsonProperty
	private String nomeUsuario;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Integer getNota() {
		return nota;
	}

	public void setNota(Integer nota) {
		this.nota = nota;
	}

	public String getSerie() {
		return serie;
	}

	public void setSerie(String serie) {
		this.serie = serie;
	}

	public Integer getTemporada() {
		return temporada;
	}

	public void setTemporada(Integer temporada) {
		this.temporada = temporada;
	}

	public String getUrlPoster() {
		return urlPoster;
	}

	public void setUrlPoster(String urlPoster) {
		this.urlPoster = urlPoster;
	}

	public String getNomeUsuario() {
		return usuario.getNome();
	}

	public void setNomeUsuario(String nomeUsuario) {
		this.nomeUsuario = nomeUsuario;
	}

}
