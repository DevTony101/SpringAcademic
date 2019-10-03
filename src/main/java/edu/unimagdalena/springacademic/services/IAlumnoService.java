package edu.unimagdalena.springacademic.services;

import java.util.List;

import edu.unimagdalena.springacademic.entities.Alumno;

/**
 * IAlumnoService
 */
public interface IAlumnoService {

  Alumno guardarAlumno(Alumno alumno);

  List<Alumno> getAll();
}