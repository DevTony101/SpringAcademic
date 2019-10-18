package edu.unimagdalena.springacademic.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.unimagdalena.springacademic.entities.Clase;
import edu.unimagdalena.springacademic.repositories.ClaseRepository;

/**
 * ClaseService
 */
@Service
public class ClaseService implements IClaseService {

  @Autowired
  private ClaseRepository cRepo;

  @Override
  public List<Clase> getAll() {
    return cRepo.findAll();
  }

  
}