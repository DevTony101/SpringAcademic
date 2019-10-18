package edu.unimagdalena.springacademic.controllers.rest;

import java.util.List;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
  public List<Clase> getClases() {
    return cService.getAll();
  }

  @PostMapping("/clases")
  public Clase guardarClase(@RequestBody Clase clase) {
    LOG.info(clase);
    return null;
  }
  
}