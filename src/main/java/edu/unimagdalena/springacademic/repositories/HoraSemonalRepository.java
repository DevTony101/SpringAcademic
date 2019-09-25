package edu.unimagdalena.springacademic.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.unimagdalena.springacademic.entities.HoraSemanal;

/**
 * HoraSemonalRepository
 */
@Repository
public interface HoraSemonalRepository extends JpaRepository<HoraSemanal, Long> {

  
}