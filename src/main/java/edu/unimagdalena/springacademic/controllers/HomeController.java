package edu.unimagdalena.springacademic.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import edu.unimagdalena.springacademic.entities.Role;
import edu.unimagdalena.springacademic.entities.Usuario;
import edu.unimagdalena.springacademic.services.UsuarioService;

/**
 * HomeController
 */
@Controller
public class HomeController {

  @Autowired
  private UsuarioService uService;

  @GetMapping("/home")
  public String home(Model model) {
    Usuario usuario = uService.getCurrentUsuario();
    for (Role role : usuario.getRoles()) {
      if (role.getRole().equals("ADMIN")) {
        model.addAttribute("usuario", usuario);
        return "home";
      } else if (role.getRole().equals("PROFESOR")) {
        model.addAttribute("usuario", usuario);
        model.addAttribute("profesor", usuario.getUsuarioProfesor());
        return "profesores/home";
      }
    }
    return "";
  }

  @GetMapping("/login")
  public String login() {
    return "login";
  }

}