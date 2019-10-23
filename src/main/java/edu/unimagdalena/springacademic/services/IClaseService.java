package edu.unimagdalena.springacademic.services;

import java.util.List;

import edu.unimagdalena.springacademic.entities.Clase;

/**
 * IClaseService
 */
public interface IClaseService {

  Clase guardarClase(Clase clase);

  Clase actualizarClase(Clase clase);

  void eliminarClase(Long id);

  List<Clase> getByAsignaturaProfesor(String asignatura, String profesor);

  List<Clase> getByAsignatura(String asignatura); // Nombre de la Asignatura

  List<Clase> getByProfesor(String profesor); // Nombre del Profesor

  List<Clase> getAll();

}