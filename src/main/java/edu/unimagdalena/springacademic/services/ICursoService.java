package edu.unimagdalena.springacademic.services;

import java.util.List;

import edu.unimagdalena.springacademic.entities.Curso;

/**
 * ICursoService
 */
public interface ICursoService {

  Curso guardarCurso(Curso curso);

  Curso getByNivelEtapa(Integer nivel, String etapa);

  Curso getById(Long id);

  void eliminarCurso(Curso curso);

  List<Curso> getAll();
}