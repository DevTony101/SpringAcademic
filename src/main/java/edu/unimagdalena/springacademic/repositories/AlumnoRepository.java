package edu.unimagdalena.springacademic.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.unimagdalena.springacademic.entities.Alumno;

/**
 * AlumnoRepository
 */
@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, Long> {

  
}