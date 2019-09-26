package edu.unimagdalena.springacademic.services;

import java.util.Arrays;
import java.util.HashSet;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import edu.unimagdalena.springacademic.entities.Alumno;
import edu.unimagdalena.springacademic.entities.Profesor;
import edu.unimagdalena.springacademic.entities.Role;
import edu.unimagdalena.springacademic.entities.Usuario;
import edu.unimagdalena.springacademic.repositories.RoleRepository;
import edu.unimagdalena.springacademic.repositories.UsuarioRepository;

/**
 * UsuarioService
 */
@Service
public class UsuarioService implements IUsuarioService {

  @Autowired
  private UsuarioRepository repo;

  @Autowired
  private RoleRepository roleRepo;

  @Override
  public Usuario crearAdmin(String usuario) {
    Usuario u = new Usuario();
    u.setUsuario(usuario);
    u.setClave(usuario);
    u.setEnabled(true);
    Role userRole = roleRepo.findByRole("ADMIN");
    u.setRoles(new HashSet<Role>(Arrays.asList(userRole)));
    return repo.save(u);
  }

}