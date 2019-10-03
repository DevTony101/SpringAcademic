package edu.unimagdalena.springacademic.services;

import java.util.Arrays;
import java.util.HashSet;

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
  public Usuario crearUsuario(String usuario, String rol, String clave) {
    Usuario u = new Usuario();
    u.setUsuario(usuario);
    u.setClave(encoder.encode(clave));
    u.setRespaldo(clave);
    u.setEnabled(true);
    Role role = roleRepo.findByRole(rol);
    u.setRoles(new HashSet<>(Arrays.asList(role)));
    return u;
  }

  @Override
  public Usuario crearUsuario(String usuario, String rol) {
    String clave = String.valueOf(new java.util.Random().nextInt(899) + 100);
    return crearUsuario(usuario, rol, clave);
  }

  @Override
  public Usuario guardarUsuario(Usuario usuario) {
    if (repo.findByUsuario(usuario.getUsuario()) == null) {
      return repo.save(usuario);
    }
    return null;
  }

  @Override
  public Usuario getCurrentUsuario() {
    String usuario = securityService.getLoggedInUsername();
    return getUsuarioByNombre(usuario);
  }

  @Override
  public Usuario getUsuarioByNombre(String usuario) {
    return repo.findByUsuario(usuario);
  }

  @Override
  public void eliminarUsuario(Usuario usuario) {
    repo.delete(usuario);
  }

}