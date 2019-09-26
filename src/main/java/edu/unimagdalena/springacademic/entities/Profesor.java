package edu.unimagdalena.springacademic.entities;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

/**
 * Profesor
 */
@Entity
@Table(name = "PROFESORES")
@NoArgsConstructor
@Getter
@Setter
public class Profesor implements Serializable {

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
  @Column(name = "titulacion", length = 100, nullable = true)
  private String titulacion;

  @OneToMany(mappedBy = "profesor")
  @NonNull
  private Set<Clase> clases;

  @OneToOne(mappedBy = "usuarioProfesor")
  private Usuario usuario;
}