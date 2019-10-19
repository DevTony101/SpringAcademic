package edu.unimagdalena.springacademic.services;

import java.util.List;

import edu.unimagdalena.springacademic.entities.Clase;

/**
 * IClaseService
 */
public interface IClaseService {

  Clase guardarClase(Clase clase);
  List<Clase> getAll();
  
}