package edu.unimagdalena.springacademic.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

/**
 * Alumno
 */
@Table(name = "CLASES")
@Entity
@Getter
@Setter
public class Clase implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "profesor")
  @JsonIgnoreProperties("clases")
  private Profesor profesor;

  @ManyToOne
  @JoinColumn(name = "asignatura")
  @JsonIgnoreProperties("clases")
  private Asignatura asignatura;

  @ManyToMany(mappedBy = "clases")
  @JsonIgnoreProperties("clases")
  private Set<Alumno> alumnos;

  @ManyToMany
  @OrderBy("diaIndice, horaIndice")
  @JoinTable(name = "CLASE_HORASEMANAL", joinColumns = @JoinColumn(name = "id_clase", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "id_horasemanal", referencedColumnName = "id"))
  @JsonIgnoreProperties("clases")
  private Set<HoraSemanal> horasSemanales;

  public Clase() {
    this.alumnos = new HashSet<>();
  }
}