package edu.unimagdalena.springacademic.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.unimagdalena.springacademic.entities.ResponsableAlumno;

/**
 * ResponsableAlumnoRepository
 */
@Repository
public interface ResponsableAlumnoRepository extends JpaRepository<ResponsableAlumno, Long> {

}