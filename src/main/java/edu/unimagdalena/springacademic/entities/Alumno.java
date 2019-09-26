package edu.unimagdalena.springacademic.entities;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;

/**
 * Alumno
 */
@Entity
@Table(name = "ALUMNOS")
@NoArgsConstructor
@Getter
@Setter
public class Alumno implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "nombre", length = 50, nullable = false)
  private String nombre;
  @Column(name = "apellido", length = 50, nullable = false)
  private String apellido;
  @Column(name = "nif", length = 9, nullable = true)
  private String nif;
  @Column(name = "telefono", length = 10, nullable = true)
  private String telefono;
  @Column(name = "correo", length = 100, nullable = true)
  private String correo;
  @Column(name = "repetidor", nullable = false)
  private Boolean repetidor;
  @Column(name = "fecha_alta", nullable = false)
  private Date fechaAlta;
  @Column(name = "fecha_baja", nullable = true)
  private Date fechaBaja;
  @Column(name = "observaciones", length = 2000, nullable = true)
  private String observaciones;

  @ManyToOne
  @JoinColumn(name = "curso")
  private Curso curso;

  @ManyToOne
  @JoinColumn(name = "responsable")
  private ResponsableAlumno responsable;
  
  @ManyToMany
  @JoinTable(name="ALUMNO_CLASE", joinColumns= @JoinColumn( name="id_alumno", referencedColumnName="id"), inverseJoinColumns=@JoinColumn( name="id", referencedColumnName="id"))
  @NonNull
  private Set<Clase> clases;

  @OneToOne(mappedBy = "usuarioAlumno")
  private Usuario usuario;
}