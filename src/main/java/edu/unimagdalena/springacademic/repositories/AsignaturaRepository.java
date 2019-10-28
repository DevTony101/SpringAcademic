package edu.unimagdalena.springacademic.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.unimagdalena.springacademic.entities.Asignatura;
import edu.unimagdalena.springacademic.entities.Curso;

/**
 * AsignaturaRepository
 */
@Repository
public interface AsignaturaRepository extends JpaRepository<Asignatura, Long> {

  List<Asignatura> findAll();

  Asignatura findByNombre(String nombre);

  List<Asignatura> findByCurso(Curso curso);

}