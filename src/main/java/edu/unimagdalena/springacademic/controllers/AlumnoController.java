package edu.unimagdalena.springacademic.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import edu.unimagdalena.springacademic.entities.Alumno;
import edu.unimagdalena.springacademic.entities.ResponsableAlumno;
import edu.unimagdalena.springacademic.entities.Usuario;
import edu.unimagdalena.springacademic.services.UsuarioService;


/**
 * AlumnoController
 */
@Controller
public class AlumnoController {

  @Autowired
  private UsuarioService uService;

  @GetMapping("/alumnado")
  public String alumnado(Model model) {
    Usuario usuario = uService.getCurrentUsuario();
    Alumno alumno = new Alumno();
    alumno.setResponsable(new ResponsableAlumno());
    model.addAttribute("alumno", alumno);
    model.addAttribute("usuario", usuario);
    return "alumnado";
  }
  
}