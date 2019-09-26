package edu.unimagdalena.springacademic.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import edu.unimagdalena.springacademic.entities.Profesor;
import edu.unimagdalena.springacademic.services.ProfesorService;

/**
 * ProfesorController
 */
@Controller
public class ProfesorController {

  @Autowired
  private ProfesorService service;

  @GetMapping("/profesorado")
  public String profesorado(Model model) {
    model.addAttribute("profesor", new Profesor());
    return "busquedaProfesorado";
  }

  @PostMapping("/crearProfesor")
  public String crearProfesor(@ModelAttribute @Valid Profesor profesor, Model model) {
    service.guardarProfesor(profesor);
    model.addAttribute("profesor", new Profesor());
    return "busquedaProfesorado";
  }

}