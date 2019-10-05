package edu.unimagdalena.springacademic.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

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

  @Column
  @Temporal(TemporalType.DATE)
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date fecha;

  @Column
	@Temporal(TemporalType.TIME)
	@DateTimeFormat(iso = ISO.TIME)
	private Date hora;

  @ManyToOne
  @JoinColumn(name = "profesor")
  private Profesor profesor;

  @ManyToOne
  @JoinColumn(name = "asignatura")
  private Asignatura asignatura;

  @ManyToMany(mappedBy="clases")
  private Set<Alumno> alumnos;

  @ManyToMany
  @OrderBy("diaIndice, horaIndice")
  @JoinTable(name="CLASE_HORASEMANAL", joinColumns= @JoinColumn(name="id_clase", referencedColumnName="id"), inverseJoinColumns= @JoinColumn(name="id_horasemanal", referencedColumnName="id"))
  private Set<HoraSemanal> horasSemanales;
}