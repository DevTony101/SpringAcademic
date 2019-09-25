package edu.unimagdalena.springacademic.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.unimagdalena.springacademic.entities.Profesor;

/**
 * ProfesorRepository
 */
@Repository
public interface ProfesorRepository extends JpaRepository<Profesor, Long>{

}