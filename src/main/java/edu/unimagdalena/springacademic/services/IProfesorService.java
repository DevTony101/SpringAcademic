package edu.unimagdalena.springacademic.services;

import java.util.List;

import edu.unimagdalena.springacademic.entities.Profesor;

/**
 * IProfesorService
 */
public interface IProfesorService {

  Profesor guardarProfesor(Profesor profesor);
  List<Profesor> getProfesores(String nombre, String nif);

}