package edu.unimagdalena.springacademic.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.unimagdalena.springacademic.entities.Curso;
import edu.unimagdalena.springacademic.repositories.CursoRepository;

/**
 * CursoService
 */
@Service
public class CursoService implements ICursoService {

  @Autowired
  private CursoRepository repo;

  @Override
  public Curso guardarCurso(Curso curso) {
    return repo.save(curso);
  }

  @Override
  public List<Curso> getAll() {
    return repo.findAll();
  }

  @Override
  public Curso getById(Long id) {
    return repo.getOne(id);
  }

  @Override
  public void eliminarCurso(Curso curso) {
    repo.delete(curso);
  }

}