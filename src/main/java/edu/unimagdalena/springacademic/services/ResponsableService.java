package edu.unimagdalena.springacademic.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.unimagdalena.springacademic.entities.ResponsableAlumno;
import edu.unimagdalena.springacademic.repositories.ResponsableAlumnoRepository;

/**
 * ResponsableService
 */
@Service
public class ResponsableService implements IResponsableService {

  @Autowired
  private ResponsableAlumnoRepository repo;

  @Override
  public ResponsableAlumno guardarResponsable(ResponsableAlumno responsable) {
    return repo.save(responsable);
  }

}