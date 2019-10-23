package edu.unimagdalena.springacademic.controllers.rest;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.unimagdalena.springacademic.entities.Profesor;
import edu.unimagdalena.springacademic.services.ProfesorService;

/**
 * RProfesorController
 */
@RestController
public class RProfesorController {

  @Autowired
  private ProfesorService pService;

  @GetMapping("/profesores")
  public List<Profesor> getProfesores(@RequestParam(name = "nombre", required = false) String nombre,
      @RequestParam(name = "nif", required = false) String nif) {

    if (nombre != null && nif != null) {
      return Arrays.asList(pService.getProfesor(nombre, nif));
    }

    if (nombre != null) {
      return pService.getProfesorByNombre(nombre);
    }

    if (nif != null) {
      return Arrays.asList(pService.getProfesorByNif(nif));
    }

    return pService.getAll();
  }

  @DeleteMapping("/profesores/{nif}")
  public void eliminarProfesor(@PathVariable("nif") String nif) {
    Profesor profesor = pService.getProfesorByNif(nif);
    pService.eliminarProfesor(profesor);
  }

  @PutMapping("/profesores")
  public Profesor actualizarProfesor(@RequestBody Profesor profesor) {
    return pService.actualizarProfesor(profesor);
  }

}