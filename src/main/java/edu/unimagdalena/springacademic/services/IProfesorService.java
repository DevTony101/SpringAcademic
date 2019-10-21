package edu.unimagdalena.springacademic.services;

import java.util.List;

import edu.unimagdalena.springacademic.entities.Profesor;

/**
 * IProfesorService
 */
public interface IProfesorService {

  Profesor guardarProfesor(Profesor profesor);

  Profesor actualizarProfesor(Profesor profesor);

  void eliminarProfesor(Profesor profesor);

  Profesor getProfesor(String nombre, String nif);

  List<Profesor> getProfesorByNombre(String nombre);

  List<Profesor> getAll();

  Profesor getProfesorByNif(String nif);
}