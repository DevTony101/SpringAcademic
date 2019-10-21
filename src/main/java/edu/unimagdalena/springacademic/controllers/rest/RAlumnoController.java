package edu.unimagdalena.springacademic.controllers.rest;

import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.unimagdalena.springacademic.entities.Alumno;
import edu.unimagdalena.springacademic.services.AlumnoService;

/**
 * RAlumnoController
 */
@RestController
public class RAlumnoController {

  @Autowired
  private AlumnoService aService;

  @GetMapping("/alumnos")
  public List<Alumno> getAlumnos(@RequestParam(name = "id", required = false) Long id) {
    if (id != null) {
      return Arrays.asList(aService.getById(id));
    }
    return aService.getAll();
  }

  @DeleteMapping("/alumnos/{id}")
  public void bajarAlumno(@PathVariable("id") Long id) {
    Alumno alumno = aService.getById(id);
    if (alumno.getFechaBaja() == null) {
      alumno.setFechaBaja(Calendar.getInstance().getTime());
    } else {
      alumno.setFechaBaja(null);
    }
    aService.actualizarAlumno(alumno);
  }

}