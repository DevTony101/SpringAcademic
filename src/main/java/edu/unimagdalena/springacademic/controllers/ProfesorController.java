package edu.unimagdalena.springacademic.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * ProfesorController
 */
@Controller
public class ProfesorController {

  @GetMapping("/profesorado")
  public String profesorado() {
    return "busquedaProfesorado";
  }
  
}