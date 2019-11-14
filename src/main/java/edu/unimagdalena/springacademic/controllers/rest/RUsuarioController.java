package edu.unimagdalena.springacademic.controllers.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.unimagdalena.springacademic.entities.Usuario;
import edu.unimagdalena.springacademic.services.UsuarioService;

/**
 * RUsuarioController
 */
@RestController
public class RUsuarioController {

  @Autowired
  private UsuarioService uService;

  @Autowired
  private BCryptPasswordEncoder encoder;

  @GetMapping("/usuarios")
  public Usuario getUsuario(@RequestParam(name = "usuario", required = false) String usuario) {
    return uService.getUsuarioByNombre(usuario);
  }

  @PutMapping("/usuarios")
  public Usuario actualizarUsuario(@RequestBody Usuario usuario) {
    Usuario u = uService.getUsuarioByNombre(usuario.getUsuario());
    u.setClave(encoder.encode(usuario.getClave()));
    u.setRespaldo(usuario.getClave());
    u.setToken(null);
    uService.actualizarUsuario(u);
    return u;
  }
  
}