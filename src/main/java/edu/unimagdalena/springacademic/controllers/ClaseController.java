package edu.unimagdalena.springacademic.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import edu.unimagdalena.springacademic.entities.Asignatura;
import edu.unimagdalena.springacademic.entities.Clase;
import edu.unimagdalena.springacademic.entities.Profesor;
import edu.unimagdalena.springacademic.entities.Usuario;
import edu.unimagdalena.springacademic.services.UsuarioService;

/**
 * ClaseController
 */
@Controller
public class ClaseController {

  @Autowired
  private UsuarioService uService;

  @GetMapping("/springClases")
  public String clases(Model model) {
    Usuario usuario = uService.getCurrentUsuario();
    Clase clase = new Clase();
    clase.setProfesor(new Profesor());
    clase.setAsignatura(new Asignatura());
    model.addAttribute("clase", clase);
    model.addAttribute("usuario", usuario);
    return "clases";
  }

}