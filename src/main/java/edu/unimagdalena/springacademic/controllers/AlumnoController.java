package edu.unimagdalena.springacademic.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import edu.unimagdalena.springacademic.entities.Alumno;


/**
 * AlumnoController
 */
@Controller
public class AlumnoController {

  @GetMapping("/alumnado")
  public String alumnado(Model model) {
    model.addAttribute("alumno", new Alumno());
    return "alumnado";
  }
  
}