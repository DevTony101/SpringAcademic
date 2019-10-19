package edu.unimagdalena.springacademic.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

/**
 * Hora_Semanal
 */
@Entity
@Table(name = "HORAS_SEMANALES")
@Getter
@Setter
@ToString
public class HoraSemanal implements Serializable {

  private static final long serialVersionUID = 1L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "dia", length = 10, nullable = false)
  private String dia;
  @Column(name = "hora", length = 13, nullable = false)
  private String hora;
  @Column(name = "dia_indice", nullable = false) 
  private Integer diaIndice;
  @Column(name = "hora_indice", nullable = false) 
  private Integer horaIndice; 

  @ManyToMany(mappedBy = "horasSemanales")
  @NonNull
  @JsonIgnoreProperties("horasSemanales")
  private Set<Clase> clases;

  public HoraSemanal() {
    this.clases = new HashSet<>();
  }
}