package edu.unimagdalena.springacademic.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.unimagdalena.springacademic.entities.Profesor;
import edu.unimagdalena.springacademic.repositories.ProfesorRepository;

/**
 * ProfesorService
 */
@Service
public class ProfesorService implements IProfesorService {

  @Autowired
  private ProfesorRepository repo;

  @Override
  public Profesor guardarProfesor(Profesor profesor) {
    return repo.save(profesor);
  }
  
  @Override
  public List<Profesor> getProfesores(String nombre, String nif) {
    return repo.findByQuery(nombre, nif);
  }
}