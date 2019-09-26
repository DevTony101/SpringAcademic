package edu.unimagdalena.springacademic.security;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.unimagdalena.springacademic.entities.Usuario;
import edu.unimagdalena.springacademic.repositories.UsuarioRepository;

/**
 * UserServiceImpl
 */
@Service
public class UserDetailsImpl implements UserDetailsService {

  @Autowired
  private UsuarioRepository repo;

  @Override
  @Transactional(readOnly = true)
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Usuario usuario = repo.findByUsuario(username);
    Set<GrantedAuthority> roles = new HashSet<>();
    if (!usuario.getRoles().isEmpty()) {
      usuario.getRoles().forEach(role -> {
        roles.add(new SimpleGrantedAuthority(role.getRole()));
      });
    }
    UserDetails userDetails = new User(usuario.getUsuario(), usuario.getClave(), roles);
    return userDetails;
  }
}