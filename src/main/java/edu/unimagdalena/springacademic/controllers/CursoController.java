package edu.unimagdalena.springacademic.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.unimagdalena.springacademic.entities.Curso;
import edu.unimagdalena.springacademic.entities.Usuario;
import edu.unimagdalena.springacademic.services.CursoService;
import edu.unimagdalena.springacademic.services.UsuarioService;

/**
 * CursoController
 */
@Controller
public class CursoController {

  @Autowired
  private UsuarioService uService;

  @Autowired
  private CursoService cService;

  @GetMapping("/mantenimientoCursos")
  public String mantenimientoCursos(Model model) {
    Usuario usuario = uService.getCurrentUsuario();
    model.addAttribute("usuario", usuario);
    model.addAttribute("curso", new Curso());
    return "cursos";
  }

  @PostMapping("/crearCurso")
  public String crearCurso(@ModelAttribute @Valid Curso curso) {
    cService.guardarCurso(curso);
    return "redirect:/mantenimientoCursos?success";
  }

  @GetMapping("/getCursos")
  @ResponseBody
  public List<Curso> getCursos() {
    // TODO: Agregar los demas parametros
    return cService.getAll();
  }

}