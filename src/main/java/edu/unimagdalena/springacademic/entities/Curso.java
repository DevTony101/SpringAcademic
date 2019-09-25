package edu.unimagdalena.springacademic.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

/**
 * Curso
 */
@Entity
@Table(name = "CURSOS")
@NoArgsConstructor
@Getter
@Setter
public class Curso {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "nivel", length = 2, nullable = false)
  private Integer nivel;
  @Column(name = "etapa", length = 50, nullable = false)
  private String etapa;

  @OneToMany(mappedBy = "curso")
  @NonNull
  private Set<Asignatura> asignaturas;

  @OneToMany(mappedBy = "curso")
  @NonNull
  private Set<Alumno> alumnos;
}