package edu.unimagdalena.springacademic.controllers.rest;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.unimagdalena.springacademic.entities.Asignatura;
import edu.unimagdalena.springacademic.services.AsignaturaService;

/**
 * RAsignaturaController
 */
@RestController
public class RAsignaturaController {

  @Autowired
  private AsignaturaService aService;

  @GetMapping("/asignaturas")
  public List<Asignatura> getAsignaturas(@RequestParam(name = "nombre", required = false) String nombre) {
    if (nombre != null) {
      return Arrays.asList(aService.getByNombre(nombre));
    }
    return aService.getAll();
  }

}