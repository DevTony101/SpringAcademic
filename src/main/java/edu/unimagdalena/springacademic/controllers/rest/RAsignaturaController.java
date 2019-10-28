package edu.unimagdalena.springacademic.controllers.rest;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.unimagdalena.springacademic.entities.Asignatura;
import edu.unimagdalena.springacademic.entities.Curso;
import edu.unimagdalena.springacademic.services.AsignaturaService;
import edu.unimagdalena.springacademic.services.CursoService;

/**
 * RAsignaturaController
 */
@RestController
public class RAsignaturaController {

  @Autowired
  private AsignaturaService aService;

  @Autowired
  private CursoService cService;

  @GetMapping("/asignaturas")
  public List<Asignatura> getAsignaturas(@RequestParam(name = "nombre", required = false) String nombre) {
    if (nombre != null) {
      return Arrays.asList(aService.getByNombre(nombre));
    }
    return aService.getAll();
  }

  @GetMapping("/curso/asignaturas")
  public List<Asignatura> getAsignaturas(@RequestParam("nivel") Integer nivel, @RequestParam("etapa") String etapa,
      @RequestParam(name = "nombre", required = false) String nombre) {
    Curso curso = cService.getByNivelEtapa(nivel, etapa);
    List<Asignatura> asignaturas = aService.getByCurso(curso);
    if (nombre != null) {
      asignaturas = asignaturas.stream().filter(asignatura -> asignatura.getNombre().equals(nombre)).collect(Collectors.toList());
    }

    return asignaturas;
  }

}