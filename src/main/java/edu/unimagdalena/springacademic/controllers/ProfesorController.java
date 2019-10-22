package edu.unimagdalena.springacademic.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import edu.unimagdalena.springacademic.entities.Profesor;
import edu.unimagdalena.springacademic.entities.Usuario;
import edu.unimagdalena.springacademic.services.ProfesorService;
import edu.unimagdalena.springacademic.services.UsuarioService;

/**
 * ProfesorController
 */
@Controller
public class ProfesorController {

  @Autowired
  private ProfesorService pService;

  @Autowired
  private UsuarioService uService;

  @GetMapping("/profesorado")
  public String profesorado(Model model) {
    Usuario usuario = uService.getCurrentUsuario();
    model.addAttribute("profesor", new Profesor());
    model.addAttribute("usuario", usuario);
    return "profesorado";
  }

  @PostMapping("/crearProfesor")
  public String crearProfesor(@ModelAttribute @Valid Profesor profesor) {
    pService.guardarProfesor(profesor);
    return "redirect:/profesorado?success";
  }

}