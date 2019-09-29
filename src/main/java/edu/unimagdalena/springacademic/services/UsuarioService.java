package edu.unimagdalena.springacademic.services;

import java.util.Arrays;
import java.util.HashSet;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import edu.unimagdalena.springacademic.entities.Role;
import edu.unimagdalena.springacademic.entities.Usuario;
import edu.unimagdalena.springacademic.repositories.RoleRepository;
import edu.unimagdalena.springacademic.repositories.UsuarioRepository;
import edu.unimagdalena.springacademic.security.SecurityServiceImpl;

/**
 * UsuarioService
 */
@Service
public class UsuarioService implements IUsuarioService {

  @Autowired
  private UsuarioRepository repo;

  @Autowired
  private RoleRepository roleRepo;

  @Autowired
  private SecurityServiceImpl securityService;

  @Autowired
  @Lazy
	private BCryptPasswordEncoder encoder;

  @Override
  public Usuario crearProfesor(String usuario) {
    Usuario u = new Usuario();
    u.setUsuario(usuario);
    String clave = String.valueOf(new java.util.Random().nextInt(899) + 100);
    u.setClave(encoder.encode(clave));
    u.setRespaldo(clave);
    Role userRole = roleRepo.findByRole("PROFESOR");
    u.setRoles(new HashSet<Role>(Arrays.asList(userRole)));
    u.setEnabled(true);
    return u;
  }

  @Override
  public Usuario guardarUsuario(Usuario usuario) {
    return repo.save(usuario);
  }

  @Override
  public Usuario getCurrentUsuario() {
    String usuario = securityService.getLoggedInUsername();
    return repo.findByUsuario(usuario);
  }

}