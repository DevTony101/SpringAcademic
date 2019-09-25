package edu.unimagdalena.springacademic.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.Getter;
import lombok.NoArgsConstructor;
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

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "usuario", nullable = false, unique = true)
  private String usuario;
  @Column(name = "clave", nullable = false)
  private String clave;
  @Transient
  private String confirmacionClave;
  @Column(name = "enabled", nullable = false)
  private Boolean enabled;
  
}