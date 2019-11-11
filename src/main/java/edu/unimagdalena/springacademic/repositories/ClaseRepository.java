package edu.unimagdalena.springacademic.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.unimagdalena.springacademic.entities.Clase;

/**
 * ClaseRepository
 */
@Repository
public interface ClaseRepository extends JpaRepository<Clase, Long> {

  @Query("SELECT c FROM Clase c WHERE c.asignatura.curso.nivel = :nivel AND c.asignatura.curso.etapa = :etapa")
  List<Clase> findByCurso(@Param("nivel") Integer nivel, @Param("etapa") String etapa);

  @Query("SELECT c FROM Clase c WHERE c.asignatura.nombre = :asignatura")
  List<Clase> findByAsignatura(@Param("asignatura") String asignatura);

  @Query("SELECT c FROM Clase c WHERE c.profesor.nif = :nif")
  List<Clase> findByProfesor(@Param("nif") String nif);

  List<Clase> findAll();

}