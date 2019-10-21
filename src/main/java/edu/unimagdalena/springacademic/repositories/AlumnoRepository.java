package edu.unimagdalena.springacademic.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

import edu.unimagdalena.springacademic.entities.Alumno;

/**
 * AlumnoRepository
 */
@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, Long> {

  List<Alumno> findAll();

  @Query("SELECT a FROM Alumno a WHERE a.curso.nivel = :nivel AND a.curso.etapa = :etapa")
  List<Alumno> getAlumnosByCurso(@Param("nivel") Integer nivel, @Param("etapa") String etapa);

}