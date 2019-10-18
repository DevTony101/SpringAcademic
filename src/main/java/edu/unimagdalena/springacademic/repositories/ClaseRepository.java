package edu.unimagdalena.springacademic.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.unimagdalena.springacademic.entities.Clase;

import java.util.List;

/**
 * ClaseRepository
 */
@Repository
public interface ClaseRepository extends JpaRepository<Clase, Long> {

  List<Clase> findAll();
  
}