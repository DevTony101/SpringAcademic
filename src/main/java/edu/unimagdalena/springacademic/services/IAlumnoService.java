package edu.unimagdalena.springacademic.services;

import java.util.List;

import edu.unimagdalena.springacademic.entities.Alumno;
import edu.unimagdalena.springacademic.entities.Curso;

/**
 * IAlumnoService
 */
public interface IAlumnoService {

  Alumno getById(Long id);

  Alumno guardarAlumno(Alumno alumno);

  Alumno actualizarAlumno(Alumno alumno);

  List<Alumno> getAll();

  List<Alumno> getAlumnosByCurso(Curso curso);
}