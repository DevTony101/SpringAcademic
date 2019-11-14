package edu.unimagdalena.springacademic.controllers.rest;


import java.util.UUID;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import edu.unimagdalena.springacademic.entities.Alumno;
import edu.unimagdalena.springacademic.entities.Profesor;
import edu.unimagdalena.springacademic.entities.Usuario;
import edu.unimagdalena.springacademic.services.EmailSender;
import edu.unimagdalena.springacademic.services.UsuarioService;

/**
 * EmailController
 */
@RestController
public class EmailController {

  private static Logger LOG = Logger.getLogger(EmailController.class);

  @Autowired
  private EmailSender sender;

  @Autowired
  private UsuarioService uService;

  @PostMapping("/restablecerContraseña")
  public Usuario linkContraseña(@RequestBody Usuario usuario) {
    Profesor profesor = usuario.getUsuarioProfesor();
    Alumno alumno = usuario.getUsuarioAlumno();
    String token = UUID.randomUUID().toString();
    LOG.info(token);
    if (profesor != null) {
      usuario.setToken(token);
      uService.actualizarUsuario(usuario);
      sender.sendMessage(profesor.getCorreo(), token);
    } else if (alumno != null) {
      usuario.setToken(token);
      uService.actualizarUsuario(usuario);
      sender.sendMessage(alumno.getCorreo(), token);
    }

    return usuario;
  }

  @GetMapping("/restablecerContraseña")
  public ModelAndView restablecerContraseña(@RequestParam("token") String token) {
    ModelAndView mav = new ModelAndView("restContra");
    Usuario usuario = uService.getUsuarioByToken(token);
    mav.addObject("usuario", usuario);
    return mav;
  }

}