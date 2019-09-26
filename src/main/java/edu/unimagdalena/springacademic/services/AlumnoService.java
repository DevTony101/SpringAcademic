package edu.unimagdalena.springacademic.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.unimagdalena.springacademic.entities.Alumno;
import edu.unimagdalena.springacademic.repositories.AlumnoRepository;

/**
 * AlumnoService
 */
@Service
public class AlumnoService implements IAlumnoService {

  @Autowired
  private AlumnoRepository repo;

  @Override
  public Alumno guardarAlumno(Alumno alumno) {
    return repo.save(alumno);
  }

}