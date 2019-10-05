package edu.unimagdalena.springacademic.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import edu.unimagdalena.springacademic.entities.Clase;
import edu.unimagdalena.springacademic.entities.Usuario;
import edu.unimagdalena.springacademic.services.UsuarioService;

/**
 * ClaseController
 */
@Controller
public class ClaseController {

  @Autowired
  private UsuarioService uService;

  @GetMapping("/clases")
  public String clases(Model model) {
    Usuario usuario = uService.getCurrentUsuario();
    model.addAttribute("clase", new Clase());
    model.addAttribute("usuario", usuario);
    return "clases";
  }

}