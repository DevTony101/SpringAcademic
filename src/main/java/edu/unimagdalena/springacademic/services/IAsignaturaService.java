package edu.unimagdalena.springacademic.services;

import java.util.List;

import edu.unimagdalena.springacademic.entities.Asignatura;

/**
 * IAsignaturaService
 */
public interface IAsignaturaService {

  Asignatura guardarAsignatura(Asignatura asignatura);

  Asignatura actualizarAsignatura(Asignatura asignatura);

  Asignatura getByNombre(String nombre);

  List<Asignatura> getAll();
}