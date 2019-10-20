package edu.unimagdalena.springacademic.controllers.rest;

import java.util.List;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.unimagdalena.springacademic.entities.Clase;
import edu.unimagdalena.springacademic.services.ClaseService;

/**
 * RClaseController
 */
@RestController
public class RClaseController {

  @Autowired
  private ClaseService cService;

  private static Logger LOG = Logger.getLogger(RClaseController.class);

  @GetMapping("/clases")
  public List<Clase> getClases(@RequestParam("asignatura") String asignatura,
      @RequestParam("profesor") String profesor) {
    if (asignatura.equals("Todos") && profesor.equals("Todos")) {
      return cService.getAll();
    } else {
      return cService.getByAsignaturaProfesor(asignatura, profesor);
    }
  }

  @PostMapping("/clases")
  public Clase guardarClase(@RequestBody Clase clase) {
    LOG.info(clase);
    return cService.guardarClase(clase);
  }

}