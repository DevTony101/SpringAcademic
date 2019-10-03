package edu.unimagdalena.springacademic.services;

import java.util.List;

import edu.unimagdalena.springacademic.entities.Alumno;

/**
 * IAlumnoService
 */
public interface IAlumnoService {

  Alumno getById(Long id);

  Alumno guardarAlumno(Alumno alumno);

  Alumno actualizarAlumno(Alumno alumno);

  List<Alumno> getAll();
}