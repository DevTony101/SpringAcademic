package edu.unimagdalena.springacademic.controllers;

import java.util.Arrays;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.unimagdalena.springacademic.entities.Profesor;
import edu.unimagdalena.springacademic.services.ProfesorService;

/**
 * ProfesorController
 */
@Controller
public class ProfesorController {

  @Autowired
  private ProfesorService pService;

  @GetMapping("/profesorado")
  public String profesorado(Model model) {
    model.addAttribute("profesor", new Profesor());
    return "busquedaProfesorado";
  }

  @PostMapping("/crearProfesor")
  public String crearProfesor(@ModelAttribute @Valid Profesor profesor, Model model) {
    pService.guardarProfesor(profesor);
    model.addAttribute("profesor", new Profesor());
    return "redirect:/profesorado?success";
  }

  @GetMapping("/getProfesores")
  @ResponseBody
  public List<Profesor> getProfesores(@RequestParam(name = "nombre") String nombre,
      @RequestParam(name = "nif") String nif) {
    if (!nombre.isEmpty() && !nif.isEmpty()) {
      return Arrays.asList(pService.getProfesor(nombre, nif));
    } else if (!nombre.isEmpty()) {
      return pService.getProfesorByNombre(nombre);
    } 

    return Arrays.asList(pService.getProfesorByNif(nif));
  }

  @GetMapping("/eliminarProfesor/{nif}")
  public String eliminarProfesor(@PathVariable("nif") String nif, Model model) {
    Profesor profesor = pService.getProfesorByNif(nif);
    pService.eliminarProfesor(profesor);
    model.addAttribute("profesor", new Profesor());
    return "busquedaProfesorado";
  }

}