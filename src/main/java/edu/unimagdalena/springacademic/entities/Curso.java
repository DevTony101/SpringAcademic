package edu.unimagdalena.springacademic.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

/**
 * Curso
 */
@Entity
@Table(name = "CURSOS")
@Getter
@Setter
@ToString
public class Curso implements Serializable {

  private static final long serialVersionUID = 1L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "nivel", length = 2, nullable = false)
  private Integer nivel;
  @Column(name = "etapa", length = 50, nullable = false)
  private String etapa;

  @OneToMany(mappedBy = "curso", cascade = CascadeType.REMOVE)
  @NonNull
  private Set<Asignatura> asignaturas;

  @OneToMany(mappedBy = "curso")
  @JsonIgnoreProperties("curso")
  private Set<Alumno> alumnos;

  public Curso() {
    this.alumnos = new HashSet<>();
  }
}