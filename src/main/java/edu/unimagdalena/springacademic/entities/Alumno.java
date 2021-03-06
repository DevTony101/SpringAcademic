package edu.unimagdalena.springacademic.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
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
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

/**
 * Alumno
 */
@Entity
@Table(name = "ALUMNOS")
@Getter
@Setter
@ToString
public class Alumno implements Serializable {

  private static final long serialVersionUID = 1L;

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
  @Temporal(TemporalType.DATE)
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date fechaAlta;
  @Column(name = "fecha_baja", nullable = true)
  @Temporal(TemporalType.DATE)
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date fechaBaja;
  @Column(name = "observaciones", length = 2000, nullable = true)
  private String observaciones;
  @Transient
  private String nCurso;

  @ManyToOne
  @JoinColumn(name = "curso")
  private Curso curso;

  @ManyToOne
  @JoinColumn(name = "responsable")
  @JsonIgnoreProperties("alumnos")
  private ResponsableAlumno responsable;
  
  @ManyToMany
  @JoinTable(name="ALUMNO_CLASE", joinColumns= @JoinColumn( name="id_alumno", referencedColumnName="id"), inverseJoinColumns=@JoinColumn( name="id_clase", referencedColumnName="id"))
  @NonNull
  @JsonIgnoreProperties("alumnos")
  private Set<Clase> clases;

  @OneToOne(mappedBy = "usuarioAlumno")
  @JsonIgnoreProperties("usuarioAlumno")
  private Usuario usuario;

  public Alumno() {
    this.clases = new HashSet<>();
  }
}