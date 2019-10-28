package edu.unimagdalena.springacademic.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

/**
 * Asignatura
 */
@Entity
@Table(name = "ASIGNATURAS")
@Getter
@Setter
@ToString
public class Asignatura implements Serializable {

  private static final long serialVersionUID = 1L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "nombre", length = 50, nullable = false)
  private String nombre;

  @ManyToOne
  @JoinColumn(name = "curso")
  @JsonIgnoreProperties("asignaturas")
  private Curso curso;

  @Transient
  private String nCurso;

  @OneToMany(mappedBy = "asignatura")
  @NonNull
  private Set<Clase> clases;

  public Asignatura() {
    this.clases = new HashSet<>();
  }
}