package edu.unimagdalena.springacademic.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.unimagdalena.springacademic.entities.HoraSemanal;

/**
 * HoraSemonalRepository
 */
@Repository
public interface HoraSemanalRepository extends JpaRepository<HoraSemanal, Long> {

  @Query("SELECT h FROM HoraSemanal h WHERE h.diaIndice = :diaIndice AND h.horaIndice = :horaIndice")
  HoraSemanal findByIndice(@Param("diaIndice") Integer diaIndice, @Param("horaIndice") Integer horaIndice);
}