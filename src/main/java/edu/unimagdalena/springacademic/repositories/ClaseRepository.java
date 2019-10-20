package edu.unimagdalena.springacademic.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.unimagdalena.springacademic.entities.Clase;

import java.util.List;

/**
 * ClaseRepository
 */
@Repository
public interface ClaseRepository extends JpaRepository<Clase, Long> {

  @Query("SELECT c FROM Clase c WHERE c.asignatura.nombre = :asignatura AND c.profesor.nombre = :profesor")
  List<Clase> findByAsignaturaProfesor(@Param("asignatura") String asignatura, @Param("profesor") String profesor);
  
  List<Clase> findAll();
  
}