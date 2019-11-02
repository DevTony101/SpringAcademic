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

  List<Clase> getByCurso(Integer nivel, String etapa);

  List<Clase> getByAsignatura(String asignatura);

  List<Clase> getByProfesor(String profesor); // Nombre del Profesor

  List<Clase> getAll();

}