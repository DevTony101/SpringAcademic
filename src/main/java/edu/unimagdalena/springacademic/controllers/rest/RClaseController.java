package edu.unimagdalena.springacademic.controllers.rest;

import java.util.List;
import java.util.stream.Collectors;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
  public List<Clase> getClases(@RequestParam(name = "curso", required = false) String curso,
      @RequestParam(name = "nif", required = false) String nif) {
    List<Clase> clases;
    if (curso != null && nif != null) {
      String[] nCurso = curso.split(" ");
      int nivel = Integer.parseInt(nCurso[0]);
      String etapa = nCurso[2];
      clases = cService.getByCurso(nivel, etapa);
      clases = clases.stream().filter(clase -> {
        return (clase.getProfesor().getNif().equals(nif));
      }).collect(Collectors.toList());
    } else if (curso != null) {
      String[] nCurso = curso.split(" ");
      int nivel = Integer.parseInt(nCurso[0]);
      String etapa = nCurso[2];
      clases = cService.getByCurso(nivel, etapa);
    } else if (nif != null) {
      clases = cService.getByProfesor(nif);
    } else {
      clases = cService.getAll();
    }

    return clases;
  }

  @GetMapping("/clases/{id}")
  public Clase getClase(@PathVariable Long id) {
    return cService.getById(id);
  }

  @PostMapping("/clases")
  public Clase guardarClase(@RequestBody Clase clase) {
    LOG.info(clase);
    return cService.guardarClase(clase);
  }

  @PutMapping("/clases")
  public Clase actualizarClase(@RequestBody Clase clase) {
    LOG.info(clase);
    return cService.actualizarClase(clase);
  }

  @DeleteMapping("/clases/{id}")
  public void eliminarClase(@PathVariable("id") Long id) {
    cService.eliminarClase(id);
  }

}