package edu.unimagdalena.springacademic.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import edu.unimagdalena.springacademic.entities.Curso;
import edu.unimagdalena.springacademic.entities.Usuario;
import edu.unimagdalena.springacademic.services.UsuarioService;

/**
 * CursoController
 */
@Controller
public class CursoController {

  @Autowired
  private UsuarioService uService;

  @GetMapping("/mantenimientoCursos")
  public String mantenimientoCursos(Model model) {
    Usuario usuario = uService.getCurrentUsuario();
    model.addAttribute("usuario", usuario);
    model.addAttribute("curso", new Curso());
    return "cursos";
  }

}