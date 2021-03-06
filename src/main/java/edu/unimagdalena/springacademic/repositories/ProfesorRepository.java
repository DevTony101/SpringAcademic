package edu.unimagdalena.springacademic.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.unimagdalena.springacademic.entities.Profesor;

/**
 * ProfesorRepository
 */
@Repository
public interface ProfesorRepository extends JpaRepository<Profesor, Long> {

  @Query("SELECT p FROM Profesor p WHERE p.nombre = :nombre and p.nif = :nif")
  Profesor findByQuery(@Param("nombre") String nombre, @Param("nif") String nif);

  List<Profesor> findByNombre(String nombre);

  Profesor findByNif(String nif);

  List<Profesor> findAll();
}