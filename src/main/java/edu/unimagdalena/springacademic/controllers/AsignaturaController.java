package edu.unimagdalena.springacademic.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import edu.unimagdalena.springacademic.entities.Asignatura;
import edu.unimagdalena.springacademic.entities.Curso;
import edu.unimagdalena.springacademic.entities.Usuario;
import edu.unimagdalena.springacademic.services.AsignaturaService;
import edu.unimagdalena.springacademic.services.UsuarioService;

/**
 * AsignaturaController
 */
@Controller
public class AsignaturaController {

  @Autowired
  private UsuarioService uService;

  @Autowired
  private AsignaturaService aService;

  @GetMapping("/mantenimientoAsignaturas")
  public String asignaturas(Model model) {
    Usuario usuario = uService.getCurrentUsuario();
    Asignatura asignatura = new Asignatura();
    asignatura.setCurso(new Curso());
    model.addAttribute("asignatura", asignatura);
    model.addAttribute("usuario", usuario);
    return "asignaturas";
  }

  @PostMapping("/crearAsignatura")
  public String crearAsignatura(@ModelAttribute @Valid Asignatura asignatura) {
    String status = "success";
    if (aService.existe(asignatura)) {
      status = "failed";
    } else {
      aService.guardarAsignatura(asignatura);
    }

    return "redirect:/mantenimientoAsignaturas?" + status;
  }

}