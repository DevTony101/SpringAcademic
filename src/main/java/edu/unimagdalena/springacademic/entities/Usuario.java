package edu.unimagdalena.springacademic.entities;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

/**
 * Usuario
 */
@Entity
@Table(name = "USUARIOS")
@NoArgsConstructor
@Getter
@Setter
public class Usuario implements Serializable {

  private static final long serialVersionUID = 1L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "usuario", nullable = false, unique = true)
  private String usuario;
  @Column(name = "clave", nullable = false)
  private String clave;
  @Column(name = "respaldo", nullable = false)
  private String respaldo;
  @Column(name = "enabled", nullable = false)
  private Boolean enabled;

  @ManyToMany
  @JoinTable(name = "usuarios_roles", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "role_id"))
  @NonNull
  private Set<Role> roles;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "alumno_id", referencedColumnName = "id")
  private Alumno usuarioAlumno;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "profesor_id", referencedColumnName = "id")
  private Profesor usuarioProfesor;
}