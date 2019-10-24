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

import edu.unimagdalena.springacademic.entities.Curso;
import edu.unimagdalena.springacademic.services.CursoService;

/**
 * RCursoController
 */
@RestController
public class RCursoController {

  @Autowired
  private CursoService cService;

  @DeleteMapping("/cursos/{id}")
  public void eliminarCurso(@PathVariable("id") Long id) {
    Curso curso = cService.getById(id);
    cService.eliminarCurso(curso);
  }

  @GetMapping("/cursos")
  public List<Curso> getCursos(@RequestParam(name = "id", required = false) Long id) {
    if (id != null) {
      return Arrays.asList(cService.getById(id));
    }
    return cService.getAll();
  }

  @PutMapping("/cursos")
  public Curso actualizarCurso(@RequestBody Curso curso) {
    return cService.guardarCurso(curso);
  }

}