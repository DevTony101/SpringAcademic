package edu.unimagdalena.springacademic.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.unimagdalena.springacademic.entities.Usuario;

/**
 * UsuarioRepository
 */
@Repository
public interface UsuarioRepository  extends JpaRepository<Usuario, Long> {
  Usuario findByUsuario(String usuario);
}