package edu.unimagdalena.springacademic.entities;

import java.io.Serializable;
import java.util.Set;
import java.util.HashSet;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

/**
 * ResponsableAlumno
 */
@Entity
@Table(name = "RESPONSABLE_ALUMNO")
@Getter
@Setter
public class ResponsableAlumno implements Serializable {

  private static final long serialVersionUID = 1L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "nombre", length = 50, nullable = false)
  private String nombre;
  @Column(name = "apellido", length = 50, nullable = false)
  private String apellido; 
  @Column(name = "nif", length = 9, nullable = false, unique = true)
  private String nif;
  @Column(name = "telefono", length = 10, nullable = false)
  private String telefono;
  @Column(name = "correo", length = 100, nullable = false)
  private String correo;  

  @OneToMany(mappedBy = "responsable")
  @NonNull
  private Set<Alumno> alumnos;

  public ResponsableAlumno() {
    this.alumnos = new HashSet<>();
  }
  
}