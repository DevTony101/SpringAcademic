package edu.unimagdalena.springacademic.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.unimagdalena.springacademic.entities.Curso;

/**
 * CursoRepository
 */
@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {

  @Query("SELECT c FROM Curso c WHERE c.nivel = :nivel and c.etapa = :etapa")
  Curso findByQuery(@Param("nivel") Integer nivel, @Param("etapa") String etapa);

  List<Curso> findAll();
  
}